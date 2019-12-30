<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <!-- <router-link :to="'/home/goodsinfo/'+ item.id"> -->
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
            <!-- </router-link> -->
        </div>       
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>





    </div>
</template>

<script>
export default {
    data(){
        // data是往自己组件内部，挂载一些私有数据
        return{
            pageindex: 1, // 分页数
            goodslist: [] //存放商品列表的数组
        }
    },
    methods: {
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                if(result.body.status === 0){
                    // this.goodslist = result.body.message;
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){
            // 使用js进行编程式导航
            // console.log( this)
            this.$router.push({
                name: "goodsinfo",
                params: {id},
            });
        },
    },
    created(){
        this.getGoodsList();
    }
}
</script>

<style lang="scss" scope>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 7px;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;   
            margin: 3px 0;   
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;   
            min-height: 293px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
                overflow: auto;
            }
            .info{
                background-color: #ccc;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>