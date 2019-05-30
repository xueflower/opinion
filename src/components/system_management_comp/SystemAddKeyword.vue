<template>
  <div class="container">
		<div class="box" @click="addKeyWordFn">
			<em v-if="!inputShow"></em>
			<input type="text" value="" placeholder="添加关键字" v-model="keyword" v-if="inputShow" @blur="hideInputShowFn" @keyup.enter="hideInputShowFn"/>
		</div>
		<div class="box list" v-for="item,index in keyWordList">
			<strong @click="delKeyword(item.id)"></strong>
			<p>{{item.keyword}}</p>
		</div>
	</div>
</template>
<script>
  import axios from 'axios';
  export default{
    name:'SystemAddKeyword.vue',
    data(){
      return{
        inputShow:false,
        deleteShow:false,
        keyword:'',
        on:true
      }
    },
    computed:{
      staticUrl(){
        return this.$store.state.staticUrl
      },
      addKeyWordUrl(){
        return this.$store.state.addKeyWordUrl
      },
      delKeyWordUrl(){
        return this.$store.state.delKeyWordUrl
      },
      keyWordList(){
        return this.$store.state.articalSearchLimitData[3].list;
      }
    },
    methods:{
      addKeyWordFn(){
        console.log(111111);
        this.inputShow = true;
      },
      hideInputShowFn(){
        var that = this;
        if(that.on){
          this.on=false;
          axios.get(this.staticUrl+this.addKeyWordUrl+'?id=0'+'&keyword='+this.keyword).then(res=>{
            console.log(res);
            if(res.data.error==0){
              that.keyword = '';
              that.$layer.alert('添加成功！')
              that.$emit('getcurrentkeyword')
              that.inputShow = false;
              that.on = true
            }else if(res.data.error==2){
              that.$layer.alert('登录失效，请重新登录！');
              that.$router.push('/')
            }
          })
        }
      },
      delKeyword(i){
        var This = this;
        var delkeyword = this.staticUrl + this.delKeyWordUrl
        this.$layer.confirm('确定删除？',{
          title:'小Tip！',
          btn:['删除','取消']
        },function(){
          axios.get(delkeyword+'?id='+i).then(function (res) {
            if(res.data.error==0){
              This.$emit('getcurrentkeyword')
              This.$layer.closeAll();
              This.$layer.alert('删除成功！');
            }
          })
        },function(){
          This.$layer.closeAll();
        })
      }
    }
  }
</script>
<style scoped>
.container{
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  flex-wrap:wrap;
}
.box{
  width: 6rem;
  height: 2rem;
  background:rgba(237,249,255,1);
  border:1px solid rgba(27,123,229,1);
  border-radius:0.1rem;
  box-sizing: border-box;
  position:relative;
  margin-right: 1rem;
  margin-bottom:1rem;
}
.box em{
  width: 0.9rem;
  height: 0.9rem;
  position: absolute;
  display: block;
  top: 50%;
  left:50%;
  margin-left: -0.45rem;
  margin-top: -0.45rem;
  background: url('./../../assets/img/icon_add_keyword.png');
  background-size:100% 100%;
}
.box input{
  width:6rem;
  height: 2rem;
  box-shadow: none;
  outline: none;
  border:none;
  color: #545C64;
  font-size: 0.8rem;
  box-sizing: border-box;
  padding-left: 0.9rem;
  background: rgba(0,0,0,0);
}
::-webkit-input-placeholder{
  color: #9BA4AD;
}
.box strong{
  display: none;
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 50%;
  margin-top: -0.5rem;
  left: 50%;
  margin-left: -0.5rem;
  background: url('./../../assets/img/icon_delete_keyword.png');
  background-size:100% 100%;
}
.box p{
  line-height: 2rem;
  color: #545C64;
  font-size: 0.8rem;
  text-align: center;
}
.box.list:hover{
  background: rgba(0,0,0,0.2);
}
.box.list:hover strong{
  display:block;
}
</style>
