<template>
  <div class="opinion-work-cont">
    <component :is="currentAddModel"></component>
		<div class="opinion-work-container">
				<div class="nav-tip">
					<em></em>
					<!-- <span>系统管理＞权限管理＞</span>
					<span class="col">角色管理</span> -->
				</div>
				<div class="opinion-work-tab">
					<div class="opinion-work-name">
						<p>系统管理</p>
						<div class="opinion-work-tab-bar" v-for="item,index in navBarData" :hidden="index==0" :class="{'active':item.isActive}" @click="activeFn(index)">
							<p class="little-tit" v-if="item.title!=''">{{item.title}}</p>
							<em></em>
							<span>{{item.name}}</span>
						</div>
					</div>
					<div class="opinion-work-tool-cont">
						<div class="opinion-work-tool-cont-inner">
							<div class="top-tooler" v-if="navBarData[0].isActive">
								<div class="tooler-right">
									<div class="tooler-right-item add-user" @click="showAdd">
										<em></em>
										<span>新增</span>
									</div>
									<div class="tooler-right-item have-user" @click="haveUser">
										<em></em>
										<span>包含用户</span>
									</div>
									<div class="tooler-right-item show-power" @click="showLimite">
										<em></em>
										<span>显示权限</span>
									</div>
									<div class="tooler-right-item done-power" @click="showDone">
										<em></em>
										<span>操作权限</span>
									</div>
									<div class="tooler-right-item item-power" @click="itemPowerFn">
										<em></em>
										<span>栏目权限</span>
									</div>
								</div>
							</div>
						</div>


            <!-- 表格模块的位置 -->
            <component :is="currentTable" :clear="clearGroupId" @getcurrentkeyword="getKeyWordListFn"></component>

            <!--隐藏的模态框-->


            <component @currentShow="currentShowFn" :addType="subType" :is="current"></component>

						<div class="col-att-bottom-bar" v-if="bottomBarHide">
								<div class="recod">
									<span>共{{pageNum}}页/{{getSystemOtherMsgNum}}条记录</span>
                  <span>当前为第<strong>{{currentPage}}</strong>页</span>
								</div>
								<div class="change">
									<span class="btn pre" @click="topre">上一页</span>
									<span class="btn pre" @click="tonext">下一页</span>
									<span>第</span>
									<input type="" name="" id="" value="" v-model="jumpNum"/>
									<span>页</span>
									<span class="btn pre" @click="toTarget">跳转</span>
								</div>
							</div>
					</div>
				</div>
			</div>


	</div>
</template>
<script>
  import SystemDemoThree from '@/components/system_management_comp/SystemDemoThree'
  import SystemDemoTwo from '@/components/system_management_comp/SystemDemoTwo'
  import SystemDemoFour from '@/components/system_management_comp/SystemDemoFour'
  import SystemModelHave from '@/components/system_management_comp/SystemModelHave'
  import SystemTableOne from '@/components/system_management_comp/SystemTableOne'
  import SystemTableTwo from '@/components/system_management_comp/SystemTableTwo'
  import SystemTableThree from '@/components/system_management_comp/SystemTableThree'
  import SystemPartment from '@/components/system_management_comp/SystemPartment'
  import SystemAddModel from '@/components/system_management_comp/SystemAddModel'
  import SystemAddMember from '@/components/system_management_comp/SystemAddMember'
  import SystemAddKeyword from '@/components/system_management_comp/SystemAddKeyword'
  import axios from 'axios'
  export default{
    name:'SystemManagement.vue',
    data(){
      return{
        modelAddShow:false,
        current:'',
        navBarData:[
          // {title:'权限管理',name:'角色管理',isActive:true},
          {title:'权限管理',name:'角色管理',isActive:false},
          {title:'关键词',name:'添加关键词',isActive:true},
          {title:'组织机构',name:'部门管理',isActive:false},
          {title:'系统日志',name:'系统登录日志',isActive:false},
          {title:'',name:'系统操作日志',isActive:false},
          {title:'',name:'文章操作日志',isActive:false}
        ],
        currentTable:'SystemAddKeyword',
        tableComArr:['SystemTableOne','SystemTableTwo','SystemTableThree','SystemPartment','SystemAddKeyword'],
        showBottomBar:false,
        subType:"user",
        bottomBarHide:false,
        setCurrentType:null,//当前选择模块
        currentLimit:0,
        jumpNum:null,//跳转页码
        currentPage:1,
        clearGroupId:true
      }
    },
    components:{
      SystemAddModel,
      SystemModelHave,
      SystemDemoTwo,
      SystemDemoThree,
      SystemDemoFour,
      SystemTableOne,
      SystemTableTwo,
      SystemTableThree,
      SystemPartment,
      SystemAddMember,
      SystemAddKeyword
    },
    computed:{
      staticUrl(){
        return this.$store.state.staticUrl
      },
      getMessageUrl(){
        return this.$store.state.getMessageUrl
      },
      currentAddModel(){
        return this.$store.state.currentAddModel
      },
      getKeyWordsUrl(){
        return this.$store.state.getKeyWordsUrl
      },
      getSystemOtherMsgNum(){
        return this.$store.state.getSystemOtherMsgNum
      },
      pageNum(){
        return Math.ceil(this.$store.state.getSystemOtherMsgNum/10)
      },

    },
    methods:{

      // 控制显示具体的系统管理内容
      activeFn(i){
        this.currentPage = 1;

        for(var z=0;z<this.navBarData.length;z++){
          this.navBarData[z].isActive = false;
        };
        this.setCurrentType = i;
        var that = this;
        this.navBarData[i].isActive = true;
        if(i==0){
          this.currentTable = this.tableComArr[0];
          this.bottomBarHide = false;
        }else if(i==1){
          this.getKeyWordListFn();
          this.currentTable = this.tableComArr[4];
          this.bottomBarHide = false
        }else if(i==2){
          this.currentTable = this.tableComArr[3];
          this.$store.commit('getDepartmentListMut')
          this.clearGroupId = false;
          this.bottomBarHide = false
        }else if(i==3){
          this.currentTable = this.tableComArr[2];
          var obj = {
            type:1,
            limit:'0,10'
          }
          this.$store.commit('getSystemListMut',obj);
          this.bottomBarHide = true;
        }else if(i==4){
          var obj = {
            type:2,
            limit:'0,10'
          }
          this.currentTable = this.tableComArr[1];
          this.$store.commit('getSystemListMut',obj)
          this.bottomBarHide = true;
        }else if(i==5){
          var obj = {
            type:3,
            limit:'0,10'
          }
          this.currentTable = this.tableComArr[1];
          this.$store.commit('getSystemListMut',obj)
          this.bottomBarHide = true;
        }
      },
      // 显示  包含用户模块
      haveUser(){
        this.current = 'SystemModelHave'
      },

      getKeyWordListFn(){
        var that = this;
        var keywordUrl = this.staticUrl + this.getKeyWordsUrl
        axios.get(keywordUrl).then(function(res){
          if(res.data.error==0){
            that.$store.commit('getKeyWordsMut',res.data.data)
          }else if(res.data.error==2){
            that.$layer.alert('登录失效，请重新登录！');
            that.$router.push('/')
          }
        })
      },

      // 关闭当前模态框
      currentShowFn(){
        this.current = '';
      },
      // 显示  显示权限模块
      showLimite(){
        this.current = 'SystemDemoTwo'
      },
      // 显示  操作权限
      showDone(){
        this.current = 'SystemDemoFour'
      },
      //显示添加
      showAdd(){
        this.current = 'SystemAddModel'
      },
      // 显示 栏目权限
      itemPowerFn(){
        this.current = 'SystemDemoThree'
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
      }
    }
  }
</script>
<style scoped>
body,html{
	width: 100%;
	height: 100%;
}
.opinion-work-cont{
	width: 100%;
	height: 100%;
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
.opinion-work-tab .opinion-work-name>p{
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
	height: auto;
	margin-bottom: 0.3rem;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar:first-of-type .little-tit{
  margin-top: 1.2rem;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar .little-tit{
	font-size: 0.9rem;
	color: #333;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar em{
	display: inline-block;
	width: 0.2rem;
	height: 0.2rem;
	border-radius: 0.1rem;
	background: #999999;
	vertical-align: middle;
	margin-left: 0.85rem;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar span{
	font-size: 0.8rem;
	color: #999999;
	line-height: 0.8rem;
	font-weight: 400;
}
.opinion-work-tab .opinion-work-name .opinion-work-tab-bar span:hover{
  cursor: pointer;
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
	display: flex;
}

.tooler-right{
	display: flex;
	padding-left: 1.05rem;
}
.tooler-right-item{
	margin-right: 2rem;
}
.tooler-right-item:hover{
	cursor: pointer;
}
.tooler-right-item span{
	font-size: 0.9rem;
	color: #999;
	line-height: 2.35rem;
	vertical-align: middle;
}
.tooler-right-item:hover span{
	color: #FF7C1C;
}
.tooler-right-item em{
	display: inline-block;
	width: 0.8rem;
	height: 0.8rem;
	margin-right: 0.1rem;
	vertical-align: middle;
}
.add-user em{
	background: url('./../assets/img/icon_add_user.png');
	background-size: 100% 100%;
}


.have-user em{
	background: url('./../assets/img/icon_have_user.png');
	background-size: 100% 100%;
}

.show-power em{
	background: url('./../assets/img/icon_show_power.png');
	background-size: 100% 100%;
}



.done-power em{
	background: url('./../assets/img/icon_limite_power.png');
	background-size: 100% 100%;
	width: 0.9rem;
	height: 0.85rem;
}

.item-power em{
	width: 0.75rem;
	height: 0.95rem;
	background: url('./../assets/img/icon_management.png');
	background-size:100% 100% ;
}
.done-power:hover em{
	background: url('./../assets/img/icon_done_power_hover.png');
	background-size: 100% 100%;
	width: 0.9rem;
	height: 0.85rem;
}
.item-power:hover em{
	width: 0.75rem;
	height: 0.95rem;
	background: url('./../assets/img/icon_limite_power_hover.png');
  background-size:100% 100% ;
}
.show-power:hover em{
	background: url('./../assets/img/icon_user_show_hover.png');
	background-size: 100% 100%;
}
.add-user:hover em{
	background: url('./../assets/img/icon_add_user_hover.png');
	background-size: 100% 100%;
}
.have-user:hover em{
	background: url('./../assets/img/icon_user_have_hover.png');
	background-size: 100% 100%;
}






.collect-attention{
	border-top: none;
	width: 51.85rem;
	box-sizing: border-box;
}

td,th{
	border:solid #EDEEF0;
	border-width:0px 1px 1px 0px;
	font-size: 0.9rem;
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
	width: 17.35rem;
	text-align: left;
	box-sizing: border-box;
	padding-left: 2.8rem;
}
.beizhu{
	width: 17.35rem;
	text-align: left;
	box-sizing: border-box;
	padding-left: 2.8rem;
}
.no-wrap{
	height: 2.35rem;
	padding-left: 1.05rem;
	text-align: left;
}

.click-me.active em{
	background: url('./../assets/img/icon_radio_checked.png');
	background-size: 100% 100%;
}
.click-me em{
	display: block;
	width: 0.65rem;
	height: 0.65rem;
	background: url('./../assets/img/icon_radio_uncheck.png');
	background-size: 100% 100%;
	margin: auto;
}
.no-wrap span{
	display: block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 20rem;
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
  margin-top:1rem;
	/* position: absolute;
	bottom: -0.13rem;
	left: 0; */
}
.col-att-bottom-bar .recod span{
	font-size: 0.9rem;
	color: #999;
	line-height: 2.9rem;
}
.col-att-bottom-bar .recod strong{
  font-size:0.9rem;
  color:#5ECA29;
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
	margin: 0 0.2rem;
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
	line-height: 1.5rem;
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
	/* background: url('./../assets/img/icon_no_msg.png'); */
	background-size: 100% 100%;
	margin-bottom: 1.75rem;
}
.no-msg-cont .none-rest{
	color: #CCCCCC;
	font-size: 0.9rem;
	text-align: center;
}



</style>
