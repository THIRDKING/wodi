<template>
    <div id="main">
        <div class="content page-order-payment">
            <div class="gray-box clear">
                <div class="title">
                    <h2>支付订单</h2>
                </div>
                <div class="box-inner order-info">
                    <h3>提交订单成功</h3>
                    <p class="payment-detail">请在 <span>24 小时内</span>完成支付，超时订单将自动取消。</p>
                    <p class="payment-detail">我们将在您完成支付后的 72 小时内发货</p>    
                </div>
                <div class="box-inner payment-checkout-panel clear">
                    <span class="jianguo-blue-main-btn big-main-btn js-payment-order">
                        <a>现在支付</a>
                    </span>
                    <span class="prices"> 应付金额：   <em><span>¥ </span>{{orderInfo.price + orderInfo.freight}}</em></span>
                </div>
            </div>
            <div class="confirm-detail">
                <div class="info-title">订单编号</div>
                <p class="info-detail">{{ orderInfo.orderId }}</p>
            </div>
            <div class="confirm-detail">
                <div class="info-title">收货信息</div>
                <p class="info-detail">姓名：{{orderInfo.addressData.name}}</p>
                <p class="info-detail">联系电话：{{orderInfo.addressData.phone}}</p>  <p class="info-detail">详细地址：{{orderInfo.addressData.province}}{{orderInfo.addressData.city}}{{orderInfo.addressData.county}}{{orderInfo.addressData.add}}</p>
            </div>
            <div class="confirm-detail">
                <div class="info-title">发票信息</div>
                <p class="info-detail">发票类型：电子发票</p>
                <p class="info-detail">发票抬头：{{orderInfo.invoiceName}}</p>
                <p class="info-detail">发票内容：购买商品明细</p>
            </div>
            <div class="confirm-table-title clear">
                <span class="name fn-left">商品信息</span>
                <span class="subtotal fn-right">小计</span>
                <span class="num fn-right">数量</span>
                <span class="price fn-right">单价</span>
            </div>
            <div class="confirm-goods-table">
                <div class="cart-items clear" v-for="(item,index) in orderInfo.goodsData" :key="index">
                    <div class="name fn-left hide-row">
                        <div class="name-cell">
                            <router-link :to='{name:"GoodInfo",query:{id:item.sku_id}}' :title='item.title+"("+item.spec_json.show_name+")"'> {{item.title}}（{{item.spec_json.show_name}}）</router-link>
                            <br>
                        </div>
                    </div>
                    <div class="subtotal fn-right">
                        <div class="subtotal-cell">¥ {{item.price*item.count}}</div>
                    </div>
                    <div class="goods-num fn-right">{{item.count}}</div>
                    <div class="price fn-right">¥ {{item.price}}.00</div> 
                </div>
            </div>
            <div class="order-discount-line">
                <p> 商品总计： <span>¥ {{orderInfo.price}}.00</span> </p>
                <p> 运费： <span>+ ¥ {{orderInfo.freight}}.00</span> </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        computed:{
            orderInfo(){
                let orderInfo = this.$store.state.orderData.filter((order)=>{
                    return order.orderId == this.$route.query.orderId
                })[0]
                return orderInfo
            }
        },
        created(){
            console.log(this.orderInfo)
        }
    }
</script>