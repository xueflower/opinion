<template>
  <div class="out-put">
			<ul class="out-put-cont">
				<li class="out-put-title">
					<span class="xuhao">序号</span>
					<span class="name">名称</span>
					<span class="download">操作</span>
				</li>
				<li class="out-put-content" v-for="item,index in OpinionTotalOutList1">
					<span class="xuhao">1</span>
					<span class="name">
						<strong>{{item.name}}</strong>
						<em :class="{'active':item.type=='doc'}"></em>
					</span>
					<span class="download">
            <a href="javascript:;" @click="getDownloadUrl(item.url,index)">下载</a>
          </span>
				</li>
			</ul>
		</div>
</template>
<script>
import axios from 'axios'
export default {
    name: "OutPut.vue",
    data(){
      return{
        layer:null
      }
    },
    computed:{
      OpinionTotalOutList1(){
        return this.$store.state.OpinionTotalOutList1
      },
      staticUrl(){
        return this.$store.state.staticUrl
      }
    },
    methods:{
      getDownloadUrl(url,i){
        var This = this;
        this.layer = this.$layer.msg('数据获取中，可能加载时间较长，请耐心等待！',{
          type:3,
          title:'数据获取中，可能加载时间较长，请耐心等待！',
          time:10000,
          shade: true,//是否显示遮罩
          shadeClose: false,//点击遮罩是否关闭
        })
        axios.get(this.staticUrl+url).then(function (res) {
          if(res.data.error==0){
            This.$layer.close(This.layer);
            window.open(res.data.data,false)
          }else if(res.data.error==2){
            This.$layer.alert('登录失效，请重新登录！');
            This.$router.push('/')
          }
        })
      },
    }
  }
</script>
<style scoped>
.out-put{
	width: 75.95rem;
	padding: 1.05rem;
	box-sizing: border-box;
	margin: 0 auto;
	margin-top: 0.5rem;
	min-height: 19.15rem;
  background:#fff;
}
.out-put-cont{
	border:1px solid #EDEEF0;
}
.out-put li{
	width: 100%;
	height: 2.35rem;
	border-bottom: 1px solid #EDEEF0;
	display: flex;
}

.out-put li:last-of-type{
	border-bottom: none;
}
.out-put-title{
	background: #f6f6f7;
}
.out-put-title span{
	font-size: 0.9rem;
	color: #333;
	display: inline-block;
	height: 2.35rem;
	line-height: 2.35rem;
	font-weight: 400;
}
.out-put-content span{
	color: #999999;
	font-size: 0.9rem;
	display: inline-block;
	line-height: 2.35rem;
}
.xuhao{
	width: 4rem;
	text-align: center;
	border-right:1px solid #EDEEF0;
}
.download{
	width: 9.95rem;
	text-align: center;
}
.name{
	width: 60rem;
	box-sizing: border-box;
	padding-left: 1rem;
	border-right:1px solid #EDEEF0;
}
.name strong{
	color: #999;
	font-size: 0.9rem;
	line-height: 2.35rem;
}
.name em{
	display: inline-block;
	width: 1.05rem;
	height: 1.25rem;
	background: url('./../../assets/img/icon_excel.png');
	background-size:100% 100% ;
	vertical-align: middle;
}
.name em.active{
	width: 1rem;
	height: 1.2rem;
	background:url('./../../assets/img/icon_word.png');
	background-size:100% 100% ;
}
.out-put-content .download ：{
	color: #FF7C1C;
}
.out-put-content .download:hover{
	cursor: pointer;
  text-decoration: underline
}

</style>
