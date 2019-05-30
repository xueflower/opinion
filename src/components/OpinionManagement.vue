<template>
  <div class="opinion-manage">
			<div class="opinion-cont">
				<div class="search-cont">
					<div class="artical-search">
            <div class="select-self differ">
              <strong @click='selectFn(0)'>{{selectedData[0]}}</strong>
              <em></em>
              <ul class="hid-list" :class="{'active':dataSele[0].show}" @mouseleave="hideFn(0)">
                <li v-for="item,index in dataSele[0].list" @click='selectedFn(item,index,0)'>{{item}}</li>
              </ul>
            </div>
						<input type="text" maxlength="16" placeholder="请输入关键字搜索" v-model="searchkeyword" @keyup.enter="articalNormalSearch"/>
						<span @click="articalNormalSearch"></span>
					</div>
				</div>
				<div class="artical-search-class">
					<ul class="artical-search-type">
						<li>
							<span class="type-title">类型</span>
							<label @click='allCheckFn()'>
								<input type="checkbox" name="" id="" :checked="allChecked"/>
								<span>全部</span>
							</label>
							<label v-for="item,index in checkData" @click="checkOne(index)">
								<input type="checkbox" name="" id="" value="" :checked="item.checked" />
								<span>{{item.type}}</span>
							</label>
							<strong @click='showHighSearchFn()' :class="{'active':highSearch}">高级搜索</strong>
						</li>
						<li>
							<em v-for="item,index in articalComp"  :class="{'active':item.isActive}" @click="chooseCurrentComp(index)">{{item.name}}</em>
						</li>
					</ul>
          <div class="high-search" v-show='highSearch'>
            <span>发布时间：</span>
						<div class="calendar-cont">
              <input type="text" placeholder="点击选择日期" id="test1" value="date1" v-model="date1">
			        <em></em>
				    </div>
            <span>至</span>
				    <div class="calendar-cont">
              <input type="text" placeholder="点击选择日期" id="test2" value="date2" v-model="date2">
				      <em></em>
				    </div>


					    <div class="high-search-select-cont">
					    	<span>文章性质：</span>
                <div class="select-self">
            			<span @click='selectFn(1)'>{{selectedData[1]}}</span>
            			<em></em>
            			<ul class="hid-list" :class="{'active':dataSele[1].show}" @mouseleave="hideFn(1)">
            				<li v-for="item,index in dataSele[1].list" @click='selectedFn(item,index,1)'>{{item}}</li>
            			</ul>
            		</div>
					    </div>
              <!-- 隐藏来源类型 -->
					    <div class="high-search-select-cont" style="display:none">
					    	<span>来源类型：</span>
                <div class="select-self">
            			<span @click='selectFn(2)'>{{selectedData[2]}}</span>
            			<em></em>
            			<ul class="hid-list" :class="{'active':dataSele[2].show}" @mouseleave="hideFn(2)">
            				<li v-for="item,index in dataSele[2].list" @click='selectedFn(item,index,2)'>{{item}}</li>
            			</ul>
            		</div>
					    </div>
					    <!-- <div class="high-search-select-cont">
					    	<span>范围：</span>
                <div class="select-self">
            			<span @click='selectFn(3)'>{{selectedData[3]}}</span>
            			<em></em>
            			<ul class="hid-list" :class="{'active':dataSele[3].show}">
            				<li v-for="item,index in dataSele[3].list" @click='selectedFn(item,index,3)'>{{item}}</li>
            			</ul>
            		</div>
					    </div> -->
					    <div class="high-search-select-cont">
					    	<span>关键词：</span>
                <div class="select-self">
            			<span @click='selectFn(3)'>{{selectedData[3]}}</span>
            			<em></em>
            			<ul class="hid-list" :class="{'active':dataSele[3].show}" @mouseleave="hideFn(3)">
            				<li v-for="item,index in dataSele[3].list" @click='selectedFn(item,index,3)'>{{item.keyword}}</li>
            			</ul>
            		</div>
					    </div>
					    <div class="high-search-btn-cont">
					    	<span class="bg-orange" @click="articalSearchFn">确定</span>
					    	<span class="bg-grey" @click="clearArticalRequire">清空</span>
					    </div>
					</div>
          <div class="artical-check" v-if='toolBarShow'>
            <div class="artical-check-left">
							<label @click="checkAllFn">
								<input type="checkbox" name="" id="" value="" :checked="articalAllcheck"/>
								<span>全选</span>
							</label>

							<span @click="toNagFn(2)">置为负面</span>
							<span @click="toNagFn(3)">置为其他</span>
							<span @click="toNagFn(1)">置为正面</span>
							<span @click="deleteFn">批量删除</span>
						</div>


            <!-- 遗留的问题明天解决 -->
						<div class="artical-check-right">
							<span>排序</span>
              <!-- <strong v-for="item,index in rankBut" :class="{'active':item.isShow}" @click="changeRank(index)">{{item.name}}</strong> -->
              <div class="select-self rank">
                <span @click='selectFn(4)'>{{selectedData[4]}}</span>
                <em></em>
                <ul class="hid-list" :class="{'active':dataSele[4].show}" @mouseleave="hideFn(4)">
                  <li v-for="item,index in dataSele[4].list" @click='selectedFn(item,index,4)'>{{item}}</li>
                </ul>
              </div>
              <div class="select-self rank">
                <span @click='selectFn(5)'>{{selectedData[5]}}</span>
                <em></em>
                <ul class="hid-list" :class="{'active':dataSele[5].show}" @mouseleave="hideFn(5)">
                  <li v-for="item,index in dataSele[5].list" @click='selectedFn(item,index,5)'>{{item}}</li>
                </ul>
              </div>
						</div>
					</div>
				</div>
			</div>
      <div>
        <component :is="current" :serchRequire="searchArticalData" @getDetailArtical="" @getSearchType="toContentFn"></component>
      </div>
    </div>
</template>

<script>
    import Artical from '@/components/opinion_management/Artical'
    import OutPut from '@/components/opinion_management/OutPut'
    import Total from '@/components/opinion_management/Total'
    import ArticalDetail from '@/components/ArticalDetail'
    import axios from 'axios'

    export default {
        name: "OpinionManagement.vue",
        data() {
          return {
            date1:'',  //时间组件1
            date2:'',  //时间组件2
            searchkeyword:'',//搜索框的内容
            current:'Artical',
            // selectedData:['按正文','全部','全部','全部','按发布时间','按采集时间'],
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
            highSearch:false,
            allChecked:false,
            articalComp:[{isActive:true,current:Artical,name:'文章'},{isActive:false,current:Total,name:'汇总'},{isActive:false,current:OutPut,name:'导出'}],
            toolBarShow:true,
            rankBut:[{
              name:'按发布时间↑',
              isShow:true
            },{
              name:'按采集时间↑',
              isShow:false
            }],
            layer:null,
            searchArticalData:{
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
          dataSele(){
            return this.$store.state.articalSearchLimitData;
          },
          reget(){
            return this.$store.state.reget;
          },
          // searchArticalData(){
          //   return this.$store.state.articalRequire;
          // },
          articalSelectedList(){
            return this.$store.state.articalSelectedList
          },
          staticUrl(){
            return this.$store.state.staticUrl
          },
          getKeyWordsUrl(){
            return this.$store.state.getKeyWordsUrl
          },
          selectedData(){
            return this.$store.state.selectedData
          },
          // checkData(){
          //   return this.$store.state.checkData
          // },
          deleteArticalUrl(){
            return this.$store.state.deleteArticalUrl
          },
          articalAllcheck(){
            return this.$store.state.articalAllcheck
          },
          setTypeSuccessType(){
            return this.$store.state.setTypeSuccessType
          },
          outOpinionMsgListUrl(){
            return this.$store.state.outOpinionMsgListUrl
          },
          articalHuizongUrl(){
            return this.$store.state.articalHuizongUrl
          },
          getArticalList(){
            return this.$store.state.articalList;
          },
        },
        watch:{
          setTypeSuccessType(newValue){
            this.$layer.close(this.layer)
            this.$store.commit('changeSetTypeMut')
            this.$layer.msg('设置成功！',{
              type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
              shade: true,//是否显示遮罩
              shadeClose: false,//点击遮罩是否关闭
              time:1
            });
          },
        },
        components:{
          Artical,
          OutPut,
          Total,
          ArticalDetail
        },
        mounted() {
          laydate.render({
            elem: "#test1", // 指定元素
            type: "datetime", // 组件的类型：year,month,time···
            done: value => { // 点击确认执行的回调函数，会把当前选择的时间传入进来
              // 把选择的时间赋值给先前定义好的变量，显示在页面
              this.date1 = value;
              this.searchArticalData.btime = value;
              localStorage.setItem('btime',value)
            },
            showBottom: true
          });
          laydate.render({
            elem: "#test2", // 指定元素
            type: "datetime", // 组件的类型：year,month,time···
            done: value => { // 点击确认执行的回调函数，会把当前选择的时间传入进来
              // 把选择的时间赋值给先前定义好的变量，显示在页面
              this.date2 = value;
              this.searchArticalData.etime = value;
              localStorage.setItem('etime',value)
            },
            showBottom: true
          });
          var keyWord = localStorage.getItem('indexSearch');

          if(keyWord){
            this.searchkeyword = keyWord;
          }else{
            this.searchkeyword = '';
          }
          var btime = localStorage.getItem('btime');
          if(btime){
            this.date1 = btime;
            this.searchArticalData.btime = btime;
          }else{
            // console.log(222222);
            this.date1 = '';
          }
          var clear = localStorage.getItem('clear');
//如果缓存clear存在，就清空搜索数据，不存在就不管
          if(clear){
            this.clear();
            this.$store.commit('getArticalFnMut',this.searchArticalData);
          }else{
            console.log('我还没有被清空');
          }
          var etime = localStorage.getItem('etime');
          if(etime){
            this.date2 = etime;
            this.searchArticalData.etime = etime;
          }else{
            this.date2 = '';
          }
          if(this.reget==true){
            console.log('页面刷新了！');
            this.$store.commit('getArticalFnMut',this.searchArticalData);
            this.$store.commit('noget');
          }
        },
        methods:{
          selectFn:function(i){
            for(var j=0;j<this.dataSele.lengthl;j++){
              this.dataSele[j].show = false;
            }
            this.dataSele[i].show = true;
          },

          // 设置搜索内容（转移到store）
          selectedFn:function(str,i,j){
            this.dataSele[j].show = false;
            if(j!=3){
              this.selectedData[j] = str;
            }
            if(j==0){
              if(i==0){
                this.searchArticalData.content1 = this.searchkeyword;
                this.searchArticalData.title = '';
                this.searchArticalData.author = '';
              }else if(i==1){
                this.searchArticalData.content1 = '';
                this.searchArticalData.title = this.searchkeyword;
                this.searchArticalData.author = '';
              }else if(i==2){
                this.searchArticalData.content1 = '';
                this.searchArticalData.title = '';
                this.searchArticalData.author = this.searchkeyword;
              }
            }
            if(j==1){
              // 设置文章性质
              // console.log(str=="正面");（添加其它明天）
              if(str=="正面"){
                this.searchArticalData.set_alarm = 1
                this.searchArticalData.set_neg = '';
                this.searchArticalData.set_other = '';
              }else if(str=="负面"){
                this.searchArticalData.set_neg = 1;
                this.searchArticalData.set_other = '';
                this.searchArticalData.set_alarm = '';
              }else if(str=='其它'){
                this.searchArticalData.set_other = 1;
                this.searchArticalData.set_alarm = '';
                this.searchArticalData.set_neg = '';
              }else{
                this.searchArticalData.set_neg = ''
              }
            }
            if(j==2){
              this.searchArticalData.source_name = str;
            }
            if(j==3){
              this.searchArticalData.keyword = str.keyword;
              this.selectedData[j] = str.keyword;
            }
            if(j==4){

              // 文章列表排序--发布时间-------------------------------------------------遗留文章排序
                if(i==0){
                  this.searchArticalData.sort = 'pubdate'
                }else{
                  this.searchArticalData.sort = 'pubdate desc'
                }
                this.selectedData[5] = '按采集时间';
                this.$store.commit('getArticalFnMut',this.searchArticalData)
            }
            if(j==5){
              // 文章列表排序--采集时间
                if(i==0){
                  this.searchArticalData.sort = 'incdate'
                }else{
                  this.searchArticalData.sort = 'incdate desc'
                }
                this.selectedData[4] = '按发布时间';
                this.$store.commit('getArticalFnMut',this.searchArticalData)
            }
          },
          //清空高级搜索
          clearArticalRequire(){
            this.searchArticalData.set_neg = '';
            this.searchArticalData.set_other = '';
            this.searchArticalData.set_alarm = '';
            this.searchArticalData.source_name = '';
            this.searchArticalData.keyword = '';
            this.searchArticalData.btime = '';
            this.searchArticalData.etime = '';
            this.date2 = '';
            this.date1 = '';
            this.$set(this.selectedData,1,'全部');
            this.$set(this.selectedData,2,'全部');
            this.$set(this.selectedData,3,'全部');
          },
          showFn(i){
            this.dataSele[i].show = true;
          },
          //下拉列表移除隐藏
          hideFn(i){
            this.dataSele[i].show = false;
          },
          // 高级搜索显示隐藏
          showHighSearchFn:function(){
            var that = this;
            var keywordUrl = this.staticUrl + this.getKeyWordsUrl;
            axios.get(keywordUrl).then(function(res){
              // console.log(res);
              if(res.data.error==0){
                that.$store.commit('getKeyWordsMut',res.data.data)
              }else if(res.data.error==2){
                that.$layer.alert('登录失效，请重新登录！');
                that.$router.push('/')
              }
            })
            if(this.highSearch == false){
              this.highSearch = true;
            }else{
              this.highSearch = false;
            }
          },

          // 全选
          allCheckFn:function(){
            if(this.allChecked == false){
              for(var i=0;i<this.checkData.length;i++){
                this.checkData[i].checked = true;
              }
              this.allChecked = true;
            }else if(this.allChecked == true) {
              for(var i=0;i<this.checkData.length;i++){
                this.checkData[i].checked = false;
              }
              this.allChecked = false;
            }
            var checkedArr = [];   //声明选择的文章类型的列表
            var z=0;
            for(var j=0;j<this.checkData.length;j++){
                if(this.checkData[j].checked == true){
                  checkedArr.push(this.checkData[j].type)
                  z+=1;
                }
            };
            this.searchArticalData.type = checkedArr;
            // this.$store.commit('getArticalFnMut',this.searchArticalData)
            this.getCurrentCompData();
          },

          //按正文、标题、内容 出bug后变成content1
          toContentFn(){
            this.$set(this.selectedData,0,'按正文');
          },
          // 文章类型选择
          checkOne:function(i){
              if(this.checkData[i].checked == false){
                this.checkData[i].checked = true
              }else {
                this.checkData[i].checked = false
              };
              var z = 0;
              var checkedArr = [];   //声明选择的文章类型的列表
              for(var j=0;j<this.checkData.length;j++){
                  if(this.checkData[j].checked == true){
                    checkedArr.push(this.checkData[j].type)
                    z+=1;
                  }
              };
              if(z==this.checkData.length){
                this.allChecked = true;
              }else{
                this.allChecked = false;
              }
              this.searchArticalData.type = checkedArr;
              this.getCurrentCompData();
              // this.$store.commit('getArticalFnMut',this.searchArticalData)
          },

          //当前模块的渲染与获取数据
          chooseCurrentComp:function(i){
            var that = this;
            if(i!=0){
              this.toolBarShow = false;
              this.highSearch = false;
            }else if(i==0){
              this.toolBarShow = true;
              this.articalSearchFn();
            };
            for(var z=0;z<this.articalComp.length;z++){
              this.articalComp[z].isActive = false;
            }
            this.articalComp[i].isActive = true;
            this.current = this.articalComp[i].current;
            var data = this.searchArticalData;
            if(i==1){
              this.getTotalMsgList(data);
            }
            if(i==2){
              //获取导出数据
              this.getOutMsgList(data);
            }
          },
          //获取汇总数据
          getTotalMsgList(data){
            var that = this;
            // data.content1 = '';
            if(data.content1 == null || data.content1 == undefined){
              data.content1 = ''
            }
            //获取汇总数据
            var listUrl = that.staticUrl + that.articalHuizongUrl+'?author='+data.author+'&btime='+data.btime+'&content1='+data.content1
            +'&etime='+data.etime+'&type='+data.type+'&fenlei='+data.fenlei
            +'&keyword='+data.keyword+'&limit='+data.limit+'&set_alarm='+data.set_alarm
            +'&paichong='+data.paichong+'&set_neg='+data.set_neg+'&set_other='+data.set_other
            +'&sort='+data.sort+'&source_name='+data.source_name+'&title='+data.title;
            axios.get(listUrl).then(res=>{
              if(res.data.error==0){
                that.$store.commit('getOpinionTotalOutListMut',res.data.data);
              }else if(res.data.error==2){
                that.$layer.alert('登录失效，请重新登录！');
                that.$router.push('/')
              }
            })
          },
          //获取导出数据
          getOutMsgList(data){
            var that = this;
            if(data.content1 == null || data.content1 == undefined){
              data.content1 = ''
            }
            var listUrlother = this.staticUrl + this.outOpinionMsgListUrl+'?author='+data.author+'&btime='+data.btime+'&content1='+data.content1
            +'&etime='+data.etime+'&type='+data.type+'&fenlei='+data.fenlei
            +'&keyword='+data.keyword+'&limit='+data.limit+'&set_alarm='+data.set_alarm
            +'&paichong='+data.paichong+'&set_neg='+data.set_neg+'&set_other='+data.set_other
            +'&sort='+data.sort+'&source_name='+data.source_name+'&title='+data.title;
            axios.get(listUrlother).then(function (res) {
              if(res.status==200){
                that.$store.commit('getOpinionTotalOutListMut1',res.data);
              }else if(res.data.error==2){
                that.$layer.alert('登录失效，请重新登录！');
                that.$router.push('/')
              }
            });
          },
// 排序传参问题
// -----------------------------------------------
          //获取当前模块的数据
          getCurrentCompData(){
            var data = this.searchArticalData;
            if(this.searchArticalData.etime!=''&&this.searchArticalData.btime==''){
              this.$layer.msg('请选择开始时间',{
                type:3,
                title:'请选择开始时间',
                time:1
              })
            }else{
              for(var i=0;i<this.articalComp.length;i++){
                if(this.articalComp[i].isActive==true){
                  if(i==0){  //获取文章数据
                    this.$store.commit('getArticalFnMut',data);
                  }else if(i==1){  //获取汇总数据
                    this.getTotalMsgList(data);
                  }else if(i==2){  //获取导出数据
                    this.getOutMsgList(data);
                  }
                }
              }
            }
          },
          // 文章搜索(普通搜索)
          articalNormalSearch(){
            this.searchArticalData.btime = '';
            this.searchArticalData.etime = '';
            // this.searchArticalData.etime = etime;
            var str = this.selectedData[0];
            this.searchArticalData.content1 = '';
            this.searchArticalData.title = '';
            this.searchArticalData.author = '';
            this.searchArticalData.set_other = '';
            this.searchArticalData.set_neg = '';
            this.searchArticalData.set_alarm = '';
            if(str=="按正文"){
              this.searchArticalData.content1 = this.searchkeyword;
            }
            if(str=="按标题"){
              this.searchArticalData.title = this.searchkeyword;
            }
            if(str=="按作者"){
              this.searchArticalData.author = this.searchkeyword;
            }
            this.searchArticalData.limit = [0,10]
            console.log('我执行了！');
            console.log(str);
            // this.$store.commit('getArticalFnMut',this.searchArticalData)
            this.getCurrentCompData();
            this.$store.commit('saveSearchRequire',this.searchArticalData)   //保存文章列表搜索条件

          },

          //文章搜索(高级搜索)
          articalSearchFn(){
            // console.log(this.searchArticalData);
            // this.$store.commit('getArticalFnMut',this.searchArticalData);
            this.getCurrentCompData();
          },



          // 操作文章-----------------------------------------------------
          checkAllFn(){      //全选文章
            if(this.articalAllcheck==false){
              var type = true;
            }else if(this.articalAllcheck==true){
              var type = false;
            }
            this.$store.commit('chooseAllArticalMut',type)
          },


          toNagFn(i){         //设置2负面 1正面 3其它
            // console.log(i);
            var obj = {
              id:this.articalSelectedList,
              type:i,
              setType:1,
              other:true
            };
            var This = this;
            if(this.articalSelectedList.length==0){
              this.$layer.alert('请选择需置负面文章',function(){
                This.$layer.closeAll();
              })
            }else{
              this.$store.commit('changeArticalTypeMut',obj)
              this.layer = this.$layer.msg('设置中！',{
                type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                title: '请稍等！',
                shade: true,//是否显示遮罩
                shadeClose: false,//点击遮罩是否关闭
                time:100
              });
            }
          },

          // 删除问题----------------------------------------------------------------------------------
          deleteFn(){         //批量删除
            var This = this;
            if(This.articalSelectedList.length==0){
              this.$layer.confirm('请选择需删除的文章',{
                title:'小提示！',
                btn:['确定']
              },function(){
                This.$layer.closeAll();
              })
            }else{
              this.$layer.confirm('确定删除？',{
                title:'小提示！',
                btn:['删除','取消']
              },function(){
                axios.get(This.staticUrl+This.deleteArticalUrl+'?id=['+This.articalSelectedList+']').then(function (res) {
                  if(res.data.error==0){
                    This.$store.commit('toArticalListMut')
                    This.$store.commit('getArticalFnMut',This.searchArticalData)
                    This.$layer.closeAll();
                    This.$layer.msg('删除成功',{
                      type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                      shade: true,//是否显示遮罩
                      shadeClose: false,//点击遮罩是否关闭
                      time:1
                    });
                  }else if(res.data.error==2){
                    This.$layer.alert('登录失效，请重新登录！');
                    This.$router.push('/')
                  }
                })
              },function(){
                This.$layer.closeAll();
              })
            }
          },
          clear(){
            console.log('我被清空了！');
            this.date1 = '';
            this.date2 = '';
            this.searchArticalData.content1 = '';
            this.searchArticalData.type = [];
            this.searchArticalData.keyword = '';
            this.searchArticalData.source_name = '';
            this.searchArticalData.etime = '';
            this.searchArticalData.btime = '';
            this.searchArticalData.author = '';
            this.searchArticalData.title = '';
            this.searchArticalData.sort = '';
            this.searchArticalData.limit = [0,10];
            this.searchArticalData.set_neg = '';
            this.searchArticalData.set_other = '';
            this.searchArticalData.set_alarm = '';
            this.$set(this.selectedData,1,'全部');
            this.$set(this.selectedData,2,'全部');
            this.$set(this.selectedData,3,'全部');
            localStorage.removeItem('clear')
          },
        },
        beforedestory(){

        }
    }
</script>

<style scoped>
.opinion-manage{
width: 100%;
background: #edeef0;
padding-top: 3rem;
padding-bottom: 4rem;
min-height: 34.6rem;
}
.opinion-cont{
width: 75.95rem;
margin: auto;
}
.opinion-cont .search-cont{
width: 75.95rem;
height: 4.15rem;
background: #fff;
display: flex;
align-items: center;
}
.opinion-cont .artical-search{
width: 22.65rem;
height: 2.1rem;
display: flex;
align-content: center;
position: relative;
margin-left:1rem;
}
.opinion-cont .artical-search select{
background: #FF7C1C;
height: 2.1rem;
color: #fff;
margin-left: 0.95rem;
font-size: 0.9rem;
line-height: 2.1rem;
border:1px solid #FF7C1C;
}
.opinion-cont .artical-search input{
outline: none;
box-shadow: none;
border: 1px solid #FF7C1C;
border-left: none;
width: 17.7rem;
height: 2rem;
padding-left: 1rem;
font-size: 0.9rem;
color: #999;
}
.opinion-cont .artical-search span{
width: 1.1rem;
height: 1.15rem;
background: url('./../assets/img/icon_artical_search.png');
background-size: 100% 100%;
display: block;
position: absolute;
right: 0.75rem;
top: 50%;
margin-top: -0.575rem;
}
.opinion-cont .artical-search span:hover{
cursor: pointer;
}
.artical-search-class{
width: 100%;
background: #fff;
margin-top: 0.45rem;
box-sizing: border-box;
padding: 0 1rem;
}
.artical-search-type li{
width: 73.9rem;
height: 2.65rem;
border-bottom: 1px solid #DCDCDC;
}
.artical-search-type li .type-title{
font-size: 0.7rem;
color: #333;
margin-right: 3rem;
line-height: 2.65rem;
}
.artical-search-type li label{
margin-right: 1.6rem;
}
.artical-search-type li label input{
width: 0.7rem;
height: 0.7rem;
vertical-align: middle;
}
.artical-search-type li label span{
font-size: 0.7rem;
color: #999;
}
.artical-search-type li strong{
font-size: 0.7rem;
color: #39B2FF;
line-height: 2.65rem;
text-decoration: underline;
}
.artical-search-type li strong.active{
  color:#ccc;
}
.artical-search-type li strong:hover{
cursor: pointer;
}
.artical-search-type li em{
font-size: 0.9rem;
color: #999;
display: inline-block;
height: 2.65rem;
width: 2.05rem;
line-height: 2.65rem;
margin-right: 2.25rem;
text-align: center;
}
.artical-search-type li em:hover{
cursor: pointer;
}
.artical-search-type li em.active{
color: #333;
font-weight: 400;
position: relative;
}
.artical-search-type li em.active:after{
position: absolute;
content: '';
width: 2.05rem;
height: 0.15rem;
background: #FF7C1C;
bottom: 0;
left: 0;
}
.artical-check{
	height: 2.75rem;
  display: flex;
	justify-content: space-between;
}
.artical-check .artical-check-left label input{
	width: 0.7rem;
	height: 0.7rem;
	margin-right: 0.5rem;
  vertical-align: middle;
}
.artical-check .artical-check-left label span{
	font-size: 0.7rem;
	color: #999;
	line-height: 2.75rem;
	vertical-align: middle;
	margin-right: 1.6rem;
}
.artical-check .artical-check-left>span{
	font-size: 0.7rem;
	color: #999;
	margin-right: 1.8rem;
	line-height: 2.75rem;
}
.artical-check .artical-check-left>span:hover{
  color:#FF7C1C;
  cursor: pointer;
}
.high-search{
	display: flex;
	height: 3rem;
	background: #EDEEF0;
	padding-left: 1rem;
}
.calendar-cont{
  height: 1.7rem;
  position:relative;
  margin-right: 0.35rem;
  display: flex;
  align-items: center;
  height: 100%;
  width:11.5rem;
}
.calendar-cont:last-of-type{
	margin-right: 0.7rem;
}
.high-search>span{
  /* ; */
	font-size: 0.7rem;
	color: #666;
	margin-right: 0.35rem;
  line-height: 3rem;
  white-space: nowrap;
}
/* .calendar-cont:first-of-type span{
  white-space: nowrap;
} */
.calendar-cont input{
  outline: none;
  box-shadow: none;
  border:none;
  width:100%;
  height: 1.7rem;
  box-sizing: border-box;
  padding:0.55rem;
  font-size:0.7rem;
}
.calendar-cont em{
  display:inline-block;
  width:0.8rem;
  height:0.75rem;
  background-image: url('./../assets/img/icon_calendar.png');
  position:absolute;
  top:50%;
  margin-top:-0.375rem;
  right:1.2rem;
  background-size: 100% 100%;
}
.high-search-select-cont{
	margin-right: 0.6rem;
	height: 100%;
	display: flex;
	align-items: center;
}
.high-search-select-cont select{
	height: 1.7rem;
	width: 5.5rem;
	box-sizing: border-box;
	padding: 0 0.5rem;
	font-size: 0.7rem;
	color: #ccc;
}
.high-search-select-cont select option{
	font-size: 0.7rem;
}
.high-search-select-cont span{
	font-size: 0.7rem;
	color: #666;
	margin-right: 0.45rem;
  white-space: nowrap;
}
.high-search-btn-cont{
	margin-left: 0.85rem;
	height: 100%;
	display: flex;
	align-items: center;
}
.high-search-btn-cont span{
	display: inline-block;
	font-size: 0.8rem;
	color: #fff;
	text-align: center;
	width: 3.9rem;
	height: 1.7rem;
	border-radius: 0.1rem;
	line-height: 1.7rem;
}
.high-search-btn-cont span:hover{
  cursor: pointer;
}
.bg-orange{
	background: #FF7C1C;
	margin-right: 0.5rem;
}
.bg-grey{
	background: #ccc;
}
.artical-check-right{
	display: flex;
	align-items: center;
}
.artical-check-right span{
	display: inline-block;
	margin-right: 1.45rem;
	font-size: 0.7rem;
	color: #333;
}
.artical-check-right strong{
	display: inline-block;
	font-size: 0.7rem;
	width: 4.95rem;
	height: 1.3rem;
	line-height: 1.3rem;
	text-align: center;
	font-weight: 400;
	border-radius: 0.1rem;
	border:1px solid #999999;
	color: #999999;
}
.artical-check-right strong:hover{
  cursor:pointer;
}
.artical-check-right strong:first-of-type{
	margin-right: 0.5rem;
}
.artical-check-right strong.active{
	border:1px solid #FF7C1C;
	color: #FF7C1C;
}


.select-self{
	width: 5.5rem;
	height:1.7rem;
	border:1px solid #DBDBDB;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0 0.5rem;
	position: relative;
  background:#fff;
}
.select-self:hover{
  cursor:pointer;
}
.select-self.rank{
  width:7.5rem;
}
.select-self.rank:last-of-type{
  margin-left:1rem;
}
.select-self>span{
	font-size: 0.7rem;
	color: #666;
	line-height: 1.7rem;
	vertical-align: middle;
  display:block;
  width:100%;
  height: 100%
}
.select-self.differ{
  width:4.9rem;
  height: 2.1rem;
  background:#FF7C1C;
  border:1px solid #FF7C1C;
}
.select-self.differ:hover{
  cursor:pointer;
}
.select-self.differ>strong{
  font-size: 0.9rem;
	color: #FFF;
	line-height: 2.1rem;
  font-weight: 400;
	vertical-align: middle;
  display:block;
  width:100%;
  height: 100%
}
.select-self.differ>em{
	display: inline-block;
	width: 0.75rem;
	height: 0.5rem;
	background:url('./../assets/img/iocn_search_sanjiao.png');
	background-size: 100% 100%;
  position:absolute;
  right:0.5rem;
  top:50%;
  margin-top:-0.25rem;
}
.select-self>em{
	display: inline-block;
	width: 0.4rem;
	height: 0.7rem;
	background:url('./../assets/img/icon_artical_select.png');
	background-size: 100% 100%;
  position:absolute;
  right:0.5rem;
  top:50%;
  margin-top:-0.35rem;
}
.select-self .hid-list{
	width: 100%;
	position: absolute;
	top:1.65rem;
	left: -1px;
	border: 1px solid #DBDBDB ;
  max-height: 9.3rem;
  overflow: auto;
  box-shadow:0px 0px 0.25rem 0px rgba(15,21,33,0.17);
  display:none;
  z-index:99;
}
.select-self .hid-list.active{
  display:block;
}
.select-self.differ .hid-list{
  top:2.1rem;
}
.select-self .hid-list li{
	width: 100%;
	border-bottom: 1px solid #DBDBDB;
	height: 1.35rem;
	color: #666;
	line-height: 1.35rem;
	font-size: 0.7rem;
	box-sizing: border-box;
	padding-left: 0.5rem;
  background:#fff;
}
.select-self .hid-list li:hover{
  cursor:pointer;
}
.select-self .hid-list li:last-of-type{
	border-bottom: none;
}
.select-self .hid-list li:hover{
	background: #FF7C1C;
	color: #fff;
}
</style>
