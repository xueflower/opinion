<template>
  <div class="management-container">
    <div class="item-manage-container">
  			<div class="container">
  				<div class="top-bar">
  					<p class="top-bar-left">栏目管理</p>
  					<div class="top-bar-right">
  						<ul class="right-toolbar">
                <!-- <li class="rank" @click="rankItemFn"> -->
  							<li class="rank" hidden>
  								<em></em>
  								<span>排序</span>
  							</li>
  							<li class="return" @click="returnHome">
  								<em></em>
  								<span>返回</span>
  							</li>
  						</ul>
  					</div>
  				</div>
  				<div class="item-cont">
  					<div class="item-box" v-for="item,index in itemListMsgData">
  						<div class="title">
  							<em v-if="item.data.currentType==0" class="normal"></em>
  							<span v-if="item.data.currentType==0">默认</span>
  							<em v-if="item.data.currentType==1" class="type type-one"></em>
  							<span v-if="item.data.currentType==1">导航栏</span>
  							<em v-if="item.data.currentType==2" class="type type-two"></em>
  							<span v-if="item.data.currentType==2">无导航栏</span>
  						</div>
  						<div class="name-cont">
  							{{item.data.name}}
  						</div>
  						<div class="bottom-tooler">
  							<ul class="tool-edit-delete">
  								<li class="tool-item" @click="editItemFn(item.data.currentType,index)">
  									<em v-if="item.data.currentType!=0"></em>
  									<span v-if="item.data.currentType!=0">修改</span>
  								</li>
  								<li class="tool-item" @click="deleteItemFn(item.id)">
  									<em v-if="item.data.currentType!=0"></em>
  									<span v-if="item.data.currentType!=0">删除</span>
  								</li>
  							</ul>
  						</div>
  					</div>

  					<div class="item-box add" @click="showModel">
  						<div class="title">
  							<span>添加栏目</span>
  						</div>
  						<div class="name-cont">
  							<em class="add-cont-different"></em>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>

      <!-- 隐藏的弹出框 -->
      <div class="add-model" v-if="modelShow">
			<div class="add-model-cont">
				<div class="add-model-title">
					<p>{{modelName}}</p>
					<em class="add-model-close" @click="closeModel"></em>
				</div>
				<div class="add-model-type">
					<p class="wid-62">栏目类型</p>
					<p class="title">：</p>
					<div class="type-item" :class="{'active':item.active}" v-for="item,index in typeList" @click="chooseType(index)">
            <img v-if="item.type==1" src="./../../static/img/pic_add_item2.png"/>
            <!-- <img v-if="item.type==1" src="./../assets/img/pic_add_item2.png"/> -->
            <img v-if="item.type==2" src="./../../static/img/pic_add_item3.png"/>
            <!-- <img v-if="item.type==2" src="./../assets/img/pic_add_item3.png"/> -->
						<div class="">
							<em></em>
							<span>{{item.name}}</span>
						</div>
					</div>
				</div>
				<div class="add-model-name">
					<p class="wid-64">名称</p>
					<p>：</p>
					<input type="text" value="" placeholder="请输入栏目名称" v-model="itemName"/>
				</div>
				<div class="add-model-btn">
					<span class="bg-orange" @click="addItemFn">保存</span>
					<span @click="closeModel">返回</span>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    name:'SystemDepartent.vue',
    data(){
      return{
        modelShow:false,
        typeList:[{name:'有导航栏',type:1,active:true},{name:'无导航栏',type:2,active:false}],
        itemName:'',
        chooseitemType:1,
        modelName:'新增',
        saveType:false,     //model框保存按钮功能状态
        changItem:null,      //需要修改的模块的id
        layer:null
      }
    },
    computed:{
      staticUrl(){
        return this.$store.state.staticUrl
      },
      editIndexItemUrl(){
        return this.$store.state.editIndexItemUrl
      },
      itemListMsgData(){
        return this.$store.state.itemListMsgData
      },
      indexItemMsgUrl(){
        return this.$store.state.indexItemMsgUrl
      },
      deleteItemUrl(){
        return this.$store.state.deleteItemUrl
      },
      editIndexItemUrl(){
        return this.$store.state.editIndexItemUrl
      },

    },
    methods:{
      closeModel(){
        this.modelShow = false;
      },


      // 选择模块类型
      chooseType(i){
        for(var z=0;z<this.typeList.length;z++){
          this.typeList[z].active = false;
        }
        this.typeList[i].active = true;
        this.chooseitemType = this.typeList[i].type;
      },


      //修改模块（显示模块的内容）
      editItemFn(i,j){  //i,当前模块的类型，j为当前数据的下标
        this.modelShow = true;
        this.modelName = '修改';
        this.saveType = false;
        this.changItem = this.itemListMsgData[j].id
        for(var z=0;z<this.typeList.length;z++){
          this.typeList[z].active = false;
        };
        if(i==1){
          this.typeList[0].active = true;
        }else if(i==2){
          this.typeList[1].active = true;
        }
        this.itemName = this.itemListMsgData[j].data.name;
      },
      //添加模块显示
      showModel(){
        this.modelShow = true;
        this.modelName = '新增';
        var that = this;
        this.saveType=true;
      },

      // 添加、修改模块(添加模块的排序字段未定义)
      addItemFn(){
        var that = this;
        if(this.saveType==true){  //添加
          var data={
            currentType:this.chooseitemType,
            name:this.itemName
          }
          if(this.itemName==''){
            this.$layer.confirm('请输入模块名称！',{
              title:'小Tip！'
            },function(){
              that.$layer.closeAll();
            })
          }else{
            that.layer = this.$layer.msg('正在添加！',{
              type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
              title: '加载中！',
              shade: true,//是否显示遮罩
              shadeClose: false,//点击遮罩是否关闭
              time:10
            });
            var newData=JSON.stringify(data);
            axios.get(this.staticUrl+this.editIndexItemUrl+'?id=0&data='+newData).then(function (res) {
              if(res.data.error==0){
                that.modelShow = false;
                console.log(res);
                that.loadModel();
              }else if(res.data.error==2){
                that.$layer.alert('登录失效，请重新登录！');
                that.$router.push('/')
              }
            })
          }
        }else if(this.saveType==false){ //修改
          var editData = {
            currentType:this.chooseitemType,
            name:this.itemName
          }
          if(this.itemName==''){
            this.$layer.confirm('请输入模块名称！',{
              title:'小Tip！'
            },function(){
              that.$layer.closeAll();
            })
          }else{
            that.layer = this.$layer.msg('正在修改！',{
              type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
              title: '加载中！',
              shade: true,//是否显示遮罩
              shadeClose: false,//点击遮罩是否关闭
              time:10
            });
            var newData = JSON.stringify(editData)
            axios.get(this.staticUrl + this.editIndexItemUrl+'?id='+this.changItem+'&data='+newData).then(function (res) {
              if(res.data.error==0){
                that.modelShow = false;
                that.itemName='';
                that.loadModel();
              }else if(res.data.error==2){
                that.$layer.alert('登录失效，请重新登录！');
                that.$router.push('/')
              }
            })
          }
        }
      },
      //删除模块
      deleteItemFn(i){
        var that = this;
        var id = i;
        var deletUrl = this.staticUrl + this.deleteItemUrl;
        this.$layer.confirm('确定删除？',{
          title:'小Tip！',
          btn:['删除','取消']
        },function(){
          axios.get(deletUrl+'?id='+id).then(function(res){
            if(res.data.error==0){
              that.$layer.closeAll();
              that.loadModel();
            }else if(res.data.error==2){
              that.$layer.alert('登录失效，请重新登录！');
              that.$router.push('/')
            }
          })
        },function(){
          that.$layer.closeAll();
        })
      },


// 排序保存未作
// ----------------------------------------------
      // 组件的排序；
      rankItemFn(){
        this.$layer.confirm('我要排序！',{
          title:'小Tip！'
        },function(){
          that.$layer.closeAll();
        })
      },
      // 返回首页
      returnHome(){
        this.$store.commit('changeHomeCompFn',0)
      },

      loadModel(){  //加载模块
        var that = this;
        axios.get(this.staticUrl + this.indexItemMsgUrl+'?type=0').then(function(responsed){
          if(responsed.data.error==0){

            that.modelShow = false;
            that.itemName = '';
            console.log(responsed);
            for(var i=0;i<responsed.data.data.length;i++){
              var otherData = JSON.parse(responsed.data.data[i].data);
              responsed.data.data[i].data = otherData;
            }
            that.$store.commit('getAllItemMsgMut',responsed.data.data)
            that.$layer.close(that.layer)
            that.$layer.alert('成功！')
          }
        });
      }
    }
  }
</script>

<style scoped>
.management-container{
  background:#edeef0;
  padding:3rem 0;
}
.item-manage-container{
	width: 76rem;
	box-sizing: border-box;
	background:rgba(255,255,255,1);
	border:1px solid rgba(225,225,225,1);
	box-shadow:0px 0px 0.5rem 0px rgba(102,102,102,0.1);
	border-radius:2px;
	min-height: 34.6rem;
	padding: 0 1.15rem 3rem;
	margin: 0 auto;
}
.item-manage-container .top-bar{
	height: 3rem;
	width: 100%;
	border-bottom: 1px dashed #DCDCDC;
	display: flex;
	justify-content: space-between;
}
p.top-bar-left {
	color: #333;
	font-size: 1.1rem;
	line-height: 3rem;
	position: relative;
	font-weight: normal;
}
p.top-bar-left:before{
	content: '';
	position: absolute;
	width: 0.2rem;
	height: 1.35rem;
	left: -1.2rem;
	top: 50%;
	margin-top: -0.65rem;
	background: #FF7C1C;
}
.right-toolbar{
	display: flex;
}
.right-toolbar>li{
	margin-right: 1.7rem;
}
.right-toolbar>li:last-of-type{
	margin-right: 0;
}
.right-toolbar>li>span{
	color: #999999;
	font-size: 0.9rem;
	line-height: 3rem;
}
.right-toolbar>li:hover span{
	color: #FF7C1C;
}
.right-toolbar>li>em{
	display: inline-block;
	vertical-align: middle;
}
.right-toolbar>li.rank>em{
	width: 0.75rem;
	height: 0.9rem;
	background: url('./../assets/img/icon_add_item_rank.png');
	background-size: 100% 100%;
}
.right-toolbar>li.rank:hover em{
	background: url('./../assets/img/icon_add_item_rank_hover.png');
	background-size: 100% 100%;
}
.right-toolbar>li.save>em{
	width: 0.8rem;
	height: 0.8rem;
	background: url('./../assets/img/icon_add_item_save.png');
	background-size: 100% 100%;
}
.right-toolbar>li.save:hover em{
	background: url('./../assets/img/icon_add_item_save_hover.png');
	background-size: 100% 100%;
}
.right-toolbar>li:hover{
  cursor:pointer;
}
.right-toolbar>li.return>em{
	width: 0.9rem;
	height: 0.8rem;
	background: url('./../assets/img/icon_add_item_return.png');
	background-size: 100% 100%;
}
.right-toolbar>li.return:hover em{
	background: url('./../assets/img/icon_add_item_return_hover.png');
	background-size: 100% 100%;
}
.item-manage-container .item-cont{
	width: 100%;
	box-sizing: border-box;
	padding: 0 0.75rem;
	display: flex;
	flex-wrap: wrap;
}
.item-manage-container .item-cont .item-box{
	width:11.25rem;
	height:9.25rem;
	border:1px solid #E9E9E9;
	border-radius:0.25rem;
	background: #E9E9E9;
	margin: 1rem 1rem 0 0;
}
.item-manage-container .item-cont .item-box:hover{
	background: #FF7C1C;
}
.item-cont .item-box .title{
	width: 100%;
	height: 1.5rem;
}
.item-cont .item-box .title em.normal{
	display: inline-block;
	width: 0.8rem;
	height: 0.7rem;
	background: url('/static/img/icon_add_item_choosetype.png');
  /* background: url('./../static/img/icon_add_item_choosetype.png'); */
	background-size: 100% 100%;
	margin: 0 0.1rem 0 0.8rem;
}
.item-cont .item-box .title em.type{
	display: inline-block;
	width: 0.8rem;
	height: 0.85rem;
	vertical-align: middle;
	margin: 0 0.1rem 0 0.8rem;
}
.item-cont .item-box .title em.type-one{
	background: url('./../assets/img/icon_add_item_type1.png');
	background-size: 100% 100%;
}
.item-cont .item-box .title em.type-two{
	background: url('./../assets/img/icon_add_item_type2.png');
	background-size: 100% 100%;
}

.item-cont .item-box:hover em.normal{
	background: url('./../assets/img/icon_add_item_choosetype_hover.png');
	background-size: 100% 100%;
}
.item-cont .item-box:hover em.type-one{
	background: url('./../assets/img/icon_add_item_type1_hover.png');
	background-size: 100% 100%;
}
.item-cont .item-box:hover em.type-two{
	background: url('./../assets/img/icon_add_item_type2_hover.png');
	background-size: 100% 100%;
}
.item-cont .item-box .title span{
	font-size: 0.9rem;
	color: #999;
	line-height: 1.5rem;
}
.item-cont .item-box:hover span{
	color: #fff;
}
.item-cont .item-box .name-cont{
	height: 6.2rem;
	background: #fff;
	color: #FF7C1C;
	line-height: 6.2rem;
	text-align: center;
	font-weight: normal;
}
.bottom-tooler{
	height: 1.5rem;
}
.bottom-tooler .tool-edit-delete{
	display: flex;
	justify-content: flex-end;
}
.bottom-tooler .tool-edit-delete .tool-item:hover{
	cursor: pointer;
}
.bottom-tooler .tool-edit-delete .tool-item em{
	display: inline-block;
	vertical-align: middle;
}

.bottom-tooler .tool-edit-delete .tool-item:first-of-type em{
	width: 0.8rem;
	height: 0.75rem;
	background: url('./../assets/img/icon_add_item_edit.png');
	background-size: 100% 100%;
}
.item-cont .item-box:hover .tool-item:first-of-type em{
	background: url('./../assets/img/icon_add_item_edit_hover.png');
  background-size:100% 100%;
}
.bottom-tooler .tool-edit-delete .tool-item:last-of-type{
	margin-right: 0.75rem;
}
.bottom-tooler .tool-edit-delete .tool-item:last-of-type em{
	width: 0.7rem;
	height: 0.8rem;
	background: url('./../assets/img/icon_add_item_delete.png');
	background-size: 100% 100%;
	margin-left: 0.8rem;;
}
.item-cont .item-box:hover .tool-item:last-of-type em{
	background: url('./../assets/img/icon_add_item_delete_hover.png');
	background-size: 100% 100%;
}
.bottom-tooler .tool-edit-delete .tool-item span{
	color: #999;
	font-size: 0.9rem;
	line-height: 1.5rem;
}
.item-cont .item-box:hover .tool-edit-delete .tool-item span{
	color: #fff;
}
.item-box.add:hover{
	cursor: pointer;
}
.item-box.add .title span{
	margin-left: 0.4rem;
}
.item-box.add .name-cont{
	box-sizing: border-box;
	padding-top: 1.95rem;
}
.item-box.add .name-cont .add-cont-different{
	width: 2.25rem;
	height: 2.25rem;
	background: url('./../assets/img/icon_add_item_add.png');
	background-size:100% 100% ;
	display: block;
	margin: auto;
}
.item-box:hover .name-cont .add-cont-different{
	background: url('./../assets/img/icon_add_item_add_hover.png');
	background-size:100% 100% ;
}
/* 弹出框样式 */
.add-model{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.62);
}
.add-model-cont{
	width: 36.85rem;
	height: 19.7rem;
	background:rgba(255,255,255,1);
	border-radius:0.25rem;
	margin: 12.65rem auto 0;
	box-sizing: border-box;
	padding: 0 1rem;
}
.add-model-title{
	height: 3rem;
	width: 100%;
	border-bottom: 1px solid #E5E5E5;
	position: relative;
}
.add-model-title>p{
	text-align: center;
	line-height: 3rem;
	font-size: 1.1rem;
	color: #333;
}
.add-model-close{
	display: block;
	position: absolute;
	width: 1.2rem;
	height: 1.15rem;
	background: url('./../assets/img/wrong.png');
	background-size: 100% 100%;
	right: 0;
	top: 1rem;
}
.add-model-close:hover{
	background: url('./../assets/img/hover_wrong.png');
	background-size: 100% 100%;
}
.add-model-type{
	height: 7.3rem;
	width: 100%;
	display: flex;
}

.add-model-type p{
	font-size: 0.7rem;
	color: #666666;
	height: 7.3rem;
	line-height: 7.3rem;
	vertical-align: middle;
  /* width:4rem; */
  white-space:nowrap;
}
.add-model-type p.title{
	margin-right: 1rem;
}
.type-item{
	margin-right: 1.95rem;
}
.type-item img{
	width: 6.1rem;
	height: 4.55rem;
	display: block;
	margin: 1.05rem 0 0;
}
.type-item.active img,.type-item:hover img{
	box-shadow:0px 0px 0.45rem 0px rgba(255,124,28,0.43);
}
.type-item em{
	display: inline-block;
	width: 0.65rem;
	height: 0.65rem;
	background: url('./../assets/img/icon_radio_uncheck.png');
	background-size: 100% 100%;
}
.type-item{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.type-item:hover em,.type-item.active em{
	background: url('./../assets/img/icon_radio_checked.png');
	background-size: 100% 100%;
}
.type-item span{
	color: #999;
	font-size: 0.7rem;
}
.add-model-name{
	display: flex;
}
.add-model-name p{
	text-align-last: justify;
    text-align: justify;
    display: inline-block;
    font-size: 0.7rem;
    color: #666;
    line-height: 1.7rem;
}
.wid-62{
	width: 3.0rem;
}
.wid-64{
	width: 2.7rem;;
}
input{
	width: 31.25rem;
	height: 1.7rem;
	outline: none;
	box-shadow: none;
	border: 1px solid #D2D2D2;
	background: #EDEEF0;
	border-radius:0.1rem;
	box-sizing: border-box;
	padding: 0 0.55rem;
	color: #666;
	font-size: 0.7rem;
}
.add-model-btn{
	width: 100%;
	height: 2rem;
	text-align: center;
	margin-top: 2.65rem;
}
.add-model-btn span{
	width: 5.4rem;
	height: 2rem;
	line-height: 2rem;
	text-align: center;
	color: #fff;
	font-size: 1rem;
	border-radius: 0.1rem;
	display: inline-block;
	background: #CCCCCC;
}
.add-model-btn span:hover{
  cursor: pointer;
}
.add-model-btn span.bg-orange{
	background: #FF7C1C;
	margin-right: 0.5rem;
}
</style>
