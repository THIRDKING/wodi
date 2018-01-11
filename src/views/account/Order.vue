<template>
    <div class="account-content">
        <div class="account-order">
            <div class="gray-box">
                <div class="title columns-title pre-title">
                    <h2>我的订单</h2>
                    <div class="gray-btn-menu sort-status-menu">
                        <span class="label"><i class="arrow"></i> 全部状态 </span>
                        <ul class="menu-list">
                            <li class="selected"><a href="javascript:;">全部状态</a></li>
                            <li class=""><a href="javascript:;">未完成</a></li>
                            <li class=""><a href="javascript:;">已完成</a></li>
                            <li class=""><a href="javascript:;">已关闭</a></li>
                        </ul>
                    </div>
                    <div class="gray-btn-menu sort-time-menu -gray-btn-menu-on">
                        <span class="label"><i class="arrow"></i> 最近三个月 </span>
                        <ul class="menu-list">
                            <li class="selected"><a href="javascript:;">最近三个月</a></li>
                            <li class=""><a href="javascript:;">今年内</a></li>
                            <li class=""><a href="javascript:;">2016年</a></li>
                            <li class=""><a href="javascript:;">2015年</a></li>
                        </ul>
                    </div>
                </div>
                <div class="js-list-inner">
                    <div class="box-inner order-cart order-list-cart clear" v-for="(order,index) in orderData" :key="index">
                        <div class="gray-sub-title cart-title">
                            <span class="date">{{order.iDate}}</span>
                            <span class="order-id"> 订单号： <a href="javascript:;">{{order.orderId}}</a> </span>
                            <span class="order-detail"><router-link :to='{name:"Payment",query:{orderId:order.orderId}}'>查看详情&gt;</router-link> </span> <span class="sub-total">应付总额</span>
                            <span class="num">数量</span>
                            <span class="price">单价</span>
                        </div>
                        <div class="cart" style="width:988px;">
                            <div style="width:735px; float:left;">
                                <div class="cart-items clear" v-for="(item,index) in order.goodsData">
                                    <div class="prod-info clear">
                                        <div class="items-thumb">
                                            <router-link :to='{name:"GoodInfo",query:{id:item.sku_id}}'><img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"></router-link>
                                        </div>
                                        <div class="items-params clear">
                                            <div class="name vh-center">
                                                <router-link :to='{name:"GoodInfo",query:{id:item.sku_id}}' :title='item.title+"("+item.spec_json.show_name+")"'> {{item.title}}（{{item.spec_json.show_name}}）</router-link>
                                            </div>
                                            <div class="detail"></div>
                                        </div>
                                        <div class="num">{{item.count}}</div>
                                        <div class="price">¥ {{item.price}}.00</div>
                                    </div>
                                </div>
                            </div>
                            <div class="prod-operation">
                                <div class="total">¥ {{order.freight+order.price}}.00</div>
                                <div class="status">
                                    <router-link class="blue-small-btn js-payment-order" v-if="!order.isPay" :to='{name:"Payment",query:{orderId:order.orderId}}'>现在付款</router-link>
                                    <span v-else>已完成</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        computed:{
            orderData(){
                return this.$store.state.orderData
            }
        }
    }
</script>