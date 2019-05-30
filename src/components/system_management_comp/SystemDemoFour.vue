<!--  操作权限模态框  -->
<template>
  <div class="user-modal">
    <div class="user-mdoal-container type-long">
    	<p>操作权限</p>
      <em class="btn-colse" @click="colseModel"></em>
      <div class="user-moal-done-cont">
        <table border="" cellspacing="" cellpadding="">
          <tr>
            <th class="choose-user">选择</th>
            <th class="user-num text-left">菜单名称</th>
            <th class="user-name text-left">权限按钮</th>
          </tr>
          <tr>
            <td>
              1
            </td>
            <td class="text-left">
              部门管理
            </td>
            <td class="text-left">
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>添加</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>修改</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>删除</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>全选</span>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              2
            </td>
            <td class="text-left">
              用户管理
            </td>
            <td class="text-left">
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>添加</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>修改</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>删除</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>全选</span>
              </label>
            </td>
          </tr>
          <tr>
            <td class="v-aligh">
              3
            </td>
            <td class="text-left v-aligh">
              角色管理
            </td>
            <td class="text-left">
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>添加</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>删除</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>包含用户</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>操作权限</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>显示权限</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>全选</span>
              </label>
            </td>
          </tr>
          <tr>
            <td class="v-aligh">
              4
            </td>
            <td class="text-left v-aligh">
              文章操作功能
            </td>
            <td class="text-left">
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>传播分析</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>客户端推送</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>短信推送</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>邮件推送</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>追踪</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>收藏</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>批注</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>简报</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>属性</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>添加</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>修改</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>项目删除</span>
              </label>
              <label>
                <input type="checkbox" name="" id="" value="" />
                <span>全选</span>
              </label>
            </td>
          </tr>
        </table>
        <div class="user-modal-btn-cont">
          <span class="bg-orange">保存</span>
          <span  @click="colseModel">返回</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SystemDemoFour",
        methods:{
          colseModel(){
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
	/*height: 12rem;*/
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
	margin: 13.1rem auto 0;
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
.type-long{
	height:28.75rem;
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


.text-left{
	text-align: left;
	box-sizing: border-box;
	padding-left: 0.5rem;
}

/*操作权限*/
.user-moal-done-cont{
	margin-top: 0.5rem;
	overflow: auto;
}
.user-moal-done-cont .choose-user{
	width: 4rem;
}
.user-moal-done-cont .user-num{
	width: 7.55rem;
}
.user-moal-done-cont .user-name{
	width: 23.35rem;
}

.user-moal-done-cont td label{
	margin-left: 0.65rem;
	display: inline-block;
}
.v-aligh{
	vertical-align: middle;
}
</style>
