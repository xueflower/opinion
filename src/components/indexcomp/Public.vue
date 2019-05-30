<template id="">
  <div class="box most">
			<div class="view-tool">
				<P class="box-title">{{itemName}}</P>
				<div class="right-set">
					<span v-if='typeData==1' class="pre" @click="preOneFn"></span>
					<ul v-if='typeData==1'>
						<li v-for="item,index in showList" :class="{'active':item.isActive}" @click="getActiveFn(item,index)">{{item.type}}</li>
					</ul>
					<span v-if='typeData==1' class="next" @click='nextOneFn'></span>
					<em  v-if='typeData!=2' class="setting" @click="showModel"></em>
				</div>
			</div>
			<div class="news-cont">
				<ul v-if="typeData==1">
					<li class="new-item" v-for="item,index in IndexitemArticalList" v-if="IndexitemArticalList!=null">
						<div class="dot">
							<em class="orange"></em>
						</div>
						<div class="detail" @click="toArticalDetail(item.id)">
              <ul>
								<li class="detail-list">
									<div class="info-cont">
										<span class="col-orange">［{{item.type==''?'未知':item.type}}］</span>
										<p>{{item.title}}</p>
									</div>
									<div class="number-cont">
										<span class="like">相似文章数   {{item.xiangsi==null?'0':item.xiangsi}}</span>
									</div>
								</li>
								<li class="detail-list">
									<div class="info-cont">
										<strong>{{item.source_name==''?'未知':item.source_name}} </strong>
										<img src="./../../assets/img/icon_time.png"/>
										<em>{{item.pubdate}}</em>
									</div>
									<div class="number-cont">
										<em @click.stop="deleteCurrentArtical(item.id)"></em>
									</div>
								</li>
							</ul>
						</div>
					</li>

          <div class="look-more" v-if='typeData!=2' @click="toAricalList">
            点击查看全部
          </div>
				</ul>

        <ul v-if="typeData==2">
					<li class="new-item yuqing" v-for="item,index in IndexitemArticalList" v-if="IndexitemArticalList!=null">
						<div class="head">
							<img src="./../../assets/img/icon-header.png"/>
							<p>{{item.author==''?'未知':item.author}}</p>
						</div>
						<div class="word-cont" @click="toArticalDetail(item.id)">
							<p>
								<!-- <span class="col-orange">111</span>
            		旧居陈列馆，桂园，中山四路，周公馆，人民大礼堂，
            		<span class="col-orange">111</span>
            		旧居陈列馆，桂园，中山四路，周公馆，人民大礼堂， -->
                {{item.content1}}
            	</p>
            	<div class="tip-cont">
  							<img src="./../../assets/img/icon_time.png"/>
  							<em>{{item.pubdate}}</em>
  							<a :href="item.url" @click.stop>
  								<em></em>
  								<span>原文链接</span>
  							</a>
  						</div>
  					</div>
  				</li>
          <div class="look-more" v-if='typeData!=1' @click="toAricalList">
            点击查看全部
          </div>
  			</ul>
  		</div>
      <component :is="current" @closeComp="closeCompFn" @refreashList="getList" :currentId="itemId" :baseData="articalRequire"></component>
  	</div>
</template>
<script type="text/javascript">
import Configuration from '@/components/indexcomp/Configuration'
import axios from 'axios'
export default {
    name: "Public.vue",
    props:{
      typeData:{
        type:Number,
        required:true
      },
      itemName:{
        type:String,
        required:true
      },
      itemId:{
        type:String,
        required:true
      },
      search:{
        type:String,
        required:false
      }
    },
    data(){
      return{
        showList:[{
          isActive:true,
          type:'全部'
        },{
          isActive:false,
          type:'网站'
        },{
          isActive:false,
          type:'APP'
        },{
          isActive:false,
          type:'电子报'
        },{
          isActive:false,
          type:'平媒'
        },{
          isActive:false,
          type:'贴吧'
        },{
          isActive:false,
          type:'论坛'
        },{
          isActive:false,
          type:'微博'
        },{
          isActive:false,
          type:'广播'
        },{
          isActive:false,
          type:'电视'
        }],
        layer:null,
        timer:null,
        IndexitemArticalList:[],
        articalRequire:{
          type:'',
          keyword:'',
          sort:'',
          fenlei:'',  //载体分类
          set_neg:'',    //载体类型 （正，负）
          set_other:'',
          set_alarm:'',
          authority:'',
          btime:'',   //开始时间
          etime:'',   //结束时间
          limit:[0,10],   //分页限制
          title:'',   //文章标题
          content1:'',//文章正文
          author:'',  //文章作者
          source_name:'',//文章来源类型
          paichong:''  //文章排重
        },
        current:''
      }
    },
    computed:{
      getarticalList(){
        return this.$store.state.articalList;
      },
      staticUrl(){
        return this.$store.state.staticUrl;
      },
      articalListUrl(){
        return this.$store.state.articalListUrl;
      },
      deleteArticalUrl(){
        return this.$store.state.deleteArticalUrl;
      },
    },

    mounted(){
      this.getArticalList()
      if(this.search!=null){
        var newData = JSON.parse(this.search)
        this.articalRequire = newData;
      }
    },

    watch:{
      getarticalList:{
        handler(newValue){

          this.$layer.close(this.layer)
        },
        deep:true
      },

    },
    components:{
      Configuration
    },
    methods:{
      getActiveFn(key,i){
        for(var j=0;j<this.showList.length;j++){
          this.showList[j].isActive = false;
        }
        this.showList[i].isActive = true;
        if(this.showList[i].type=="全部"){
          this.articalRequire.type = '';
        }else{
          this.articalRequire.type = this.showList[i].type;
        }
        this.getArticalList();
      },
      preOneFn(){
        var newItem = this.showList[this.showList.length-1];
        this.showList.unshift(newItem);
        this.showList.pop();
      },
      nextOneFn(){
        var newItem = this.showList[0];
        this.showList.push(newItem);
        this.showList.shift();
      },
      //点击查看更多
      toAricalList(){
        this.$store.commit('changeHomeCompFn',1)
        this.layer = this.$layer.msg('加载中！',{
          type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '加载中！',
          shade: true,//是否显示遮罩
          shadeClose: false,//点击遮罩是否关闭
          time:1
        });
        var data = this.$store.state.articalRequire;
        data.type = this.articalRequire.type;
        this.$store.commit('getArticalFnMut',data)//获取文章列表
      },
      // 删除当前文章
      deleteCurrentArtical(i){
        var This = this;
        this.$layer.confirm('确定删除？',{
          title:'小提示！',
          btn:['删除','取消']
        },function(){
          axios.get(This.staticUrl+This.deleteArticalUrl+'?id=['+i+']').then(function (res) {
            if(res.data.error==0){
              This.$layer.closeAll();
              This.getArticalList();
              This.$layer.alert('删除成功！')
            }else if(res.data.error==2){
              This.$layer.alert('登录失效，请重新登录！');
              This.$router.push('/')
            }
          })
        },function(){
          This.$layer.closeAll();
        })
        return false;
      },

      toArticalDetail(i){
        var that = this;
        var newUrl = this.$store.state.staticUrl + this.$store.state.articalDetailUrl;
        axios.get(newUrl+'?id='+i).then(function(res){
          if(res.data.error==0){
            if(res.data.error==0){
                that.$store.commit('showArticalDetailFn',res.data.data)
                that.$router.push('/detail')
            }
          }
        })
      },
      getArticalList(){
        var that = this;
        var data = that.articalRequire;
        var newUrl = that.staticUrl + that.articalListUrl+'?author='+data.author+'&btime='+data.btime+'&content1='+data.content1
        +'&etime='+data.etime+'&fenlei='+data.fenlei+'&type='+data.type
        +'&keyword='+data.keyword+'&limit='+data.limit+'&set_neg='+data.set_neg
        +'&paichong='+data.paichong+'&set_alarm='+data.set_alarm+'&authority='+data.authority
        +'&sort='+data.sort+'&source_name='+data.source_name+'&title='+data.title;

        axios({
          method: 'get',
          url:newUrl,
          headers: {
              'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then(function(res){
          // console.log(res);
          if(res.data.error==0){
            // console.log('‘我刷新了’');
            that.IndexitemArticalList = res.data.data.list;
          }
        });
      },
      //显示配置模块
      showModel(){
        // console.log(111111);
        // console.log(this.itemId);
        this.current = 'Configuration';
      },
      //关闭当前配置窗口
      closeCompFn(){
        this.current = '';
      },
      // 重新获取数据列表
      getList(data){
        // console.log(data);
        this.articalRequire = data;
        this.getArticalList();
      }
    }
}


</script>
<style scoped>

.box.most{
	width: 37.5rem;
	height: 27.5rem;
	background: #fff;
	box-sizing: border-box;
	padding: 0 1rem;
	/* position: relative; */
  margin-bottom:1rem;
  position:relative;
}
.box.most .view-tool{
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #E5E5E5;
  position:relative;
  top:0;
  left:0;
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
.box.most .right-set ul{
	width: 19.1rem;
	height: 3rem;
  overflow: hidden;
}
.right-set ul li{
	font-size: 0.9rem;
	color: #999999;
	line-height: 3rem;
	height: 3rem;
  width:2.7rem;
  text-align:center;
  float:left;
  font-weight:400;
}
.right-set ul li:hover{
  cursor: pointer;
}
.right-set ul li.active{
	color: #333;
	font-size: 0.9rem;
	font-weight: 400;
	position: relative;
}
.right-set ul li.active:after{
	content: '';
	position: absolute;
	width: 2rem;
	height: 0.15rem;
	background: #FF7C1C;
	bottom: 0;
	left: 0.35rem;
}
.news-cont{
  overflow:auto;
  height:24.45rem
}
.news-cont>ul{
  margin-bottom:0.5rem;
}
.news-cont>ul .new-item{
	display: flex;
	justify-content: space-between;
	margin-top: 0.6rem;
}
/* .news-cont>ul .new-item:first-of-type{
  margin-top:0.6rem;
} */
.news-cont>ul .new-item .detail{
	width: 34rem;
}
.news-cont>ul .new-item .detail:hover{
  cursor:pointer;
}
.news-cont>ul .new-item .detail>ul{
  margin-bottom:1rem;
}
/* .news-cont>ul .new-item .dot{
	margin-top: 0.15rem;
} */
.news-cont>ul .new-item .dot em{
	width: 0.55rem;
	height: 0.55rem;
	display: inline-block;
	border: 1px solid #FF7C1C;
	border-radius: 50%;
}
.news-cont>ul .new-item .dot em{
	background: #FF7C1C;
	border: none;
}
.col-orange{
	color: #FF7C1C;
}
.detail-list{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.detail li .info-cont{
	display: flex;
	align-items: center;
	text-align: left;
}
.detail li .info-cont em{
  color:#999;
  font-size:0.7rem;
}
.detail li .info-cont p{
	width: 20rem;
	font-size: 0.7rem;
	color: #333;
	overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.number-cont .like{
	font-size: 0.7rem;
	color: #999;
}
.number-cont{
	width: 6rem;
	text-align: right;
}
.info-cont strong{
	color: #999999;
	font-size: 0.7rem;
	text-align: center;
	display: inline-block;
	padding-left: 0.3rem;
  font-weight:400;
}
.info-cont span{
	font-size: 0.7rem;
}
.info-cont img{
	width: 0.7rem;
	height: 0.7rem;
	margin-left: 1.4rem;
	margin-right: 0.2rem;

}
.number-cont em{
	width: 0.7rem;
	height: 0.7rem;
	background: url('./../../assets/img/icon_delete.png');
	background-size:100% 100%;
	display: inline-block;
  position:relative;
  z-index:999;
}
.number-cont em:hover{
  cursor: pointer;
}




.look-more{
	font-size: 0.7rem;
	color: #FF7C1C;
	font-weight: 400;
	height: 0.7rem;
	line-height: 0.7rem;
  margin-top:1rem;
  text-decoration: underline;
  text-align: right;
  margin-bottom: 0.5rem;
}


.new-item .yuqing{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.new-item.yuqing .head img{
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
}
.new-item.yuqing .head p{
	font-size: 0.7rem;
	color: #999;
	font-weight: 400;
  text-align:center;
  white-space:nowrap;
}
.new-item.yuqing .word-cont{
	width: 31.65rem;
	height: 4.15rem;
	background: url('./../../assets/img/word_bg.png');
	background-size: 100% 100%;
	box-sizing: border-box;
	padding: 0.7rem 0.95rem 0.65rem 1.3rem;
}
.new-item.yuqing .word-cont:hover{
  cursor:pointer;
}
.new-item.yuqing .word-cont p{
	width: 29.4rem;
	height: 1.6rem;
	text-wrap: wrap;
	font-size: 0.7rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 0.85rem;
  overflow: hidden;
	/* text-indent:2em */
}
.tip-cont {
	display: flex;
	align-items: center;
	margin-top: 0.6rem;
}
.tip-cont img{
	width: 0.7rem;
	height: 0.7rem;
	margin-right: 0.2rem;
}
.tip-cont>em{
	color: #999999;
	font-size: 0.7rem;
	margin-right: 1.05rem;
}
.tip-cont a{
	display: flex;
	align-items: center;
}
.tip-cont a:hover{
	cursor: pointer;
}
.tip-cont a em{
	width: 0.6rem;
	height: 0.6rem;
	background: url('./../../assets/img/icon_link.png');
	background-size:100% 100% ;
	display: inline-block;
	margin-right: 0.25rem;
}
.tip-cont a span{
	color: #30AFFF;
	font-size: 0.7rem;
}
.look-more:hover{
	cursor: pointer;
}

</style>
