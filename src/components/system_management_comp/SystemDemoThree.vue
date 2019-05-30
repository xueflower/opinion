<!--  系统管理 角色管理  栏目权限模态框 -->
<template>
  <div class="user-modal">
    <div class="user-mdoal-container type-long">
      <p>显示权限</p>
      <em class="btn-colse" @click="coloseFn"></em>
      <div class="user-moal-have-cont">
        <table border="" cellspacing="" cellpadding="">
          <tr>
            <th class="shoose-user">选择</th>
            <th class="user-num">菜单名称</th>
            <th class="user-name">权限按钮</th>
          </tr>
        </table>
        <table border="" cellspacing="" cellpadding="" v-for="item,index in limiteData">
          <tr>
            <th class="shoose-user">
              {{index+1}}
            </th>
            <th class="text-left user-num">
              {{item.title}}
            </th>
            <th class="text-center user-name">
              <label @click="checkAll(index)">
                <input type="checkbox" :checked="item.isCheck"/>
              </label>
            </th>
          </tr>
          <tr v-for="it,ind in item.list">
            <td class="shoose-user">
              （{{ind+1}}）
            </td>
            <td class="text-left user-num">
              {{it.name}}
            </td>
            <td class="text-center user-name">
              <label @click="checkOne(index,ind)">
                <input type="checkbox" :checked="it.isCheck"/>
              </label>
            </td>
          </tr>
        </table>
      </div>
      <div class="user-modal-btn-cont">
        <span class="bg-orange">保存</span>
        <span @click="coloseFn">返回</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SystemDemoThree",
        data(){
          return{
            limiteData:[
              {
                title:'舆情概览',
                isCheck:false,
                list:[
                  {name:'今日分析',isCheck:false},
                  {name:'近期汇总',isCheck:false},
                  {name:'人物舆情',isCheck:false},
                  {name:'博物馆舆情',isCheck:false},
                  {name:'微博舆情',isCheck:false},
                  {name:'重点网站',isCheck:false}]
              },
              {
                title:'舆情信息管理',
                isCheck:false,
                list:[]
              },
              {
                title:'舆情工作',
                isCheck:false,
                list:[{name:'收藏',isCheck:false},{name:'管理',isCheck:false}]
              },
              {
                title:'统计分析',
                isCheck:false,
                list:[]
              },
              {
                title:'系统管理',
                isCheck:false,
                list:[
                  {name:'权限管理',isCheck:false},
                  {name:'权限管理-角色管理',isCheck:false},
                  {name:'关键词',isCheck:false},
                  {name:'关键词-添加关键词',isCheck:false},
                  {name:'组织机构',isCheck:false},
                  {name:'组织机构-部门管理',isCheck:false},
                  {name:'系统日志',isCheck:false},
                  {name:'系统日志-系统登录日志',isCheck:false},
                  {name:'系统日志-系统操作日志',isCheck:false},
                  {name:'系统日志-文章操作日志',isCheck:false}
                ]
              },
          ]
          }
        },
        methods:{
          coloseFn(){
            this.$emit('currentShow')
          },
          // 分类全选
          checkAll(i){
            if(this.limiteData[i].isCheck==false){
              if(this.limiteData[i].list.length!=0){
                for(var z=0;z<this.limiteData[i].list.length;z++){
                  this.limiteData[i].list[z].isCheck = true;
                }
              }
              this.limiteData[i].isCheck = true
            }else{
              if(this.limiteData[i].list.length!=0){
                for(var z=0;z<this.limiteData[i].list.length;z++){
                  this.limiteData[i].list[z].isCheck = false;
                }
              }
              this.limiteData[i].isCheck = false
            }
          },
          // 单选  i为外部循环的index，j为子集循环的
          checkOne(i,j){
            if(this.limiteData[i].list[j].isCheck==false){
              this.limiteData[i].list[j].isCheck=true;
              var num = 0;
              for(var z=0;z<this.limiteData[i].list.length;z++){
                if(this.limiteData[i].list[z].isCheck==true){
                  num += 1;
                  console.log(num);
                  if(num==this.limiteData[i].list.length){
                    this.limiteData[i].isCheck = true
                  }
                }
              }
            }else{
              this.limiteData[i].list[j].isCheck=false;
              this.limiteData[i].isCheck = false
            }
          }
        }
    }
</script>

<style scoped>
td,th{
	border-color:#EDEEF0;
  border-style:solid ;
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
  max-height:20.75rem;
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
.user-moal-have-cont{
  padding-top:0.5rem;
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
.text-center input{
	margin: 0 auto;
}
.v-aligh{
	vertical-align: middle;
}
</style>
