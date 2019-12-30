<template>
  <div>
    <!-- 轮播图 -->
    <!-- 将来谁使用此 轮播图组件，谁就为我们传递lunbotulist -->
    <!-- 由父组件传递进来 -->
    <mt-swipe :auto="1000" :speed="500">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" :class="{full: isfull}" alt/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ["lunbotuList", "isfull"],
  data(){
      return{
         
      };
  }
};
</script>
<style lang="scss" scope>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
  text-align: center;
  img {
    height: 100%;
  }
}
.full {
  width: 100%;
}
</style>