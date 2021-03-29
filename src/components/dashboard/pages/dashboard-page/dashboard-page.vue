<template>
    <div class="dashboard">
        <app-leftBar :activeTab="activeTab" @changeTab="changeTab($event)"></app-leftBar>
        <div class="right-box">
            <app-header :activeTab="activeTab" :headerInfo="headerInfo"></app-header>
            <productList @updateList="getData" v-if="activeTab === 0" :productList="productList"></productList>
            <couponList v-else-if="activeTab === 1"></couponList>
            <orderList v-else-if="activeTab === 2"></orderList>
        </div>
        <loading v-if="isLoaded"></loading>
    </div>

</template>

<style lang="scss">
@import './dashboard-page.scss';
</style>

<script>
import leftBar from '../../components/left-bar/left-bar.vue';
import header from '../../components/header/header.vue';
import loading from '../../../home-page/components/loading-page/loading-page.vue';
import productList from '../../components/product-list/product-list.vue';
import orderList from '../../components/order-list/order-list.vue';
import couponList from '../../components/coupon-list/coupon-list.vue';
import store from '../../../../store';
import axios from 'axios';

export default {
    data() {
        return {
            isLoaded: false,
            activeTab: 0,
            headerInfo: {
                productQty: 0,
                totalOrder: 0,
                totalPrice: 0
            },
            productList: [],
        }
    },
    created() {
        this.isLoaded = true;
        this.getData();
    },
    methods: {
        getData() {
            axios.all([store.dispatch('getInnerProduct'), store.dispatch('getInnerOrder')]).then(([product, order]) => {
                if (product['data']['success']) {
                    this.productList = JSON.parse(JSON.stringify(Object.values(product['data']['products']).filter(product => product['title'])));
                    this.productList.forEach(product => product['is_enabled'] = product['is_enabled'] === 1);
                    this.headerInfo['productQty'] = this.productList.length;
                }
                if (order['data']['success']) {
                    this.headerInfo['totalOrder'] = order['data']['orders'].length;
                    this.headerInfo['totalPrice'] = Math.round(order['data']['orders'].map(item => item.total).reduce((a, b) => a + b));
                }
                const info = JSON.parse(JSON.stringify(this.headerInfo));
                this.headerInfo = JSON.parse(JSON.stringify(info));
                this.isLoaded = false;
            })
        },
        changeTab(tab) {
            this.activeTab = tab;
        }
    },
    components: {
        'app-leftBar' : leftBar,
        'app-header' : header,
        loading,
        productList,
        orderList,
        couponList
    }
}
</script>