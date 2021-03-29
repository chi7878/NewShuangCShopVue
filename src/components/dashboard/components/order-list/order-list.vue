<template>
    <div class="order-list">
        <div class="order-list__list-box">
                <perfect-scrollbar class="project-list__list-scrollbar ps-show-always" :options="{suppressScrollX : false, suppressScrollY : true}">
                    <ul class="order-list__list order-list__list_header">
                        <li class="order-list__item">
                            <p class="order-list__text">狀態</p>
                        </li>
                        <li class="order-list__item">
                            <p class="order-list__text">收件人</p>
                        </li>
                        <li class="order-list__item">
                            <p class="order-list__text">手機號碼</p>
                        </li>
                        <li class="order-list__item">
                            <p class="order-list__text">收件地址</p>
                        </li>
                        <li class="order-list__item">
                            <p class="order-list__text">商品數量</p>
                        </li>
                        <li class="order-list__item">
                            <p class="order-list__text">總金額</p>
                        </li>
                        <li class="order-list__item">
                        </li>
                    </ul>
                    <div class="order-list__scrollbar-box">
                        <perfect-scrollbar  class="project-list__scrollbar ps-show-always">
                            <ul class="order-list__list" v-for="order in orderList" :key="order['id']">
                                <li class="order-list__item">
                                    <p class="order-list__text">{{order['is_paid'] ? '待出貨' : '待付款'}}</p>
                                </li>
                                <li class="order-list__item">
                                    <p class="order-list__text">{{order['user']['name']}}</p>
                                </li>
                                <li class="order-list__item">
                                    <p class="order-list__text">{{order['user']['tel']}}</p>
                                </li>
                                <li class="order-list__item">
                                    <p class="order-list__text">{{order['user']['address']}}</p>
                                </li>
                                <li class="order-list__item">
                                    <p class="order-list__text">{{totalQty(order['products']) | currency}}</p>
                                </li>
                                <li class="order-list__item">
                                    <p class="order-list__text">NT${{totalPrice(order['total']) | currency}}</p>
                                </li>
                                <li class="order-list__item">
                                    <div class="order-list__info" @click="openOrderInfoPopup(order)">
                                        <i class="fas fa-info"></i>
                                    </div>
                                </li>
                            </ul>
                        </perfect-scrollbar>
                    </div>
                </perfect-scrollbar>
        </div>
        <loading v-if="isLoaded"></loading>
        <orderInfoPopup :data="orderInfo" @closePopup="closeOrderInfoPopup" v-if="isPopupOpened"></orderInfoPopup>
    </div>
</template>

<style lang="scss">
@import './order-list.scss';
</style>

<script>
import store from '../../../../store';
import loading from '../../../home-page/components/loading-page/loading-page.vue';
import orderInfoPopup from '../order-info-popup/order-info-popup.vue';

export default {
    name: "orderList",
    data() {
        return {
            orderList: [],
            isLoaded: false,
            isPopupOpened: false,
            orderInfo: {}
        };
    },
    created() {
        this.isLoaded = true;
        this.getOrder();
    },
    methods: {
        getOrder() {
            store.dispatch('getInnerOrder').then(data => {
                this.orderList = data['data']['orders'];
                this.isLoaded = false;
            }).catch(() => this.isLoaded = false);
        },
        totalPrice(price) {
            return Math.round(price);
        },
        totalQty(list) {
            return Object.values(list).map(product => product['qty']).reduce((a, b) => a + b);
        },
        openOrderInfoPopup(data) {
            this.orderInfo = data;
            this.isPopupOpened = true;
        },
        closeOrderInfoPopup() {
            this.orderInfo = {};
            this.isPopupOpened = false;
        }
    },
    components: {
        loading,
        orderInfoPopup
    }
};
</script>