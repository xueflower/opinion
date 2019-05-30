<!-- 系统日志 table 系统登陆日志 -->
<template>
  <div class="collect-attention">
    <table border="0" cellspacing="" cellpadding="">
      <tr>
        <th class="check-btn">账号</th>
        <th class="col-att-name">时间</th>
        <th class="resource">登录IP</th>
        <th class="done">状态</th>
      </tr>
      <tr v-for="item,index in getSystemOtherMsgList">
        <td>
          {{item.message}}
        </td>
        <td>
          {{item.addtime}}
        </td>
        <td>{{item.ip}}</td>
        <td style="color:#FF7C1C">{{item.type}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default{
    name:'SystemTableThree.vue',
    computed:{
      getSystemOtherMsgList(){
        return this.$store.state.getSystemOtherMsgList
      }
    }
  }
</script>
<style scoped>
.collect-attention{
	border-top: none;
	width: 51.85rem;
	box-sizing: border-box;
}

td,th{
	border:solid #EDEEF0;
	border-width:0px 1px 1px 0px;
	font-size: 0.9rem;
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
	width: 14.1rem;
	height: 2.35rem;
	text-align: center;
	font-size: 0.9rem;
	color: #333;
	line-height: 2.35rem;
}
.col-att-name{
	width: 14.1rem;
	box-sizing: border-box;
	text-align: center;
}
.resource{
	width: 14.1rem;
	text-align: center;
	box-sizing: border-box;
}
.done{
  width:9.55rem;
}

</style>
