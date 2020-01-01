<template>
  <!-- 需要使用它提供的api来动态设置参数 -->
  <div
    class="mui-numbox"
    :data-numbox-step="1"
    :data-numbox-min="1"
    :data-numbox-max="9"
    style="height:25px"
  >
    <button class="mui-btn mui-btn-numbox-minus" type="button" ref="button1" @click="cButton(1)">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      v-model="initCount"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button" ref="button2" @click="cButton(2)">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.js";
// mui.init();
mui(".mui-numbox").numbox();
export default {
  data() {
    return {};
  },
  props: ["initCount", "goodsid", "min", "max"],
  methods: {
    countChanged() {
      var goodsinfo = {
        id: this.goodsid,
        count: this.$refs.numbox.value
      };
      this.$store.commit("updateGoodsInfo", goodsinfo);
    },
    cButton(n) {
      if (n === 1) {
        if (this.$refs.numbox.value > 0) {
          this.$refs.numbox.value--;
          this.countChanged();
        }
      }
      if (n === 2) {
        if (this.$refs.numbox.value < 9) {
          this.$refs.numbox.value++;
          this.countChanged();
        }
      }
    }
  },
  mounted() {},
  created() {},
  watch: {}
};
</script>
<style lang="scss" scoped>
</style>