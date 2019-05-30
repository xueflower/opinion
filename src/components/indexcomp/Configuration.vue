<template>
  <div class="configuration">
    <div class="configuration-cont">
      <span class="close" @click="returnBack"></span>
      <p class="configuration-title">配置菜单</p>
      <div class="hide-cont">
        <div class="situation-cont">
          <div class="set-bar">
            <div v-for="item,index in itemShow" class="set-item" :class="{'active':item.isShow}" @click='addItem(index)'>
              <img src="./../../assets/img/icon_add.png"/>
              <span>{{item.name}}</span>
            </div>

          </div>
          <div class="set-cont">
            <div class="search-require">
              <span>查</span>
              <span>询</span>
              <span>条</span>
              <span>件</span>
            </div>
            <div class="set-cont-box">
              <ul>
                <li class="set-cont-box-item" v-if="itemShow[0].isShow">
                  <div class="set-cont-box-title">
                    <p>文章性质</p>
                  </div>
                  <div class="set-cont-box-detail">
                    <div class="detail-box" v-for="item,index in itemShow[0].list">
                      <label @click="chooseCurrentItem(0,item.title,index)">
                        <input type="checkbox" :checked="item.checked"/>
                        <span>{{item.title}}</span>
                      </label>
                    </div>
                  </div>
                </li>
                <li class="set-cont-box-item" v-if="itemShow[1].isShow">
                  <div class="set-cont-box-title">
                    <p>来源权威度</p>
                  </div>
                  <div class="set-cont-box-detail">
                    <div class="detail-box" v-for="item,index in itemShow[1].list">
                      <label @click="chooseCurrentItem(1,item.title,index)">
                        <input type="checkbox" :checked="item.checked"/>
                        <span>{{item.title}}</span>
                      </label>
                    </div>
                  </div>
                </li>
                <li class="set-cont-box-item" v-if="itemShow[2].isShow">
                  <div class="set-cont-box-title">
                    <p>来源分类</p>
                  </div>
                  <div class="set-cont-box-detail">
                    <div v-for="item,index in itemShow[2].list" class="detail-box">
                      <label @click="chooseCurrentItem(2,item.title,index)">
                        <input type="checkbox" :checked="item.checked"/>
                        <span>{{item.title}}</span>
                      </label>
                    </div>
                  </div>
                </li>
                <!-- <li class="set-cont-box-item" v-if="itemShow[3].isShow">
                  <div class="set-cont-box-title">
                    <p>来源类型</p>
                  </div>
                  <div class="set-cont-box-detail">
                    <div v-for="item,index in itemShow[3].list" class="detail-box">
                      <label @click="chooseCurrentItem(3,item.title,index)">
                        <input type="checkbox" :checked="item.checked"/>
                        <span>{{item.title}}</span>
                      </label>
                    </div>
                  </div>
                </li> -->
                <li class="set-cont-box-item special">
                  <div class="set-cont-box-title">
                    <p>标题匹配</p>
                  </div>
                  <div class="set-cont-box-detail">
                    <div class="special-box">
                      <p>*代表与，+代表或，-代表排除。当需要*、+、-代表原义出现时，分别用@*@、@+@、@-@代替</p>
                      <textarea name="" rows="" cols="" placeholder="请在本文框内描述" v-model="setting.title"></textarea>
                    </div>
                  </div>
                </li>
                <li class="set-cont-box-item special">
                  <div class="set-cont-box-title">
                    <p>全文匹配</p>
                  </div>
                  <div class="set-cont-box-detail">
                    <div class="special-box">
                      <p>*代表与，+代表或，-代表排除。当需要*、+、-代表原义出现时，分别用@*@、@+@、@-@代替</p>
                      <textarea name="" rows="" cols="" placeholder="请在本文框内描述" v-model="setting.content1"></textarea>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="data-cont">
            <div class="data-cont-title">
              <span>参</span>
              <span>数</span>
            </div>
            <div class="data-check">
              <label @click="usePaichong">
                <input type="checkbox" :checked="paiChongDefaukt"/>
                <span>启用排重</span>
              </label>
            </div>
          </div>
          <div class="range">
            <div class="range-title">
              <span>排</span>
              <span>序</span>
            </div>
            <div class="range-cont">
              <div class="range-box" v-for="item,index in selectList">
                <span>{{item.title}}：</span>
                <div class="select-self">
            			<span @click="showSelectFn(index)">{{selectList[index].current}}</span>
            			<em></em>
            			<ul class="hid-list" v-if="item.isShow" @mouseleave="hiddenUlFn(index)">
            				<li v-for="it,ind in item.list" @click="chooseItemFn(it,index,ind)">{{it}}</li>
            			</ul>
            		</div>
              </div>
              <div class="range-default">
                <label @click="changeDefault">
                  <input type="checkbox" :checked="checkedDefault"/>
                  <span>默认排序</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="but-cont">
          <span class="bg-orange" @click="saveSetting">保存</span>
          <span class="bg-grey" @click="returnBack">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    name:'Configuration.vue',
    data () {
      return{
        layer:null,
        itemShow:[
          {name:'文章性质',isShow:false,list:[{
            title:'正面',
            checked:false
          },{
            title:'负面',
            checked:false
          },{
            title:'其他',
            checked:false
          }]},
          {name:'来源权威度',isShow:false,list:[{
            title:'一级',
            checked:false
          },{
            title:'二级',
            checked:false
          },{
            title:'三级',
            checked:false
          }]},
          {name:'来源分类',isShow:false,list:[
            {
              title:'中央媒体',
              checked:false
            },{
              title:'地方媒体',
              checked:false
            },{
              title:'自媒体',
              checked:false
            },{
              title:'门户网站',
              checked:false
            },{
              title:'行业媒体',
              checked:false
            }
          ]}
          // {name:'来源类型',isShow:false,list:[{
          //   title:'全部',
          //   checked:false
          // },{
          //   title:'网站',
          //   checked:false
          // },{
          //   title:'APP',
          //   checked:false
          // },{
          //   title:'电子报',
          //   checked:false
          // },{
          //   title:'平媒',
          //   checked:false
          // },{
          //   title:'贴吧',
          //   checked:false
          // },{
          //   title:'论坛',
          //   checked:false
          // },{
          //   title:'微博',
          //   checked:false
          // },{
          //   title:'广播',
          //   checked:false
          // },{
          //   title:'电视',
          //   checked:false
          // },{
          //   title:'其它',
          //   checked:false
          // }]}
        ],
        selectList:[
          {
            title:'发布',
            isShow:false,
            current:'按发布时间',
            list:['按发布时间升序↑','按发布时间降序↓']
          },
          {
            title:'权威度',
            isShow:false,
            current:'按权威度',
            list:['按权威度升序↑','按权威度降序↓']
          },
          {
            title:'采集',
            isShow:false,
            current:'按采集时间',
            list:['按采集时间升序↑','按入库采集降序↓']
          }
        ],
        setting:{
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
        checkedDefault:true,
        paiChongDefaukt:true
      }
    },
    props:{
      currentId:{
        type:String,
        required:true
      },
      baseData:{
        type:Object,
        required:true
      }
    },
    computed:{
      currentUrl(){
        return this.$store.state.staticUrl+this.$store.state.editIndexItemUrl
      }
    },
    mounted(){
      console.log(this.baseData);
      if(this.baseData.set_alarm==1){
        this.itemShow[0].list[0].checked=true;
      }
      if(this.baseData.set_neg==1){
        this.itemShow[0].list[1].checked=true;
      }
      if(this.baseData.set_other==1){
        this.itemShow[0].list[2].checked=true;
      }
      if(this.baseData.authority==1){
        this.itemShow[1].list[0].checked=true;
      }
      if(this.baseData.authority==2){
        this.itemShow[1].list[1].checked=true;
      }
      if(this.baseData.authority==3){
        this.itemShow[1].list[2].checked=true;
      }
      // if(this.baseData.fenlei!=''){
      for(var i=0;i<this.itemShow[2].list.length;i++){
        if(this.baseData.fenlei==this.itemShow[2].list[i].title){
          this.itemShow[2].list[i].checked=true;
        }
      }
      // }
      this.setting = this.baseData;
      this.setting = this.baseData;
    },
    methods:{
      addItem:function(i){
        if(this.itemShow[i].isShow == false){
          this.itemShow[i].isShow = true
        }else{
          this.itemShow[i].isShow = false
        }
      },
      showSelectFn:function(i){
        this.selectList[i].isShow = true;
      },
      chooseItemFn:function(str,j,z){//z为当前选择数据的下标;
        // console.log(str,j,z)
        this.checkedDefault = false;
        this.selectList[j].current = str;
        this.selectList[j].isShow = false;
        if(j==0){
          if(z==0){
            this.setting.sort = "pubdate"
          }
          if(z==1){
            this.setting.sort = "pubdate desc"
          }
        };
        if(j==1){
          if(z==0){
            this.setting.sort = "authority"
          }
          if(z==1){
            this.setting.sort = "authority desc"
          }
        };
        if(j==2){
          if(z==0){
            this.setting.sort = "incdate"
          }
          if(z==1){
            this.setting.sort = "incdate desc"
          }
        }
      },
      hiddenUlFn(i){
        this.selectList[i].isShow = false;
      },
      //关闭当前模块
      returnBack(){
        this.$emit('closeComp')
      },
      //选择文章性质、权威度、分类、类型                (、标题、全文)
      chooseCurrentItem(i,str,j){  //i 1——性质、2——权威度、3——分类、4类型   str——选中的数据  j——点击元素的下标
        var type = this.itemShow[i].list[j].checked;
        for(var z=0;z<this.itemShow[i].list.length;z++){
          this.itemShow[i].list[z].checked = false;
        }
        if(type == true){
          this.itemShow[i].list[j].checked = false;
        }else{
          this.itemShow[i].list[j].checked = true;
        };
        console.log(this.setting);
      },
      //启用排重
      usePaichong(){
        if(this.paiChongDefaukt==true){
          this.paiChongDefaukt=false
        }else if(this.paiChongDefaukt==false){
          this.paiChongDefaukt=true
        }
      },
      //改变默认排序
      changeDefault(){
        if(this.checkedDefault==true){
          this.checkedDefault = false;
        }else if(this.checkedDefault==false){
          this.checkedDefault = true;
        }
      },
      //保存当前设置
      saveSetting(){
        var that = this;
        this.setting.set_alarm = '';
        this.setting.set_neg = '';
        this.setting.set_other = '';
        this.setting.authority = '';
        this.setting.fenlei = '';
        for(var i=0;i<this.itemShow.length;i++){
          for(var j=0;j<this.itemShow[i].list.length;j++){
            if(this.itemShow[i].list[j].checked==true){
              console.log(i,j);
              if(i==0){
                if(j==0){
                  this.setting.set_alarm = 1
                }else if(j==1){
                  this.setting.set_neg = 1
                }else if(j==2){
                  this.setting.set_other = 1
                }
              }
              if(i==1){
                if(j==0){
                  this.setting.authority = 1
                }else if(j==1){
                  this.setting.authority = 2
                }else if(j==2){
                  this.setting.authority = 3
                }
              }
              if(i==2){
                this.setting.fenlei = this.itemShow[2].list[j].title
              }
            }
          }
        }
        var newData = JSON.stringify(this.setting);
        console.log(this.setting);
        axios.get(this.currentUrl+'?id='+this.currentId+'&set='+newData).then(res=>{
          if(res.data.error==0){
            that.layer = that.$layer.msg('设置成功！',{
              type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
              title: '成功！',
              shade: true,//是否显示遮罩
              shadeClose: false,//点击遮罩是否关闭
              time:1
            });
            that.returnBack();
            that.$emit('refreashList',this.setting);
            that.$store.commit('getAllItemMsgMut');
          }
        })
      }
    }
  }
</script>

<style scoped>
.configuration{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.62);
	position: fixed;
	top: 0;
	left: 0;
  z-index:999;
}
.configuration-cont{
	width: 68.35rem;
	height: 33.25rem;
	background: #fff;
	border-radius: 0.25rem;
	position: relative;
	margin: auto;
	top: 50%;
	margin-top: -16.625rem;
	box-sizing: border-box;
	padding:0 0.95rem;
}
.configuration-cont .close{
	display: block;
	width: 1.2rem;
	height: 1.15rem;
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: url('./../../assets/img/wrong.png');
	background-size: 100% 100%;
}
.configuration-cont .close:hover{
	background: url('./../../assets/img/hover_wrong.png');
	background-size: 100% 100%;
}
.configuration-cont .configuration-title{
	color: #333;
	font-size: 1.1rem;
	font-weight: 600;
	text-align: center;
	height: 3rem;
	line-height: 3rem;
	border-bottom: 1px solid #E5E5E5;
  /* position:relative; */
}
.situation-cont{
	border:1px solid #E5E5E5;
}
.set-bar{
	width: 65.5rem;
	height: 2.7rem;
	border-bottom:1px solid #E5E5E5;
	display: flex;
	align-items: center;
}
.set-item{
	width: 4.95rem;
	height: 1.3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #5ECA29;
	margin-right: 1rem;
}
.set-item:hover{
  cursor: pointer;
}
.set-item.active{
  background:#ccc;
}
.set-item:first-of-type{
	margin-left: 4.95rem;
}
.set-item img{
	width: 0.5rem;
	height: 0.5rem;
}
.set-item span{
	font-size:0.7rem ;
	color: #fff;
}
.set-cont{
	border-bottom: 1px solid #d2d2d2;
	display: flex;
	height: 100%;
}
.search-require{
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 4.45rem;
	align-items: center;
	height: auto;
}
.search-require span{
	font-size: 1rem;
	color: #333;
}
.set-cont-box {
	display: block;
	align-content: center;
}
.set-cont-box .set-cont-box-item{
	display: flex;
	border-bottom: 1px solid #d2d2d2;
	width: 61.75rem;
}
.set-cont-box .set-cont-box-item:last-of-type{
  border-bottom:none;
}
.set-cont-box .set-cont-box-item .set-cont-box-title{
	width: 4.2rem;
	background: #FF7C1C;
	text-align: center;
	height: 2.7rem;
}
.set-cont-box .set-cont-box-item.special .set-cont-box-title{
	height: 6.58rem;
}
.set-cont-box .set-cont-box-item .set-cont-box-title p{
	font-size: 0.8rem;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2.7rem;
	width: 80%;
	margin: auto;
}
.set-cont-box .set-cont-box-item.special .set-cont-box-title p{
	height: 6.55rem;
}
.set-cont-box .set-cont-box-item .set-cont-box-detail{
	/*height: 100%;*/
	display: flex;
	align-items: center;
}
.set-cont-box .set-cont-box-item .set-cont-box-detail .detail-box{
	margin-left: 1.5rem;
}
.set-cont-box .set-cont-box-item .set-cont-box-detail .detail-box span{
  font-size:0.8rem;
}
.set-cont-box .set-cont-box-item .set-cont-box-detail .detail-box:first-of-type{
	margin-left: 1rem;
}
.set-cont-box .set-cont-box-item.special .set-cont-box-detail .special-box{
	padding-left: 1rem;
}
.set-cont-box .set-cont-box-item.special .set-cont-box-detail .special-box p{
	font-size: 0.6rem;
	color: #999;
	margin: 0.95rem 0 1rem;
	height: 0.6rem;
	line-height: 0.6rem;
}
.set-cont-box .set-cont-box-item.special .set-cont-box-detail .special-box textarea{
	width: 55rem;
	height: 3.65rem;
	background: rgba(237,238,240,0.5);
	resize: none;
	padding: 0.4rem;
	box-sizing: border-box;
  border:1px solid #D2D2D2;
}
.data-cont{
	height: 3.4rem;
	border-bottom: 1px solid #D2D2D2;
	display: flex;
}
.data-cont .data-cont-title{
	width: 3.9rem;
	margin-right: 0.4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.data-cont .data-cont-title span{
	font-size: 1rem;
	color: #333;
	line-height: 1.7rem;
	height: 1.7rem;
}
.data-check{
	display: flex;
	align-items: center;
}
.data-check input{
  vertical-align: middle;
}
.data-check span{
	margin-left: 0.2rem;
	font-size: 0.7rem;
	color: #666;
}
.range{
	height: 3.45rem;
	display: flex;
}
.range .range-title{
	display: flex;
	width: 3.9rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction:column ;
	margin-right: 0.55rem;
}
.range .range-title span{
	color: #333;
	font-size: 1rem;
	height: 1.75rem;
	line-height: 1.75rem;
}
.range-cont{
	display: flex;
}
.range-box{
	display: flex;
	align-items: center;
	height: 100%;
	margin-right: 1.5rem;
}
.range-box span{
	font-size: 0.7rem;
	color: #666666;
}
.range-box select{
	width: 8.75rem;
	height: 1.7rem;
	line-height: 1.7rem;
	color: #666;
  font-size:0.7rem;
  border:1px solid #D2D2D2;
}
.range-box select option:hover{
	color: #fff;
	background: #FF7C1C;
}
.range-default{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.range-default input{
	margin-right: 0.3rem;
  vertical-align: middle;
}
.range-default span{
  font-size:0.7rem;
}
.but-cont{
	width: 100%;
	height: 2rem;
	margin-top: 2rem;
  margin-bottom:2rem;
	display: flex;
	justify-content: center;
}
.but-cont span{
	height: 2rem;
	width: 5.4rem;
	border-radius: 0.1rem;
	color: #fff;
	text-align: center;
	line-height: 2rem;
	font-size: 1rem;
}
.but-cont span:hover{
  cursor:pointer;
}
.bg-orange{
	background: #FF7C1C;
	margin-right: 1rem;
}
.bg-grey{
	background: #CCCCCC;
}
.hide-cont{
  height: 29.7rem;
  overflow: auto;
  margin-top:0.45rem;
}
/* 自己写的下拉框 */

.select-self{
	width: 8.75rem;
	height:1.7rem;
	border:1px solid #DBDBDB;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0 0.5rem;
	position: relative;
}
.select-self span{
	font-size: 0.7rem;
	color: #666;
	line-height: 1.7rem;
	vertical-align: middle;
  display:block;
  width:100%;
  height: 100%
}
.select-self em{
	display: inline-block;
	width: 0.4rem;
	height: 0.7rem;
	background:url('./../../assets/img/icon_artical_select.png');
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
  box-shadow:0px 0px 0.25rem 0px rgba(15,21,33,0.17);
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
.select-self .hid-list li:last-of-type{
	border-bottom: none;
}
.select-self .hid-list li:hover{
	background: #FF7C1C;
	color: #fff;
}

</style>
