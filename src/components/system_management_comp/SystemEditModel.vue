<template>
  <div class="user-modal">
    <div class="user-mdoal-container type-short modal-add">
      <p>{{name}}</p>
      <em class="btn-colse" @click="colseModelAdd"></em>
      <div class="user-modal-item-cont">
        <div class="user-modal-item">
          <span class="fenbu">名称</span>
          <span>:</span>
          <input type="" placeholder="请输入角色名称" name="" id="" value="" v-model="addName" />
        </div>
        <div class="user-modal-item">
          <span class="fenbu">备注</span>
          <span>:</span>
          <textarea name="" placeholder="请输入备注" v-model="addBeizhu"></textarea>
        </div>
      </div>
      <div class="user-modal-btn-cont">
        <span class="bg-orange" @click="subMitFn">保存</span>
        <span @click="colseModelAdd">返回</span>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    name:'SystemEditModel',
    data(){
      return{
        addName:this.editData.name,
        addBeizhu:''
      }
    },
    props:{
      editData:{
        type:Object,
        required:true
      },
      name:{
        type:String,
        required:true
      }
    },
    computed:{
      systemDepartUrl(){
        return this.$store.state.systemDepartUrl
      },
      staticUrl(){
        return this.$store.state.staticUrl
      },
      editMemberData(){
        return this.$store.state.editMemberData
      }
    },
    methods:{
      colseModelAdd(){
        this.$store.commit('currentAddModelMut','')
      },
      // 具体的添加事件
      subMitFn(){
        var that = this;
        var currentUrl = this.staticUrl + this.systemDepartUrl + '?id=' + this.editData.id + "&departname=" + this.addName;
        if(this.addName==''){
          this.$layer.alert('请输入修改的名称！')
        }else{
          axios.get(currentUrl).then(function(res){
            if(res.data.error==0){
              that.$layer.alert('修改成功！')
              that.colseModelAdd();
              that.$store.commit('getDepartmentListMut')
            }else if(res.data.error==2){
              that.$layer.alert('登录失效，请重新登录！');
              that.$router.push('/')
            }else{
              that.$layer.alert('修改失败！')
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
.user-modal{
	width: 96rem;
	height: 54rem;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.63);
	z-index: 2;
}
.user-mdoal-container{
	width:36.85rem;
	background:rgba(255,255,255,1);
	border-radius:0.25rem;
	margin: 18.1rem auto 0;
	position: relative;
	box-sizing: border-box;
	padding: 0 1rem;
}
.user-mdoal-container .btn-colse{
	width: 1.2rem;
	height: 1.15rem;
	background: url('./../../assets/img/wrong.png');
	background-size:100% 100%;
	position: absolute;
	top: 1rem;
	right: 1rem;
}
.user-mdoal-container>p{
	height: 2.95rem;
	line-height: 2.95rem;
	border-bottom: 1px solid #E5E5E5;
	text-align: center;
	color: #333;
	font-size: 1.1rem;
	font-weight: 500;
}
.user-mdoal-container .btn-colse:hover{
	background: url('./../../assets/img/hover_wrong.png');
	background-size:100% 100%;
}


.type-short{
	height: 19.7rem;
}
.type-long{
	height:28.75rem;
}


/*增加*/
.user-modal-item-cont span{
	font-size: 0.7rem;
	color: #666;
	font-weight: 400;
}
.user-modal-item-cont .fenbu{
	width: 3.05rem;
	font-size: 0.7rem;
	color: #666;
	display: inline-block;
	text-align-last: justify;
	text-align: justify;
}
.user-modal-item-cont .user-modal-item{
	width: 100%;
	margin-top: 1rem;
}
.user-modal-item-cont input{
	width: 31rem;
	box-shadow: none;
	outline: none;
	border: 1px solid #D2D2D2;
	background: #EDEEF0;
	box-sizing: border-box;
	padding-left: 0.55rem;
	line-height: 1.7rem;
	color: #333;
	font-size: 0.7rem;
}
.user-modal-item-cont textarea{
	width: 31rem;
	height: 4.55rem;
	box-sizing: border-box;
	border: 1px solid #D2D2D2;
	background: #EDEEF0;
	border-radius:0.1rem;
	vertical-align: top;
	resize: none;
	padding: 0 0.55rem;
	line-height: 1.7rem;
	color: #222;
}
.user-modal-btn-cont{
	width: 100%;
	height: 2rem;
	margin-top: 1.4rem;
	text-align: center;
}
.user-modal-btn-cont span{
	color: #fff;
	display: inline-block;
	width: 5.4rem;
	height: 2rem;
	border-radius: 0.1rem;
	line-height: 2rem;
	text-align: center;
	background: #ccc;
}
.user-modal-btn-cont span:hover{
  cursor: pointer;
}
.user-modal-btn-cont span.bg-orange{
	background: #FF7C1C;
	margin-right: 1rem;
}




/*包含用户*/
.user-moal-have-cont{
	/*height: 12rem;*/
	overflow: auto;
}
.user-moal-have-cont table{
	margin-top: 0.5rem;
}
.user-moal-have-cont .shoose-user{
	width: 4rem;
}
.user-moal-have-cont th,.user-moal-have-cont td{
	height: 2.35rem;
	font-size:0.9rem;
	font-weight: 500;
}

.user-moal-have-cont .user-num{
	width: 16.4rem;
}
.user-moal-have-cont .user-name{
	width: 14.5rem;
}
.text-left{
	text-align: left;
	box-sizing: border-box;
	padding-left: 0.5rem;
}

/*操作权限*/
.user-moal-done-cont{
	margin-top: 0.5rem;
	/*height: 12rem;*/
	overflow: auto;
}
.user-moal-done-cont .choose-user{
	width: 4rem;
}
.user-moal-done-cont .user-num{
	width: 7.55rem;
}
.user-moal-done-cont .user-name{
	width: 23.35rem;
}

.user-moal-done-cont td label{
	margin-left: 0.65rem;
	display: inline-block;
}
.v-aligh{
	vertical-align: middle;
}
</style>
