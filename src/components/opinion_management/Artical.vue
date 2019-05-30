<template>
  <div class="manage-artical-cont">
			<ul class="manage-artical-cont-detail">
				<li v-for="item,index in getArticalList" class="manage-artical-cont-item" :class="{'active':item.is_read==1}">
					<div class="manage-artical-cont-item-title">
						<input type="checkbox" name="" :checked="item.checked" @click.stop="checkOneArtical(index)"/>
						<span>{{item.title}}</span>
						<span class="al-read" v-if="item.is_read==1">已阅</span>
					</div>
                    <div class="manage-artical-cont-item-title-sourse" @click='getArticalDetailFn(item.id)'>
                    	<!-- <p>发挥自身优势，提供丰富多样精神文化产品。举办“<span class="key-word">三峡文博</span>
                            大讲坛”10期；推出原创展览8个，引进展览8个，社会合作办展7个，输出展览5个；结合节日、临时展览举办“我们的节日”“人日修禊”“母城记忆”“美人扇中寻”等特
色教育活动；成立涉案文物鉴定中心，为司法机关、侦察机关提供鉴定意见；举行凤鸣春晓、山水清音——傅抱石画意琴韵清赏会、2017辞旧迎新音乐会等古琴雅集 6 场。
                        </p> -->
                      <p>{{item.content1}}</p>
                    	<div class="sorse-cont">
                    		<span>{{item.source_name}}</span>
	                    	<em class="fr"></em>
	                    	<span class="fr">{{item.pubdate}}</span>
                    	</div>
                    </div>
				</li>
			</ul>
      <div class="manage-artical-cont-detail-toal">
				<span>已为您找到相关结果约 </span>
				<strong>{{articalListNum}}</strong>
				<span>个，每页显示</span>
        <div class="select-self">
          <span @click='selectFn(0)'>{{data1}}</span>
          <em></em>
          <ul class="hid-list" :class="{'active':dataSele[0].show}" @mouseleave="hideUlFn(0)">
            <li v-for="item,index in dataSele[0].list" @click='selectedFn(item,index,0)'>{{item}}</li>
          </ul>
        </div>
				<span>条</span>
        <div class="select-self">
          <span @click='selectFn(1)'>{{data2}}</span>
          <em></em>
          <ul class="hid-list" :class="{'active':dataSele[1].show}" @mouseleave="hideUlFn(1)">
            <li v-for="item,index in dataSele[1].list" @click='selectedFn(item,index,1)'>{{item}}</li>
          </ul>
        </div>
        <span class="currentPage">当前为第<strong>{{pageNum}}</strong>页</span>
				<span>跳转至第</span>
				<input type="" name="" id="" value="" v-model="topage"/>
				<span>页</span>
				<em @click="getList">跳转</em>
			</div>
		</div>
</template>
<script type="text/javascript">
import axios from 'axios'
export default {
    name: "Artical",
    data(){
      return{
        checkedArticalList:[],     //已选择的文章
        dataSele:[{ //下拉框渲染数据
          show:false,
          list:[10,20,50,100]
        },{
          show:false,
          list:['信息不排重','信息排重']
        }],
        data1:10,
        data2:'信息不排重',
        topage:null,   //跳转到第几页
        pageNum:1,
        oldNum:null
        // baseNum:10
      }
    },
    props:{
      serchRequire:{
        type:Object,
        required:true
      }
    },
    computed:{
      getArticalList(){
        return this.$store.state.articalList;
      },
      staticUrl(){
        return this.$store.statestaticUrl;
      },
      articalDetailUrl(){
        return this.$store.staticUrl;
      },
      // articalRequire(){
      //   return this.$store.state.articalRequire
      // },
      articalRequire(){
        return this.serchRequire
      },
      articalListNum(){
        return this.$store.state.articalListNum
      },
      searchContent(){
        return localStorage.getItem('searchContent');
      }
    },
    watch:{
      getArticalList:{
        handler(newValue){
  　　　},
  　　　deep:true
      },
      searchContent(newValue){
        if(newValue){
          this.serchRequire.content1 = newValue;
        }else {
          this.serchRequire.content1 = this.searchContent
        }
        this.serchRequire.limit=[0,10]
        this.getList();
      }
    },
    mounted(){
      this.serchRequire.content1 = this.searchContent;
      // var searchContent = localStorage.getItem('searchContent');
      // if(searchContent){
      //   this.serchRequire.content1 = searchContent;
      // }else {
      //   this.serchRequire.content1 = '';
      //   this.serchRequire.limit=[0,10]
      // }
      // this.getList();
    },
    methods:{
      getArticalDetailFn(i){
        var that = this;
        var newUrl = this.$store.state.staticUrl + this.$store.state.articalDetailUrl;
        axios.get(newUrl+'?id='+i).then(function(res){
          if(res.data.error==0){
            that.$store.commit('showArticalDetailFn',res.data.data);
            that.$router.push('/detail')
            that.$store.commit('getArticalFnMut',that.articalRequire)
          }
        })
      },

      // 选择文章(--------------------------------------------------------------------------------------)
      checkOneArtical(i){
        var newArr=[];
        if(this.getArticalList[i].checked==false){
          this.getArticalList[i].checked=true;
        }else if(this.getArticalList[i].checked==true){
          this.getArticalList[i].checked=false;
        }
        for(var j=0;j<this.getArticalList.length;j++){
          if(this.getArticalList[j].checked==true){
            newArr.push(this.getArticalList[j].id)
            if(newArr.length==this.getArticalList.length){
              this.$store.commit('changeArticalAllCheckTypeMut',true)
            }else{
              this.$store.commit('changeArticalAllCheckTypeMut',false)
            }
          }
        }
        this.checkedArticalList = newArr;
        this.$store.commit('checkArticalItemsMut',this.checkedArticalList)
      },

      selectedFn(i,j,z){
        if(z==0){
          this.oldNum = this.baseNum;
          this.data1 = i;
          this.baseNum = Number(i);
          var arr = [0,this.baseNum];
          this.articalRequire.limit = arr;
          this.pageNum = 1;
        }else if(z==1){
          this.data2 = i
          this.articalRequire.paichong = i;
        }
        this.dataSele[z].show = false
      },
      hideUlFn(i){
        this.dataSele[i].show = false
      },
      selectFn(i){
        this.dataSele[i].show = true

      },

      // 重新获取文章列表分页、排重、跳转页面
      getList(){
        var that = this;
        that.$emit('getSearchType')
        if(this.topage){
          var newNum = Number(this.topage);  //跳转页码
          var beginNum = (Number(this.data1)*(newNum-1))  //limit[0]开始数据
          var baseNum = Number(this.data1)    //每页数据数量
          var contNum = Number((this.articalListNum)/baseNum)  //总页数
          if(newNum>Math.ceil(contNum)){
            var totalPage = Math.ceil(contNum);
            this.data1 = this.oldNum;
            this.$layer.alert('当前共'+totalPage+'页！',function () {
              that.$layer.closeAll()
            })
          }else{
            var arr = [beginNum,this.data1];
            this.articalRequire.limit = arr;
            this.pageNum = newNum;
            this.data1 = baseNum;
            this.$store.commit('getArticalFnMut',this.articalRequire)
          }
        }else{
          this.pageNum = 1;
          this.$store.commit('getArticalFnMut',this.articalRequire)
        }
        this.topage = null;
      }
    }
}
</script>
<style scoped>
.manage-artical-cont{
	width: 75.95rem;
	box-sizing: border-box;
	padding: 0 1rem;
	margin: auto;
  background:#fff;
  margin-top:0.8rem;

}
.manage-artical-cont-detail{
	padding-top: 0.25rem;
}
.manage-artical-cont-item{
	width: 100%;
	border-bottom: 1px solid #DCDCDC;
	margin-top: 0.5rem;
}
.manage-artical-cont-item:hover{
  cursor:pointer;
}
.manage-artical-cont-item-title{
  display:flex;
  align-items: center;
}
.manage-artical-cont-item-title input{
	/* width: 0.8rem;
	height: 0.8rem; */
	margin-right: 0.3rem;
}
.manage-artical-cont-item-title span{
	font-size: 0.8rem;
	color: #333;
}
.manage-artical-cont-item.active .manage-artical-cont-item-title span{
	color: rgba(51,51,51,0.5);
}
.manage-artical-cont-item.active .manage-artical-cont-item-title .al-read{
	font-size: 0.6rem;
	display: inline-block;
	width: 1.9rem;
	height: 1rem;
	border-radius: 0.1rem;
	color: #fff;
	background: #5ECA29;
	text-align: center;
	line-height: 1rem;;
	margin-left: 0.5rem;
}
.manage-artical-cont-item-title-sourse{
	padding-left: 1.05rem;
}
.manage-artical-cont-item-title-sourse p{
	text-indent:2em;
	color: #666;
	font-weight: 400;
  font-size:0.7rem;
}
.manage-artical-cont-item-title-sourse p span{
	color:#FF7C1C ;
}
.manage-artical-cont-item.active .manage-artical-cont-item-title-sourse p{
	color: rgba(102,102,102,0.5);
}
.manage-artical-cont-item.active .manage-artical-cont-item-title-sourse p span{
	color: rgba(255,124,28,0.5);
}
.sorse-cont{
	height: 1.95rem;
}
.sorse-cont span{
	font-size: 0.7rem;
	line-height: 1.95rem;
	color: #999;
}
.sorse-cont em{
	display: inline-block;
	width: 0.65rem;
	height: 0.5rem;
	background: url('./../../assets/img/icon_artical_done.png');
	background-size:100% 100%;
	margin-left: 0.95rem;
	margin-top: 0.7rem;
}
.sorse-cont em:hover{
	cursor: pointer;
}
.fr{
	float: right;
}
.manage-artical-cont-detail-toal{
	height: 5.25rem;
	display: flex;
	align-items: center;
}
.manage-artical-cont-detail-toal span{
	font-size: 0.9rem;
	color: #999;
}
.manage-artical-cont-detail-toal strong{
	font-size: 1.2rem;
	color: #5ECA29;
  margin:0 0.3rem;
}
.manage-artical-cont-detail-toal select{
	height: 2rem;
	margin: 0 0.2rem;
  font-size:0.7rem;
}
.manage-artical-cont-detail-toal em{
	display: inline-block;
	width: 4.6rem;
	height: 2rem;
	text-align: center;
	line-height: 2rem;
	border-radius: 0.25rem;
	color: #fff;
	background: #30AFFF;
	margin-left: 1.15rem;
}
.manage-artical-cont-detail-toal em:hover{
  cursor:pointer;
}
.manage-artical-cont-detail-toal input{
	width: 3.1rem;
	height: 1.7rem;
	outline: none;
	box-shadow: none;
	font-size: 0.9rem;
	padding-left: 0.2rem;
	box-sizing: border-box;
  border:1px solid #DBDBDB;
  margin:0 0.2rem;
}
.manage-artical-cont-detail-toal select.paichong{
	margin: 0 1.5rem;
}
.select-self{
	width: 7.5rem;
	height:1.7rem;
	border:1px solid #DBDBDB;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0 0.5rem;
	position: relative;
  background:#fff;
  margin:0 0.4rem;
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
	background:url('./../../assets/img/iocn_search_sanjiao.png');
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
  max-height: 9.3rem;
  overflow: auto;
  box-shadow:0px 0px 0.25rem 0px rgba(15,21,33,0.17);
  display:none;
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
.select-self .hid-list li:last-of-type{
	border-bottom: none;
}
.select-self .hid-list li:hover{
	background: #FF7C1C;
	color: #fff;
}
.currentPage{
  margin-right:1rem;
}
</style>
