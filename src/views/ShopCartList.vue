<template>
    <div id="main" class="hander-car">
        <div class="store-content">
            <div class="cart-box">
                <div class="title">
                    <h2>购物清单</h2>
                </div>
                <div class="cart-inner">
                    <div class="empty-label"  v-if="totalCount<=0">
                        <h3>您的购物车中还没有商品</h3>
                        <router-link class="link" to="/">现在选购</router-link>
                    </div>
                    <div v-else>
                        <div class="cart-table-title">
                            <span class="name">商品信息</span>
                            <span class="operation">操作</span>
                            <span class="subtotal">小计</span>
                            <span class="num">数量</span>
                            <span class="price">单价</span>
                        </div>
                        <div class="cart-table">
                            <div class="cart-group">
                                <!--购物列表-->
                                <div class="cart-top-items">
                                    <div class="cart-items" v-for="(item,index) in goodsData" :key="index">
                                        <div class="items-choose">
                                            <span class="blue-checkbox-new" :class='{"checkbox-on":item.isChecked}' @click="changeOneChecked(item.sku_id)"><a></a></span>
                                        </div>
                                        <div class="items-thumb">
                                            <img :src="item.ali_image" width="80" height="80" />
                                            <a href="javascript:;" target="_blank"></a>
                                            <router-link target="_blank" :to='{name:"GoodInfo",query:{id:item.sku_id}}'></router-link>
                                        </div>
                                        <div class="name hide-row" >
                                            <div class="name-table">
                                                <router-link target="_blank" :to='{name:"GoodInfo",query:{id:item.sku_id}}'>{{item.title}}</router-link>
                                                <ul class="attribute">
                                                    <li>{{item.spec_json.show_name}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="operation">
                                            <a class="items-delete-btn" @click="deleteShopCartData(item.sku_id)"></a>
                                        </div>
                                        <div class="subtotal">¥ {{ item.price*item.count }}</div>
                                        <div class="item-cols-num">
                                            <div class="select js-select-quantity">
                                                <span class="down" :class='{"down-disabled":item.count<=1}' @click="deleteCount(item.sku_id)">-</span>
                                                <span class="num">
                                                    <input type="text" :value="item.count" readonly style="display: inline-block;">
                                                </span>
                                                <span class="up" :class='{"up-disabled":item.count>=item.limit_num}' @click="addCount(item.sku_id)">+</span>
                                                
                                            </div>
                                        </div>
                                        <div class="price">¥ {{ item.price }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-bottom-bg fix-bottom" v-if="totalCount>0">
                    <div class="cart-bar-operation">
                        <div>
                            <div class="choose-all js-choose-all" @click="changeAllChecked(allCheckStatus)">
                                <span class="blue-checkbox-new" :class='{"checkbox-on":allCheckStatus}'><a></a></span>
                                全选
                            </div>
                            <div class="delete-choose-goods" @click="deleteMoreGoods">删除选中的商品</div>
                        </div>
                    </div>
                    <div class="shipping">
                        <div class="shipping-box">
                            <div class="shipping-total shipping-num">
                                <h4 class="">
                                    已选择 <i>{{checkedGoodsCount}}</i> 件商品
                                </h4>
                                <h5>
                                    共计 <i>{{totalCount}}</i> 件商品
                                </h5>
                            </div>
                            <div class="shipping-total shipping-price">
                                <h4 class="">
                                    应付总额：<span>￥</span><i >{{checkedGoodsTotalPrice}}</i> 
                                </h4>
                                <h5 class="shipping-tips">
                                    应付总额不含运费
                                </h5>
                                
                            </div>
                        </div>
                        <span class="jianguo-blue-main-btn big-main-btn js-checkout disabled-btn" v-if="checkedGoodsCount<=0"><a>现在结算</a></span>
                        <span class="jianguo-blue-main-btn big-main-btn js-checkout" v-else><router-link to="/checkout">现在结算</router-link></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        computed:{
            goodsData(){
                return this.$store.state.shopCartData
            },
            totalCount(){
                return this.$store.getters.shopCartTotleCount
            },
            allCheckStatus(){
                return this.$store.getters.allChecked
            },
            checkedGoodsCount(){
                return this.$store.getters.checkedGoodsCount
            },
            checkedGoodsTotalPrice(){
                return this.$store.getters.checkedGoodsTotalPrice
            }
        },
        created(){
            console.log(this.goodsData)
        },
        methods:{
            deleteShopCartData(id){
                this.$store.commit('deleteShopCartData',id)
            },
            addCount(id){
                // item.count++
                // if( item.count >= item.limit_num ){
                //     item.count = item.limit_num
                // }
                this.$store.commit('plusShopCartData',id)
            },
            deleteCount(id){
                // item.count--
                // if(item.count<=1){
                //     item.count = 1
                // }
                this.$store.commit('minShopCartData',id)
            },
            changeOneChecked(id){
                this.$store.commit('changeOneChecked',id)
            },
            changeAllChecked(status){
                this.$store.commit('changeAllChecked',status)
            },
            deleteMoreGoods(){
                this.$store.commit('deleteMoreGoods')
            }
        }
    }
</script>
<style>
    
</style>