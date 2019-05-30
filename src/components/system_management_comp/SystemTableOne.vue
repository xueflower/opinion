<!-- 角色管理table -->
<template>
  <div class="collect-attention">
    <table border="0" cellspacing="" cellpadding="">
      <tr>
        <th class="check-btn">选择</th>
        <th class="col-att-name">角色名称</th>
        <th class="resource">备注</th>
        <th class="done">操作</th>
      </tr>
      <tr v-for="item,index in userList">
        <td class="click-me active">
          <em></em>
        </td>
        <td class="no-wrap">
          {{item.username}}
        </td>
        <td class="beizhu"></td>
        <td class="done-del">删除</td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default{
    name:'SystemTableOne.vue',
    computed:{
      userList(){
        return this.$store.state.userList
      }
    },
    methods:{

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
	width: 4rem;
	height: 2.35rem;
	text-align: center;
	font-size: 0.9rem;
	color: #333;
	line-height: 2.35rem;
}
.col-att-name{
	width: 23.7rem;
	box-sizing: border-box;
	padding-left: 1rem;
	text-align: left;
}
.resource{
	width: 17.35rem;
	text-align: left;
	box-sizing: border-box;
	padding-left: 2.8rem;
}
.beizhu{
	width: 17.35rem;
	text-align: left;
	box-sizing: border-box;
	padding-left: 2.8rem;
}
.no-wrap{
	height: 2.35rem;
	padding-left: 1.05rem;
	text-align: left;
}

.click-me.active em{
	background: url('./../../assets/img/icon_radio_checked.png');
	background-size: 100% 100%;
}
.click-me em{
	display: block;
	width: 0.65rem;
	height: 0.65rem;
	background: url('./../../assets/img/icon_radio_uncheck.png');
	background-size: 100% 100%;
	margin: auto;
}
.no-wrap span{
	display: block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 20rem;
}
.pub-time{
	width: 9.95rem;
}
.done{
	width: 6.95rem;
}
.done-del{
	color: #FF7C1C;
}
.done-del:hover{
	cursor: pointer;
	background: #FF7C1C;
	color: #fff;
}
.col-att-bottom-bar{
	width: 100%;
	height: 2.9rem;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	justify-content: space-between;
	padding: 0 1rem;
	position: absolute;
	bottom: -0.13rem;
	left: 0;
}
.col-att-bottom-bar .recod span{
	font-size: 0.9rem;
	color: #999;
	line-height: 2.9rem;
}
.col-att-bottom-bar .change span{
	font-size: 0.8rem;
	line-height: 2.9rem;
	color: #999;
}
.col-att-bottom-bar .change input{
	width: 3.1rem;
	height: 2rem;
	font-size: 0.9rem;
	color: #999;
	margin: 0 0.2rem;
	box-sizing: border-box;
	padding-left: 0.4rem;
	border-radius: 0.25rem;
	outline: none;
	box-shadow: none;
	border:1px solid #E1E1E1;
}
.col-att-bottom-bar .change .btn{
	display: inline-block;
	width: 3.4rem;
	height: 1.5rem;
	background:rgba(48,175,255,1);
	border-radius:0.25rem;
	text-align: center;
	line-height: 1.5rem;
	color: #fff;
}
.col-att-bottom-bar .change .btn:hover{
	cursor: pointer;
	background: rgba(48,175,255,0.8);
}
.no-msg-cont{
	margin-top: 3.7rem;
	width: 100%;
}
.no-msg-cont .no-msg{
	display: block;
	margin: auto;
	width: 4.25rem;
	height: 5.65rem;
	background: url('./../../../static/img/icon_no_msg.png');
	background-size: 100% 100%;
	margin-bottom: 1.75rem;
}
.no-msg-cont .none-rest{
	color: #CCCCCC;
	font-size: 0.9rem;
	text-align: center;
}
</style>
