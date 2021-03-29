<template>
    <div class="box">
        <div class="logo-box"></div>
        <ul class="info-list">
            <li class="info-item" v-b-tooltip.right="'商品'" :class="{'info-item_active': activeTab === 0}" @click="changeTab(0)">
                <i class="info-icon fas fa-box-open"></i>
                <p class="info-text">商品</p>
            </li>
            <li class="info-item" v-b-tooltip.right="'優惠券'" :class="{'info-item_active': activeTab === 1}" @click="changeTab(1)">
                <i class="info-icon fas fa-ticket-alt"></i>
                <p class="info-text">優惠券</p>
            </li>
            <li class="info-item" v-b-tooltip.right="'訂單'" :class="{'info-item_active': activeTab === 2}" @click="changeTab(2)">
                <i class="info-icon fas fa-shopping-cart"></i>
                <p class="info-text">訂單</p>
            </li>
        </ul>
        <!-- <div matTooltip="登出" matTooltipPosition="above" class="logout-box"> -->
        <div class="logout-box" v-b-tooltip.top="'登出'" @click="logout()">
            <i class="logout-icon fas fa-sign-out-alt"></i>
        </div>
    </div>
</template>

<style lang="scss">
@import './left-bar.scss';
</style>

<script>
import store from '../../../../store'; 

export default {
    name: "leftBar",
    props: {
        activeTab: Number
    },
    data() {
        return {
        };
    },
    methods: {
        changeTab(tab) {
            this.$emit('changeTab', tab);
        },
        logout() {
            store.dispatch('postInnerLogout').then(data => {
                if (data['data']['success']) {
                    document.cookie = "hexToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                    store.state.cookies = '';
                    this.$router.push('/innerLogin');
                }
            })
        }
    }
};
</script>