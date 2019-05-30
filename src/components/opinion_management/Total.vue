<template>
  <div class="public-total">
			<p>舆情汇总</p>
			<div class="box-cont">
				<p>基本概况</p>
				<div class="item-box-cont">
					<div class="item-box">
						<p class="item-box-tit">正面</p>
						<p class="item-box-coment">{{OpinionTotalOutList.jiben.jing}}</p>
					</div>
          <div class="item-box">
						<p class="item-box-tit">负面</p>
						<p class="item-box-coment color-red">{{OpinionTotalOutList.jiben.fu}}</p>
					</div>
          <div class="item-box">
						<p class="item-box-tit">其它</p>
						<p class="item-box-coment">{{OpinionTotalOutList.jiben.qita}}</p>
					</div>
				</div>
			</div>
			<div class="box-cont">
				<p>来源类型</p>
				<div class="item-box-cont">
					<div class="item-box" v-for="item,index in OpinionTotalOutList.laiyuan">
						<p class="item-box-tit">{{item.type_name==''||item.type_name==null?'未知源':item.type_name}}</p>
						<p class="item-box-coment color-blue">{{item.num==null?'0':item.num}}</p>
					</div>
				</div>
			</div>
      <div class="box-cont">
				<p>媒体名称(Top20)</p>
				<div class="media-box-cont">
					<div class="media-box" v-for="item,index in OpinionTotalOutList.meiti">
						<p class="item-box-tit">{{item.name}}</p>
						<div class="item-box-img-cont">
							<img :src="item.img"/>
						</div>
						<p class="item-box-coment color-orange">{{item.num}}</p>
					</div>
				</div>
			</div>
		</div>
</template>
<script>

export default {
    name: "Total.vue",
    data(){
      return{
        imgSrc:[
          'baidutieba.png',
          'chian.png',
          'China-Daily.png',
          'chongqing.png',
          'fenghuangwang.png',
          'haiwai.png',
          'hongbo.png',
          'hualong.png',
          'newchina.png',
          'people.png',
          'sine.png',
          'sine1.png',
          'souhu.png',
          'tencent.png',
          'wenwuju.png',
          'wetchat.png'
        ]
      }
    },
    computed:{
      OpinionTotalOutList(){
        return this.$store.state.OpinionTotalOutList;
      }
    }
  }
</script>
<style scoped>
body{
background: #ccc;
}
.public-total{
width: 75.95rem;
margin: auto;
margin-top: 0.5rem;
box-sizing: border-box;
padding: 1.05rem 1rem 0;
height: 73.75rem;
background: #fff;
}
.public-total>p{
text-align: center;
font-size: 1.3rem;
height: 3.25rem;
line-height: 3.25rem;
border-bottom: 1px solid #DCDCDC;
font-weight: 500;
color: #333;
}
.box-cont{
width: 100%;
}
.box-cont>p{
font-size: 1.1rem;
color: #333333;
font-weight: 600;
height: 3.1rem;
margin-top: 1.15rem;
text-align: left;
position: relative;
line-height: 3.1rem;
}
.box-cont>p:before{
content: '';
position: absolute;
width: 0.2rem;
height: 1.35rem;
background: #FF7C1C;
left: -1rem;
top: 0.75rem;
}
.item-box-cont{
width: 100%;
}
.item-box-cont .item-box{
width: 5.5rem;
height: 4.6rem;
background: #F5F5F5;
box-sizing: border-box;
padding: 0.85rem 0;
margin-right: 1rem;
display: inline-block;
border-radius: 0.25rem;
}
.item-box-tit{
font-size: 0.8rem;
color: #666;
font-weight: 400;
margin-bottom: 0.4rem;
}
.item-box-coment{
font-size: 1rem;
color: #5ECA29;
font-weight: bold;
}
.item-box>p{
text-align: center;
}
.item-box-coment.active{
color: #FF0000;
}
.media-box{
width: 5.5rem;
height: 7.1rem;
background: #F5F5F5;
box-sizing: border-box;
display: inline-block;
margin-right: 1rem;
margin-bottom:1rem;
}
.media-box{
	width: 5.5rem;
	height: 7.1rem;
	background: #F5F5F5;
	box-sizing: border-box;
	display: inline-block;
	padding-top: 0.85rem;
}
.media-box p{
	text-align: center;
  margin-bottom:0
}
.item-box-img-cont{
	width: 100%;
	height: 2.5rem;
	margin-bottom: 0.8rem;
}
.item-box-img-cont img{
	width:5.5rem;
  margin:0 auto;
  display:block;
}
.color-red{
  color:#FF0000;
}
.color-blue{
  color: #30AFFF;
}
.color-orange{
  color:#FF7C1C;
}
</style>
