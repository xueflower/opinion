// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from "./store/store"
import echarts from 'echarts'
import './assets/js/common.js'
import './assets/js/jquery-2.0.3.min.js'
import './assets/js/json2.js'
import './assets/js/laydate.js'
import layer from 'vue-layer'
import axios from 'axios'

// 全局引入富文本编辑器
// import initRichText from './assets/editor/initHTMLEditor.js'
import VueHtml5Editor from 'vue-html5-editor'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Vuex);
Vue.use(VueHtml5Editor, {
        showModuleName: true,
        image: {
            sizeLimit: 300 * 300,
            compress: null,
            width: 500,
            height: 500,
            quality: 80,
            upload:{
              url:'http://192.168.7.6/wr/branches/dev/frontend/web/index.php/content/upload',
              headers: {},
              params: {
                  ext:'png'
              },
              fieldName: 'file'// 需要修改的地方
            },
            uploadHandler(responseText){
    //      default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
              // return data
              console.log(responseText);
              // var json = JSON.parse(responseText);
              console.log(JSON.stringify(responseText));
              console.log(json);
              if(json.error == 0){
                  return json.data
                  console.log(json);
              }
          }
        },
        language: "zh-cn",
        visibleModules: [
          "font",
          "align",
          "image",
          "undo",
        ],
    })
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$layer = layer(Vue, {
    msgtime: 3,//目前只有一项，即msg方法的默认消失时间，单位：秒
});
// Vue.prototype.$ajax = axios
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
