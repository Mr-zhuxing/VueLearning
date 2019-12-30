<template lang="html">
  <div class = "app-container">
    <!-- 顶部Header区域 -->
    <mt-header fixed title="VUE项目">
		<mt-button icon="back" slot="left" @click= "back">返回</mt-button>
 		<mt-button icon="more" slot="right"></mt-button>
	</mt-header>



    <!-- 中间的路由区域 -->
	<transition>
		<router-view></router-view>
	</transition>
	


    <!--  底部tabber区域 -->
	<nav class="mui-bar mui-bar-tab">
		<router-link class="mui-tab-item-zx" to="/home" replace>
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
		</router-link>
		<router-link class="mui-tab-item-zx" to="/member" replace>
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>	
		</router-link>
		<router-link class="mui-tab-item-zx" to="/shopcar" replace>
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
		</router-link>
		<router-link class="mui-tab-item-zx" to="/search" replace>
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
		</router-link>
	</nav>



  </div>
</template>
 
<script>
export default{
	data(){
		return{

		}
	},
	methods: {
		back(){
			// window.history.back();
			this.$router.go(-1);
		}
	},
}
</script>

<style lang="scss" scoped>
.mint-header{
	z-index: 99;
}
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.mui-bar-tab .mui-tab-item-zx.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-zx {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-zx .mui-icon{
	top: 3px;
	width: 24px;
	height: 24px;
	padding-top: 0;
	padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-zx .mui-icon~.mui-tab-label{
	font-size: 11px;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
}

</style>
