<template>
    <div id="main">
        <div class="content clear">
            <div class="account-wrapper">
                <div class="account-sidebar">
                    <div class="avatar gray-box clear">
                        <div class="js-account-sidebar-info">
                            <img src="http://static.smartisanos.cn/account/asset/img/default-user-avatar.png">
                        </div>
                        <div class="box-inner">
                            <ul class="account-nav">
                                <router-link tag="li" :to='{name:"Account"}' exact activeClass="current"><a>我的订单</a></router-link>
                                <router-link tag="li" :to='{name:"Address"}' activeClass="current"><a>收货地址</a></router-link>
                            </ul>
                        </div>
                    </div>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
