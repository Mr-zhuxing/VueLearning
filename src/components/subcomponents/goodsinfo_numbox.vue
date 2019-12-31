<template>
<!-- 需要使用它提供的api来动态设置参数 -->
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="number"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.js"
export default {
  data() {
    return {};
  },
  methods: {
    countChanged() {
      this.$emit("getcount", parseInt(this.$refs.number.value));
    }
  },
  props:[
    'max'
  ],
  watch:{
    'max':function(newVal,oldVal){
      mui(".mui-numbox").numbox().setOption('max',newVal)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>