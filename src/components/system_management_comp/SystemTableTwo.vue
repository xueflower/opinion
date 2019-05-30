<!-- 系统日志table 文章操作&&系统操作 -->
<template>
  <div class="collect-attention">
    <table border="0" cellspacing="" cellpadding="">
      <tr>
        <th class="col-att-name">账号</th>
        <th class="resource">时间</th>
        <th class="done">内容</th>
      </tr>
      <tr v-for="item,index in getSystemOtherMsgList">
        <td style="vertical-align:middle;width:8rem;">
          {{item.user}}
        </td>
        <td style="vertical-align:middle;width:8rem;">{{item.addtime}}</td>
        <td style="line-height:1.4rem; padding:0.5rem 0.4rem;text-align:left;">
          <span style="color:#FF7C1C">{{item.message}}</span>
          <!-- 编号：8df76e56-c5e2-41bb-9a57-e7cfc837c7ee,标题：区人大大溪沟代表组开展专题视察活动,路径： -->
          <a style="color:#0070C9" :href="item.url" target="_blank">{{item.url}}</a>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default{
    name:'SystemTableTwo.vue',
    computed:{
      getSystemOtherMsgList(){
        return this.$store.state.getSystemOtherMsgList
      }
    }
  }
</script>
<style scoped>
.collect-attention{
	width: 51.85rem;
	box-sizing: border-box;
}

td,th{
	border:solid #EDEEF0;
	border-width:0px 1px 1px 0px;
	font-size: 0.8rem;
	color: #999;
	line-height: 2.35rem;
	font-weight: 400;
}
th{
	color: #333;
	background: #F6F6F7;
	box-sizing: border-box;
}
td{
	text-align: center;
}
table{
	border:solid #EDEEF0;
	border-width:1px 0px 0px 1px;
}

.check-btn{
	width: 4rem;
	height: 2.35rem;
	text-align: center;
	font-size: 0.9rem;
	color: #333;
	line-height: 2.35rem;
  vertical-align: middle;
}

.col-att-name{
	width: 8rem;
  vertical-align: middle;
	text-align: center;
}
.resource{
	width: 8rem;
	text-align: left;
  vertical-align: middle;
  text-align: center;
}
.done{
  width:35.8rem
}
</style>
