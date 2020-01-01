import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
// 安装路由
Vue.use(VueRouter);

// 导入Vuex
import Vuex from 'vuex';
// 安装Vuex
Vue.use(Vuex);
//每次进入网站会初始化
var car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
  state: {
    car: car, //  购物车数组中的对象 {id,count,price,selected};
  },
  mutations: {
    addToCar(state, goodsinfo) {
      var flag = false;
      flag = state.car.some((item) => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          return true;
        }
      })
      if (!flag) {
        state.car.push(goodsinfo);
      }
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsInfo(state, goodsinfo) {
      //修改购物车商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true
        }
      })
      //修改完数量要保存本地
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      // 根据id，从store中删除商品数据
      state.car.some((item, index) => {
        if (item.id == id) {
          state.car.splice(index, 1);
          localStorage.setItem("car", JSON.stringify(state.car));
          return true;
        }
      })
    },
    updateGoodsSelected(state, info) {
      state.car.forEach(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
        }
      });
      localStorage.setItem("car", JSON.stringify(state.car));
    }
  },
  getters: {
    getCarCount(state) {
      var count = 0;
      state.car.forEach((item) => {
        if (item.selected == true)
          count += item.count;
      })
      return count;
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count;
      });
      return o;
    },
    getGoodsSelected(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      })
      return o;
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0,
        amount: 0,
      };
      state.car.forEach(item => {
        if (item.selected == true) {
          o.amount += item.count * item.price;
          o.count += item.count;
        }
      });
      return o;
    }
  },
})

import moment from 'moment';
//定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
})

// 2.1导入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
// 设置默认请求接口路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;


// 导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// 引入mint-ui组件
// import { Header, Swipe, SwipeItem,Button,Lazyload} from 'mint-ui';
// Vue.component(Header.name,Header);  
// Vue.component(Swipe.name,Swipe); 
// Vue.component(SwipeItem.name,SwipeItem); 
// Vue.component(Button.name,Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装缩略图插件
import VuePreview from 'vue-preview'
// defalut install
// Vue.use(VuePreview)
// with parameters install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {
    top: 0,
    bottom: 0
  },
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})






// 导入自己的路由模块
import router from './router.js'

import app from './App.vue';

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store,
})