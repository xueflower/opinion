<template>
  <div class="box most">
  	<div class="view-tool">
  		<P class="box-title">人物舆情</P>
      <div class="right-set">
        <em class="setting" hidden></em>
      </div>
    </div>
    <div class="human-cont">
      <div v-if="getHumanData?getHumanData:''" v-for="item,index in getHumanData" class="human-box" :class="{'woman':item.sex=='女'}" @click="toArticalList(item.leader_name)">
        <div class="img-box active">
          <img v-if="item.sex=='男'" src="./../../assets/img/head_man.png"/>
          <img v-if="item.sex=='女'" src="./../../../static/img/head_woman.png"/>
        </div>
        <div class="info-box">
          <p>{{item.leader_name}}</p>
          <p>{{item.content_num}}</p>
        </div>
        <span v-if="item.content_num_noread!=0" class="new-msg double">{{item.content_num_noread}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'HumanOpinion.vue',
    data(){
      return{
        layer:null,
        timer:null,
        articalRequire:{
          keyword:'',
          type:'',
          sort:'',
          fenlei:'',  //载体分类
          set_neg:'',    //载体类型 （正，负）
          btime:'',   //开始时间
          etime:'',   //结束时间
          limit:[0,10],   //分页限制
          title:'',   //文章标题
          content1:'',//文章正文
          author:'',  //文章作者
          source_name:'',//文章来源类型
          paichong:'',  //文章排重
          set_other:'',
          set_alarm:''
        }
      }
    },

    computed:{
      getHumanData(){
        return this.$store.state.humanMsg;
      },

      getArticalList(){
        return this.$store.state.articalList;
      },
      getArticalListType(){
        return this.$store.state.getArticalListType;
      }
    },
    watch:{
      getArticalList:{
        handler(){
          this.$layer.close(this.layer)
        },
        deep:true
      }
    },
    mounted(){
      var that = this;
      // this.timer = setInterval(function () {
        that.$store.commit('getHumMut');
      // },3000)
    },
    methods:{
      toArticalList(name){
        this.$store.commit('changeHomeCompFn',1)
        this.layer = this.$layer.msg('加载中！',{
          type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '加载中！',
          shade: true,//是否显示遮罩
          shadeClose: false,//点击遮罩是否关闭
          time:1
        });
        this.articalRequire.keyword = '';
        // this.articalRequire.author = name;
        localStorage.setItem('searchContent',name)
        this.articalRequire.content1 = name;
        this.articalRequire.limit=[0,10]
        // console.log(this.articalRequire);
        this.$store.commit('getArticalFnMut',this.articalRequire)//获取文章列表
      }
    },

  }
</script>
<style scoped>
.box.most{
	width: 37.5rem;
	height: 27.5rem;
	background: #fff;
	box-sizing: border-box;
	padding: 0 1rem;
	position: relative;
  margin-bottom:1rem;
  overflow: auto;
}
.box.most .view-tool{
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #E5E5E5;
}
.box.most .box-title{
	height: 3rem;
	font-size: 1rem;
	font-weight: 600;
	line-height: 3rem;
	color: #333;
	position: relative;
}
.box.most .box-title:before{
	content: '';
	position: absolute;
	top: 0.85rem;
	left: -1.02rem;
	width: 4px;
	height: 1.35rem;
	background: #FF7C1C;
}
.right-set{
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.pre,
.next{
	display: inline-block;
	width: 0.55rem;
	height: 1.05rem;
  opacity:0.5
}
.pre:hover,
.next:hover{
  opacity:0.9
}
.pre{
	background: url('./../../assets/img/icon_pre.png');
	background-size: 100% 100%;
}
.setting{
	width: 1.1rem;
	height: 1rem;
	background: url('./../../assets/img/icon_set.png');
	background-size: 100% 100%;
	margin-left: 0.5rem;
  opacity:0.7;
}
.setting:hover{
  opacity:1;
}
.next{
	background: url('./../../assets/img/icon_next.png');
	background-size: 100% 100%;
}
.human-cont{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
}
.human-box{
  width: 5.2rem;
  height: 7.15rem;
  position: relative;
  /*display: inline-block;*/
  margin-right: 0.85rem;
  margin-bottom: 1rem;
  margin-top:0.5rem;
}
.human-box:nth-of-type(6n){
  margin-right: 0;
}
.human-box .img-box{
  width: 100%;
  height: 4.85rem;
  background: #EDEEF0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.human-box .img-box img{
  width: 3.45rem;
  height: 3.65rem;
}
.human-box.woman .img-box img{
  width:2.85rem;
  height: 3.7rem;
}
.human-box .info-box{
  height: 2.8rem;
  width: 100%;
  background: #30AFFF;
}
.human-box.woman .info-box{
  background: #F45679;
}
.human-box .info-box p{
  font-size: 0.7rem;
  color: #fff;
  text-align: center;
  padding-top: 0.2rem;
  /*line-height: 1.15rem;*/
  /*height: 1.15rem;*/
}
.human-box .info-box p:last-child{
  padding: 0;
}
.human-box .new-msg{
  position: absolute;
  height: 1.2rem;
  width: 1.2rem;
  display: block;
  background: #FF0000;
  color: #FFFFFF;
  top: -0.6rem;
  right: -0.6rem;
  border-radius: 0.7rem;
  font-size: 0.7rem;
  line-height: 1.2rem;
  text-align: center;
}
.human-box .new-msg.double{
  width: 1.5rem;
}
</style>
