<template>
  <div class="index-container">
			<div class="conts">
          <component :is="current[0]"></component>
          <component :is="current[1]"></component>
          <component :is="current[3]"></component>

          <component :search="item.set" :is="current[2]" :typeData="item.data.currentType" :key="item.id" :itemId="item.id" :itemName="item.data.name" v-for="item in unfixedItems"></component>
			</div>
		</div>
</template>


<script>
    import Public from '@/components/indexcomp/Public'
    import Analyze from '@/components/indexcomp/Analyze'
    import HumanOpinion from '@/components/indexcomp/HumanOpinion'
    import Summary from '@/components/indexcomp/Summary'
    export default {
        name: "IndexCont.vue",
        data(){
          return{
            current:['Analyze','Summary','Public','HumanOpinion'],
            type:[1,0,2],  //0没有导航栏
            currentModel:'',
            huamanTitle:'人物舆情',
            timer:null,
            timer1:null,
            layer:null,
            timer2:null,
          }
        },

        computed:{
          todayAnalData(){
            return this.$store.state.todayAnalData
          },
          holItems(){
            return this.$store.state.itemListMsgData.length;
          },
          unfixedItems(){
            return this.$store.state.unfixedItems
          },
          timimgMsgData(){
            return this.$store.state.timimgMsgData
          },
          articalRequire(){
            return this.$store.state.articalRequire
          },
          humanMsg(){
            return this.$store.state.humanMsg
          },
          getArticalListType(){
            return this.$store.state.getArticalListType
          }
        },
        mounted(){
          var that = this;
          this.timer = setInterval(function () {
            that.$store.commit('getTimingMsgMut');
          },3000)
        },
        components:{
          Analyze,
          Public,
          Summary,
          HumanOpinion
        },

        destroyed(){
          console.log('我被注销了！！！！');
          clearInterval(this.timer,this.timer1)
        }
    }
</script>

<style scoped>
.index-container{
background: #edeef0;
width: 100%;
height: 100%;
box-sizing: border-box;
padding: 3rem 10rem;
}
.index-container .conts{
display: flex;
flex-wrap: wrap;
width: 76rem;
margin: auto;
justify-content: space-between;
}


</style>
