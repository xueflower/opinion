import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default () => {
    return new Vuex.Store({
        state: {
          loginMsg:null,
          staticUrl:'http://192.168.7.6/wr/branches/dev/frontend/web/index.php/',// 接口路径前缀0
          // staticUrl:'http://192.168.7.27/wr/branches/dev/frontend/web/index.php/',// 接口路径前缀
          humanMsgUrl:'content/ren',        //人物舆情地址
          articalListUrl:'content/list',    //文章列表地址
          todayStateUrl:'state/today',      //今日分析地址
          recentTotalUrl:'state/day',       //近期汇总
          //文章
          articalDetailUrl:'content/get',   //文章详情
          already:'content/setread',        //设置已读
          collectUrl:'content/setsoucang',  //设置文章收藏
          attentionUrl:'content/setguanzhu',//设置文章关注
          addArticalUrl:'content/create',   //添加文章
          editArticalUrl:'content/update',  //修改文章
          deleteArticalUrl:'content/delete',//文章删除
          colListUrl:'content/soucang',     //收藏列表
          attListUrl:'content/guanzhu',     //关注列表
          indexItemMsgUrl:'config/get',        //首页模块信息  type=0
          editIndexItemUrl:'config/update',    //修改模块信息  type=1&data=["GFGF":21] type=0为添加模块
          deleteItemUrl:'config/del',          //删除模块 id
          setArticalTypeUrl:'content/setpro',    //设置文章属性
          outCollectUrl:'content/outsoucang',    //导出收藏 id=[]
          outAttentionUrl:'content/outguanzhu',  //导出关注 id=[]
          outArticaUrl:'content/out',            //导出文章 id=[]
          outOpinionMsgListUrl:'out/list',       //舆情信息导出列表
          articalHuizongUrl:'state/huizong',     //文章汇总
          // 关键词
          systemGetMsgUrl:'config/getmessage', //获取系统信息  type=操作
          getKeyWordsUrl:'config/getguan',     //获取关键词
          // editKeyWordUrl:'config/updateguan',  //修改关键词  id=1&keyword
          // deletekeyWordUrl:'config/delguan',  //删除关键词   id=1 删除
          //系统管理部门
          systempartmentListUrl:'party/get',   //部门列表 id=0,全部
          systempatmentDelUrl:'party/del',    //删除部门、小组、成员 id
          systemDepartUrl:'party/update',     //部门管理修改添加   id=0（增加部门）&departname=大三11& up_id=1(最上层为0)
          systemDepartManageUrl:'party/get',  //id=1 部门管理获取id=0是全部
          systemDepartSearchUrl:'party/search',//部门搜索   search=‘’
          //系统管理用户
          addUserUrl:'user/add',                //新增用户username=111&password=111&depart_id=1
          userListUrl:'user/list',              //获取用户列表depart_id(小组id)
          delUser:'user/del',                   //删除用户 id       //user/del
          updataUser:'user/update',             //修改用户信息
          getSysMsgListUrl:'config/getmessage', //type=1,2,3    登录，操作，用户
          userEditUrl:'user/update',//修改用户信息
          searchUserUrl:'user/search',//搜索用户  ?username ,displayname  state
          searchPartmentUrl:'party/search',//搜索部门 ?departname
          //添加关键词
          addKeyWordUrl:'config/updateguan',  //id=0,添加
          //删除关键词
          delKeyWordUrl:'config/delguan',    //?id=2,删除
          //不知道的地址(最后询问)
          getMessageUrl:'config/getmessage',   //?type=操作    分操作/登录/用户
          //统计分析地址
          tongjifenxiUrl:'state/tongji',
          //图片上传
          uploadImgUrl:'content/upload',
          finalUrl:'',
          humanMsg:null,                      //人物舆情信息数据

          articalList:null,                   //文章列表数据
          articalListNum:null,                //文章列表总数
          timimgMsgData:null,                 //今日分析时时数据
          // 首页基本数据
          homeData:{
            isActive: [
              {title: "舆情概览",active: true,current: "IndexCont",indShow: false},
              {title: "舆情信息管理",active: false,current: "OpinionManagement",indShow: true},
              {title: "统计分析",active: false,current: "StatisticalAnalysis",indShow: true},
              {title: "系统管理",active: false,current: "SystemManagement",indShow: true}
             ],
             // current: "",
            current: "IndexCont",
            codeShow: false,
            indexSearch: false
          },
          //首页模块的文章列表
          IndexitemArticalList:null,
          //今日分析数据
          todayAnalData:null,
          // opinionCurrent:'Artical',//舆情信息管理首次加载模块
          //文章详情
          articalDetailData:null,
          articalComp:[
            {isActive:true,currentComp:'Artical',name:'文章'},
            {isActive:false,currentComp:'Total',name:'汇总'},
            {isActive:false,currentComp:'OutPut',name:'导出'}
          ],
          // 收藏关注页面初始加载模块（收藏||关注）
          collAttenShow:[{
            title:'舆情收藏',
            isActive:false
          },{
            title:'舆情关注',
            isActive:false
          }],
          //收藏关注页面列表
          colAttList:null,
          colAttListNum:null,//收藏关注列表数量
          //所有模块信息
          itemListMsgData:null,
          keywordlist:null,         //关键词列表
          articalSearchLimitData:[{ //文章列表页面下拉框渲染数据
            show:false,
            list:['按正文','按标题','按作者']
          },{
            show:false,
            list:['正面','负面','其它']
          },{
            show:false,
            list:['微博','APP','网站','论坛','贴吧','搜索引擎','电子报','平媒','广播','电视']
          },{
            show:false,
            list:[]
          },{
            show:false,
            list:['按发布时间↑','按发布时间↓']
          },{
            show:false,
            list:['按采集时间↑','按采集时间↓']
          }],
          articalRequire:{        //文章搜索data
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
          },
          selectedData:['按正文','全部','全部','全部','按发布时间','按采集时间'],
          checkData:[{
            checked:false,
            type:'网站'
          },{
            checked:false,
            type:'APP'
          },{
            checked:false,
            type:'电子报'
          },{
            checked:false,
            type:'平媒'
          },{
            checked:false,
            type:'贴吧'
          },{
            checked:false,
            type:'论坛'
          },{
            checked:false,
            type:'微博'
          },{
            checked:false,
            type:'广播'
          },{
            checked:false,
            type:'电视'
          }],
          articalSelectedList:[],
          articalAllcheck:false,//文章全选
          setTypeSuccessType:false,
          userList:null,//用户列表
          partmentList:[],//部门列表
          groupId:null,
          currentAddModel:'',//添加小组成员模态框的组件名
          // getSystemLoginList:null, //
          getSystemOtherMsgList:null, // 系统操作、文章操作日志、系统登录日志
          tongjifenxiData:null,//统计分析数据
          editMemberData:null,//成员修改数据
          OpinionTotalOutList:null,//舆情信息管理汇总导出数据
          OpinionTotalOutList1:null,
          opinionBasicData:{
            current:'Artical',
            toolBarShow:true,
            highSearch:false
          },
          articalSet:null,//文章设置
          editArticalId:null,
          getSystemOtherMsgNum:null,//系统日志总数
          currentDate:'',//当前日期
          getArticalListType:false,
          relogin:false,//重新登录的状态
          unfixedItems:[],
          reget:false,
          getCurrentColAttType:0,//当前获取收藏关注列表  0，收藏1，关注
        },
        mutations:{
          // changeOpinionCurrentMut(state){  //改变舆情信息管理页面加载模块
          //   state.opinionCurrent = 'Total'
          // },
          getCurrentColAttTypeMut(state,i){
            state.getCurrentColAttType = i;
          },
          reGetMut(state){
            state.reget = true;
          },
          noget(state){
            state.reget = false;
          },
          changeLoginType(state){
            state.relogin = false;
          },
          changeLoadingMut(state){
            state.getArticalListType = false;
          },
          outLoginType(state){
            state.getArticalListType = false;
          },

          // 获取今日分析内容
          getTodayMut(state){
            axios.get(state.staticUrl+state.todayStateUrl).then(function(response){
              if(response.data.error==0){
                state.todayAnalData = response.data.data;
              }
            });
          },

          //获取人物舆情内容
          getHumMut(state){
            axios.get(state.staticUrl+state.humanMsgUrl).then(function(responsed){
              if(responsed.data.error==0){
                state.humanMsg = responsed.data.data;
              }
            });
          },

          // 获取首页所有模块信息
          getAllItemMsgMut(state){
            axios.get(state.staticUrl+state.indexItemMsgUrl+'?type=0').then(function(responsed){
              if(responsed.data.error==0){
                var unFixedArr = [];
                for(var i=0;i<responsed.data.data.length;i++){
                  var newData = JSON.parse(responsed.data.data[i].data);
                  responsed.data.data[i].data = newData;
                  if(responsed.data.data[i].data.currentType!=0){
                    unFixedArr.push(responsed.data.data[i])
                  }
                }
                state.unfixedItems = unFixedArr;
                state.itemListMsgData = responsed.data.data;
              }else if(responsed.data.error==2){
                state.relogin = true;
                state.getArticalListType = true;
              }
            });
          },

          //获取近期汇总。。
          getTimingMsgMut(state){
            axios.get(state.staticUrl+state.recentTotalUrl).then(function (res) {
              if(res.data.error==0){
                for(var i=0;i<res.data.data.week.length;i++){
                  var weekDate1 =[];
                  weekDate1.push(res.data.data.week[i].pubdate.split('~')[0])
                  weekDate1.push(res.data.data.week[i].pubdate.split('~')[1])
                  res.data.data.week[i].pubdate = weekDate1;
                }

                var mydate = new Date();
                var weekday = mydate.getDay();

                // 设置今天是星期几
                for(var i=0;i<res.data.data.day.length;i++){
                  var detailWeek= (weekday-i)%7;
                  if(detailWeek<=0){
                    detailWeek+=7
                  }
                  switch(detailWeek){
                    case 7: detailWeek = '日';break;
                    case 6: detailWeek = '六';break;
                    case 5: detailWeek = '五';break;
                    case 4: detailWeek = '四';break;
                    case 3: detailWeek = '三';break;
                    case 2: detailWeek = '二';break;
                    case 1: detailWeek = '一';break;
                  }
                  // console.log(detailWeek);

                  res.data.data.day[i].weekDay = detailWeek;
                }
                state.timimgMsgData = res.data.data;
                // console.log(state.timimgMsgData);
              }
            })
          },

          //保存搜索条件
          saveSearchRequire(state,data){
            console.log(data);
          },

          changeHomeCompFn(state,i){
            for (var j = 0; j < state.homeData.isActive.length; j++) {
              state.homeData.isActive[j].active = false;
            }
            state.homeData.isActive[i].active = true;
            state.homeData.current = state.homeData.isActive[i].current;
            state.homeData.indexSearch = state.homeData.isActive[i].indShow
          },



          // 获取文章列表
          getArticalFnMut(state,data){
            // console.log(state.getArticalListType);
            // console.log(data);
            if(data.content1==null){
              data.content1 = '';
            }
            var newUrl = state.staticUrl + state.articalListUrl+'?author='+data.author+'&btime='+data.btime+'&content1='+data.content1
            +'&etime='+data.etime+'&type='+data.type+'&fenlei='+data.fenlei
            +'&keyword='+data.keyword+'&limit='+data.limit+'&set_alarm='+data.set_alarm
            +'&paichong='+data.paichong+'&set_neg='+data.set_neg+'&set_other='+data.set_other
            +'&sort='+data.sort+'&source_name='+data.source_name+'&title='+data.title;
            axios({
              method: 'get',
              url:newUrl,
              headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
              }
            }).then(function(res){
              if(res.data.error==0){
                state.homeData.indexSearch = true;
                state.homeData.isActive[0].active = false;
                state.homeData.isActive[1].active = true;
                state.homeData.current = 'OpinionManagement';
                for(var z=0;z<res.data.data.list.length;z++){
                  res.data.data.list[z].checked = false;
                }
                state.articalList = res.data.data.list;
                state.articalListNum = res.data.data.num;
                state.getArticalListType = true;
                state.articalRequire.set_neg = '';
              }else if(res.data.error==2){
                state.getArticalListType = true;
                state.relogin = true;
              }
            });
          },


          // 文章详情显示
          showArticalDetailFn(state,data){


            state.articalDetailData = data;
            for (var j = 0; j < state.homeData.isActive.length; j++) {
              state.homeData.isActive[j].active = false;
            }
            state.homeData.isActive[1].active = true;
            state.homeData.current = state.homeData.isActive[1].current;
            state.homeData.indexSearch = state.homeData.isActive[1].indShow
            // 文章已读
            var articalId = data.id;
            var alreadUrl = state.staticUrl + state.already;
            axios.get(alreadUrl+'?id='+articalId).then(function(res){
              if(res.data.error==0){
                // getArticalFnMut(state)
              }
            })
          },

          showColAttenMut(state,obj){        //加载收藏关注页面
            console.log(obj);

            for(var i=0;i<obj.list.list.length;i++){
              obj.list.list[i].checked = false;
            }

            state.collAttenShow[0].isActive=false;
            state.collAttenShow[1].isActive=false;
            state.collAttenShow[obj.cont].isActive=true;
            state.colAttList = obj.list.list;
            state.colAttListNum = obj.list.num;
            // state.homeData.current = 'OpinionWork';
          },

          openItemManageMut(state){       //显示栏目管理模块
            state.homeData.current = 'SystemDepartent'
          },


          // 删除文章后页面跳转
          toArticalListMut(state){
            state.homeData.current = 'OpinionManagement';
          },

          setCollectMut(state,data){        //文章收藏
            var newUrl = state.staticUrl + state.collectUrl
            var articalId = data.id;
            if(data.set==0){
              var articalType = 1;
            }else if(data.set==1){
              var articalType = 0;
            }
            axios.get(newUrl+'?id=['+articalId+']&set='+articalType).then(function(res){
              if(res.data.error==0){
                if(!data.other){
                  if(state.articalDetailData.is_soucang==0){
                    state.articalDetailData.is_soucang=1
                  }else{
                    state.articalDetailData.is_soucang=0
                  }
                }
              }else if (data.other) {
                for(var i=0;i<state.colAttList.length;i++){
                  for(var j=0;j<data.id.length;j++){
                    if(state.colAttList[i].id==data.id[j]){
                      state.colAttList.splice(i,1);
                    }
                  }
                }
              }
            })
          },

          setAttenMut(state,data){          //设置文章关注
            var newUrl = state.staticUrl + state.attentionUrl
            var articalId = data.id;
            if(data.set==0){
              var articalType = 1;
            }else if(data.set==1){
              var articalType = 0;
            }

// 删除传递数据再修改
            axios.get(newUrl+'?id=['+articalId+']&set='+articalType).then(function(res){
              if(res.data.error==0){
                if(!data.other){
                  if(state.articalDetailData.is_guanzhu==0){
                    state.articalDetailData.is_guanzhu=1
                  }else if(state.articalDetailData.is_guanzhu==1){
                    state.articalDetailData.is_guanzhu=0
                  }
                }else if (data.other) {
                  for(var i=0;i<state.colAttList.length;i++){
                    for(var j=0;j<data.id.length;j++){
                      if(state.colAttList[i].id==data.id[j]){
                        state.colAttList.splice(i,1);
                      }
                    }
                  }
                }
              }
            })
          },

          // 文章-------------------------------------------------------------------------------------------------------------



          // 设置修改文章的属性
          changeArticalTypeMut(state,obj){
            var This = this;
            axios.get(state.staticUrl+state.setArticalTypeUrl+'?id=['+obj.id+']&type='+obj.type+'&set='+obj.setType).then(function(res){
              if(res.data.error==0){
                state.setTypeSuccessType = true;
                if(!obj.other){
                  //重新获取文章详情
                  var newUrl = state.staticUrl + state.articalDetailUrl;
                  axios.get(newUrl+'?id='+state.articalDetailData.id).then(function(resp){
                    if(resp.data.error==0){
                      state.articalDetailData = resp.data.data;
                    }
                  })
                }
              }
            })
          },

          //获取编辑文章的id
          getEditArticalIdMut(state,i){
            state.editArticalId = i;
          },


          // 获取关键词
          getKeyWordsMut(state,data){
            var newList=[];
            for(var i=0;i<data.length;i++){
              newList.push(data[i].keyword)
            }
            state.articalSearchLimitData[3].list = data;
          },
          // 选择所有的文章-----------------------------------------------
          chooseAllArticalMut(state,type){
            var arr = [];
            for(var i=0;i<state.articalList.length;i++){
              state.articalList[i].checked = type;
              if(type==true){
                arr.push(state.articalList[i].id)
              }
            }
            state.articalAllcheck = type;
            state.articalSelectedList = arr;
          },

          changeArticalAllCheckTypeMut(state,type){
            state.articalAllcheck = type;
          },
          //选择的多条文章
          checkArticalItemsMut(state,arr){
            state.articalSelectedList = arr;
          },

          //设置文章属性成功
          changeSetTypeMut(state){
            state.setTypeSuccessType = false;
          },

          //添加文章
          //保存文章设置---------------------
          saveArticalSetMut(state,data){
            state.articalSet = data;
          },

          //获取舆情信息管理汇总导出页面数据
          getOpinionTotalOutListMut(state,data){

            state.OpinionTotalOutList = data;
          },

          getOpinionTotalOutListMut1(state,data){
            console.log(data);
            for(var i=0;i<data.length;i++){
              data[i].downUrl = '';
            }
            state.OpinionTotalOutList1 = data;
          },

          //获取统计分析数据
          getFenxiListMut(state,data){
            if(data.app){
              data.app.name='APP'
            }
            if(data.dianshi){
              data.dianshi.name = "电视"
            }
            if(data.dianzibao){
              data.dianzibao.name = "电子报"
            }
            if(data.feifu){
              data.feifu.name="非负面"
            }
            if(data.fu){
              data.fu.name="负面"
            }
            if(data.guangbo){
              data.guangbo.name="广播"
            }
            if(data.luntan){
              data.luntan.name = '论坛'
            }
            if(data.pingmei){
              data.pingmei.name = '平媒'
            }
            if(data.tieba){
              data.tieba.name= "贴吧"
            }
            if(data.wangzhan){
              data.wangzhan.name = "网站"
            }
            if(data.weibo){
              data.weibo.name = "微博"
            }
            state.tongjifenxiData = data
          },
          // 系统-----------------------------------------------------------
          // 角色管理
          getUserListMut(state,data){  //获取用户列表
            state.userList = data;
          },
          //获取部门列表
          //获取部门列表
          searchPartmenListMut(state,data){
            state.partmentList = data;
          },
          getDepartmentListMut(state){
            axios.get(state.staticUrl+state.systempartmentListUrl+"?id=0").then(function (res) {
              if(res.data.error==0){
                for(var i=0;i<res.data.data.length;i++){
                  res.data.data[i].isActive = false;
                  for(var j=0;j<res.data.data[i].zi.length;j++){
                    res.data.data[i].zi[j].isActive = false;
                  }
                }
                state.partmentList = res.data.data
              }
            })
          },
          //获取系统日志
          getSystemListMut(state,obj){
            state.getSystemOtherMsgList = null;
            state.getSystemOtherMsgNum = 0;
            var i = obj.type;
            if(i==1){
              var getUrl = state.staticUrl+state.getSysMsgListUrl+'?type=1'+'&limit=limit '+obj.limit;
            }else if(i==2){
              var getUrl = state.staticUrl+state.getSysMsgListUrl+'?type=2'+'&limit=limit '+obj.limit;
            }else if(i==3){
              var getUrl = state.staticUrl+state.getSysMsgListUrl+'?type=3'+'&limit=limit '+obj.limit;
            }
            axios.get(getUrl).then(function (res) {
              if(res.data.error==0){
                state.getSystemOtherMsgList = res.data.data.list;
                state.getSystemOtherMsgNum = res.data.data.num;
              }
            })
          },
          //控制系统管理页面显示添加成员的弹出框的弹出
          currentAddModelMut(state,str){
            state.currentAddModel = str;
          },

          //获取添加小组成员时小组id
          addMemberMut(state,id){
            console.log(id);
            state.groupId = id;
          },

          //获取成员修改数据
          editMemberMut(state,data){
            state.editMemberData = data
            console.log(state.editMemberData);
          },
          //退出清除数据
          clear(state){
            state.humanMsg = null;
          }
        },
        actions:{

        },
        modules:{}
    })
}
