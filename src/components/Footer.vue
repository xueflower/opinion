<template>
  <div class="footer">
    <span>重庆声光电智联电子有限公司 版权所有</span>
    <img @mouseenter='enter()' @mouseleave="leave()" src="./../assets/img/icon_code.png" alt="">

    <div class="fix-img-box" :class="{'active':codeShow}">
      <img src="./../assets/img/index_big_code.png">
      <p>微信关注“天下智博”</p>
    </div>
  </div>
</template>
<script>
  export default{
    name:'Footer.vue',
    data(){
      return{
        codeShow:false,
      }
    },
    methods:{
      enter: function () {
        this.codeShow = true;
      },
      leave: function () {
        this.codeShow = false;
      },
    }
  }
</script>
<style scoped>
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
</style>
