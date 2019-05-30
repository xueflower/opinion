<template>
  <div class="container">
  			<div class="inner-cont">
  				<div class="title">
  					<p>添加成员</p>
  					<em @click="closeCurrentModelFn"></em>
  				</div>
  				<div class="detail-cont">
  					<div class="box">
  						<span class="name">登录账号</span>
  						<input type="text"placeholder="请输入登录账号" v-model="loginname"/>
  					</div>
  					<div class="box">
  						<span class="name">登录密码</span>
  						<input type="password" placeholder="请输入登录密码" v-model="password"/>
  					</div>
  					<div class="box">
  						<span class="name">用户名</span>
  						<input type="text" placeholder="请输入用户名" v-model="username"/>
  					</div>
  					<div class="box">
  						<span class="name">状态</span>
  						<label v-for="item,index in type" :class="{'active':item.checked}" @click="chooseTypeFn(index)">
  							<input type="radio" name="type" :checked="item.checked"/>
  							<em>{{item.name}}</em>
  						</label>
  					</div>
  					<!-- <div class="box user">
  						<span class="name">角色</span>
  						<div class="list-cont">
  							<span class="detail-user-name">请选择角色</span>
  							<strong></strong>
  						</div>
  						<ul hidden>
  							<li>1</li>
  							<li>2</li>
  							<li>3</li>
  						</ul>
  					</div>
  					<div class="box">
  						<span class="name">栏目授权</span>
  						<label v-for="item,index in reword" :class="{'active':item.checked}" @click="choosePowerFn(index)">
  							<input type="radio" name="reword" id="" value="启用" :checked="item.checked"/>
  							<em>{{item.name}}</em>
  						</label>
  					</div> -->
  					<div class="box">
  						<span class="name">备注</span>
  						<input type="text" value="" placeholder="请输入备注" v-model="beizhu"/>
  					</div>
  					<div class="box">
  						<!--<span class="name">备注</span>
  						<textarea name="" rows="" cols=""></textarea>-->
  					</div>
  				</div>
  				<div class="btn-cont">
  					<span class="active" @click="addMemberFn">保存</span>
  					<span @click="closeCurrentModelFn">返回</span>
  				</div>
  			</div>
  		</div>
</template>
<script>
  import axios from 'axios'
  export default{
    name:'SystemAddMember.vue',
    data(){
      return{
        username:'',
        password:'',
        loginname:'',
        type:[
          {name:'启用',checked:false},
          {name:'禁用',checked:false}
        ],
        reword:[
          {name:'内置部件栏目',checked:false},
          {name:'复制账号栏目',checked:false}
        ],
        beizhu:'',
        state:null//启用禁用状态
      }
    },
    computed:{
      groupId(){
        return this.$store.state.groupId
      },
      staticUrl(){
        return this.$store.state.staticUrl
      },
      addUserUrl(){
        return this.$store.state.addUserUrl
      }
    },
    methods:{
      closeCurrentModelFn(){
        this.$store.commit('currentAddModelMut','')
      },
      //选择状态
      chooseTypeFn(i,z){
        for(var j=0;j<this.type.length;j++){
          this.type[j].checked = false;
        }
        this.type[i].checked = true;
        if(i==0){
          this.state = 0
        }else{
          this.state =1
        }
      },
      //选择栏目授权
      choosePowerFn(i){
        for(var j=0;j<this.reword.length;j++){
          this.reword[j].checked = false;
        }
        this.reword[i].checked = true;
      },

      addMemberFn(){
        var This = this;
        var Len = 0;
        for(var i=0;i<this.type.length;i++){
          if(this.type[i].checked == true){
            Len += 1;
          }
        }
        if(this.username==''||this.password==''||this.loginname==''||Len==0){
          this.$layer.alert('请填写完整信息！')
        }else{
          axios.get(this.staticUrl+this.addUserUrl+'?username='+this.loginname+'&password='+this.password+'&displayname='+this.username+'&beizhu='+this.beizhu+'&state='+this.state+'&depart_id='+this.groupId).then(function (res) {

            if(res.data.error==0){
              This.$emit('sdsds');
              This.$layer.alert('添加成功！');
              This.$store.commit('currentAddModelMut','');
            }else if(res.data.error==1){
              This.$layer.alert(res.data.msg)
            }else if(res.data.error==2){
              This.$layer.alert('登录失效，请重新登录！');
              This.$router.push('/')
            }
          })
        }
      }
    }
  }
</script>
<style scoped>

.container{
  width: 96rem;
  height: 54rem;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.63);
  z-index: 2;
}
.inner-cont{
width: 46rem;
height: 20.85rem;
border:1px solid rgba(225,225,225,1);
box-shadow:0px 0px 0.5rem 0px rgba(102,102,102,0.1);
border-radius:0.1rem;
background: #fff;
box-sizing: border-box;
padding: 0 1rem;
position: absolute;
top: 50%;
margin-top: -10.425rem;
left: 50%;
margin-left: -23rem;
}

.title{
height: 3rem;
position: relative;
}
.title>p{
line-height: 3rem;
text-align: center;
font-size: 1.1rem;
color: #333;
height: 3rem;
border-bottom: 1px dashed #E5E5E5;
}
.title>em{
position: absolute;
display: block;
width: 1.2rem;
height: 1.15rem;
background: url('./../../assets/img/wrong.png');
background-size:100% 100%;
top:1rem;
right:1rem
}
.title>em:hover{
  background: url('./../../assets/img/hover_wrong.png');
	background-size:100% 100%;
  cursor: pointer;
}
.detail-cont{
display: flex;
flex-wrap: wrap;
justify-content: space-around;
margin-top: 0.5rem;
}
.detail-cont .box{
width: 20.8rem;
height: 1.7rem;
margin-bottom:1rem;
}
.detail-cont .box:nth-of-type(2n-1){
margin-right:1.35rem ;
}
.detail-cont .box input[type=text],.detail-cont .box input[type=password]{
width: 15.5rem;
height: 1.7rem;
color: #333;
box-sizing: border-box;
padding:0 0.55rem;
}
.detail-cont .box .name{
display: inline-block;
width: 4rem;
margin-right:0.5rem;
text-align-last: justify;
  text-align: justify;
  font-size: 0.7rem;
  color: #666;
  line-height: 1.7rem;
}
.detail-cont .box em{
font-size: 0.7rem;
color: #666;
margin-right:0.4rem;
}
input[type=radio]{
width: 0.7rem;
height: 0.7rem;
vertical-align: middle;
}
input{
outline: none;
box-shadow: none;
border-radius: 2px;
border:1px solid #D2D2D2;
background: #EDEEF0;
font-size: 0.7rem;
line-height: 1.7rem;
color: #666;
}
.list-cont{
width: 8.75rem;
height: 1.7rem;
display: inline-block;
position: relative;
border:1px solid #DBDBDB;
background: #F8F8F9;
border-radius:0.1rem;
}
.list-cont span{
font-size: 0.7rem;
color: #666;
margin-left: 0.55rem;
line-height: 1.7rem;
}
.list-cont strong{
display: block;
position: absolute;
width: 0.4rem;
height: 0.7rem;
background: url('./../../assets/img/icon_artical_select.png');
background-size:100% 100%;
right:0.55rem;
top:0.5rem
}
.box ul{
position: absolute;
top: 1.7rem;
left: 4.75rem;
}
.box ul li{
width:8.75rem;
height:1.35rem;
background:#FFF;
color: #666;
font-size: 0.7rem;
line-height: 1.35rem;
box-sizing: border-box;
padding-left: 0.55rem;
}
.box ul li:hover{
background: #FF7C1C;
color: #fff;
}
.user{
position: relative;
}
::-webkit-input-placeholder{
font-size: 0.7rem;
color: #ccc;
}
.box label:hover{
cursor: pointer;
}
.box label em{
color: #ccc;
vertical-align: middle;
}
.box label.active em,.box label:hover em{
color:#FF7C1C
}
.box textarea{
width: 15.5rem;
  height: 4.55rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #D2D2D2;
  background: #EDEEF0;
  border-radius: 0.1rem;
  vertical-align: top;
  resize: none;
  padding: 0 0.55rem;
  line-height: 1.7rem;
  color: #222;
}
.btn-cont{
margin-top: 1.75rem;
text-align: center;
}
.btn-cont span{
display: inline-block;
width:5.4rem;
height:2rem;
background:rgba(204,204,204,1);
border-radius:0.1rem;
color: #fff;
line-height: 2rem;
}
.btn-cont span:hover{
cursor:pointer;
}
.btn-cont span.active{
background:rgba(255,124,28,1);
}

</style>
