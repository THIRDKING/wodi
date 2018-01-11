import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        shopCartData:[],
        maxCount:false,
        shopCartShow:false,
        shopCarTimer:null,
        ball:{
            show:false,
            el:null,
            img:''
        },
        orderData:[],
        receiveInfo:[
            {
                "name": "王某某",
                "phone": "13811111111",
                "areaCode": "010",
                "landLine": "64627856",
                "provinceId": 110000,
                "province": "北京市",
                "cityId": 110100,
                "city": "市辖区",
                "countyId": 110106,
                "county": "海淀区",
                "add": "上地十街辉煌国际西6号楼319室",
                "default": true
            },
            {
                "name": "李某某",
                "phone": "13811111111",
                "areaCode": "010",
                "landLine": "64627856",
                "provinceId": 110000,
                "province": "北京市",
                "cityId": 110100,
                "city": "市辖区",
                "countyId": 110106,
                "county": "海淀区",
                "add": "上地十街辉煌国际东6号楼350室",
                "default": false
            }
        ]
    },
    getters:{
        shopCartTotleCount(state){
            let conut = 0
            state.shopCartData.forEach((goods)=>{
                conut += goods.count
            })
            return conut
        },
        shopCartTotlePrice(state){
            let totlePrice = 0
            state.shopCartData.forEach((goods)=>{
                totlePrice += goods.count*goods.price
            })
            return totlePrice
        },
        allChecked(state){
            var allCheckStatus = state.shopCartData.every((goods)=>{
                return goods.isChecked == true
            })
            return allCheckStatus
            /*
            let allCheckStatus = true
            state.shopCartData.forEach((goods)=>{
                if(!goods.isChecked){
                    allCheckStatus = false
                    return
                }
            })*/
        },
        checkedGoodsCount(state){
            let checkedGoodsCount = 0
            state.shopCartData.forEach((goods)=>{
                if(goods.isChecked){
                    checkedGoodsCount += goods.count
                }
            })
            return checkedGoodsCount
        },
        checkedGoodsTotalPrice(state){
            let checkedGoodsTotalPrice = 0
            state.shopCartData.forEach((goods)=>{
                if(goods.isChecked){
                    checkedGoodsTotalPrice += goods.count*goods.price
                }
            })
            return checkedGoodsTotalPrice
        },
        //选中的商品
        checkedGoodsData(state){
            let checkedGoodsData = []
            state.shopCartData.forEach((goods)=>{
                if(goods.isChecked){
                    checkedGoodsData.push(goods)
                }
            })
            return checkedGoodsData
        }
    },
    mutations:{
        //产品详情页数量加减
        addShopCartData(state,data){
            let bOff = true
            if(!state.ball.show){
                state.shopCartData.forEach((goods)=>{
                    if(goods.sku_id===data.info.sku_id){
                        goods.count += data.count
                        bOff = false
                        if(goods.count>goods.limit_num){
                            state.maxCount = true
                            //goods.count = goods.limit_num
                            goods.count -= data.count
                            return
                        }
                        state.ball.show = true
                        state.ball.img = data.info.ali_image
                        state.ball.el = event.path[0]
                        state.shopCartShow = true
                    }
                })
                if(bOff){
                    let goodsData = data.info
                    Vue.set(goodsData,'count',data.count)
                    Vue.set(goodsData,'isChecked',true)
                    state.shopCartData.push(goodsData)

                    state.ball.show = true
                    state.ball.img = data.info.ali_image
                    //console.log(event)
                    state.ball.el = event.path[0]
                    state.shopCartShow = true
                }
                // console.log(state.shopCartData)
            }
        },
        deleteShopCartData(state,id){
            state.shopCartData.forEach((goods,index)=>{
                if(goods.sku_id===id){
                    state.shopCartData.splice(index,1)
                    return
                }
            })
        },
        closePrompt(state){
            state.maxCount = false
        },
        //购物车显示隐藏
        changeShopCartShow(state){
            clearTimeout(state.shopCarTimer)
            state.shopCartShow = true
        },
        changeShopCartShowHide(state){
            state.shopCarTimer = setTimeout(()=>{
                state.shopCartShow = false
            },500)
        },
        //购物车产品列表页数量加减
        plusShopCartData(state,id){
            state.shopCartData.forEach((goods,index)=>{
                if(goods.sku_id===id){
                    if(goods.count>=goods.limit_num){
                        return false
                    }
                    goods.count ++
                    return
                }
            })
        },
        minShopCartData(state,id){
            state.shopCartData.forEach((goods,index)=>{
                if(goods.sku_id===id){
                    if(goods.count<=1){
                        return false
                    }
                    goods.count --
                    return
                }
            })
        },
        //购物车产品单选
        changeOneChecked(state,id){
            state.shopCartData.forEach((goods)=>{
                if(goods.sku_id===id){
                    goods.isChecked = !goods.isChecked
                    return
                }
            })
        },
        //购物车产品多选
        changeAllChecked(state,status){
            state.shopCartData.forEach((goods)=>{
                goods.isChecked = !status
            })
        },
        //购物车产品删除多个
        deleteMoreGoods(state){
            let i = state.shopCartData.length
            while(i--){
                if(state.shopCartData[i].isChecked){
                    state.shopCartData.splice(i,1)
                }
            }
            /* //正着删会有问题
            state.shopCartData.forEach((goods,index)=>{
                if(goods.isChecked){
                    index = state.shopCartData.indexOf(goods,index)
                    state.shopCartData.splice(index,1)
                }
            })*/
        },
        //选定默认收货地址
        changeAddressIndex(state,index){
            state.receiveInfo.forEach((add,i)=>{
                add.default = false
            })
            state.receiveInfo[index].default = true
        },
        //提交新建收货地址信息
        submitNewAddress(state,obj){
            if(obj.default){
                state.receiveInfo.forEach((add,i)=>{
                    add.default = false
                })
            }
            state.receiveInfo.push(obj)
        },
        //订单信息
        submitOrder(state,obj){
            state.orderData.unshift(obj)
            let i = state.shopCartData.length
            while(i--){
                if(state.shopCartData[i].isChecked){
                    state.shopCartData.splice(i,1)
                }
            }
        }
    }
})

export default store