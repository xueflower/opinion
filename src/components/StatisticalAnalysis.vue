<template>
  <div class="container">
  			<div class="inner-cont">
  				<p class="title">统计分析</p>
  				<div class="table-cont">
  					<div class="left-table">
  						<div class="top">
  							<em></em>
  							<p>信息统计</p>
  							<table border="" cellspacing="" cellpadding="">
  								<tr>
  									<th></th>
  									<th>今天</th>
  									<th>昨天</th>
  									<th>本周</th>
  									<th>本月</th>
  									<th>年度</th>
  								</tr>
  								<tr v-for="item,index in tongjifenxiData">
  									<td class="table-head">{{item.name}}</td>
  									<td>{{item.day.num}}</td>
  									<td>{{item.yday.num}}</td>
  									<td>{{item.week.num}}</td>
  									<td>{{item.month.num}}</td>
  									<td>{{item.year.num}}</td>
  								</tr>
  							</table>
  						</div>
  					</div>
  					<div class="right-table">

  					</div>
  				</div>
  			</div>
  		</div>
</template>
<script>
  export default{
    name:'StatisticalAnalysis.vue',
    computed:{
      tongjifenxiData(){
        return this.$store.state.tongjifenxiData
      },
    }
  }
</script>
<style scoped>
body,html{
	width: 100%;
	height: 100%;
}
.container{
	width: 100%;
	height: 100%;
	background: #EDEEF0;
	padding-top: 2rem;
}
.inner-cont{
	width: 75.95rem;
	height: 35.85rem;
	border:1px solid rgba(225,225,225,1);
	box-shadow:0px 0px 0.5rem 0px rgba(102,102,102,0.1);
	border-radius:0.1rem;
	margin: auto;
	background: #fff;
	box-sizing: border-box;
	padding: 0 1rem;
}
.title{
	height: 3.2rem;
	line-height: 3.2rem;
	color: #333;
	font-size: 1.1rem;
	border-bottom: 1px dashed #DCDCDC;
	position:relative
}
.title:before{
	position: absolute;
	content: '';
	width: 0.2rem;
	height: 1.35rem;
	background: #FF7C1C;
	left: -0.95rem;
	top: 1rem;
}
.left-table{
	margin-top: 0.35rem;
}
.left-table .top{
	height: 1.9rem;
}
.top em,.top p{
	display: inline-block;
}
.top em{
	width: 0.3rem;
	height: 0.3rem;
	background: #FF7C1C;
	border-radius: 50%;
	vertical-align: middle;
}
.top p{
	line-height: 1.9rem;
	margin-left: 0.4rem;
}
td,th{
	border:solid #EDEEF0;
	border-width:0px 1px 1px 0px;
	font-size: 0.9rem;
	color: #999;
	line-height: 2.35rem;
	font-weight: 400;
}
th,.table-head{
	color: #333;
	background: #F6F6F7;
	box-sizing: border-box;
	width: 5.5rem;
	height: 2.1rem;
	color: #333;
	font-size: 0.9rem;
}
td{
	text-align: center;
}
table{
	border:solid #EDEEF0;
	border-width:1px 0px 0px 1px;
}
</style>
