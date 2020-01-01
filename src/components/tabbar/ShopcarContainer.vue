<template>
    <div class="shopcar-container">
        <div class="goods-list">

            <!-- 商品列表区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"
                        ></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"> </numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>

            <!-- 结算区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount['count']}}</span> 件，总价 ￥<span class="red">{{$store.getters.getGoodsCountAndAmount['amount']}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>                    
				</div>
			</div>

        </div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        return{
            theSwitch:false,
            goodslist:[], //购物车中商品数据
        }
    },
    methods: {
        getGoodsList(){
            var idArr = [];
            this.$store.state.car.forEach(item=>{
                idArr.push(item.id);
            })
            if(idArr.length<=0){
                return;
            }
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
                if(result.body.status === 0){
                    this.goodslist = result.body.message;


                }
            })
        },
        remove(id,index){
            console.log(id,index);
            this.goodslist.splice(index,1);
            this.$store.commit('removeFormCar',id);
        },
        selectedChange(id,val){
            // console.log(id,value);
            this.$store.commit('updateGoodsSelected',{id,selected:val});
        }
    },
    created(){
        this.getGoodsList();
    },
    components:{
        numbox,
    },
}
</script>
    
<style lang="scss" scope>
    .shopcar-container{
        background-color: #ccc;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }
            h1{
                font-size: 13px;
            }
            .mui-card{
                img{
                    width: 40px;
                    height: 50px;
                }
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-weight: bold;
            }
        }
    }
</style>