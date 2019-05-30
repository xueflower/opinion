<template>
  <div class="index">
    <div class="top-cont">
      <div class="input-cont" :class="{'active':indexSearch}">
        <input type="text" maxlength="20" placeholder="请输入关键字搜索舆情" value="" v-model="searchkeyword" @keyup.enter="searchArtical"/>
        <span class="icon-search" @click="searchArtical"></span>
      </div>
      <div class="tool-bar">
        <ul class="tool-bar-cont">
          <li>
            <div class="collect" @click='toColFN(0)'>
              <span>收藏</span>
              <img src="./../assets/img/icon_index_col.png"/>
            </div>
          </li>
          <li>
            <div class="focus" @click='toColFN(1)'>
              <span>关注</span>
              <img src="./../assets/img/icon_focus.png"/>
            </div>
          </li>
          <li>
            <div class="manager">
              <div>
                <img src="./../assets/img/icon-header.png"/>
                <span @mouseover="userToolBarShowFn">{{username}}</span>
                <strong></strong>
              </div>
              <ul class="user-management" v-if="userEditHide" @mouseover="userToolBarShowFn" @mouseleave="userToolBarHideFn">
                <li class="user-management-item" hidden>
                  <em></em>
                  <span>修改密码</span>
                </li>
                <li class="user-management-item" @click="outLoginFn">
                  <em></em>
                  <span>退出</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab-bar">
      <div class="tab-bar-cont">
        <ul class="contenar">
          <li v-for="item,index in isActive" :class="{active:item.active}" @click="active(index)">{{item.title}}</li>
        </ul>
        <div class="item-manage" @click="itemManageFn">
          栏目管理
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpinionManagement from '@/components/OpinionManagement'
// import OpinionWork from '@/components/OpinionWork.vue'
import Configuration from '@/components/indexcomp/Configuration'
import SystemManagement from '@/components/SystemManagement'
import IndexCont from '@/components/IndexCont'
import ArticalDetail from '@/components/ArticalDetail'
import SystemDepartent from '@/components/SystemDepartent'
import StatisticalAnalysis from '@/components/StatisticalAnalysis'
import axios from 'axios'
export default {
  name: 'TabBar',
  data() {
    return {
      userEditHide:false,   //首页user退出修改密码弹出框
      codeShow:false,
      colListUrl:'content/soucang',     //收藏列表
      attListUrl:'content/guanzhu',     //关注列表
      searchkeyword:'',                  //首页搜索关键词
      currentLimit:0,
      layer:null,
      timer:null,
      username:''
    }
  },
  computed:{
    isActive(){
      return this.$store.state.homeData.isActive
    },
    current(){
      return this.$store.state.homeData.current
    },
    indexSearch(){
      return this.$store.state.homeData.indexSearch
    },
    staticUrl(){
      return this.$store.state.staticUrl
    },
    getKeyWordsUrl(){
      return this.$store.state.getKeyWordsUrl
    },
    articalRequire(){
      return this.$store.state.articalRequire
    },
    userListUrl(){
      return this.$store.state.userListUrl
    },
    tongjifenxiUrl(){
      return this.$store.state.tongjifenxiUrl
    },
    articalHuizongUrl(){
      return this.$store.state.articalHuizongUrl
    },
    outOpinionMsgListUrl(){
      return this.$store.state.outOpinionMsgListUrl
    },
    getArticalListType(){
      return this.$store.state.getArticalListType
    },
    relogin(){
      return this.$store.state.relogin
    },
    itemListMsgData(){
      return this.$store.state.itemListMsgData
    },
    articalList(){
        return this.$store.state.articalList
    }
  },
  watch:{
    getArticalListType(newValue){
      this.$store.commit('outLoginType')
      this.$layer.close(this.layer)
    },
    relogin(newValye){
      this.$layer.alert('登录失效，请重新登录！')
      this.$store.commit('changeLoginType')
      this.$router.push('/')
    },
    // articalList(){}
    articalList:{
      handler(newValue){
        this.$layer.close(this.layer)
      },
      deep:true
    }
  },
  mounted(){
    var that = this;
    this.username = localStorage.getItem('username')
    this.timer = setInterval(function () {
      that.$store.commit('getAllItemMsgMut');
      if(that.itemListMsgData!=null){
        clearInterval(that.timer)
      }
    },1000)
  },
  components: {
    OpinionManagement,
    // OpinionWork,
    Configuration,
    SystemManagement,
    IndexCont,
    ArticalDetail,
    SystemDepartent,
    StatisticalAnalysis
  },
  methods: {
    active: function (i) {
      var that = this;
      localStorage.removeItem('searchContent')
      this.$store.commit('changeHomeCompFn',i)
      this.$router.push('/home')
      this.$store.commit('changeLoadingMut')
      localStorage.removeItem('btime');
      localStorage.removeItem('etime');
      localStorage.removeItem('indexSearch');
      this.articalRequire.etime = '';
      this.articalRequire.btime = '';
      if(i==1){
        this.articalRequire.content1 = '';
        this.articalRequire.limit = [0,10];
        this.$store.commit('getArticalFnMut',this.articalRequire)//获取文章列表
        this.layer = this.$layer.msg('加载中！',{
          type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '加载中！',
          shade: true,//是否显示遮罩
          shadeClose: false,//点击遮罩是否关闭
          time:5
        });
        localStorage.setItem('clear',true)
      }else if(i==3){
        var keywordUrl = this.staticUrl + this.getKeyWordsUrl;
        axios.get(keywordUrl).then(function(res){
          if(res.data.error==0){
            that.$store.commit('getKeyWordsMut',res.data.data)
          }else if(res.data.error==2){
            that.$layer.alert('登录失效，请重新登录！');
            that.$router.push('/')
          }
        })
      }else if(i==2){
        var curUrl = this.staticUrl + this.tongjifenxiUrl
        axios.get(curUrl).then(function(res){
          if(res.data.error==0){
            that.$store.commit('getFenxiListMut',res.data.data)
          }else if(res.data.error==2){
            that.$layer.alert('登录失效，请重新登录！');
            that.$router.push('/')
          }
        })
        // --------------------------------------------
      }
    },
    enter: function () {
      this.codeShow = true;
    },
    leave: function () {
      this.codeShow = false;
    },

    toColFN: function (z) {
      var obj = {
        cont:z,
        list:null
      };
      this.$store.commit('getCurrentColAttTypeMut',z)
      var that = this;
      if(z==0){
        // 获取收藏列表
        var colUrl = this.staticUrl + this.colListUrl+'?limit=10&offset='+this.currentLimit;
        var data;
        axios.get(colUrl).then(function (res) {
          if(res.data.error==0){
            obj.list = res.data.data;
            that.$store.commit('showColAttenMut',obj)
            that.$router.push('/opinion')
            that.$store.commit('changeLoadingMut')
          }else if(res.data.error==2){
            that.$layer.alert('登录失效，请重新登录！');
            that.$router.push('/')
          }
        })
      }else if(z==1){
        // 获取关注列表
        var attUrl = this.staticUrl + this.attListUrl+'?limit=10&offset='+this.currentLimit;;
        axios.get(attUrl).then(function (res) {
          if(res.data.error==0){
            obj.list = res.data.data;
            that.$store.commit('showColAttenMut',obj)
            that.$router.push('/opinion')
            that.$store.commit('changeLoadingMut')
          }else if(res.data.error==2){
            that.$layer.alert('登录失效，请重新登录！');
            that.$router.push('/')
          }
        })
      }

    },
    // 文章详情模块
    showArticalDetail(i){
      this.current = 'ArticalDetail'
    },

    // 显示用户退出修改密码下拉框
    userToolBarShowFn(){
      this.userEditHide = true;
    },

    //隐藏下拉框
    userToolBarHideFn(){
      this.userEditHide = false;
    },

    // 退出登录
    outLoginFn(){
      this.$router.push('/')
      this.$store.commit('clear')
    },
    // 打开栏目管理
    itemManageFn(){
      this.$store.commit('changeLoadingMut')
      this.$store.commit('openItemManageMut')
      this.$router.push('/home')
    },
    //首页搜索事件
    searchArtical(){
      this.articalRequire.content1 = this.searchkeyword;
      localStorage.setItem('indexSearch',this.searchkeyword);
      this.$store.commit('getArticalFnMut',this.articalRequire)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  width: 100%;
  height: auto;
  position: relative;
}

.top-cont {
  width: 100%;
  height: 6rem;
  display: flex;
  background: #000;
  align-items: center;
  /* background: url('./../assets/img/background.png'); */
  background: url('./../../static/img/background.png');
  background-size: 100% 100%;
}

.input-cont {
  width: 25.65rem;
  height: 2.1rem;
  margin-left: 35.1rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.1rem 0.6rem;
}

.input-cont.active {
  opacity: 0
}

.input-cont > input {
  outline: none;
  box-shadow: none;
  border: none;
  width:90%;
}

.input-cont .icon-search {
  display: inline-block;
  width: 1.1rem;
  height: 1.15rem;
  background: url('./../assets/img/search.png');
  background-size: 100% 100%;
}

.input-cont .icon-search:hover {
  background: url('./../assets/img/icon_artical_search.png');
  background-size: 100% 100%;
}

::-moz-placeholder,
::-ms-input-placeholder,
::-webkit-input-placeholder {
  font-size: 0.9rem;
  color: #999;
}

.tool-bar-cont {
  display: flex;
}

.tool-bar-cont li div {
  display: flex;
  align-items: center;
  height: 100%;
}

.tool-bar-cont span {
  font-size: 0.7rem;
  color: #fff;;
}

.tool-bar-cont .manager {
  margin-left: 2.65rem;
  position:relative;
}


.tool-bar-cont .manager .user-management{
position:absolute;
width:6.15rem;
height: 4.1rem;
background:#fff;
box-shadow:0px 0px 0.3rem 0px rgba(0, 0, 0, 0.34);
border-radius:0.25rem;
bottom:-5.2rem;
right:0;
overflow:hidden;
}
.tool-bar-cont .manager .user-management .user-management-item{
height: 2.05rem;
/* text-align:center; */
}
.tool-bar-cont .manager .user-management .user-management-item span{
color:#999999;
font-size:0.7rem;
line-height:2.05rem;
}
.tool-bar-cont .manager .user-management .user-management-item em{
display: inline-block;
width:0.8rem;
height: 0.8rem;
vertical-align: middle;
margin:0 0.2rem 0 0.4rem
}


/* 退出登录&&修改密码 */
.tool-bar-cont .manager .user-management .user-management-item:hover{
background:#FF7C1C;
cursor:pointer;
}
.tool-bar-cont .manager .user-management .user-management-item:hover span{
color:#fff;
}
.tool-bar-cont .manager .user-management .user-management-item:first-of-type em{
background:url('./../assets/img/icon_user_editpassword.png');
background-size:100% 100%;
}
.tool-bar-cont .manager .user-management .user-management-item:first-of-type:hover em{
background:url('./../assets/img/icon_user_editpassword_hover.png');
background-size:100% 100%;
}
.tool-bar-cont .manager .user-management .user-management-item:last-of-type em{
background:url('./../assets/img/icon_user_out.png');
background-size:100% 100%;
}
.tool-bar-cont .manager .user-management .user-management-item:last-of-type:hover em{
background:url('./../assets/img/icon_user_out_hover.png');
background-size:100% 100%;
}

.tool-bar-cont .collect img {
  width: 0.9rem;
  height: 0.9rem;
  margin-left: 0.25rem;
}

.tool-bar-cont .focus {
  margin-left: 1.45rem;
}

.tool-bar-cont .collect:hover, .tool-bar-cont .focus:hover {
  cursor: pointer;
}

.tool-bar-cont .collect:hover span, .tool-bar-cont .focus:hover span {
  text-decoration: underline;
}

.tool-bar-cont .focus img {
  width: 0.95rem;
  height: 0.85rem;
  margin-left: 0.25rem;
}

.tool-bar-cont .collect {
  margin-left: 9rem;
}

.tool-bar-cont .manager img {
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.5rem;
}

.tool-bar-cont .manager strong {
  width: 0.75rem;
  height: 0.5rem;
  display: inline-block;
  background: url('./../assets/img/sanjiao.png');
  background-size: 100% 100%;
}

.tab-bar {
  width: 100%;
  height: 2.4rem;
  background: #141414;
}

.tab-bar-cont {
  width: 76rem;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-bar-cont .contenar {
  display: flex;
}

.tab-bar-cont .contenar li {
  height: 2.4rem;
  padding: 0 1.25rem;
  text-align: center;
  font-size: 1rem;
  color: #fff;
  line-height: 2.4rem;
  font-weight: 300;
}

/* 动画保持结尾位置 */
.tab-bar-cont .contenar li:hover {
  cursor: pointer;
  -webkit-animation: change linear 0.5s forwards;
}

@keyframes change {
  from {
    background: #000
  }
  to {
    background: #FF7C1C
  }
}

.tab-bar-cont .contenar li.active {
  background: #FF7C1C;
}

.tab-bar-cont .item-manage {
  width: 5rem;
  height: 1.5rem;
  background: #291A90;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  color: #fff;
  line-height: 1.5rem;
  text-align: center;
}
.tab-bar-cont .item-manage:hover{
cursor:pointer;
}
.footer {
  width: 100%;
  height: 5rem;
  background: #141414;
  position: relative;
}

.footer span {
  font-size: 0.9rem;
  color: #fff;
  line-height: 5rem;
  margin-left: 40.02rem;
}

.footer img {
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.footer > img:hover {
  transform: scale(1.1)
}

.fix-img-box {
  display: none;
  position: absolute;
  width: 9.2rem;
  height: 10.3rem;
  /* background: url('./../assets/img/bg_index_erweicode.png'); */
  background: url('./../../static/img/bg_index_erweicode.png');
  background-size: 100% 100%;
  text-align: center;
  top: -8.6rem;
  right: 34.37rem;
}

.fix-img-box.active {
  display: block;
}

.fix-img-box > img {
  width: 6.6rem;
  height: 6.6rem;
  margin: 1.25rem auto 0.3rem;
}

.fix-img-box > p {
  color: #FF7C1C;
  font-size: 0.7rem;
  text-align: center;
}
</style>
