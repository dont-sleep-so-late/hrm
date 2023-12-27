import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import "./style/base.css";
import axios from "axios";
import store from "./store";

//引入图标库
import 'font-awesome/css/font-awesome.min.css'

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

Vue.use(ElementUI);

// 设置接口请求的前缀地址
axios.defaults.baseURL = 'http://elms.free.idcfengye.com/'
// 将 axios 挂载到 Vue 上
Vue.prototype.$http = axios


// 全局设置token 
// axios.interceptors.request.use(config => {
//   let token = sessionStorage.getItem('token')
//   if (token) {
//     config.headers['token'] = token
//   }
//   return config
// })


//创建vm
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})