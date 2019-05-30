<template id="">
    <div class="box summary">
			<div class="view-tool">
				<P class="box-title">近期汇总</P>
				<div class="right-set">
					<ul>
						<li v-for="item,index in listTitle" :class="{'active':item.isActive}" @click="changeItem(index)">{{item.name}}</li>
					</ul>
				</div>
			</div>
      <div v-if="listData!=null">
        <div class="date-cont">
  				<div class="date-box" v-if="listTitle[0].isActive">
  					<div class="date-left bg-red">
  						<p class="col-white font-30">今</p>
  						<p class="col-white font-30">日</p>
  					</div>
  					<div class="date-right" v-if="currentDay">
  						<p class="col-99 font-16">{{currentDate}}</p>
  						<p class="col-orange font-30">{{currentDay.num==null?0:currentDay.num}}</p>
  					</div>
  				</div>

          <div class="date-box" v-for="item,index in listData" v-if="listTitle[0].isActive">
  					<div class="date-left bg-grey">
  						<p class="col-67 font-20">星期</p>
  						<p class="col-67 font-30">{{item.weekDay}}</p>
  					</div>
  					<div class="date-right">
  						<p class="col-99 font-16">{{item.pubdate}} </p>
  						<p class="col-orange font-30">{{item.num==null?0:item.num}}</p>
  					</div>
  				</div>
  <!-- 日周分割线 -->


        <div class="date-box other" v-if="listTitle[1].isActive">
          <div class="date-left bg-green">
            <p class="col-white font-30">本</p>
            <p class="col-white font-30">周</p>
          </div>
          <div class="date-right">
            <div class="">
              <p class="col-99 font-16">{{currentWeek.pubdate[0]}}</p>
              <p class="col-99 font-16">~</p>
              <p class="col-99 font-16">{{currentWeek.pubdate[1]}}</p>
            </div>
            <p class="col-orange font-30">{{currentWeek.num==null?0:currentWeek.num}}</p>
          </div>
        </div>

        <div class="date-box other" v-for="item,index in listData" v-if="listTitle[1].isActive">
          <div class="date-left bg-grey">
            <p class="col-67 font-20 differ">前</p>
            <p class="col-67 font-20 differ">{{index+1}}</p>
            <p class="col-67 font-20 differ">周</p>
          </div>

          <div class="date-right">
            <div class="">
              <p class="col-99 font-16">{{item.pubdate[0]}}</p>
              <p class="col-99 font-16">~</p>
              <p class="col-99 font-16">{{item.pubdate[1]}}</p>
            </div>
            <p class="col-orange font-30">{{item.num==null?0:item.num}}</p>
          </div>
        </div>

  <!-- 周月分割线 -->

        <div class="date-box" v-if="listTitle[2].isActive">
          <div class="date-left bg-red">
            <p class="col-white font-30">本</p>
            <p class="col-white font-30">月</p>
          </div>
          <div class="date-right">
            <p class="col-99 font-16">{{currentMouth.pubdate}}</p>
            <p class="col-orange font-30">{{currentMouth.num==null?0:currentMouth.num}}</p>
          </div>
        </div>

        <div class="date-box" v-for="item,index in listData" v-if="listTitle[2].isActive">
          <div class="date-left bg-grey">
            <p class="col-67 font-20">前</p>
            <p class="col-67 font-20">{{index+1}}</p>
            <p class="col-67 font-20">月</p>
          </div>
          <div class="date-right">
            <p class="col-99 font-16">{{item.pubdate}}</p>
            <p class="col-orange font-30">{{item.num==null?0:item.num}}</p>
          </div>
        </div>

  			<div class="date-box col-orange font-20 last" :class="{'other':listTitle[1].isActive}" @click="toanalyze">
  				<p>点击查看更多></p>
  			</div>
  		</div>
    </div>
	</div>
</template>
<script type="text/javascript">
import axios from 'axios';
export default {
    name: "Summary.vue",
    data(){
      return{
        listTitle:[
          {name:'日',isActive:true,type:0},
          {name:'周',isActive:false,type:0},
          {name:'月',isActive:false,type:1}
        ],
        listData:null,
        timer:null,
        timimgMsgData:null,
        currentDate:null,
        timimgMsgDay:null,
        currentDay:null,
        weekData:null,
        timimgMsgWeek:null,
        currentWeek:null,
        mouthData:null,
        timimgMsgMouth:null,
        currentMouth:null
      }
    },
    computed:{
      staticUrl(){
        return this.$store.state.staticUrl
      },
      tongjifenxiUrl(){
        return this.$store.state.tongjifenxiUrl
      },
      recentTotalUrl(){
        return this.$store.state.recentTotalUrl
      }
    },
    beforeCreate(){

    },
    mounted(){
      var that = this;
      var newUrl = this.staticUrl + this.recentTotalUrl;
      axios.get(newUrl).then(function (res) {
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
            res.data.data.day[i].weekDay = detailWeek;
          }
          var newData = res.data.data
          that.currentDate = newData.daytime;
          that.listData = newData.day.slice(1);
          that.timimgMsgDay = newData.day.slice(1);
          that.currentDay = newData.day[0];
          that.weekData = newData.week;
          that.timimgMsgWeek = newData.week.slice(1);
          that.currentWeek = newData.week[0];
          that.mouthData = newData.month;
          that.timimgMsgMouth = newData.month.slice(1);
          that.currentMouth = newData.month[0];
        }
      })
    },
    methods:{
      changeItem(i){
        for(var j=0;j<this.listTitle.length;j++){
          this.listTitle[j].isActive = false;
        }
        if(i==0){
          console.log(this.timimgMsgDay);
          this.listData = this.timimgMsgDay;
        }else if(i==1){
          this.listData = this.timimgMsgWeek
        }else if(i==2){
          this.listData = this.timimgMsgMouth
        }
        this.listTitle[i].isActive = true;
        console.log(this.GetDateStr(-1));
      },
      //点击查看更多
      toanalyze(){
        var curUrl = this.staticUrl + this.tongjifenxiUrl
        var that = this;
        axios.get(curUrl).then(function(res){
          if(res.data.error==0){
            that.$store.commit('getFenxiListMut',res.data.data)
            that.$store.commit('changeHomeCompFn',2)
          }else if(res.data.error==2){
            that.$layer.alert('登录失效，请重新登录！');
            that.$router.push('/')
          }
        })
      },
      //获取日期（AddDayCount）表示前后+，-
      GetDateStr(AddDayCount) {
         var dd = new Date();
         dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
         var y = dd.getFullYear();
         var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
         var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
         return y+"年"+m+"月"+d+"日";
      },
    }
}


</script>

<style scoped>
.box.summary{
	width: 37.5rem;
	height: 27.5rem;
	background: #fff;
	box-sizing: border-box;
	padding: 0 1rem;
	position: relative;
  margin-bottom:1rem;
}
.box.summary .view-tool{
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #E5E5E5;
}
.box.summary .box-title{
	height: 3rem;
	font-size: 1rem;
	font-weight: 600;
	line-height: 3rem;
	color: #333;
	position: relative;
}
.box.summary .box-title:before{
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
.right-set ul{
	width: 19.1rem;
}
.box.summary .right-set ul{
	width: 7.8rem;
	height: 3rem;
	display: flex;
}
.box.summary .right-set ul li{
	width: 2.6rem;
	text-align: center;
}
.right-set ul li{
	font-size: 0.9rem;
	color: #999999;
	line-height: 3rem;
	height: 3rem;
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
	width: 2.6rem;
	height: 0.15rem;
	background: #FF7C1C;
	bottom: 0;
	left: 0;
}
.date-cont{
	display: flex;
	flex-wrap: wrap;
}
.date-box{
	width: 11.35rem;
	height: 5.3rem;
	display: flex;
	border: 1px solid #E1E1E1;
	margin-top: 0.5rem;
	margin-right: 0.5rem;
}

/* ----------------------------------------------------------------------------------------------- */
.date-box.other{
  width:17.3rem;
}
.date-box.other .date-right{
  width:12.7rem;
  /* display:flex; */
  flex-direction: row;
  justify-content: flex-start;
}
.date-box.other .date-right>div{
  margin:0 1.7rem 0 1rem;
}
.date-box.other .date-right p{
  text-align: center;
}
.date-box.other .date-right>p{
  margin-right:0.5rem;
}
.bg-green{
  background:#66CC33
}
.date-box.other:nth-of-type(3n){
  margin-right:0.5rem;
}
.date-box.other:nth-child(2n){
	margin-right: 0;
}
/* ------------------------------------------------------------------------------------------------- */
.date-box:nth-of-type(3n){
	margin-right: 0;
}
.date-left{
	width: 4.6rem;
	height: 5.3rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.date-left>p{
	font-weight: bold;
	text-align: center;
  height: 2rem;
  line-height: 2rem;
}
.other .date-left .differ{
  height: 1.2rem;
  line-height: 1.2rem;
}
.date-right{
	width: 6.75rem;
	height: 5.3rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  margin-top:0.4rem;
}
.date-right p{
	font-weight: 600;
}
.bg-red{
	background: #EC4167;
}
.bg-grey{
	background: #EDEEF0;
}
.bg-orange{
	background: #FFE3BE;
}
.col-white{
	color: #fff;
}
.col-67{
	color: #8a8787;
}
.col-orange{
	color: #FF7C1C;
}
.col-99{
	color: #999;
}
.font-20{
	font-size: 1rem;
}
.font-16{
	font-size: 0.8rem;
}
.font-30{
	font-size: 1.5rem;
}
.date-box.last p{
	width: 100%;
	text-align: center;
	line-height: 5.3rem;
}
.date-box.last:hover{
  cursor:pointer;
}
</style>
