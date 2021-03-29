<template>
<div class="order-popup">
    <div class="order-popup__box">
        <p class="order-popup-title">訂單明細</p>
            <perfect-scrollbar  class="order-popup-main-scrollbar">
                <div class="order-popup-main">
                    <div class="order-popup-box">
                        <perfect-scrollbar class="order-popup-scrollbar">
                            <ul class="order-popup-list">
                                <li class="order-popup-item" v-for="(product, key) in data['products']" :key="key ">
                                    <div class="order-popup-img">
                                        <img :src="product['product']['imageUrl']" alt="">
                                    </div>
                                    <p class="order-popup-item__name">{{product['product']['title']}}</p>
                                    <p class="order-popup-item__text">{{product['qty']}}{{product['product']['unit']}}</p>
                                </li>
                            </ul>
                        </perfect-scrollbar>
                    </div>
                    <div class="order-popup-box">
                        <div class="order-popup-info__text-box">
                            <p>收件人:</p>
                            <p>{{data['user']['name']}}</p>
                        </div>
                        <div class="order-popup-info__text-box">
                            <p>收件人電話:</p>
                            <p>{{data['user']['tel']}}</p>
                        </div>
                        <div class="order-popup-info__text-box">
                            <p>收件地址:</p>
                            <p>{{data['user']['address']}}</p>
                        </div>
                        <div class="order-popup-info__text-box">
                            <p>收件人信箱:</p>
                            <p>{{data['user']['email']}}</p>
                        </div>
                        <div class="order-popup-info__total-box">
                            <p>購買金額:</p>
                            <p>NT${{totalPrice(data['total'])| currency}}</p>
                        </div>
                        <div class="order-popup-info__total-box">
                            <p>目前狀態:</p>
                            <p>{{data['is_paid'] ? '待出貨' : '待付款'}}</p>
                        </div>
                    </div>
                </div>
            </perfect-scrollbar>
            <div class="order-popup-buttons">
                <button class="order-popup-button" color="warn" @click="closePopup()">取消</button>
            </div>
            <div class="order-popup-close">
                <button class="order-popup-button-close" color="warn" @click="closePopup()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>

    </div>

</template>

<style lang="scss">
@import './order-info-popup.scss';
</style>

<script>

export default {
    name: 'orderPopup',
    props:{
        data: Object
    },
    data() {
        return {
        }
    },
    methods: {
        totalPrice(price) {
            return Math.round(price);
        },
        closePopup() {
            this.$emit('closePopup');
        }
    }
}
</script>