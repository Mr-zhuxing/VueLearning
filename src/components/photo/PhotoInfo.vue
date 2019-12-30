<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>

    <!-- 缩略图区域 -->
    <vue-preview :slides="slide1" @close="handleClose" class="thumbnail"></vue-preview>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的 评论子组件 -->
    <comment :id="id"></comment>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      slide1: [],
    };
  },
  methods: {
    getPhotoInfo() {
      //获取图片详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    handleClose() {
      console.log("close event");
    },
    getThumbs(){
        //获取缩略图
        this.$http.get('api/getthumimages/' + this.id).then(result=>{
            if(result.body.status === 0){
                this.slide1 = new Array(result.body.message.length);
                // Array.prototype.fill()是用同一个元素填充数组，如果是对象，则是同一个对象
                result.body.message.forEach((item,i)=>{
                    this.slide1[i] = {};
                    this.slide1[i].src = item.src;
                    this.slide1[i].msrc = item.src;
                    this.slide1[i].alt = 'picture'+(i+1);
                    this.slide1[i].title = "Image Caption "+(i+1);
                    this.slide1[i].w = 1200;
                    this.slide1[i].h = 800;
                })
            }
        })
    }
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  components: {
    comment
  }
};
</script>
<style lang="scss" scope>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbnail{      
      .my-gallery{
          overflow: hidden;
          img{
              width: 80px;
              height: 100px;
              float: left;
              margin: 5px 5px;
              box-shadow: 0 0 8px #999;
          }
      }
  }
}
</style>