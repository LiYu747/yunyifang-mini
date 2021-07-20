import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

Vue.prototype.$api = require('./apis/family.js')

App.mpType = 'app'

Vue.prototype.baseUrl = "http://192.168.0.102:8765" 

const app = new Vue({
    ...App
})
app.$mount()
