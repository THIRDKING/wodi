<template>
    <div id="pop">
        <div class="module-dialog-layer" style="display: block;"></div>
        <div class="module-dialog clear module-dialog-address module-dialog-show">
            <div class="dialog-panel">
                <div class="topbar">
                    <div class="dialog-tit clear">
                        <h4 class="js-dialog-title">管理收货地址</h4>
                    </div>
                    <span class="dialog-close" @click="closePop">x</span>
                </div>
                <div class="dialog-con js-dialog-container">
                    <div class="animate-layer">
                        <div class="dialog-inner js-address-add">
                            <div class="save-address-box">
                                <div class="address-form">
                                    <div class="module-form-row">
                                        <div class="form-item-v3">
                                            <!--<i>收货人姓名</i>-->
                                            <input type="text" class="js-verify" v-model="newAddress.name">
                                            <div class="verify-error"></div>
                                        </div>
                                    </div>
                                    <div class="module-form-row">
                                        <div class="form-item-v3" :class='{"form-invalid-item":phoneError}'>
                                            <i v-show="!newAddress.phone">手机号</i>
                                            <input type="text" class="js-verify" v-model="newAddress.phone" @blur="inspectPhone" @focus="setPhoneError">
                                            <div class="verify-error"></div>
                                        </div>
                                    </div>
                                    <div class="module-form-row clear">
                                        <div class="form-item-v3 area-code-w fn-left form-valid-item">
                                            <!--<i>区号（可选）</i>-->
                                            <input type="text" class="js-verify js-address-area-code" v-model="newAddress.areaCode">
                                            <div class="verify-error"></div>
                                        </div>
                                        <div class="form-item-v3 telephone-w fn-right form-valid-item">
                                            <!--<i>固定电话（可选）</i>-->
                                            <input type="text" class="js-verify js-address-telephone" v-model="newAddress.landLine">
                                            <div class="verify-error"></div>
                                        </div>
                                    </div>
                                    <div class="module-form-row clear">
                                        <div class="form-item-v3 select-item province-wrapper">
                                            <select name="province_code" class="province select-province js-form-province js-verify" v-model="newAddress.provinceId">
                                                <option value="0">请选择省份</option>
                                                <option v-for="(item,index) in addList" :value="item.area_id">{{item.area_name}}</option>
                                               
                                            </select>
                                        </div>
                                    </div>
                                    <div class="module-form-row clear">
                                        <div class="form-item-v3 select-item city-wrapper fn-left form-focus-item">
                                            <select class="city select-city js-form-city js-verify" v-model="newAddress.cityId">
                                                <option value="0">请选择城市</option>
                                                <option :value="ct.area_id" v-for="(ct,index) in cityList">{{ct.area_name}}</option>
                                            </select>
                                        </div>
                                        <div class="form-item-v3 select-item district-wrapper fn-right form-focus-item">
                                            <select class="city select-city js-form-city js-verify" v-model="newAddress.countyId">
                                                <option value="0">请选择区县</option>
                                                <option :value="ct.area_id" v-for="(ct,index) in countyList">{{ct.area_name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="module-form-row">
                                        <div class="form-item-v3">
                                            <!--<i>详细地址，如街道名称，楼层，门牌号码等</i>-->
                                            <input type="text" class="js-verify" v-model="newAddress.add">
                                            <div class="verify-error"></div>
                                        </div>
                                    </div>
                                    <div class="module-form-row fn-clear">
                                        <input type="checkbox" class="hide">
                                        <span class="blue-checkbox" :class='{"blue-checkbox-on":newAddress.default}' @click="checkDefault"></span>设为默认
                                    </div>
                                    <div class="dialog-blue-btn big-main-btn js-verify-address" :class='{"disabled-btn":!isRight}'>
                                        <a @click="submitNewAddress">保存</a>
                                    </div>
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
    import addList from '@/lib/addList'
    export default {
        props:['showAddressPop'],
        data(){
            return {
                addList,
                newAddress:{
                    "name": "",
                    "phone": "",
                    "areaCode": "",
                    "landLine": "",
                    "provinceId": 0,
                    "province": "",
                    "cityId": 0,
                    "city": "",
                    "countyId": 0,
                    "county": "",
                    "add": "",
                    "default": false
                },
                phoneError:false,
                isRight:false
            }
        },
        computed:{
            cityList(){
                let city = []
                this.addList.forEach((province)=>{
                    if(province.area_id==this.newAddress.provinceId){
                        this.newAddress.province = province.area_name
                        city = province.city_list
                    }
                })
                if(this.newAddress.provinceId==0){
                    this.newAddress.cityId = 0
                    this.newAddress.countyId = 0
                }
                return city
            },
            countyList(){
                let county = []
                this.cityList.forEach((city)=>{
                    if(city.area_id==this.newAddress.cityId){
                        this.newAddress.city = city.area_name
                        county = city.county_list
                    }
                })
                if(this.newAddress.cityId==0){
                    this.newAddress.countyId = 0
                }
                return county
            }
        },
        watch:{
            'newAddress.countyId'(){
                this.countyList.forEach((county)=>{
                    if(county.area_id==this.newAddress.countyId){
                        this.newAddress.county = county.area_name
                        return
                    }
                })
            },
            newAddress:{
                handler(){ //当newAddress数据变化了，执行函数
                    this.inspectAddress()
                },
                deep:true
            }
        },
        methods:{
            closePop(){
                this.$emit('getStatus')
            },
            inspectPhone(){
                if(this.newAddress.phone.length===11){
                    this.phoneError = false
                }else{
                    this.phoneError = true
                }
            },
            setPhoneError(){
                this.phoneError = false
            },
            checkDefault(){
                this.newAddress.default = !this.newAddress.default
            },
            inspectAddress(){
                if(this.newAddress.phone&&!this.phoneError&&this.newAddress.province&&this.newAddress.city&&this.newAddress.county&&this.newAddress.add){
                    this.isRight = true
                }else{
                    this.isRight = false
                }
            },
            submitNewAddress(){
                if(this.isRight){
                    this.$store.commit('submitNewAddress',this.newAddress)
                    this.closePop()
                }
            }
        }
    } 
</script>