<template>
  <div class="add-artical">
    <div class="add-cont">
      <em class="close-add" @click='closeModel'></em>
      <p>{{editData!=null?'修改':'添加'}}</p>
      <div class="add-item-cont">
        <div class="add-item">
          <span class="add-item-tit">属性</span>
          <span class="maohao">:</span>
          <label v-for="item,index in addArticalSetData[0]" @click="chooseCurrentSet(0,index)">
            <em :class="{'active':item.checked}"></em>
            <strong>{{item.name}}</strong>
          </label>
          <!-- <label>

            <em class="active"></em>
            <strong>负面</strong>
          </label>

          <label>
            <em></em>
            <strong>其它</strong>

          </label> -->

        </div>
        <div class="add-item height">
          <span class="add-item-tit">标题</span>
          <span class="maohao">:</span>
          <input class="artical-tital" type="text" v-model="addArticalRequireData.title" id="" value="" placeholder="请输入标题"/>
        </div>
        <div class="add-item height">
          <div class="">
            <span class="add-item-tit">作者</span>
            <span class="maohao">:</span>
            <input class="artical-author" type="text" id="" v-model="addArticalRequireData.author" placeholder="请输入作者名字"/>
          </div>
          <div class="">
            <span class="pub-time">发布时间</span>
            <span class="maohao">:</span>
            <!--嵌入laydate插件-->

            <div class="calendar-cont" style='display:inline-block'>
              <input placeholder="点击选择日期" id="test1" v-model="date">
              <em></em>
            </div>
          </div>
        </div>
        <div class="add-item">
          <span class="add-item-tit">来 源 分 类</span>
          <span class="maohao">:</span>
          <label v-for="item,index in addArticalSetData[1]" @click="chooseCurrentSet(1,index)">
            <em :class="{'active':item.checked}"></em>
            <strong>{{item.name}}</strong>
          </label>
        </div>
        <div class="add-item">
          <span class="add-item-tit">来源权威度</span>
          <span class="maohao">:</span>
          <label v-for="item,index in addArticalSetData[2]" @click="chooseCurrentSet(2,index)">
            <em :class="{'active':item.checked}"></em>
            <strong>{{item.name}}</strong>
          </label>
        </div>
        <div class="add-item">
          <span class="add-item-tit">来 源 类 型</span>
          <span class="maohao">:</span>
          <label v-for="item,index in addArticalSetData[3]" @click="chooseCurrentSet(3,index)">
            <em :class="{'active':item.checked}"></em>
            <strong>{{item.name}}</strong>
          </label>
        </div>
        <div class="add-item height">
          <span class="add-item-tit">媒 体 名 称</span>
          <span class="maohao">:</span>
          <input class="artical-tital" type="" id="" v-model="addArticalRequireData.source_name" placeholder="请输入媒 体 名 称"/>
        </div>
        <div class="add-item height">
          <span class="add-item-tit">U  R  L</span>
          <span class="maohao">:</span>
          <input class="artical-tital" type="" id="" v-model="addArticalRequireData.url" placeholder="请输入URL"/>
        </div>
        <div class="add-item height">
          <span class="add-item-tit">摘要</span>
          <span class="maohao">:</span>
          <input class="artical-tital" type="" id="" v-model="addArticalRequireData.zhaiyao" placeholder="请输入摘要"/>
        </div>
        <!-- <div class="add-item height">
          <span class="add-item-tit">内容</span>
          <span class="maohao">:</span>
          <div class="add-artical-comment" contenteditable="true" data-text="输入留言">
            <p v-model="addArticalRequireData.content1">请输入内容，也可添加音频、视频、图片、PDF</p>
            <div class="add-media-cont">
              <input type="file" class="add-media-file"/>
              <em id="add-media-btn"></em>
            </div>
          </div>
        </div> -->
      </div>
      <div class="add-artical-btn-cont">
        <span class="save" @click='addArticalFn'>{{editData!=null?'修改内容':'添加内容'}}</span>
        <span @click='closeModel'>取消</span>
      </div>
    </div>
  </div>
</template>
<script>
  // import Test from '@/components/Test.vue'
  export default{
    name:'AddArical.vue',
    data(){
      return{
        date:'',
        addArticalSetData:[
          [
            {name:'正面',checked:false},
            {name:'负面',checked:true},
            {name:'其他',checked:true}
          ],
          [
            {name:'中央媒体',checked:false},
            {name:'地方媒体',checked:true},
            {name:'自媒体',checked:true},
            {name:'门户网站',checked:true},
            {name:'行业媒体',checked:true}
          ],
          [
            {name:'一级',checked:false},
            {name:'二级',checked:true},
            {name:'三级',checked:true}
          ],
          [
            {name:'新浪微博',checked:false},
            {name:'APP',checked:true},
            {name:'网站',checked:true},
            {name:'论坛',checked:true},
            {name:'贴吧',checked:true},
            {name:'搜索引擎',checked:true},
            {name:'电子报',checked:true},
            {name:'平煤',checked:true},
            {name:'广播',checked:true},
            {name:'电视',checked:true}
          ]
        ],
        // addArticalRequireData:{
        //   title:'',
        //   authority:'一级',//权威度
        //   zhaiyao:'',//摘要
        //   author:'', //是 string 作者
        //   type:'新浪微博', //是 来源类型
        //   fenlei:'中央媒体',//来源分类
        //   pubdate:'', //是 string 发布时间
        //   content1:'', //是 string 文章内容
        //   url:'', //否 string url
        //   source_name:'', //是 媒体名称
        //   set_neg:0,     //负面
        //   set_other:0,     //其他 0为不，1为是
        //   set_alarm:1,     //正面
        // }
      }
    },
    props:{
      editData:{
        type:Object,
        required:false
      }
    },
    computed:{
      addArticalRequireData(){
        console.log(this.editData);
        var obj = {
          title:'',
          authority:'1',//权威度
          zhaiyao:'',//摘要
          author:'', //是 string 作者
          type:'新浪微博', //是 来源类型
          fenlei:'中央媒体',//来源分类
          pubdate:'', //是 string 发布时间
          content1:'', //是 string 文章内容
          url:'', //否 string url
          source_name:'', //是 媒体名称
          set_neg:0,     //负面
          set_other:0,     //其他 0为不，1为是
          set_alarm:1,     //正面
        };
        if(this.editData!=null){
          obj.title = this.editData.title;
          obj.zhaiyao = this.editData.zhaiyao.zhaiyao;
          obj.author = this.editData.author;
          obj.pubdate = this.editData.pubdate;
          obj.content1 = this.editData.content1;
          obj.url = this.editData.url;
          obj.source_name = this.editData.source_name;
          obj.fenlei = this.editData.fenlei;
          obj.type = this.editData.type;
          obj.authority = this.editData.authority;
          obj.set_neg = this.editData.set_neg;
          obj.set_other = this.editData.set_other;
          obj.set_alarm = this.editData.set_alarm;
          this.date = this.editData.pubdate;
//修改文章
          // for(var i=0;i<this.addArticalSetData[0].length;i++){
          //
          //   this.addArticalSetData[0][i].checked = true;
          // }
          // if(obj.set_neg==1){
          //   this.addArticalSetData[0][1].checked = false;
          // }
          // if(obj.set_other==1){
          //   this.addArticalSetData[0][2].checked = false;
          // }
          // if(obj.set_alarm==1){
          //   this.addArticalSetData[0][0].checked = false;
          // }
          for(var i=0;i<this.addArticalSetData.length;i++){
            for(var j=0;j<this.addArticalSetData[i].length;j++){
              this.addArticalSetData[i][j].checked = true;
              if(i==1){
                if(obj.fenlei==this.addArticalSetData[1][j].name){
                  this.addArticalSetData[1][j].checked = false;
                }
              }
              if(i==3){
                if(obj.type==this.addArticalSetData[3][j].name){
                  this.addArticalSetData[3][j].checked = false;
                }
              }
            }
          }
          if(obj.set_neg==1){
            this.addArticalSetData[0][1].checked = false;
          }
          if(obj.set_other==1){
            this.addArticalSetData[0][2].checked = false;
          }
          if(obj.set_alarm==1){
            this.addArticalSetData[0][0].checked = false;
          }

          if(obj.authority==1){
            this.addArticalSetData[2][0].checked = false;
          }
          if(obj.authority==2){
            this.addArticalSetData[2][1].checked = false;
          }
          if(obj.authority==3){
            this.addArticalSetData[2][2].checked = false;
          }
        }
        return obj;
      }
    },
    mounted() {
      // 使用：执行一个laydate实例
      laydate.render({
        elem: "#test1", // 指定元素
        type: "datetime", // 组件的类型：year,month,time···
        done: value => { // 点击确认执行的回调函数，会把当前选择的时间传入进来
          // 把选择的时间赋值给先前定义好的变量，显示在页面
          this.date = value;
          this.addArticalRequireData.pubdate = value;
        },
        showBottom: true
      });
    },
    // components:{
    //   Test
    // },
    methods:{
      //添加文章设置具体属性、来源分类、权威度分类、来源类型
      chooseCurrentSet(i,j){//i,当前的栏目的index，j具体的item的index
        // if(i!=1){
          for(var z=0;z<this.addArticalSetData[i].length;z++){
            this.addArticalSetData[i][z].checked = true;
          }
          this.addArticalSetData[i][j].checked = false;
        // }
        if(i==0){   //属性
          if(j==0){
            this.addArticalRequireData.set_neg = 0;     //负面
            this.addArticalRequireData.set_other = 0;     //其他 0为不，1为是
            this.addArticalRequireData.set_alarm = 1;
          }else if(j==1){
            this.addArticalRequireData.set_neg = 1;     //负面
            this.addArticalRequireData.set_other = 0;     //其他 0为不，1为是
            this.addArticalRequireData.set_alarm = 0;
          }else{
            this.addArticalRequireData.set_neg = 0;     //负面
            this.addArticalRequireData.set_other = 1;     //其他 0为不，1为是
            this.addArticalRequireData.set_alarm = 0;
          }
        }
        if(i==1){
          this.addArticalRequireData.fenlei = this.addArticalSetData[i][j].name;
        }
        if(i==2){
          // this.addArticalRequireData.authority = this.addArticalSetData[i][j].name
          if(this.addArticalSetData[i][j].name=="一级"){
            this.addArticalRequireData.authority = 1;
          }
          if(this.addArticalSetData[i][j].name=="二级"){
            this.addArticalRequireData.authority = 2;
          }
          if(this.addArticalSetData[i][j].name=="三级"){
            this.addArticalRequireData.authority = 3;
          }
        }
        if(i==3){
          this.addArticalRequireData.type = this.addArticalSetData[i][j].name
        }
      },
      closeModel(){
        this.$emit('closeModelFa')
      },
      addArticalFn(){
        if(this.addArticalRequireData.title==''){
          this.$layer.msg('标题不能为空！',{
            type:3,
            title:'标题不能为空！',
            time:1
          })
        }else if(this.addArticalRequireData.pubdate==''){
          this.$layer.msg('发布时间不能为空！',{
            type:3,
            title:'发布时间不能为空！',
            time:1
          })
        }else if(this.addArticalRequireData.source_name==''){
          this.$layer.msg('媒体名称不能为空！',{
            type:3,
            title:'媒体名称不能为空！',
            time:1
          })
        }else if(this.addArticalRequireData.zhaiyao==''){
          this.$layer.msg('摘要不能为空！',{
            type:3,
            title:'摘要不能为空！',
            time:1
          })
        }else{
          var that = this;
          this.$layer.confirm('请确认属性、分类、权威度、类型是否正确！',function () {
            that.$layer.closeAll();
            that.$store.commit('saveArticalSetMut',that.addArticalRequireData);
            that.$router.push('/addartical')
          },function () {
            that.$layer.closeAll();
          })
        }
      }
    }
  }
</script>
<style>
.add-artical{
  width: 96rem;
  height: 54rem;
  background: rgba(0,0,0,0.62);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
.add-cont{
  width:52.85rem;
  height:34.95rem;
  background:rgba(255,255,255,1);
  border-radius:0.25rem;
  position: absolute;
  top: 50%;
  margin-top: -17.5rem;
  left: 50%;
  margin-left: -26.45rem;
  box-sizing: border-box;
  padding: 0 1rem;
}
.add-cont>p{
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  border-bottom: 1px solid #E5E5E5;
}
.close-add{
  position: absolute;
  display: block;
  width: 1.2rem;
  height: 1.15rem;
  background: url('./../../assets/img/wrong.png');
  background-size: 100% 100%;
  top: 1rem;
  right: 1rem;
}
.close-add:hover{
  background: url('./../../assets/img/hover_wrong.png');
  background-size: 100% 100%;
}
.add-item-cont{
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 1.5rem 0;
}
.add-item-cont .add-item{
  height: 1.9rem;
}
.add-item .add-item-tit{
  width: 3.75rem;
  font-size: 0.7rem;
  color: #666;
  display: inline-block;
  text-align-last: justify;
  text-align: justify;
  white-space: nowrap;
}
.maohao{
  margin-right: 1.5rem;
  display:inline-block;
  height: 1.7rem;
}
.add-item-cont .add-item>label:hover{
  cursor:pointer;
}
.add-item-cont .add-item>label em{
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  background: url('./../../assets/img/icon_radio_checked.png');
  background-size:100% 100%;
  vertical-align: middle;
  margin-left: 0.6rem;
}
.add-item-cont .add-item>label:first-of-type em{
  margin-left: 0;
}
.add-item-cont .add-item>label em.active{
  background: url('./../../assets/img/icon_radio_uncheck.png');
  background-size:100% 100%;
}
.add-item-cont .add-item strong{
  font-size: 0.7rem;
  color: #999;
  line-height: 1.9rem;
  font-weight: 400;
}
.add-item-cont .add-item.height{
  height: 1.7rem;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: space-between;
}
.add-item-cont .add-item.height span{
  line-height: 1.7rem;
}
.add-item-cont .add-item.height input{
  height: 1.7rem;
  padding-left: 0.55rem;
  outline: none;
  border: none;
  border:1px solid rgba(210,210,210,1);
  box-shadow: none;
  box-sizing: border-box;
  background: #EDEEF0;
  font-size: 0.7rem;
  color: #333;
}
.add-item-cont .add-item.height .artical-tital{
  width: 41.7rem;
}
.artical-author{
  width: 15.4rem;
}
.add-item-cont .add-item.height .pub-time{
  color: #666;
  font-size: 0.7rem;
  line-height: 1.7rem;
  display:inline-block;
  height: 1.7rem;
}
.artical-pub-time{
  width: 15.4rem;
}
.add-artical-comment{
  width: 41.7rem;
  height: 7rem;
  background: #EDEEF0;
  overflow: auto;
  display: inline-block;
  box-sizing: border-box;
  padding: 0 0.5rem;
  font-size: 0.7rem;
  color: #ccc;
}
.add-item.height span{
  vertical-align: top;
}
.add-artical-comment>p{
  text-align: left;
  color: #ccc;
  font-size: 0.7rem;
  width: 100%;
  text-wrap: wrap;
}
.add-media-cont{
  width: 1.75rem;
  height: 1.75rem;
  position: relative;
}
.add-media-cont:hover #add-media-btn{
  background: url('./../../assets/img/icon_addmedia_hover.png');
  background-size:100% 100%;
}
.add-artical-comment .add-media-file{
  width: 1.75rem;
  height: 1.75rem;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.add-artical-comment .add-media-file:hover{
  cursor: pointer;
}
.add-artical-comment #add-media-btn{
  width: 1.75rem;
  height: 1.75rem;
  background: url('./../../assets/img/icon_add_img.png');
  background-size:100% 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.add-artical-btn-cont{
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
}
.add-artical-btn-cont span{
  width:5.4rem;
  height:2rem;
  background:#ccc;
  border-radius:0.1rem;
  line-height: 2rem;
  text-align: center;
  color: #FFFFFF;
  font-size: 1rem;
}
.add-artical-btn-cont span:hover{
  cursor: pointer;
}
.add-artical-btn-cont span.save{
  background:rgba(255,124,28,1);
  margin-right: 1rem;
}

.calendar-cont{
  height: 1.7rem;
  position:relative;
  display: flex;
  align-items: center;
  height: 100%;
  width:13.2rem;
}
.calendar-cont span{
  font-size: 0.7rem;
  color: #666;
  margin-right: 0.35rem;
}
.calendar-cont input{
  outline: none;
  box-shadow: none;
  border:none;
  width:13.2rem;
  height: 1.7rem;
  box-sizing: border-box;
  padding:0.55rem;
  font-size:0.7rem;
}
.calendar-cont em{
  display:block;
  width:0.8rem;
  height:0.75rem;
  background-image: url('./../../assets/img/icon_calendar.png');
  position:absolute;
  top:50%;
  margin-top:-0.375rem;
  right:0.45rem;
  background-size: 100% 100%;
}
</style>
