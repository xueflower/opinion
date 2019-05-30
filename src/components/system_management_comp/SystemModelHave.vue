<!-- 包含用户模态框 -->
<template>
  <div class="user-modal">
    <div class="user-mdoal-container type-short">
    	<p>包含用户</p>
      <em class="btn-colse" @click="colseModelAdd"></em>
      <div class="user-moal-have-cont">
        <table border="" cellspacing="" cellpadding="">
          <tr>
            <th class="shoose-user">选择</th>
            <th class="user-num">账号</th>
            <th class="user-name">姓名</th>
          </tr>
          <tr>
            <td>
              <input type="checkbox" name="" id="" value="" />
            </td>
            <td class="text-left">
              user@sanxia
            </td>
            <td class="text-left">三峡馆用户</td>
          </tr>
        </table>
        <div class="user-modal-btn-cont">
          <span class="bg-orange">保存</span>
          <span @click="colseModelAdd">返回</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SystemModelHave.vue",
        data(){
          return{

          }
        },
        methods:{
          colseModelAdd(){
            this.$emit('currentShow')
          }
        }
    }
</script>

<style scoped>

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
.user-moal-have-cont{
	overflow: auto;
}
.user-modal{
	width: 96rem;
	height: 54rem;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.63);
	z-index: 999;
}
.user-mdoal-container{
	width:36.85rem;
	background:rgba(255,255,255,1);
	border-radius:0.25rem;
	margin: 18.1rem auto 0;
	position: relative;
	box-sizing: border-box;
	padding: 0 1rem;
}
.user-mdoal-container .btn-colse{
	width: 1.2rem;
	height: 1.15rem;
	background: url('./../../assets/img/wrong.png');
	background-size:100% 100%;
	position: absolute;
	top: 1rem;
	right: 1rem;
}
.user-mdoal-container>p{
	height: 2.95rem;
	line-height: 2.95rem;
	border-bottom: 1px solid #E5E5E5;
	text-align: center;
	color: #333;
	font-size: 1.1rem;
	font-weight: 500;
}
.user-mdoal-container .btn-colse:hover{
	background: url('./../../assets/img/hover_wrong.png');
	background-size:100% 100%;
}


.type-short{
	height: 19.7rem;
}

.user-modal-btn-cont{
	width: 100%;
	height: 2rem;
	margin-top: 1.4rem;
	text-align: center;
}
.user-modal-btn-cont span{
	color: #fff;
	display: inline-block;
	width: 5.4rem;
	height: 2rem;
	border-radius: 0.1rem;
	line-height: 2rem;
	text-align: center;
	background: #ccc;
}
.user-modal-btn-cont span.bg-orange{
	background: #FF7C1C;
	margin-right: 1rem;
}


/*包含用户*/
.user-moal-have-cont{
	overflow: auto;
}
.user-moal-have-cont table{
	margin-top: 0.5rem;
}
.user-moal-have-cont .shoose-user{
	width: 4rem;
}
.user-moal-have-cont th,.user-moal-have-cont td{
	height: 2.35rem;
	font-size:0.9rem;
	font-weight: 500;
}

.user-moal-have-cont .user-num{
	width: 16.4rem;
}
.user-moal-have-cont .user-name{
	width: 14.5rem;
}
.text-left{
	text-align: left;
	box-sizing: border-box;
	padding-left: 0.5rem;
}


</style>
