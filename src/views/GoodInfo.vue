<template>
    <div id="main">
        <div class="store-content item">
            <div class="item-box">
                <div class="gallery-wrapper">
                    <div class="gallery">
                        <div class="thumbnail">
                            <ul>
                                <li
                                    v-for="(smallImg,index) in goodInfo.ali_images" 
                                    :class='{"on":showIndex==index}' 
                                    :key="index"
                                    @click="changeShowIndex(index)">
                                    <img width="54" height="54" :src="smallImg">
                                </li>
                            </ul>
                        </div>
                        <div class="thumb">
                            <ul>
                                <li class="on"><img :src="curBigImg" width="440" height="440"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="banner">
                    <div class="sku-custom-title">
                        <div class="params-price">
                            <span><em>¥</em><i>{{goodInfo.price}}</i></span>
                        </div>
                        <div class="params-info">
                            <h4>{{goodInfo.title}}</h4>
                            <h6>{{goodInfo.sub_title}}</h6>
                        </div>
                    </div>
                    <div class="sku-dynamic-params-panel">
                        <div class="sku-dynamic-params clear">
                            <span class="params-name">颜色</span>
                            <ul class="params-colors">
                                <li :class="{'cur':color.id==goodId}" v-for="(color,index) in goodInfo.sku_list" :key="index">
                                    <!-- 方式以一 -->
                                    <!-- <a @click="changeGoodInfo(color.id)" :title="color.color"><img :src="'http://img01.smartisanos.cn/'+color.image+'20X20.jpg'" /></a> -->
                                    <!-- 点击颜色切换商品详情页方法二 -->
                                    <router-link :title="color.color" :to='{name:"GoodInfo",query:{id:color.id}}'><img :src="'http://img01.smartisanos.cn/'+color.image+'20X20.jpg'" /></router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="sku-dynamic-params clear">
                            <div class="params-name">数量</div>
                            <div class="params-detail clear">
                                <div class="item-num js-select-quantity">
                                    <span class="down" :class='{"down-disabled":count<=1}' @click="minCount">-</span>
                                    <span class="num">{{count}}</span>
                                    <span class="up" :class='{"up-disabled":count>=goodInfo.limit_num}' @click="addCount">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sku-status">
                        <div class="cart-operation-wrapper clearfix">
                            <span class="blue-title-btn js-add-cart" @click="addShopCartDataHandle()"><a>加入购物车</a></span>
                            <span class="gray-title-btn"><a>现在购买</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import goodsData from '@/lib/newItemsData'
    export default {
        data(){
            return {
                goodsData,
                goodId: this.$route.query.id,
                showIndex:0,
                curBigImg:'',
                count:1
            }
        },
        computed:{
            goodInfo(){
                let goodInfo = this.goodsData.filter((item)=>{
                    return item.sku_id==this.goodId
                })[0]
                return goodInfo
            }
        },
        created(){
            console.log(this.goodInfo)
            this.curBigImg = this.goodInfo.ali_images[0]
        },
        // 点击颜色切换商品详情页方法二 
        watch:{
            $route(){
                this.goodId = this.$route.query.id
                this.curBigImg = this.goodInfo.ali_images[0]
            }
        },
        methods:{
            changeShowIndex(index){
                this.showIndex = index
                this.curBigImg = this.goodInfo.ali_images[index]
            },
            addShopCartDataHandle(){
                let newData = {info:this.goodInfo,count:this.count}
                this.$store.commit('addShopCartData',newData)
            },
            addCount(){
                this.count++
                if(this.count>=this.goodInfo.limit_num){
                    this.count = this.goodInfo.limit_num
                }
            },
            minCount(){
                this.count--
                if(this.count<=1){
                    this.count = 1
                }
            }
            /*
            //方式以一
            changeGoodInfo(id){
                console.log(id)
                this.goodId = id
                this.curBigImg = this.goodInfo.ali_images[0]
            }*/
        }
    }
</script>
