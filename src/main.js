import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'
// 加载nprogress样式的文件
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

Vue.use(ElementUI)
// 是否为生产环境
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
