import Vue from 'vue'
import App from './App'

// 导入封装的请求函数
import  request  from './utils/request';
Vue.config.productionTip = false
Vue.prototype.$request = request

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
