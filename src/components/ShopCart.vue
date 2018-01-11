<template>
    <li class="nav-cart" @mouseenter="changeShopCartShow" @mouseleave="changeShopCartShowHide">
        <a href="javascript:;" class="ball-rect">购物车</a>
        <!--根据class改变颜色-->
        <span class="cart-empty-num" :class="{ 'cart-num': shopCartTotleCount>0}">
            <i>{{shopCartTotleCount}}</i>
        </span>
        <div class="nav-cart-wrapper" v-if="shopCartShow">
            <div class="nav-cart-list">
                <div class="empty" v-if="shopCartTotleCount<=0">
                    <h3>购物车为空</h3>
                    <p>您还没有选购任何商品，现在前往商城选购吧!</p>
                </div>
                <div class="full" v-else>
                    <div class="nav-cart-items">
                        <ul>
                            <li class="clear" v-for="(item,index) in shopCartData" :key="index">
                                <div class="cart-item js-cart-item cart-item-sell">
                                    <div class="cart-item-inner">
                                        <div class="item-thumb">
                                            <img :src="item.ali_image">
                                        </div>
                                        <div class="item-desc">
                                            <div class="cart-cell">
                                                <h4> 
                                                    <a href="#/item/100027401">{{item.title}}</a>
                                                </h4>
                                                <p class="attrs">
                                                    <span>{{item.spec_json.show_name}}</span>
                                                </p>
                                                <h6>
                                                    <span class="price-icon">¥</span>
                                                    <span class="price-num">{{item.price}}</span>
                                                    <span class="item-num">x {{item.count}}</span>
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="del-btn" @click="deleteShopCartData(item.sku_id)">删除</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="nav-cart-total">
                        <p>共 <strong class="ng-binding">{{shopCartTotleCount}}</strong> 件商品</p>
                        <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{shopCartTotlePrice}}</span></h5>
                        <h6>
                            <router-link to="/cart" class="nav-cart-btn">去购物车</router-link>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <transition
            name="ball"
            @before-enter="beforeEnter(el)"
            @enter="enter(el)"
            @after-enter="afterEnter"
            :css="true">
            <div class="addcart-mask" v-show="ballData.show">
                <img class="mask-item" src="">
            </div>
        </transition>-->
        <transition
		  name="ball"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            v-bind:css="true">
            <div class="addcart-mask" v-show="ball.show">
                <img class="mask-item" width="18px" height="18px"/>
            </div>
	  </transition>
      <prompt></prompt>
    </li>
</template>
<script>
    import Prompt from '@/components/Prompt'
    export default {
        data(){
            return {

            }
        },
        components:{
            Prompt
        },
        computed:{
            shopCartData(){
                return this.$store.state.shopCartData
            },
            shopCartTotleCount(){
                return this.$store.getters.shopCartTotleCount
            },
            shopCartTotlePrice(){
                return this.$store.getters.shopCartTotlePrice
            },
            shopCartShow(){
                return this.$store.state.shopCartShow
            },
            ball(){
                return this.$store.state.ball
            }
        },
        methods:{
            deleteShopCartData(id){
                this.$store.commit('deleteShopCartData',id)
            },
            changeShopCartShow(){
                this.$store.commit('changeShopCartShow')
            },
            changeShopCartShowHide(){
                this.$store.commit('changeShopCartShowHide')
            },/*
            beforeEnter(el){
            //getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
                let rect = this.ball.el.getBoundingClientRect()
                let cartRect = document.getElementsByClassName('cart-rect')[0].getBoundingClientRect()
                let ballObj = document.getElementsByClassName('addcart-mask')[0]
                let x = cartRect.left - rect.left
                let y = cartRect.top - rect.top
                el.style.transform = 'translate3d(0,'+y+'px,0)'
                ballObj.style.transform = 'translate3d(-'+x+'px,0,0)'
                ballObj.src = this.ball.img
            },
            enter(el){
                let a = el.offsetHeight
                el.a = a
                el.style.transform = 'translate3d(0,0,0)'
                document.getElementsByClassName('addcart-mask')[0].style.transform = 'translate3d(0,0,0)'
            },
            afterEnter(){
                this.ball.show = false
            }*/
            beforeEnter (el) {
                let rect = this.ball.el.getBoundingClientRect()
                let rectEl = document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
                let ball = document.getElementsByClassName('mask-item')[0]
                let x = (rectEl.left + 16) - (rect.left + rect.width/2)
                let y = rect.top + rect.height/2 - rectEl.top + 5 - 16
                // console.log(rect.top + rect.height/2)
                el.style.transform = 'translate3d(0,'+y+'px,0)'
                
                ball.style.transform = 'translate3d(-'+x+'px,0,0)'
                ball.src = this.ball.img
                // console.log(this.ball.img)
            },
            enter (el) {
                let rf = el.offsetHeight
                this.$nextTick(() => {
                el.style.transform = 'translate3d(0,0,0)'
                document.getElementsByClassName('mask-item')[0].style.transform = 'translate3d(0,0,0)'
                })
            },
            afterEnter (el) {
                this.ball.show = false
            }
        }
    }
</script>
<style>
    .ball-enter-active{
        transition: 1s cubic-bezier(.15,.69,.6,1.29);
    }
    .ball-enter-active .mask-item{
        transition: 1s cubic-bezier(0,0,1,1);
    }
</style>