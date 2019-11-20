import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
// 加载nprogress样式的文件
import 'nprogress/nprogress.css'
// 配置 axios 自定义后端数据转换规则
import JSONbig from 'json-bigint'
// 文本格式化 优化  第三方工具
import moment from 'moment'
// axios  会默认把后端 返回的数据使用json.parse转为对象给我们使用
// 同时也提供了自定义转化功能供我们使用
axios.defaults.transformResponse = [function (data, headers) {
  // 所有请求返回的数据都会 JSONbig.parse  转一下
  // 删除操作  返回来的是   空数据  没有响应体    转化就会报错
  // 把导致出错的代码放到try里面   把出错的之后的代码处理放到  catch
  try {
    return JSONbig.parse(data)
  } catch (err) {
    // 一旦 try里面代码执行错误 区catch
    return {}
  }
}]
// axios  请求拦截器
axios.interceptors.request.use(function (config) {
  // config是本次请求的相关的配置对象
  // config 是发给后端的最终数据
  // 我们可以对cofig进行统一配置
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
// 全局过滤器 参数一 过滤器名称   参数二 函数  参数三format  不传参 默认 为 它
// 调用方式  在模板中  {{数据 | 过滤器名称}}
Vue.filter('dateformat', (item, format = 'YYYY-MM-DD') => {
  return moment(item).format(format)
})
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

Vue.use(ElementUI)
// 是否为生产环境
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
