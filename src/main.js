import Vue from 'vue';

// 导入mui的样式
import './lib/mui/css/mui.min.css'

// 引入mint-ui组件
import { Header } from 'mint-ui';
Vue.component(Header.name,Header);  


import app from './App.vue';

var vm = new Vue({
    el:'#app',
    render: c=>c(app)
})