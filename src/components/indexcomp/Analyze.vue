<template>
				<div class="box analyze">
					<P class="box-title">今日分析</P>
					<div class="analyze-top" v-if="todayAnalData!=null">
						<ul class="time-cont bg-grey">
							<li class="short">
								属性
							</li>
							<li class="normal" v-for="item,index in listData">{{item}}</li>
						</ul>
						<ul class="unnegative-cont">
							<li class="short">
								<span>非负面</span>
								<img src="./../../assets/img/unnegative.png"/>
							</li>
							<li class="normal" :class="{'col-blue':todayAnalData.six.zheng>0}">{{todayAnalData.six.zheng}}</li>
							<li class="normal" :class="{'col-blue':todayAnalData.ten.zheng>0}">{{todayAnalData.ten.zheng}}</li>
							<li class="normal" :class="{'col-blue':todayAnalData.foring.zheng>0}">{{todayAnalData.foring.zheng}}</li>
							<li class="normal" :class="{'col-blue':todayAnalData.eighting.zheng>0}">{{todayAnalData.eighting.zheng}}</li>
							<li class="normal" :class="{'col-blue':todayAnalData.twofour.zheng>0}">{{todayAnalData.twofour.zheng}}</li>
						</ul>
						<ul class="negative-cont">
							<li class="short">
								<span>负面</span>
								<img src="./../../assets/img/negative.png"/>
							</li>
							<li class="normal" :class="{'col-red':todayAnalData.six.fu>0}">{{todayAnalData.six.fu}}</li>
							<li class="normal" :class="{'col-red':todayAnalData.ten.fu>0}">{{todayAnalData.ten.fu}}</li>
							<li class="normal" :class="{'col-red':todayAnalData.foring.fu>0}">{{todayAnalData.foring.fu}}</li>
							<li class="normal" :class="{'col-red':todayAnalData.eighting.fu>0}">{{todayAnalData.eighting.fu}}</li>
							<li class="normal" :class="{'col-red':todayAnalData.twofour.fu>0}">{{todayAnalData.twofour.fu}}</li>
						</ul>
					</div>
					<div class="analyze-bottom" v-if="todayAnalData!=null">
						<div class="msg">
							<span class="net">网站信源</span>
							<span class="time-collect">实时采集</span>
						</div>
						<div class="num-cont">
							<span class="left">{{todayAnalData.wangzhanxinyuan}}</span>
							<span class="right">{{todayAnalData.shishicaiji}}</span>
						</div>
						<div class="info">
							<ul>
								<li class="first">
									<span>经过漏斗过滤，形成相关信息 </span>
            			<strong class="big-blue" @click="toArticalList(0)">{{todayAnalData.xiangguanxinxi}}</strong>
            			<span>条，分布在 </span>
            			<strong class="col-blue" @click="toArticalList(1)">{{todayAnalData.fenbuzhandian}}</strong>
            			<span>个站点</span>
								</li>
								<li class="sec">
									<span>其中负面 </span>
									<!-- <strong class="col-red" @click="toArticalList(2)">{{todayAnalData.fu}}</strong> -->
            			<strong class="col-red">{{todayAnalData.fu}}</strong>
            			<span>条，非负面 </span>
            			<strong class="big-red" @click="toArticalList(3)">{{todayAnalData.feifu}}</strong>
            			<span>条</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
</template>

<script>
    export default {
        name: "Analyze.vue",
				data(){
					return{
						listData:['0点～6点','6点～10点','10点～14点','14点～18点','18点～24点'],
						layer:null,
					}
				},
				computed:{
					todayAnalData(){
						return this.$store.state.todayAnalData
					},
					articalRequire(){
		        return this.$store.state.articalRequire;
		      },
		      getarticalList(){
		        return this.$store.state.articalList;
		      },
					// staticUrl(){
					// 	return this.$store.state.staticUrl;
					// },
					// articalHuizongUrl(){
					// 	return this.$store.state.articalHuizongUrl;
					// },
				},
				watch:{
					getarticalList:{
						handler(newValue){
							console.log('监听数据！');
							this.$layer.close(this.layer)
						},
						deep:true
					}
				},
				mounted(){
					var that = this;
					// this.timer=setInterval(function () {
						that.$store.commit('getTodayMut');
					// },3000)
				},
				methods:{
					toArticalList(i){
						if(i==2){
							this.articalRequire.set_neg = 1;
						};
						if(i==3){
							this.articalRequire.set_neg = 0;
						}
						this.$store.commit('changeHomeCompFn',1)
		        this.layer = this.$layer.msg('加载中！',{
		          type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
		          title: '加载中！',
		          shade: true,//是否显示遮罩
		          shadeClose: false,//点击遮罩是否关闭
		          time:1
		        });
		        this.$store.commit('getArticalFnMut',this.articalRequire)//获取文章列表
					},

					// toZhandian(){
					// 	this.$store.commit('changeHomeCompFn',1);
					// 	var that = this;
					// 	var listUrl = this.staticUrl + this.articalHuizongUrl;
					// 	axios.get(listUrl).then(function (res) {
					// 		if(res.data.error==0){
					// 			that.$store.commit('getOpinionTotalOutListMut',res.data.data);
					// 			that.$store.commit('changeOpinionCurrentMut')
					// 		}else if(res.data.error==2){
					// 			that.$layer.alert('登录失效，请重新登录！');
					// 			that.$router.push('/')
					// 		}
					// 	});
					// }
				}
    }
</script>

<style scoped>
.conts .box.analyze{
width: 37.5rem;
height: 27.5rem;
background: #fff;
box-sizing: border-box;
padding: 0 1rem;
margin-bottom:1rem;
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
height: 3rem;
display:flex;
}
.time-cont li,
.unnegative-cont li,
.negative-cont li{
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
box-sizing: border-box;
}
.normal{
width: 6.13rem;
}
.analyze-bottom .msg{
display:flex;
}
.analyze-bottom .msg span{
display: inline-block;
height: 3rem;
text-align: center;
background: #EDEEF0;
color: #333;
line-height: 3rem;
}

.analyze-bottom .msg .net{
width: 17rem;
}
.analyze-bottom .msg .time-collect{
width: 18.5rem;
}
.num-cont{
height: 4.8rem;
display:flex;

}
.num-cont span{
display: inline-block;
height: 4.8rem;
line-height: 4.8rem;
font-size: 2rem;
color: #5ECA29;
border-bottom: 1px solid #EDEEF0;
text-align: center;
font-weight:bold;
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
.info ul li strong:hover{
	cursor:pointer;
}
.col-blue{
color: #39B2FF;
}
.col-red{
	color:#F93D18;
}
.big-blue{
font-size: 1.5rem;
color: #39B2FF;
}
.big-red{
font-size: 1.5rem;
color: #F93D18;
}


</style>
