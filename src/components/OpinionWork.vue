<template>
  <div class="">
    <div class="">
      <!-- <component :is="tab"></component> -->
      <tab_bar></tab_bar>
    </div>
    <div class="opinion-work-cont">
  			<div class="opinion-work-container">
  				<div class="nav-tip">
  					<em></em>
  					<span>舆情工作＞</span>
  					<span class="col">收藏</span>
  				</div>
  				<div class="opinion-work-tab">
  					<div class="opinion-work-name">
  						<p>舆情工作</p>
  						<div v-for="item,index in currentShow" class="opinion-work-tab-bar" :class="{'active':item.isActive}" @click='listFn(index)'>
  							<em></em>
  							<span>{{item.title}}</span>
  						</div>
  					</div>
  					<div class="opinion-work-tool-cont">
  						<div class="opinion-work-tool-cont-inner">
  							<div class="top-tooler">
  								<div class="tooler-left">
  									<div class="all-check">
  										<label @click="allcheckFn">
                        <input type="checkbox" :checked='allcheck'/>
    										<span>全选</span>
                      </label>
  									</div>
  									<div>
  										<span>当前选中</span>
  										<strong>{{checkdNum}}</strong>
  										<span class="border">条</span>
  									</div>
  								</div>
  								<div class="tooler-right">
  									<div class="tooler-right-item output-check" @mouseenter="outCheckListFn">
  										<a :href="outCheck">
                        <em></em>
    										<span>导出选中信息</span>
                      </a>
  									</div>
  									<div class="tooler-right-item output-all" @mouseenter="outAllCheckedFn">
                      <a :href="outAll">
                        <em></em>
    										<span>导出全部信息</span>
                      </a>
  									</div>
  									<div class="tooler-right-item delete-check" @click="deleteCheckedFn">
  										<a href="javascript:;">
                        <em></em>
    										<span>批量删除</span>
                      </a>
  									</div>
  								</div>
  							</div>
  						</div>
  						<div class="collect-attention">
  							<table border="0" cellspacing="" cellpadding="">
  								<tr>
  									<th class="check-btn">选择</th>
  									<th class="col-att-name">名称</th>
  									<th class="resource">来源</th>
  									<th class="pub-time">发布时间</th>
  									<th class="done">操作</th>
  								</tr>


                  <!-- 渲染具体内容 -->
  								<tr v-for="item,index in colAttList">
  									<td>
                      <input type="checkbox" :checked="item.checked" @click="checkOneFn(item.id,index)"/>
                    </td>
  									<td class="no-wrap">
  										<span @click="toArticalDetail(item.content_id)">{{item.title}}</span>
  									</td>
  									<td>{{item.source_name}}</td>
  									<td>{{item.addtime}}</td>
  									<td class="done-del" @click="deleteCurrentItem(item.content_id)">删除</td>
  								</tr>
  							</table>


  							<div class="no-msg-cont" v-if="colAttList.length==0">
  								<em class="no-msg"></em>
  								<p class="none-rest">暂无数据</p>
  							</div>
  						</div>
              <div class="col-att-bottom-bar">
                <div class="recod">
                  <span>共{{pageNum}}页/{{colAttListNum}}条记录</span>
                  <span>当前为第<strong>{{currentPage}}</strong>页</span>
                </div>
                <div class="change">
                  <span class="btn pre" @click="topre">上一页</span>
                  <span class="btn pre" @click="tonext">下一页</span>
                  <span>第</span>
                  <input type="" name="" id="" v-model="jumpNum"/>
                  <span>页</span>
                  <span class="btn pre" @click="toTarget">跳转</span>
                </div>
              </div>
  					</div>
  				</div>
  			</div>
  		</div>
      <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import tab_bar from '@/components/TabBar'
import axios from 'axios'
export default {
    name: "OpinionWork.vue",
    data(){
      return{
        colListUrl:'content/soucang',     //收藏列表
        attListUrl:'content/guanzhu',     //关注列表
        allcheck:false,                   //全选
        checkedList:[],                    //已选择列表
        outCheck:'javascript:;',
        outAll:'javascript:;',
        setCurrentType:null,//当前选择模块
        currentLimit:0,
        jumpNum:null,//跳转页码
        layer:null,
        currentPage:1,
        tab:'TabBar'
        // pageNum:Math.ceil(this.$store.state.colAttListNum/10),
      }
    },
    computed:{
      currentShow(){
        return this.$store.state.collAttenShow
      },
      pageNum(){
        return Math.ceil(this.$store.state.colAttListNum/10)
      },
      colAttList(){
        console.log(this.$store.state.colAttList);
        return this.$store.state.colAttList
      },
      staticUrl(){
        return this.$store.state.staticUrl
      },
      checkdNum(){
        return this.checkedList.length;
      },
      outCollectUrl(){
        return this.$store.state.outCollectUrl
      },
      outAttentionUrl(){
        return this.$store.state.outAttentionUrl
      },
      setTypeSuccessType(){
        return this.$store.state.setTypeSuccessType
      },
      colAttListNum(){
        return this.$store.state.colAttListNum
      },

      articalDetailUrl(){
        return this.$store.state.articalDetailUrl
      },
      collAttenShow(){
        return this.$store.state.collAttenShow
      },
      collectUrl(){
        return this.staticUrl + this.$store.state.collectUrl
      },
      attentionUrl(){
        return this.staticUrl + this.$store.state.attentionUrl
      },

      getCurrentColAttType(){
        return this.$store.state.getCurrentColAttType
      }
    },
    components:{
      tab_bar,
      Footer
    },
    mounted(){
      for(var i=0;i<this.collAttenShow.length;i++){
        if(this.collAttenShow[i].isActive==true){
          this.getCurrentListFn(i);
          // localStorage.setItem('currentList',i)
        }
      };
      var that = this;

      var obj = {
        cont:0,
        list:null
      };

      if(this.getCurrentColAttType==0){
        var colUrl = this.staticUrl + this.colListUrl+'?limit=10&offset='+this.currentLimit;
      }else{
        var colUrl = this.attentionUrl+'?limit=10&offset='+this.currentLimit;
      }
      axios.get(colUrl).then(function (res) {
        if(res.data.error==0){
          obj.list = res.data.data;
          that.$store.commit('showColAttenMut',obj)
        }else if(res.data.error==2){
          that.$layer.alert('登录失效，请重新登录！');
          that.$router.push('/')
        }
      })
    },

    methods:{
      // 明天继续（调整切换速度）
      listFn(z){
        var that = this;
        this.jumpNum = null;
        this.allcheck = false;
        this.checkedList = [];
        this.getCurrentListFn(z);
      },

      getCurrentListFn(z){
        // localStorage.setItem('currentList',z)
        this.$store.commit('getCurrentColAttTypeMut',z)
        this.currentPage = null;
        var obj = {
          cont:z,
          list:null
        };
        var that = this;
        if(z==0){
          // 获取收藏列表
          var colUrl = this.staticUrl + this.colListUrl+'?limit=10&offset='+this.currentLimit;
          axios.get(colUrl).then(function (res) {
            if(res.data.error==0){
              obj.list = res.data.data;
              that.$store.commit('showColAttenMut',obj)
            }else if(res.data.error==2){
              that.$layer.alert('登录失效，请重新登录！');
              that.$router.push('/')
            }
          })
          this.setCurrentType = 0;
        }else if(z==1){
          // 获取关注列表
          var attUrl = this.staticUrl + this.attListUrl+'?limit=10&offset='+this.currentLimit;
          axios.get(attUrl).then(function (res) {
            if(res.data.error==0){

              obj.list = res.data.data;
              that.$store.commit('showColAttenMut',obj)
            }else if(res.data.error==2){
              that.$layer.alert('登录失效，请重新登录！');
              that.$router.push('/')
            }
          })
          this.setCurrentType = 1;
        }
      },


      // 多选
      allcheckFn(){
        if(this.allcheck==false){
          this.allcheck = true;
          for(var i=0;i<this.colAttList.length;i++){
            this.colAttList[i].checked = true;
            this.checkedList.push(this.colAttList[i].content_id)
          }
        }else{
          this.allcheck = false;
          for(var i=0;i<this.colAttList.length;i++){
            this.colAttList[i].checked = false;
            this.checkedList = [];
          }
        }
        console.log(this.checkedList);
      },


      //单选
      checkOneFn(i,j){    //i为该条数据的id，j为该数据的下标index
        var newArr = [];
        var type;
        var allCheckType;
        if(this.colAttList[j].checked==false){
          type=true;
        }else if(this.colAttList[j].checked==true){
          type=false;
        }
        this.colAttList[j].checked = type;
        for(var h=0;h<this.colAttList.length;h++){
          if(this.colAttList[h].checked==true){
            newArr.push(this.colAttList[h].content_id)
          }
        }
        if(newArr.length==this.colAttList.length){
          this.allcheck = true;
        }else{
          this.allcheck = false;
        }
        this.checkedList = newArr;
      },
      //导出选中数据
      outCheckListFn(){
        if(this.currentShow[0].isActive==true){  //导出收藏
          this.outCheck = this.staticUrl+this.outCollectUrl+'?id=['+this.checkedList+']'
        }else if(this.currentShow[1].isActive==true){  //导出关注
          this.outCheck = this.staticUrl+this.outAttentionUrl+'?id=['+this.checkedList+']'
        }
      },
      //导出全部数据
      outAllCheckedFn(){
        var newArr=[];
        for(var i=0;i<this.colAttList.length;i++){
          newArr.push(this.colAttList[i].content_id)
        }
        if(this.currentShow[0].isActive==true){  //导出收藏
          this.outAll = this.staticUrl+this.outCollectUrl+'?id=['+newArr+']'
        }else if(this.currentShow[1].isActive==true){  //导出关注
          this.outAll = this.staticUrl+this.outAttentionUrl+'?id=['+newArr+']'
        }
      },

      //批量删除
      deleteCheckedFn(){
        var data = {
          id:this.checkedList,
          set:1,
          other:true
        };
        var that = this;
        if(this.checkedList==0){
          this.$layer.alert('请选择数据！')
        }else{
          this.$layer.confirm('确定删除？',{
            title:'小Tip！'
          },function(){
            that.layer = that.$layer.msg('请稍等!',{
              title:'请稍等！',
              type:3,
              time:1
            })
            var referashUrl
            var type;
            if(that.currentShow[0].isActive==true){
              referashUrl = that.collectUrl;
              type=0
            }else if(that.currentShow[1].isActive==true){
              referashUrl = that.attentionUrl;
              type=1
            }
            axios.get(referashUrl+'?id=['+that.checkedList+']&set='+0).then(function(res){
              if(res.data.error==0){
                that.layer = that.$layer.msg('成功!',{
                  title:'成功！',
                  type:3,
                  time:1
                })
                that.$layer.close(that.layer);
                that.getCurrentListFn(type)
                that.$layer.closeAll();
              }
            })
          })
        }
      },
      //删除单条数据
      deleteCurrentItem(i){
        var data = {
          id:[i],
          set:1,
          other:true
        };
        var that = this;
        this.$layer.confirm('确定删除？',{
          title:'小Tip！'
        },function(){
          that.layer = that.$layer.msg('请稍等!',{
            title:'请稍等！',
            type:3,
            time:1
          })
          var referashUrl
          var type;
          if(that.currentShow[0].isActive==true){
            referashUrl = that.collectUrl;
            type=0
          }else if(that.currentShow[1].isActive==true){
            referashUrl = that.attentionUrl;
            type=1
          }
          axios.get(referashUrl+'?id=['+i+']&set='+0).then(function(res){
            if(res.data.error==0){
              that.layer = that.$layer.msg('成功!',{
                title:'成功！',
                type:3,
                time:1
              })
              that.$layer.close(that.layer);
              that.getCurrentListFn(type)
              that.$layer.closeAll();
            }
          })
        })
      },
      // 下一页
      tonext(){
        this.jumpNum = null;
        this.currentLimit+=10;
        console.log(this.currentLimit);
        if(this.currentLimit<=this.getSystemOtherMsgNum){
          var newLimit = this.currentLimit+',10';
          var obj = {
            type:null,
            limit:newLimit
          }
          if(this.setCurrentType==3){
            obj.type=1;
          };
          if(this.setCurrentType==4){
            obj.type=2;
          };
          if(this.setCurrentType==5){
            obj.type=3;
          }
          this.$store.commit('getSystemListMut',obj);
          this.currentPage+=1;
        }else{
          this.currentLimit-=10;
          this.$layer.alert('当前已是最后一页')
        }
        console.log(this.currentLimit);
      },
      topre(){
        this.jumpNum = null;
        if(this.currentLimit>=10){
          this.currentLimit-=10;
          var newLimit = this.currentLimit+',10';
          var obj = {
            type:null,
            limit:newLimit
          }
          if(this.setCurrentType==3){
            obj.type=1;
          };
          if(this.setCurrentType==4){
            obj.type=2;
          };
          if(this.setCurrentType==5){
            obj.type=3;
          }
          this.$store.commit('getSystemListMut',obj);
          this.currentPage-=1;
        }else{
          this.$layer.alert('当前已是第一页')
        }
      },

      toTarget(){
        if(this.jumpNum==null){
          this.$layer.alert('请输入跳转页码！')
          this.jumpNum = 1;
        }else{
          if(this.jumpNum>this.pageNum){
            this.$layer.alert('当前只有'+this.pageNum+'页')
            this.currentPage = 1;
          }else{
            var newNum = (Number(this.jumpNum)-1)*10;
            this.currentLimit = newNum;
            this.currentPage = Number(this.jumpNum);
            var newLimit = newNum+',10';
            var obj = {
              type:null,
              limit:newLimit
            }
            if(this.setCurrentType==3){
              obj.type=1;
            };
            if(this.setCurrentType==4){
              obj.type=2;
            };
            if(this.setCurrentType==5){
              obj.type=3;
            }
            this.$store.commit('getSystemListMut',obj);
          }
          this.jumpNum = 1;
        }
      },
      //去文章详情
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
      }
    }
}
</script>
<style scoped>
.opinion-work-cont{
	/* width: 100%; */
	/* height: 100%; */
	background: #edeef0;
}
.opinion-work-container{
	width: 76rem;
	margin: auto;
}
.opinion-work-container .nav-tip em{
	display: inline-block;
	width: 0.1rem;
	height: 0.75rem;
	background: #FF7C1C;
	vertical-align: middle;
}
.opinion-work-container .nav-tip span{
	line-height: 3rem;
	color: #999;
	font-size: 0.8rem;
	margin-left: 0.45rem;
}
.opinion-work-container .nav-tip .col{
	line-height: 3rem;
	color: #666;
	font-weight: 500;
	font-size: 0.8rem;
	margin-left: 0;
}
.opinion-work-tab{
	width: 100%;
	display: flex;
}
.opinion-work-tab .opinion-work-name{
	width:21.6rem;
	height:21.95rem;
	background:rgba(255,255,255,1);
	border:1px solid rgba(225,225,225,1);
	box-shadow:0px 0px 0.5rem 0px rgba(102,102,102,0.1);
	border-radius:0.1rem;
	box-sizing: border-box;
	padding: 0 1rem;
	display: inline-block;
	margin-right: 0.45rem;
}
.opinion-work-tab .opinion-work-name p{
	font-size: 1.1rem;
	color: #333;
	height: 3rem;
	line-height: 3rem;
	font-weight: 600;
	position: relative;
	border-bottom: 1px solid #E5E5E5;
}
.opinion-work-tab .opinion-work-name p:before{
	content: '';
	position: absolute;
	width: 0.2rem;
	height: 1.35rem;
	background: #FF7C1C;
	left: -1rem;
	top: 0.85rem;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar{
	margin-top: 1.5rem;
	height: 0.8rem;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar:hover{
  cursor: pointer;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar em{
	display: inline-block;
	width: 0.2rem;
	height: 0.2rem;
	border-radius: 0.1rem;
	background: #999999;
	vertical-align: middle;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar span{
	font-size: 0.8rem;
	color: #999999;
	line-height: 0.8rem;
	font-weight: 400;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar.active em{
	background: #FF7C1C;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar.active span{
	color: #FF7C1C;
}
.opinion-work-tool-cont{
	width:53.95rem;
	min-height:34.6rem;
	background:rgba(255,255,255,1);
	border:1px solid rgba(225,225,225,1);
	box-shadow:0px 0px 0.5rem 0px rgba(102,102,102,0.1);
	border-radius:0.1rem;
	display: inline-block;
	box-sizing: border-box;
	padding: 1.05rem 1.05rem 0;
	position: relative;
  margin-bottom:3rem;
}
.opinion-work-tool-cont-inner{
	width: 51.85rem;
	box-sizing: border-box;
	border:1px solid #EDEEF0;
	border-bottom: none;
}
.top-tooler{
	width: 100%;
	height: 2.35rem;
	background: #f6f6f7;
	/*border-bottom: 1px solid #EDEEF0;*/
	display: flex;
}
.top-tooler .tooler-left{
	width: 27.65rem;
	display: flex;
	justify-content: space-between;
	border-right: 1px solid #EDEEF0;
}
.top-tooler .tooler-left .all-check input{
	width: 0.7rem;
	height: 0.7rem;
	vertical-align: middle;
	margin-left: 1.7rem;
}
.top-tooler .tooler-left>div span{
	font-size: 0.9rem;
	color: #333;
	line-height: 2.35rem;
	color: #999;
}
.top-tooler .tooler-left>div strong{
	color: #EC4167;
	font-size: 0.9rem;
	line-height: 2.35rem;
	font-weight: 600;
}
.top-tooler .tooler-left>div span.border{
	margin-right: 1rem;
}
.tooler-right{
	width: 24.2rem;
	display: flex;
	justify-content: space-around;
}

.tooler-right-item span{
	font-size: 0.9rem;
	color: #999;
	line-height: 2.35rem;
	vertical-align: middle;
}
.tooler-right-item em{
	display: inline-block;
	width: 0.8rem;
	height: 0.9rem;
	vertical-align: middle;
}
.output-check em,.output-all em{
	background: url(./../assets/img/icon_output.png);
	background-size: 100% 100%;
}
.output-check:hover em{
	background: url(./../assets/img/icon_output_check.png);
	background-size: 100% 100%;
}
.output-check:hover span{
  color:#48D304;
}
.output-all:hover em{
	background: url(./../assets/img/icon_output_total.png);
	background-size: 100% 100%;
}
.output-all:hover span{
  color: #30AFFF;
}
.delete-check em{
	background: url(./../assets/img/icon_work_del.png);
	background-size: 100% 100%;
}


/* 批量删除cursor不生效 之后来找原因*/
.delete-check:hover{
  cursor:pointer;
}
.delete-check:hover em{
	background: url(./../assets/img/icon_work_check_del.png);
	background-size: 100% 100%;
}
.delete-check:hover span{
  color:#EC4167;
}
.collect-attention{
	border-top: none;
	width: 51.85rem;
	box-sizing: border-box;
}

td,th{
	border:solid #EDEEF0;
	border-width:0px 1px 1px 0px;
	font-size: 0.8rem;
	color: #999;
	line-height: 2.35rem;
  font-weight: 400;
}
th{
	color: #333;
	background: #F6F6F7;
	box-sizing: border-box;
}
td{
	text-align: center;
}
table{
	border:solid #EDEEF0;
	border-width:1px 0px 0px 1px;
}

.check-btn{
	width: 4rem;
	height: 2.35rem;
	text-align: center;
	font-size: 0.9rem;
	color: #333;
	line-height: 2.35rem;
}
.col-att-name{
	width: 23.7rem;
	box-sizing: border-box;
	padding-left: 1rem;
	text-align: left;
}
.resource{
	width: 7.45rem;
}
.no-wrap{
	height: 2.35rem;
	padding-left: 1.05rem;
}

.no-wrap span{
	display: block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 20rem;
}
.no-wrap span:hover{
  cursor:pointer;
}
.pub-time{
	width: 9.95rem;
}
.done{
	width: 6.95rem;
}
.done-del{
	color: #FF7C1C;
}
.done-del:hover{
	cursor: pointer;
	background: #FF7C1C;
	color: #fff;
}
.col-att-bottom-bar{
	width: 100%;
	height: 2.9rem;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	justify-content: space-between;
	padding: 0 1rem;
	position: absolute;
	bottom: 0;
	left: 0;
}
.col-att-bottom-bar .recod span{
	font-size: 0.9rem;
	color: #999;
	line-height: 2.9rem;
}
.col-att-bottom-bar .recod strong{
  font-size:0.9rem;
  color:#5ECA29
}
.col-att-bottom-bar .change span{
	font-size: 0.8rem;
	line-height: 2.9rem;
	color: #999;
}
.col-att-bottom-bar .change input{
	width: 3.1rem;
	height: 2rem;
	font-size: 0.9rem;
	color: #999;
	margin:  0 0.2rem;
	box-sizing: border-box;
	padding-left: 0.4rem;
	border-radius: 0.25rem;
	outline: none;
	box-shadow: none;
  border:1px solid #E1E1E1;
}
.col-att-bottom-bar .change .btn{
	display: inline-block;
	width: 3.4rem;
	height: 1.5rem;
	background:rgba(48,175,255,1);
	border-radius:0.25rem;
	text-align: center;
	line-height:1.5rem;
	color: #fff;
}
.col-att-bottom-bar .change .btn:hover{
	cursor: pointer;
	background: rgba(48,175,255,0.8);
}
.no-msg-cont{
	margin-top: 3.7rem;
	width: 100%;
}
.no-msg-cont .no-msg{
	display: block;
	margin: auto;
	width: 4.25rem;
	height: 5.65rem;
  background: url('./../../static/img/icon_no_msg.png');
	/* background: url('./../static/img/icon_no_msg.png'); */
	background-size: 100% 100%;
	margin-bottom: 1.75rem;
}
.no-msg-cont .none-rest{
	color: #CCCCCC;
	font-size: 0.9rem;
	text-align: center;
}
</style>
