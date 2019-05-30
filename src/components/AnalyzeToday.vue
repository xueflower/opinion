<template>
				<div class="box analyze">
					<P class="box-title">今日分析</P>
					<div class="analyze-top">
						<ul class="time-cont bg-grey">
							<li class="short">
								属性
							</li>
							<li class="normal">0点～6点</li>
							<li class="normal">6点～10点</li>
							<li class="normal">10点～14点</li>
							<li class="normal">14点～18点</li>
							<li class="normal">18点～24点</li>
						</ul>
						<ul class="unnegative-cont">
							<li class="short">
								<span>非负面</span>
								<img src="./../assets/img/unnegative.png"/>
							</li>
							<li class="normal">0</li>
							<li class="normal">6</li>
							<li class="normal col-blue">10</li>
							<li class="normal">14</li>
							<li class="normal">0</li>
						</ul>
						<ul class="negative-cont">
							<li class="short">
								<span>负面</span>
								<img src="./../assets/img/negative.png"/>
							</li>
							<li class="normal">6</li>
							<li class="normal col-blue">6</li>
							<li class="normal">1</li>
							<li class="normal">1</li>
							<li class="normal">1</li>
						</ul>
					</div>
					<div class="analyze-bottom">
						<div class="msg">
							<span class="net">网站信源</span>
							<span class="time-collect">实时采集</span>
						</div>
						<div class="num-cont">
							<span class="left">1,111,308</span>
							<span class="right">38,288,980</span>
						</div>
						<div class="info">
							<ul>
								<li class="first">
									<span>经过漏斗过滤，形成相关信息 </span>
                        			<strong class="big-blue">13</strong>
                        			<span>条，分布在 </span>
                        			<strong class="col-blue">9</strong>
                        			<span>个站点</span>
								</li>
								<li class="sec">
									<span>其中负面 </span>
                        			<strong class="col-red">1</strong>
                        			<span>条，非负面 </span>
                        			<strong class="big-red">9</strong>
                        			<span>条</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
</template>

<script>
    export default {
        name: "ModelOne.vue"
    }
</script>

<style scoped>
.conts .box.analyze{
width: 37.5rem;
height: 27.5rem;
background: #fff;
box-sizing: border-box;
padding: 0 1rem;
}
.box.analyze .box-title{
height: 3rem;
font-size: 1rem;
font-weight: 600;
line-height: 3rem;
color: #333;
position: relative;
border-bottom: 1px solid #E5E5E5;
}
.box.analyze .box-title:before{
content: '';
position: absolute;
top: 0.85rem;
left: -1.02rem;
width: 4px;
height: 1.35rem;
background: #FF7C1C;
}
.time-cont,
.unnegative-cont,
.negative-cont{
height: 60px;
clear: both;
}
.time-cont li,
.unnegative-cont li,
.negative-cont li{
float: left;
text-align: center;
color: #333;
font-size: 0.9rem;
font-weight: 400;
line-height: 3rem;
}
.unnegative-cont>li,
.negative-cont>li{
font-size: 0.7rem;
color: #999999;
text-align: center;
border-bottom: 1px solid #EDEEF0;
border-left: 1px solid #EDEEF0;
}
.unnegative-cont>li:nth-child(6n),
.negative-cont>li:nth-child(6n){
border-right: 1px solid #EDEEF0;
}
.short img{
width: 0.7rem;
height: 0.7rem;
margin-left: 0.25rem;
}
.time-cont{
width: 35.5rem;
}
.bg-grey{
background: #E1E1E1;
}
.unnegative-cont li.col-blue,
.negative-cont li.col-blue{
color: #39B2FF;
}
.short{
width: 4.5rem;
display: flex;
align-items: center;
justify-content: center;
}
.normal{
width: 6.13rem;
}
.analyze-bottom .msg{
clear: both;
}
.analyze-bottom .msg span{
display: inline-block;
height: 3rem;
text-align: center;
background: #EDEEF0;
color: #333;
line-height: 3rem;
float: left;
}

.analyze-bottom .msg .net{
width: 17rem;
}
.analyze-bottom .msg .time-collect{
width: 18.5rem;
}
.num-cont{
height: 4.8rem;
clear: both;
}
.num-cont span{
display: inline-block;
float: left;
height: 4.8rem;
line-height: 4.8rem;
font-size: 2rem;
color: #5ECA29;
border-bottom: 1px solid #EDEEF0;
text-align: center;
}
.num-cont .left{
width: 16.8rem;
border-right: 1px solid #EDEEF0;
border-left: 1px solid #EDEEF0;
}
.num-cont .right{
width: 18.5rem;
border-right: 1px solid #EDEEF0;
}
.info ul li{
height: 3rem;
border-width: 0 1px 1px 1px;
border-style: solid;
border-color: #EDEEF0;
padding-left: 1rem;
}
.info ul li span{
font-size: 0.9rem;
color: #999999;
line-height: 3rem;
}
.info ul li strong{
line-height: 3rem;
}
.col-blue{
color: #39B2FF;
}
.big-blue{
font-size: 1.5rem;
color: #39B2FF;
}
.big-red{
font-size: 1.5rem;
color: #F93D18;
}
.col-red{
color: #F93D18;
}

</style>
