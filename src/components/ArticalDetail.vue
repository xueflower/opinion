<template>
  <div class="">
    <component :is="tab"></component>
    <div class="artical-detail">
      <div class="container">
        <div class="nav-cont">
          <em></em>
          <span>舆情信息管理＞</span>
          <strong>详情</strong>
        </div>
        <div class="artical-container">
          <div class="artical-comment">
            <div class="artical-tital">
              <p>{{articalDetailData.title}}</p>
              <span>{{articalType}}  |  发布时间：{{articalDetailData.pubdate}}  |  来源：{{articalDetailData.source_name}}</span>
            </div>
            <div class="artical-info">
              <div class="artical-yaosu">
                <span>文章要素：</span>
                <strong v-for="item,index in articalDetailData.keyword" @click="showKey(item)">{{' '+item}}</strong>
                <strong @click="showKey(more)">{{more}}</strong>
                <span class="yaosu">负面要素：</span>
                <em v-for="item,index in articalDetailData.negarray" @click="showNeg(item)">{{item}}</em>
              </div>
              <div class="link">
                <span>原文地址：</span>
                <a :href="articalDetailData.url" target="_blank">{{articalDetailData.url}}</a>
              </div>

              <!-- 文章内容显示区 -->
              <!-- <div class="artical-content">
                <div v-html='content1'></div>
              </div> -->
              <Content :content="contentData" :name="name"></Content>

            </div>
          </div>
          <div class="artical-tool">
            <p>功能</p>
            <div class="tool-box">
              <p>常用</p>
              <div class="tooler">
                <div class="tooler-box collect" @click="setCollect(0,articalDetailData.id,articalDetailData.is_soucang)" :class="{'active':articalDetailData.is_soucang==1}">
                  <em></em>
                  <p>收藏</p>
                </div>
                <div class="tooler-box attention" @click="setCollect(1,articalDetailData.id,articalDetailData.is_guanzhu)" :class="{'active':articalDetailData.is_guanzhu==1}">
                  <em></em>
                  <p>关注</p>
                </div>
              </div>
            </div>
            <div class="tool-box">
              <p>属性</p>
              <div class="tooler">
                <div class="tooler-box negative" @click="setArticalTypeFn(articalDetailData.id,1)" :class="{'active':articalDetailData.set_alarm==1}">
                  <em></em>
                  <p>置为正面</p>
                </div>
                <div class="tooler-box danger" @click="setArticalTypeFn(articalDetailData.id,2)" :class="{'active':articalDetailData.set_neg==1}">
                  <em></em>
                  <p>置为负面</p>
                </div>
                <div class="tooler-box tooler-box-other" @click="setArticalTypeFn(articalDetailData.id,3)" :class="{'active':articalDetailData.set_other==1}">
                  <em class="other"></em>
                  <p>置为其它</p>
                </div>
              </div>
            </div>
            <div class="tool-box">
              <p>其他</p>
              <div class="tooler">
                <div class="tooler-box delete" @click='deleteArticalFn(articalDetailData.id)'>
                  <em></em>
                  <p>文章删除</p>
                </div>
                <div class="tooler-box edit" @click="editArticalFn(articalDetailData.id)">
                  <em></em>
                  <p>修改</p>
                </div>
                <div class="tooler-box add" @click="addArticalShowFn">
                  <em></em>
                  <p>添加</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!--弹出层高度问题-->
      <component :is="current" @closeModelFa="closeModelFn" :editData="editData"></component>
    </div>
    <div class="footer">
      <span>重庆声光电智联电子有限公司 版权所有</span>
      <img @mouseenter='enter()' @mouseleave="leave()" src="./../assets/img/icon_code.png" alt="">

      <div class="fix-img-box" :class="{'active':codeShow}">
        <img src="./../assets/img/index_big_code.png">
        <p>微信关注“天下智博”</p>
      </div>
    </div>
  </div>
</template>

<script>

    import AddArtical from '@/components/opinion_management/AddArtical'
    import Test from '@/components/Test'
    import TabBar from '@/components/TabBar'
    import Content from '@/components/opinion_management/Content'
    import axios from 'axios'
    export default {
        name: "ArticalDetail.vue",
        data() {
          return {
            date1:'',
            addArticalShow:false,
            current:'',
            editData:null,
            layer:null,
            // articalType:null
            content1:this.$store.state.articalDetailData.content1,
            tab:'TabBar',
            codeShow:false,
            name:'',
            contentData:this.$store.state.articalDetailData.content1,
            articalDetailData:this.$store.state.articalDetailData
          };
        },

        computed:{
          // articalDetailData(){
          //   return this.$store.state.articalDetailData;
          // },
          articalType(){
            if(this.articalDetailData.set_neg==1){
              return '负面'
            }else if(this.articalDetailData.set_other==1){
              return '其它'
            }else{
              return '正面'
            }
          },
          articalUrl(){
            return this.$store.state.articalDetailData.url
          },
          staticUrl(){
            return this.$store.state.staticUrl
          },
          setArticalTypeUrl(){
            return this.$store.state.setArticalTypeUrl
          },
          deleteArticalUrl(){
            return this.$store.state.deleteArticalUrl
          },
          articalRequire(){
            return this.$store.state.articalRequire
          },
          articalDetailUrl(){
            return this.$store.state.articalDetailUrl
          },
          collectUrl(){
            return this.staticUrl + this.$store.state.collectUrl
          },
          attentionUrl(){
            return this.staticUrl + this.$store.state.attentionUrl
          },
          more(){
            return localStorage.getItem('searchContent');
          }

        },
        components:{
          AddArtical,
          Test,
          TabBar,
          Content
        },
        watch:{
          articalDetailData:{
            handler(newValue){
              this.$layer.close(this.layer);
              this.$layer.msg('成功！',{
                type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                title: '成功！',
                shade: true,//是否显示遮罩
                shadeClose: false,//点击遮罩是否关闭
                time:1
              })
            },
            deep:true
          }
        },
        mounted(){
          // var showAdd = localStorage.getItem('showAdd');
          // if(showAdd){
          //   this.current = 'AddArtical';
          // }else{
          //   this.current = ''
          // }
        },
        methods:{
          //标记文章要素
          showKey(name){
            // console.log(name);
            this.name = name;
            var str = this.content1;
            // console.log(this.content1);
            var arr = str.split(name);
            this.contentData = arr.join("<span style='color:red'>"+name+"</span>")
            // console.log(this.contentData);
          },
          // //标记负面要素
          // showNeg(str){
          //   console.log(str);
          // },
          //
          //
          //
          // 收藏
          setCollect(t,i,z){
            var otherUrl;
            var sets
            if(t==0){
              otherUrl = this.collectUrl
            }else if(t==1){
              otherUrl = this.attentionUrl
            }

            if(z==0){
              sets = 1
            }else if(z==1){
              sets = 0
            }

            var that = this;
            this.layer = this.$layer.msg('请稍等！',{
              type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
              title: '请稍等！',
              shade: true,//是否显示遮罩
              shadeClose: false,//点击遮罩是否关闭
              time:100
            });
            var type;
            axios.get(otherUrl+'?id=['+i+']&set='+sets).then(function(res){
              if(res.data.error==0){
                var artical = that.$store.state.staticUrl + that.$store.state.articalDetailUrl;
                axios.get(artical+'?id='+i).then(function(resp){
                  console.log(resp);
                  if(resp.data.error==0){
                    that.articalDetailData=resp.data.data
                    that.$layer.close(that.layer)
                    that.$layer.closeAll();
                  }
                })
              }
            })
          },
          // //关注
          // setAttention(i,z){
          //   var data={
          //     id:[i],
          //     set:z
          //   }
          //   this.layer = this.$layer.msg('添加中！',{
          //     type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          //     title: '请稍等！',
          //     shade: true,//是否显示遮罩
          //     shadeClose: false,//点击遮罩是否关闭
          //     time:100
          //   });
          //   // this.$store.commit('setAttenMut',data)
          // },

          // 设置文章预警、负面、其他
          setArticalTypeFn(i,j){ //i——文章id,j设置为具体的类型 1预警，2负面，3其他;z是否设置 0取消，1设置
            var This = this;
            this.layer = this.$layer.msg('设置中！',{
              type: 3, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
              title: '请稍等！',
              shade: true,//是否显示遮罩
              shadeClose: false,//点击遮罩是否关闭
              time:100
            });
            var set ;
            if(j==1){
              if(this.articalDetailData.set_alarm==null||this.articalDetailData.set_alarm==0){
                set=1;
              }else{
                set=0;
              }
            }else if(j==2){
              if(this.articalDetailData.set_neg==null||this.articalDetailData.set_neg==0){
                set=1;
              }else{
                set=0;
              }
            }else if(j==3){
              if(this.articalDetailData.set_other==null||this.articalDetailData.set_other==0){
                set=1;
              }else{
                set=0;
              }
            }
            var obj = {id:[i],type:j,setType:set};
            axios.get(this.$store.state.staticUrl+this.$store.state.setArticalTypeUrl+'?id=['+i+']&type='+obj.type+'&set='+obj.setType).then(function(res){
              if(res.data.error==0){
                var artical = This.$store.state.staticUrl + This.$store.state.articalDetailUrl;
                axios.get(artical+'?id='+i).then(function(resp){
                  if(resp.data.error==0){
                    This.articalDetailData=resp.data.data
                    This.$layer.close(This.layer)
                    This.$layer.closeAll();
                  }
                })
              }
            })
          },


          deleteArticalFn(i){
            var This = this;
            this.$layer.confirm('确定删除？',{
              title:'小Tip！',
              btn:['删除','取消']
            },function(){
              This.$layer.msg('请稍等！',{
                title:'请稍等！',
                type:3,
                time:2
              })
              axios.get(This.staticUrl+This.deleteArticalUrl+'?id=['+i+']').then(function (res) {
                if(res.data.error==0){
                  This.$layer.closeAll();
                  This.$layer.msg('删除成功！',{
                    title:'删除成功！',
                    type:3,
                    time:1
                  })
                  This.$store.commit('getArticalFnMut',This.articalRequire)
                  This.$store.commit('toArticalListMut')
                  This.$router.push('/home');
                }else if(res.data.error==2){
                  This.$layer.alert('登录失效，请重新登录！');
                  This.$router.push('/')
                }
              })
            },function(){
              This.$layer.closeAll();
            })
          },

          //添加文章弹出模态框
          addArticalShowFn(){
            this.current = 'AddArtical';
            this.editData = null;
            this.$store.commit('getEditArticalIdMut',null)
          },
          //关闭添加文章的弹出框
          closeModelFn(){
            this.current = '';
            localStorage.removeItem('showAdd');
          },
          //修改文章
          editArticalFn(i){
            this.current = 'AddArtical';
            console.log(this.articalDetailData);
            // this.articalDetailData.zhaiyao = this.articalDetailData.zhaiyao.zhaiyao;
            this.editData = this.articalDetailData;
            console.log(this.editData);
            // this.editData.zhaiyao = this.articalDetailData.zhaiyao.zhaiyao;
            this.$store.commit('getEditArticalIdMut',i);
            localStorage.setItem('showAdd',true);
          },
          enter: function () {
            this.codeShow = true;
          },
          leave: function () {
            this.codeShow = false;
          },
          //
          //添加文章设置具体属性、来源分类、权威度分类、来源类型
          // chooseCurrentSet(i,j){//i,当前的栏目的index，j具体的item的index
          //   for(var z=0;z<this.addArticalSetData[i].length;z++){
          //     this.addArticalSetData[i][z].checked = true;
          //   }
          //   this.addArticalSetData[i][j].checked = false;
          //   // var addArticalRequireData = addArticalRequireData
          //   if(i==0){   //属性
          //     if(j==0){
          //       this.addArticalRequireData.set_neg = 0;     //负面
          //       this.addArticalRequireData.set_other = 0;     //其他 0为不，1为是
          //       this.addArticalRequireData.set_alarm = 1;
          //     }else if(j==1){
          //       this.addArticalRequireData.set_neg = 1;     //负面
          //       this.addArticalRequireData.set_other = 0;     //其他 0为不，1为是
          //       this.addArticalRequireData.set_alarm = 0;
          //     }else{
          //       this.addArticalRequireData.set_neg = 0;     //负面
          //       this.addArticalRequireData.set_other = 1;     //其他 0为不，1为是
          //       this.addArticalRequireData.set_alarm = 0;
          //     }
          //   }else if(i==1){
          //
          //   }
          // },


          // 添加文章
          // addArticalRequireData:{
          //   title:'',
          //   authority:'',//权威度
          //   zhaiyao:'',//摘要
          //   author:'', //是 string 作者
          //   carry:'', //是 string 载体
          //   type:'', //是 string 类型
          //   pubdate:'', //是 string 发布时间
          //   content1:'', //是 string 文章内容
          //   url:'', //否 string url
          //   source_name:'', //是 string 来源
          //   set_neg:0,     //负面
          //   set_other:0,     //其他 0为不，1为是
          //   set_alarm:1,     //预警
          // }
          addArticalFn(){
            console.log(11111);//addArticalRequireData
          },
          // currentModelFn(str){
          //   console.log(str);
          //   this.current=str
          // }
        }
    }
</script>

<style scoped>
.artical-detail{
	width: 100%;
	height: 100%;
	background: #edeef0;
}
.artical-detail .container{
	width: 76rem;
	margin: auto;
}
.artical-detail .container .nav-cont{
	height: 3rem;
}
.artical-detail .container .nav-cont em{
	display: inline-block;
	width: 0.1rem;
	height: 0.75rem;
	background: #FF7C1C;
	vertical-align: middle;
}
.artical-detail .container .nav-cont span{
	margin-left: 0.6rem;
	font-size: 0.8rem;
	color: #999;
	line-height: 3rem;
}
.artical-detail .container .nav-cont strong{
	font-size: 0.8rem;
	color: #666;
	line-height: 3rem;
}
.artical-container{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
  margin-bottom:2rem;
}
.artical-container .artical-comment{
	width: 53.95rem;
	border:1px solid #E1E1E1;
	/* height: 58.35rem; */
	box-shadow:0px 0px 0.5rem 0px rgba(102,102,102,0.1);
	background: #fff;
	padding: 1rem;
	box-sizing: border-box;
}
.artical-comment .artical-tital{
	height: 5.6rem;
	width: 100%;
}
.artical-comment .artical-tital p{
	color: #333;
	font-size: 1.3rem;
	font-weight: 500;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.artical-comment .artical-tital span{
	font-size: 0.7rem;
	color: #999;
}
.artical-comment .artical-info{
	width:51.9rem;
	/* height:3.85rem; */
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 0.75rem 0px rgba(15,21,33,0.1);
	box-sizing: border-box;
	padding-top: 0.7rem;
}
.artical-comment .artical-info span{
	font-size: 0.7rem;
	color: #999;
	line-height: 1.4rem;
}
.artical-comment .artical-info strong{
	color: #30AFFF;
	font-size: 0.7rem;
	line-height: 1.4rem;
  margin-right:0.4rem;
}
.artical-comment .artical-info em{
	font-size: 0.7rem;
	color: #F03612;
	line-height: 1.4rem;
}
.artical-yaosu{
	display: flex;
	justify-content: center;
}
.artical-yaosu strong,.artical-yaosu em:hover{
  cursor:pointer;
}
.yaosu{
	margin-left: 2rem;
}
.link {
  width:60%;
  height: 2.1rem;
	text-align: center;
  margin:auto;
  display:flex;
  align-items: center;
  justify-content: center;
}
.link a,.link span{
	color: #999;
	font-size: 0.7rem;
  line-height: 2.1rem;
}
.link a{
	/* text-decoration: underline; */
  display:inline-block;
  width:15rem;
  height: 100%;
  overflow: hidden;/*超出部分隐藏*/
  text-overflow:ellipsis;/* 超出部分显示省略号 */
  white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.link:hover span,.link:hover a{
  color:rgba(255,124,28,1);
  text-decoration: underline;
}
.artical-tool{
	width:21.6rem;
	height:21.95rem;
	background:rgba(255,255,255,1);
	border:1px solid rgba(225,225,225,1);
	box-shadow:0px 0px 0.5rem 0px rgba(102,102,102,0.1);
	border-radius:0.1rem;
	box-sizing: border-box;
	padding: 0 1rem;
}
.artical-tool>p{
	font-size: 1.1rem;
	color: #333;
	height: 3.2rem;
	line-height: 3.2rem;
	font-weight: 600;
	border-bottom: 1px solid #E5E5E5;
}
.artical-tool .tool-box p{
	font-size: 0.8rem;
	color: #666666;
	height: 2rem;
	line-height: 2rem;
}
.tooler-box{
	width: 4.5rem;
	height: 3.6rem;
	background: #F5F5F5;
	margin-right: 0.5rem;
	display: inline-block;
	box-sizing: border-box;
	padding-top: 0.4rem;
}
.tooler-box:last-of-type{
	margin-right: 0;
}
.tooler-box em{
	display: block;
	margin: 0 auto;
}
.tooler-box>p{
	color: #666;
	font-size: 0.7rem;
	text-align: center;
}
.tooler-box.collect em{
	width: 1.5rem;
	height: 1.5rem;
	background: url('./../assets/img/icon_collect.png');
	background-size: 100% 100%;
}
.tooler-box.collect:hover em,.tooler-box.collect.active em{
	background: url('./../assets/img/icon_collect_ye.png');
	background-size: 100% 100%;
}

.tooler-box.attention em{
	width: 1.65rem;
	height: 1.45rem;
	background: url('./../assets/img/icon_attention.png');
	background-size: 100% 100%;
}

.tooler-box.attention:hover em,.tooler-box.attention.active em{
	background: url('./../assets/img/icon_attention_yet.png');
	background-size: 100% 100%;
}


.tooler-box.danger em,
.tooler-box.negative em{
	width: 1.75rem;
	height: 1.65rem;
	background: url('./../assets/img/icon_danger.png');
	background-size:100% 100% ;
}

.tooler-box.danger:hover em,
.tooler-box.danger.active em{
	background: url('./../assets/img/icon_danger_yet.png');
	background-size:100% 100% ;
}

.tooler-box.negative:hover em,
.tooler-box.negative.active em{
	background: url('./../assets/img/icon_nagetive_yet.png');
	background-size:100% 100% ;
}

.other{
	width: 1.05rem;
	height: 0.25rem;
	background: url('./../assets/img/icon_other.png');
	background-size:100% 100% ;
	margin-bottom: 0.8rem;
}
.tooler-box-other:hover em,.tooler-box-other.active em{
	background: url('./../assets/img/icon_other_yet.png');
	background-size:100% 100% ;
}
.tooler-box-other{
	padding-top: 1.8rem;
}
.delete em{
	width: 1.4rem;
	height: 1.5rem;
	background: url('./../assets/img/icon_deleteartical.png');
	background-size:100% 100% ;
}
.delete:hover em,.delete.active em{
	background:url('./../assets/img/icon_delete_yet.png');
	background-size:100% 100% ;
}

.edit em{
	width: 1.75rem;
	height: 1.5rem;
	background: url('./../assets/img/icon_edit.png');
	background-size:100% 100% ;
}
.edit:hover em,.edit.active em{
	background:url('./../assets/img/icon_edit_yet.png');
	background-size:100% 100% ;
}

.add em{
	width: 1.35rem;
	height: 1.5rem;
	background: url('./../assets/img/icon_addartical.png');
	background-size:100% 100% ;
}
.add:hover em,.add.active em{
	background:url('./../assets/img/icon_add_yet.png');
	background-size:100% 100% ;
}





/*
 * ----------------------------------------------------------------------
 * 明天继续
 *
 * */

/* 文章详情content */
.artical-content{
  /* height: 45rem; */
  line-height: 1.8rem;
  margin-top:2rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
}
.artical-content>p{
  height: 43rem;
  overflow: hidden;
}
.footer {
  width: 100%;
  height: 5rem;
  background: #141414;
  position: relative;
}

.footer span {
  font-size: 0.9rem;
  color: #fff;
  line-height: 5rem;
  margin-left: 40.02rem;
}

.footer img {
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.footer > img:hover {
  transform: scale(1.1)
}

.fix-img-box {
  display: none;
  position: absolute;
  width: 9.2rem;
  height: 10.3rem;
  /* background: url('./../assets/img/bg_index_erweicode.png'); */
  background: url('./../../static/img/bg_index_erweicode.png');
  background-size: 100% 100%;
  text-align: center;
  top: -8.6rem;
  right: 34.37rem;
}

.fix-img-box.active {
  display: block;
}

.fix-img-box > img {
  width: 6.6rem;
  height: 6.6rem;
  margin: 1.25rem auto 0.3rem;
}

.fix-img-box > p {
  color: #FF7C1C;
  font-size: 0.7rem;
  text-align: center;
}
.bg-red{
  color:blue
}
</style>
