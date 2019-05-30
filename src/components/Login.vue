<template>
  <div class="container">
    <div class="login-width">
      <div class="login-cont">
        <p class="title">管理员登录</p>
        <div class='input-cont'>
          <em></em>
          <input placeholder="请输入用户名" type="text" name="" v-model="username">
        </div>
        <div class='input-cont'>
          <em></em>
          <input placeholder="请输入密码" type="password" name="" v-model="password" @keyup.enter="login">
        </div>
        <p class="forget-pass">忘记密码？</p>
        <div class="login-btn" @click="login">
          登录
        </div>
      </div>
    </div>
  </div>
</template>
<script>


import axios from 'axios'
import './../assets/js/json2.js'
export default {
  name: 'Login',
  data() {
    return {
      username:'',
      password:'',
    };
  },
  computed:{
    staticUrl(){
      return this.$store.state.staticUrl
    },
    todayStateUrl(){
      return this.$store.state.todayStateUrl
    },
    humanMsgUrl(){
      return this.$store.state.humanMsgUrl
    },
    todayAnalData(){
      return this.$store.state.todayAnalData
    },
    humanMsg(){
      return this.$store.state.humanMsg
    },
    indexItemMsgUrl(){
      return this.$store.state.indexItemMsgUrl
    },
    recentTotalUrl(){
      return this.$store.state.recentTotalUrl
    },
    itemListMsgData(){
      return this.$store.state.itemListMsgData
    },
    timimgMsgData(){
      return this.$store.state.timimgMsgData
    },

    currentListen(){
      var obj = {
        todayAnalData:this.todayAnalData,
        humanMsg:this.humanMsg,
        itemListMsgData:this.itemListMsgData,
        timimgMsgData:this.timimgMsgData
      };

      return obj;
    }
  },
  watch:{
    currentListen:{
      handler(newValue){
        if(newValue.todayAnalData!=null&&newValue.humanMsg!=null&&newValue.itemListMsgData!=null&&newValue.timimgMsgData!=null){
          this.$layer.close(this.layer)
          this.$router.push('/home')
        }
　　　},
　　　deep:true
    }
  },
  mounted(){
    localStorage.clear()
  },
  methods:{
    login(){
      var This = this;
      this.layer = this.$layer.msg('正在登录！',{
        type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
        title: '请稍等！',
        shade: true,//是否显示遮罩
        shadeClose: false,//点击遮罩是否关闭
        time:100
      });

      axios.get(this.staticUrl+'user/login?username='+this.username+'&password='+this.password).then(function(res){
        console.log(res);
        if(res.data.error==0){

          var todayUrl = This.staticUrl+This.todayStateUrl
          var humanUrl = This.staticUrl+This.humanMsgUrl
          var itemUrl = This.staticUrl+This.indexItemMsgUrl
          var recentUrl = This.staticUrl+This.recentTotalUrl
          // (data.body.data);
          // 登录成功。获取今日舆情信息
          This.$store.commit('getTodayMut')
          // // 获取人物舆情信息
          This.$store.commit('getHumMut')
          // // 获取所有模块信息
          This.$store.commit('getAllItemMsgMut');
          // //获取近期汇总信息
          This.$store.commit('getTimingMsgMut')
          localStorage.setItem('username',res.data.name)

        }else{
          This.$layer.close(This.layer);
          This.$layer.alert('登录失败，请重新登录！');
        }
      }).catch(err=>{
        This.$layer.close(This.layer);
        This.$layer.alert('登录失败，请重新登录！');
      })
    }
  }
};
</script>

<style scoped>
.container{
  width:100%;
  height: 100%;
  background:url('./../../static/img/login_bg.png');
  /* background:url('./../static/img/login_bg.png'); */
  background-size:100% 100%;
  position:relative;
}
.login-width{
  width:29.8rem;
  height:29.3rem;
  background:rgba(245,245,245,0.3);
  border-radius:1px;
  position: absolute;
  top:50%;
  left:50%;
  margin-top:-14.65rem;
  margin-left:-14.9rem;
}
.login-cont{
  width:28.25rem;
  height:27.75rem;
  background:#fff;
  margin: 0.7rem auto;
  border-radius:1px;
  padding-top:2.35rem;
  box-sizing: border-box;
}
.title{
  text-align: center;
  color:#333;
  font-size:1.5rem;
  font-weight:400;
  height: 2.6rem;
  line-height: 2.6rem;
  position:relative;
}
.title:after{
  content:'';
  position:absolute;
  width:2.6rem;
  height:0.35rem;
  background:rgba(221,221,221,1);
  border-radius:0.2rem;
  bottom:-0.6rem;
  left:50%;
  margin-left:-1.3rem;
}
.input-cont{
  margin: auto;
  position:relative;
}
.input-cont:first-of-type{
  margin-top:3.9rem
}
.input-cont:nth-of-type(2){
  margin-top:3.05rem
}
.input-cont>input{
  width:23.25rem;
  height:2.5rem;
  background:rgba(245,245,245,1);
  box-shadow:none;
  border-radius:1px;
  outline: none;
  border:1px solid #F5F5F5;
  font-size:1rem;
  font-weight:300;
  color:rgba(0,0,0,1);
  -webkit-background-clip:text;
  box-sizing: border-box;
  padding-left: 5.35rem;
  margin-left:2.5rem;
}

.input-cont>em{
  display:block;
  position:absolute;
  left:4.2rem;
  top:50%;
}

.input-cont:first-of-type>em{
  width:1.1rem;
  height: 1.2rem;
  background:url('./../assets/img/login_icon_user.png');
  background-size:100% 100%;
  margin-top:-0.6rem;
}
.input-cont:nth-of-type(2)>em{
  width:1.1rem;
  height: 1.3rem;
  background:url('./../assets/img/login_icon_pass.png');
  background-size:100% 100%;
  margin-top:-0.65rem;
}

.forget-pass{
  font-size:1rem;
  color:#838383;
  margin-top:0.5rem;
  font-weight:400;
  line-height: 1rem;
  text-align: right;
  margin-right:2.5rem;
}
.forget-pass:hover{
  color:#FF7C1C;
  text-decoration: underline;
  cursor:pointer;
}
.login-btn{
  margin:3.95rem auto 0;
  width:17.5rem;
  height:3rem;
  background:linear-gradient(-82deg,rgba(28,31,196,1),rgba(137,2,218,1));
  border-radius:1.5rem;
  text-align: center;
  color:#fff;
  font-size:1rem;
  line-height: 3rem;
}
.login-btn:hover{
  cursor: pointer;
}
</style>
