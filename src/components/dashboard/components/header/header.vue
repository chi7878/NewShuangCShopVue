<template>
    <div class="dashboard-header">
        <div class="dashboard-header-title-box">
            <p class="dashboard-header-title-box__title">Dashboard</p>
            <div class="dashboard-header-title-box__nav">
                <div class="dashboard-header-title-box__icon-box">
                    <i class="nav-icon fas" :class="[activeTab === 1 ? 'fa-box-open' : (activeTab === 2 ? 'fa-ticket-alt' : 'fa-shopping-cart')]"></i>
                </div>
                <p class="dashboard-header-title-box__text">{{activeTab === 1 ? '商品' : (activeTab === 2 ? '優惠券' : '訂單')}}</p>
            </div>
        </div>
        <ul class="dashboard-header-info__list">
            <li class="dashboard-header-info__item">
                <p class="dashboard-header-info__num">{{headerInfo['productQty']}}</p>
                <p class="dashboard-header-info__text">/目前商品數</p>
            </li>
            <li class="dashboard-header-info__item">
                <p class="dashboard-header-info__num">{{headerInfo['totalOrder']}}</p>
                <p class="dashboard-header-info__text">/總訂單數</p>
            </li>
            <li class="dashboard-header-info__item">
                <p class="dashboard-header-info__num">{{headerInfo['totalPrice'] | currency}}</p>
                <p class="dashboard-header-info__text">/總銷售金額</p>
            </li>
            <!-- <li class="header-info__item">
                <p class="header-info__num">500</p>
                <p class="header-info__text">/總訂單數</p>
            </li> -->
        </ul>
    </div>
</template>

<style lang="scss">
@import './header.scss';
</style>

<script>
export default {
    name: "dashboardHeader",
    props: {
        activeTab: Number,
        headerInfo: Object
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>
