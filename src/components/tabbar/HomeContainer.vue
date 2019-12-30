<template>
  <div>
    <!-- 轮播图 -->
    <swiper :lunbotuList="lunbotuList" :isfull=true></swiper>
    <!-- 六宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/grid1.jpg" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photolist">
            <img src="../../images/grid2.jpg" alt="">
            <div class="mui-media-body">图片共享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
            <img src="../../images/grid3.jpg" alt="">
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../images/grid4.jpg" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../images/grid5.jpg" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../images/grid6.jpg" alt="">
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue"
export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("api/getlunbo")
        .then(result => {
          if (result.body.status === 0) {
            this.lunbotuList = result.body.message;
            // console.log(this.lunbotuList)
          } else {
            // 失败了
          }
        });
    }
  },
  components: {
    swiper,
  },
};
</script>

<style lang="scss" scope>

.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border:none;
    img{
      width: 60px;
      height: 60px;
    }
    .mui-media-body{
      font-size: 13px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0;
}
</style>