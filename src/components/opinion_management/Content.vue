<template>
  <div class="content" v-html="content"></div>
</template>
<script>
  export default{
    name:'Content.vue',
    props:{
      content:{
        type:String,
        require:true
      },
      name:{
        type:String,
        require:false
      }
    },
    mounted(){
      // console.log(this.content);
    }
  }
</script>
<style scoped>
  .content{
    padding:0.3rem 1rem;
    min-height:17.55rem;
    overflow-x: hidden;
  }
  .bg-red{
    color:red
  }
</style>
