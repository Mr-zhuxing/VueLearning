import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
// 安装路由
Vue.use(VueRouter);

// 2.1导入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);



// 导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// 引入mint-ui组件
import { Header, Swipe, SwipeItem} from 'mint-ui';
Vue.component(Header.name,Header);  
Vue.component(Swipe.name,Swipe); 
Vue.component(SwipeItem.name,SwipeItem); 


// 导入自己的路由模块
import router from './router.js'

import app from './App.vue';





var vm = new Vue({
    el:'#app',
    render: c=>c(app),
    router
})