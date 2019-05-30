<template>
  <div class="part_manage_container">
			<div class="part_manage_name_search">
				<span class="name">名称</span>
				<input type="text"value="" @keyup.enter="searchPartmentFn" v-model="searchPartment"/>
				<div class="part_manage_name_search_btn" @click="searchPartmentFn">
					<em></em>
					<span>查询</span>
				</div>
			</div>
			<div class="part_manage_partment">
				<div class="part_manage_partment_left">
					<div class="part_manage_partment_add_part">
						<div class="added" @click="showModel(0)">
							<em class='add-partment'></em>
							<span>添加部门</span>
						</div>
					</div>
					<ul class="partment_list">
						<li class="partment_list_item" v-for="item,index in partmentList">
							<div class="partment_name" @click="getPartmentUser(item.id,index)" :class="{'active':item.isActive}">
								<em class='partment'></em>
								<span>{{item.departname}}</span>
							</div>
							<span class="partment_tool_box" @click="showModel(1,item.id)">添加</span>
							<span class="partment_tool_box" @click="editCurrentItem(item.id,item.departname,0)">修改</span>
							<span class="partment_tool_box col-orange" @click="deleteCurrentFn(item.id)">删除</span>
							<ul class="partment_children_list">
								<li v-for="it,inx in item.zi" :class="{'active':it.isActive}">
									<strong class="icon_part_link"></strong>
									<div class="partment_name" @click="getUserList(index,inx,it.id)" >
										<em class="add-group"></em>
										<span>{{it.departname}}</span>
									</div>
									<span class="partment_tool_box" @click="editCurrentItem(it.id,it.departname,1)">修改</span>
									<span class="partment_tool_box col-orange" @click="deleteCurrentFn(it.id)">删除</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div class="part_manage_partment_right">
					<div class="part_manage_partment_add-part office">
						<div class="added" @click="addGroup">
							<em class="add-user"></em>
							<span>添加成员</span>
						</div>
						<!-- <div class="added">
							<em></em>
							<span>栏目同步</span>
						</div> -->
					</div>
					<div class="part_manage_add_user_cont">
						<span>账号：</span>
						<input type="" name="" id="" value="" v-model="searchUser"/>
						<span>姓名：</span>
						<input type="" name="" id="" value="" v-model="searchName"/>
						<span>状态：</span>
						<div class="sel_select" @click="showSelectList">
							<span>{{currentChecked}}</span>
							<em></em>
              <ul class="sel_select_cont" v-if="selectListShow" @mouseleave="hideSelectList">
                <li class="sel_select_item" @click="chooseSelectTypeFn(index)" v-for="item,index in selectList">{{item}}</li>
              </ul>
						</div>
						<div class="search_user" @click="searchUserFn">
							<em></em>
							<span>查询</span>
						</div>
					</div>
					<table border="" cellspacing="" cellpadding="" v-if="memberList!=null">
						<tr>
							<th class="user_number">账号</th>
							<th class="user_name">用户名</th>
							<th class="user_type">状态</th>
							<th class="user_done">操作</th>
						</tr>
						<tr v-for="item,index in memberList">
							<td>{{item.username}}</td>
							<td>{{item.displayname}}</td>
							<td>{{item.state=="0"?'启用':'禁用'}}</td>
							<td>
                <span @click="editCurrentMember(item.id)">修改</span>
								<span class="delete" @click="deleteCurrentMember(item.username)">删除</span>
							</td>
						</tr>
					</table>
          <div class="no-msg-cont" v-if="!memberList||memberList.length==0">
            <em class="no-msg"></em>
            <p class="none-rest">暂无数据</p>
          </div>
				</div>
			</div>

      <component :is="currentModel" :name="addName" :addType="subType" :addId="subId" @currentShow="currentShowFn" @getMemberList="getMemberListFn"></component>
      <component :is="currentAddModel" :name="editName" :editData="editData" @currentEditShow="currentEditShowFn" @sdsds="getMemberListFn"></component>
		</div>
</template>
<script>
  import SystemAddModel from '@/components/system_management_comp/SystemAddModel'
  import SystemEditModel from '@/components/system_management_comp/SystemEditModel'
  import SystemEditMember from '@/components/system_management_comp/SystemEditMember'
  import SystemAddMember from '@/components/system_management_comp/SystemAddMember'
  import axios from 'axios'
  export default{
    name:'SystemPartment.vue',
    data(){
      return{
        currentModel:'',
        editData:null,
        addType:['aprtment','groups','member'],
        subType:'',
        userListShow:false,
        subId:null,//传递到下级组件的id
        groupId:null,//当前小组的id
        searchPartment:'',//搜索部门
        searchUser:'',//搜索用户
        searchName:'',//搜索姓名
        selectListShow:false,
        selectList:['全部','启用','禁用'],
        currentChecked:'全部',
        memberList:null,//小组成员列表
        editMemberData:null,//修改的小组成员的数据,
        addName:'', //添加模块的名称
        editName:'',//修改模块的名称
      }
    },
    props:{
      clear:{
        type:Boolean,
        required:false
      }
    },
    computed:{
      staticUrl(){
        return this.$store.state.staticUrl
      },
      systemDepartUrl(){
        return this.$store.state.systemDepartUrl
      },
      partmentList(){
        return this.$store.state.partmentList
      },
      userListUrl(){
        return this.$store.state.userListUrl
      },
      userList(){
        return this.$store.state.userList
      },
      systempatmentDelUrl(){
        return this.$store.state.systempatmentDelUrl
      },
      delUser(){
        return this.$store.state.delUser
      },
      currentAddModel(){
        return this.$store.state.currentAddModel
      },
      searchPartmentUrl(){
        return this.$store.state.searchPartmentUrl
      },
      searchUserUrl(){
        return this.$store.state.searchUserUrl
      }
    },
    components:{
      SystemAddModel,
      SystemEditModel,
      SystemEditMember,
      SystemAddMember
    },
    mounted(){
      console.log(this.clear);
      if(this.clear==false){
        this.groupId = null;
      }
    },
    methods:{
      //关闭添加弹出框
      currentShowFn(){
        this.currentModel = ''
      },
      //关闭修改弹出窗
      currentEditShowFn(){
        this.currentEditModel = ''
      },
      //打开弹出框
      showModel(i,j){
        console.log(this);
        this.subType = this.addType[i];
        if(i==0){
          this.addName = '添加部门'
        }
        if(i==1){
          this.addName = '添加小组'
        }
        this.currentModel = 'SystemAddModel';
        if(j){
          this.subId = j
        }
      },

      getUserList(i,j,x){  //x为小组id
        this.groupId = x;
        this.userListShow = true;
        var This = this;
        for(var a=0;a<this.partmentList.length;a++){
          this.partmentList[a].isActive = false;
          for(var b=0;b<this.partmentList[a].zi.length;b++){
            this.partmentList[a].zi[b].isActive = false;
          }
        }
        this.partmentList[i].zi[j].isActive = true;
        this.getMemberListFn();
      },

      //获取成员列表
      getMemberListFn(){
        var This = this;
        axios.get(This.staticUrl+This.userListUrl+'?depart_id='+This.groupId).then(function(res){
          if(res.data.error==0){
            This.memberList = res.data.data
          }
        })
      },

      // 添加小组成员
      addGroup(){
        console.log(this.partmentList);
        for(var j=0;j<this.partmentList.length;j++){
          if(this.partmentList[j].isActive == true){
            this.groupId = this.partmentList[j].id;
          }else{
            for(var z=0;z<this.partmentList[j].zi.length;z++){
              if(this.partmentList[j].zi[z].isActive == true){
                this.groupId = this.partmentList[j].zi[z].id;
              }else{
                this.groupId = null;
              }
            }
          }
        }
        if(this.groupId==null){
          this.$layer.alert('请选择部门或小组！')
        }else{
          var str = 'SystemAddMember'
          this.$store.commit('currentAddModelMut',str)
          this.$store.commit('addMemberMut',this.groupId)
        }
      },


      //显示下拉框
      showSelectList(){
        this.selectListShow = true;
      },

      //隐藏下拉框
      hideSelectList(){
        this.selectListShow = false;
      },
      // 选择下拉框的具体内容
      chooseSelectTypeFn(i){
        this.selectListShow = false;
        this.currentChecked = this.selectList[i];
      },
      //删除部门、小组
      deleteCurrentFn(i){
        var This = this;
        this.$layer.confirm('确定删除？',{
          title:'小Tip！',
          btn:['删除','取消']
        },function(){
          axios.get(This.staticUrl+This.systempatmentDelUrl+'?id='+i).then(function (res) {
            if(res.data.error==0){
              This.$layer.closeAll();
              //传递返回数据
              This.$store.commit('getDepartmentListMut')
              This.$layer.alert('删除成功！')
            }else if(res.data.error==2){
              This.$layer.alert('登录失效，请重新登录！');
              This.$router.push('/')
            }else if(res.data.error==1){
              This.$layer.confirm('该部门、小组下有成员，确定删除？',function () {
                axios.get(This.staticUrl+This.systempatmentDelUrl+'?id='+i+'&&confim=1').then(function (resp) {
                  console.log(resp);
                  if(resp.data.error==0){
                    This.$layer.closeAll();
                    //传递返回数据
                    This.$store.commit('getDepartmentListMut')
                    This.$layer.alert('删除成功！');
                    This.memberList = null;
                    This.groupId = null;
                    console.log(This.groupId);
                  }
                })
              },function () {
                This.$layer.closeAll();
              })
            }
          })
        },function(){
          This.$layer.closeAll();
        })
      },

      //删除成员
      deleteCurrentMember(name){
        var This = this;
        this.$layer.confirm('确定删除？',{
          title:'小Tip！',
          btn:['删除','取消']
        },function(){
          axios.get(This.staticUrl+This.delUser+'?username='+name).then(function (res) {
            console.log(res);
            if(res.data.error==0){
              This.getMemberListFn();
              This.$layer.closeAll();
              //传递返回数据
              This.$layer.alert('删除成功！')
            }
          })
        },function(){
          This.$layer.closeAll();
        })
      },
      //修改部门小组
      editCurrentItem(i,str,j){
        console.log(j);
        if(j==0){
          this.editName = '修改部门'
        }
        if(j==1){
          this.editName = '修改小组'
        }
        var obj = {id:i,name:str};
        this.editData = obj;
        var str = 'SystemEditModel'
        // this.currentAddModel = 'SystemEditModel'
        this.$store.commit('currentAddModelMut',str)
      },

      // -----------------------------------------------------------------------------------------

      //修改小组成员信息
      editCurrentMember(i){
        for(var j=0;j<this.memberList.length;j++){
          if(i==this.memberList[j].id){
            var obj = this.memberList[j];
            this.editMemberData = obj;
          }
        }
        var str = 'SystemEditMember'
        this.$store.commit('editMemberMut',obj);
        this.currentModel = str;
      },
      //搜索部门小组
      searchPartmentFn(){
        var newUrl = this.staticUrl + this.searchPartmentUrl;
        var This = this;
        axios.get(newUrl+'?departname='+this.searchPartment).then(function (res) {
          if(res.data.error==0){
            This.$store.commit('searchPartmenListMut',res.data.data);
            // This.partmentList = res.data.data
          }
        })
        console.log(this.searchPartment);
      },
      searchUserFn(){
        var state;
        var This = this;
        if(this.currentChecked=='全部'){
          state = 2
        }else if(this.currentChecked=='启用'){
          state = 0
        }else if(this.currentChecked=='禁用'){
          state = 1
        }
        var newStr = this.staticUrl + this.searchUserUrl +'?displayname='+this.searchName +'&username='+this.searchUser+'&state='+state;
        axios.get(newStr).then(function (res) {
          if(res.data.error==0){
            This.memberList = res.data.data
          }
        })
      },
      //获取部门成员
      getPartmentUser(i,index){
        for(var j=0;j<this.partmentList.length;j++){
          this.partmentList[j].isActive = false;
          for(var z=0;z<this.partmentList[j].zi.length;z++){
            this.partmentList[j].zi[z].isActive = false;
          }
        }
        this.partmentList[index].isActive = true;
        this.groupId = i;
        this.getMemberListFn();
      }
    },
    destroyed(){
      this.groupId = null;
    }
  }
</script>
<style scoped>
.part_manage_container{
	width: 100%;
}
.part_manage_name_search{
	width: 100%;
	height: 2.35rem;
	background: #EDEEF0;
	border: 1px solid #EDEEF0;
	box-sizing: border-box;
}
.part_manage_name_search .name{
	font-size: 0.9rem;
	color: #333;
	line-height: 2.35rem;
	display: inline-block;
	margin: 0 0.45rem 0 0.8rem;
}
.part_manage_name_search input{
	box-shadow: none;
	outline: none;
	border: 1px solid #D2D2D2;
	border-radius:0.1rem;
	background: #fff;
	font-size: 0.7rem;
	height: 1.75rem;
	width: 12.9rem;
	box-sizing: border-box;
	padding: 2px 0.3rem;
	line-height: 1.75rem;
	margin-right: 0.4rem;
}
.part_manage_name_search_btn{
	width: 4.5rem;
	height: 1.75rem;
	border-radius: 0.1rem;
	background: #FF7C1C;
	text-align: center;
	display: inline-block;
}
.part_manage_name_search_btn:hover{
  cursor:pointer;
}
.part_manage_name_search_btn em{
	display: inline-block;
	width: 0.85rem;
	height: 0.85rem;
	background: url('./../../assets/img/icon_partment_search.png');
	background-size:100% 100%;
	vertical-align: middle;
	margin-bottom: 0.1rem;
}
.part_manage_name_search_btn span{
	color: #fff;
	font-size: 0.9rem;
	line-height: 1.75rem;
	vertical-align: middle;
}
.part_manage_partment{
	width: 100%;
	display: flex;
}
.part_manage_partment_left{
	width: 21.05rem;
	height: 32.55rem;
	overflow: auto;
	border-right:1px solid #E5E5E5;
  overflow-x: hidden;
}
.part_manage_partment_add_part{
	width: 20.15rem;
	height: 3rem;
	margin-top: 0.5rem;
	background: #f5f6fa;
	display: flex;
	align-items: center;
    overflow-x: hidden;
}



/*item样式*/
.added{
	width: 7.05rem;
	height: 2.1rem;
	border:1px solid #e1e6eb;
	background: #f5f5f5;
	margin-left:0.25rem;
}
.added:hover{
	cursor: pointer;
}
/* ----------------------------------------------------------------------------- */
.added>em:hover{
  cursor: pointer;
}
.added>em.add-user{
	display: inline-block;
	width: 0.63rem;
	height: 0.72rem;
	background: url('./../../assets/img/system_add_group.png');
  background-size:100% 100%;
  margin-left:0.5rem;
}

.added>span{
	color: #333;
	font-size: 0.9rem;
	line-height: 2.1rem;
	margin-left: 0.2rem;
}
/*-----------------------*/
.partment_list{
	width: 21.05rem;
	padding-top: 0.2rem;
  max-height:26rem;
  overflow: auto;
}
.partment_list_item{
	margin-top: 0.6rem;
}
.partment_list_item:first-of-type{
	margin-top: 0;
}
.partment_list_item .partment_name{
	height: 2.2rem;
	width: 8.95rem;
	border:1px solid #e1e6eb;
	background: #f5f5f5;
	box-sizing: border-box;
	display: inline-block;
	/*margin-right: 0.6rem;*/
}
.partment_list_item .partment_name:hover,.partment_list_item .partment_name.active{
  border-color: #ff7c1c;
}
/* ---------------------------------------------------------------------- */
.added>em.add-partment{
  display: inline-block;
	width: 0.63rem;
	height: 0.4868rem;
	background: url('./../../assets/img/system_add_team1.png');
  background-size:100% 100%;
  margin-left:0.5rem;
}
/* .added>em.partment{
  display: inline-block;
	width: 0.63rem;
	height: 0.4868rem;
	background: url('./../../assets/img/system_add_tem.png');
  background-size:100% 100%;
  margin-left:0.5rem;
} */
.partment_list_item .partment_name:hover{
  cursor:pointer;
}
.partment_list_item .partment_name em.partment{
	display: inline-block;
	width: 0.63rem;
	height: 0.4868rem;
	background: url('./../../assets/img/system_add_tem.png');
  background-size:100% 100%;
  margin-left:0.5rem;
}
.partment_list_item .partment_name em.add-group{
  display: inline-block;
	width: 0.63rem;
	height: 0.4868rem;
	background: url('./../../assets/img/system_add_group.png');
  background-size:100% 100%;
  margin-left:0.5rem;
}
.partment_list_item .partment_name span{
	color: #333;
	font-size: 0.9rem;
	line-height: 2.1rem;
	margin-left: 0.4rem;
}
.partment_tool_box:hover{
  cursor:pointer;
}
.partment_tool_box{
	width: 3.1rem;
	height: 2.2rem;
	text-align: center;
	line-height: 2.2rem;
	border:1px solid #00c1de;
	color: #00c1de;
	display: inline-block;
	box-sizing: border-box;
	vertical-align: middle;
	margin-right: 0.2rem;
}
.partment_tool_box.col-orange{
	color: #f25721;
	border-color: #f25721;
}
.partment_children_list>li{
	margin-top: 0.3rem;
}
.partment_children_list>li .partment_name:hover,.partment_children_list>li.active .partment_name{
  border-color:#FF7C1C;
}
.partment_children_list>li .partment_name{
	margin-right: 0.3rem;
}
.icon_part_link{
	display: inline-block;
	width: 1rem;
	height: 0.92857rem;
	background: url('./../../assets/img/icon_link_department.png');
  background-size:100% 100%;
	margin-left: 2rem;
}
.part_manage_partment_right{
	width: 30.4rem;
	padding: 0.45rem 0 0 0.6rem;
}
.part_manage_partment_add-part.office{
	height: 3rem;
	width: 30.4rem;
	width: 100%;
	background: #f6f6f7;
	display: flex;
	align-items: center;
	margin-bottom: 0.3rem;
}
.part_manage_partment_add-part.office .added:first-of-type{
	margin-right: 0.4rem;
}
.part_manage_add_user_cont{
	width: 100%;
	background: #f6f6f7;
	height: 3rem;
	display: flex;
	align-items: center;
}
.part_manage_add_user_cont input{
	box-shadow: none;
	outline: none;
	border: 1px solid #D2D2D2;
	border-radius:0.1rem;
	background: #fff;
	font-size: 0.7rem;
	width: 5.1rem;
	height: 2.2rem;
  box-sizing: border-box;
  padding:0 0.6rem;
}
.part_manage_add_user_cont span{
	font-size: 0.9rem;
	color: #333;
	line-height: 2.2rem;
	margin-left: 0.7rem;
}
.sel_select{
	width: 4.4rem;
	height: 2.2rem;
	background: #fff;
  position:relative;
}
.sel_select>span{
	font-size: 0.6rem;
}
.sel_select>em{
	width: 0.7rem;
	height: 0.7rem;
	background: url('./../../assets/img/icon_sanjiao.png');
	background-size:100% 100% ;
	display: inline-block;
	vertical-align: middle;
	margin-left: 0.8rem;
}
.sel_select_cont{
  position:absolute;
}
.sel_select_item{
  width: 4.4rem;
	height: 1.35rem;
	background: #fff;
  font-size:0.7rem;
  line-height: 1.35rem;
  box-sizing: border-box;
  padding-left:0.55rem;
  color:#666;
}
.sel_select_item:hover{
  background:#FF7C1C;
  color:#fff;
}
.search_user{
	width: 4.4rem;
	height: 2.2rem;
	background: #f5f5f5;
	box-sizing: border-box;
	border: 1px solid #e1e6eb;
	margin-left: 0.5rem;
  display:flex;
  align-items: center;
}
.search_user:hover{
  cursor: pointer;
}
.search_user>em{
	display: inline-block;
	width: 1rem;
	height: 1rem;
	background: url('./../../assets/img/icon_user_search.png');
	background-size: 100% 100%;
	margin-left: 0.4rem;
}
.search_user>span{
	margin-left: 0.2rem;
}

/*表格样式*/
table{
	border:solid #EDEEF0;
	border-width:1px 0px 0px 1px;
	margin-top: 0.4rem;
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
.user_number{
	width: 12.7rem;
}
.user_name{
	width: 6.2rem;
}
.user_type{
	width: 3.6rem;
}
.user_done{
	width: 7.9rem;
}
td>span{
	width: 3rem;
	height: 1.8rem;
	text-align: center;
	line-height: 1.8rem;
	font-size: 0.9rem;
	display: inline-block;
	border:1px solid #00c1de;
	color: #00c1de;
}
td>span:hover{
	cursor:pointer
}
td>span.delete{
	color: #f25721;
	border-color:#f25721
}

.col-att-bottom-bar{
	width: 100%;
	height: 2.9rem;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	justify-content: space-between;
	padding: 0 1rem;
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
	/* background: url('./../static/img/icon_no_msg.png'); */
	background-size: 100% 100%;
	margin-bottom: 1.75rem;
}
.no-msg-cont .none-rest{
	color: #CCCCCC;
	font-size: 0.9rem;
	text-align: center;
}
</style>
