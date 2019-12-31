<template>
  <div class="goodsinfo-container">
    <transition v-on:before-enter="beforeEnter" 
                v-on:enter="enter" 
                v-on:after-enter="afterEnter"
    >
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 轮播图 -->
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
            销售价:
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量:&nbsp;&nbsp;
            <goodsinfo-numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></goodsinfo-numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}</p>
          <p>上架时间:{{goodsinfo.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="toGoodsDesc()">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="toGoodsComment()">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
import goodsinfoNumbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      ballFlag: false, //控制小球
      selectedCount:1,
    };
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.lunbotu = new Array(result.body.message.length);
          result.body.message.forEach((item, index) => {
            this.lunbotu[index] = {};
            this.lunbotu[index].img = item.src;
            this.lunbotu[index].id = index;
          });
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        // console.log(result);
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    toGoodsDesc() {
      this.$router.push({
        path: "/home/goodsDesc/" + this.id
      });
    },
    toGoodsComment() {
      this.$router.push({
        path: "/home/goodscomment/" + this.id
      });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el){
      el.style.transform = "translate(0,0)"
    },
    enter(el,done){
      // 通过得到小球的横纵坐标和终点的横纵坐标的距离
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document.getElementById('badge').getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 1s cubic-bezier(.29,-0.23,.69,.13)";
      done();
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count){
      this.selectedCount = count;
    },
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
    // console.log(this)
  },
  components: {
    swiper,
    goodsinfoNumbox
  }
};
</script>
<style lang="scss" scope>
.goodsinfo-container {
  background: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 61%;
    left: 41%;
  }
}
</style>