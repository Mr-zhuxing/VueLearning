import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
// 安装路由
Vue.use(VueRouter);

// 导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// 引入mint-ui组件
import { Header } from 'mint-ui';
Vue.component(Header.name,Header);  


// 导入自己的路由模块
import router from './router.js'

import app from './App.vue';

var vm = new Vue({
    el:'#app',
    render: c=>c(app),
    router
})