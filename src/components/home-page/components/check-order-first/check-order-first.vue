<template>
    <div class="check">
        <ul class="check-list">
            <li class="check-item" v-for="product in cartList" :key="product['id']">
                <div class="check-item__img">
                    <img :src="product['product']['imageUrl']" alt="">
                </div>
                <div class="check-item__info">
                    <p class="check-item__title">{{product['product']['title']}}</p>
                    <p class="check-item__num">{{product['qty']}}{{product['product']['unit']}}</p>
                </div>
                <p class="check-item__price">NT${{product['total'] | currency}}</p>
                <i :class="[product['isLoaded'] ? 'fas fa-circle-notch fa-spin icn-loading' : 'far fa-trash-alt']" @click="deleteCart(product)"></i>
            </li>
        </ul>
        <div class="check-coupon">
            <b-form class="check-coupon__input">
                <b-form-input placeholder="請輸入優惠代碼" v-model="coupon.value"></b-form-input>
            </b-form>
            <div class="check-coupon__btn" :class="{'check-coupon__btn_null':coupon.value === ''}" @click="addCoupon()">使用</div>
        </div>
        <!-- <p class="check-text" [style.color]="coupon.controls.alert.value === '找不到優惠券!'? '#ff4b4b' : '$fontColor'">{{coupon.controls.alert.value}}</p> -->
        <p class="check-text" :style="{'color': coupon.alert === '找不到優惠券!'? '#ff4b4b' : '$fontColor'}">{{coupon.alert}}</p>
        <div class="check-price">
            <div class="check-price-box">
                <p class="check-price__text">金額</p>
                <p class="check-price__text">NT${{total | currency}}</p>
            </div>
            <div class="check-price-box">
                <p class="check-price__text">折扣</p>
                <p class="check-price__text">{{salePrice}}</p>
            </div>
            <div class="check-price-box">
                <p class="check-price__text">總金額</p>
                <p class="check-price__text">NT${{finalTotal | currency}}</p>
            </div>
        </div>
        <p class="check-next-btn" @click="next()">下一步</p>
        <loading v-if="isLoaded"></loading>
    </div>
</template>

<style lang="scss">
@import "./check-order-first.scss";
</style>

<script>
import loading from '../../components/loading-page/loading-page.vue';
import store from '../../../../store';

export default {
    name: "productList",
    data() {
        return {
            finalTotal: 0,
            total: 0,
            salePrice: 0,
            cartList: [],
            isLoaded: false,
            coupon: {
                value: '',
                alert: ''
            }
        };
    },
    created() {
        this.isLoaded = true;
        this.getCartList();
    },
    methods: {
        getCartList() {
            store.dispatch('getCart').then(data => {
                data['data']['data']['carts'].forEach(item => item['isLoaded'] = false);
                this.cartList = data['data']['data']['carts'];
                this.finalTotal = Math.round(data['data']['data']['final_total']);
                this.total = data['data']['data']['total'];
                this.salePrice = this.finalTotal - this.total;
                if (data['data']['data']['carts'].length === 0) {
                    this.$router.push('/products');
                }
                this.isLoaded = false;
            })
        },
        addCoupon() {
        store.dispatch('postCoupon', this.coupon.value).then(data => {
            this.finalTotal = data['data']['message'] === '找不到優惠券!' ? this.total : Math.round(data['data']['data']['final_total']);
            this.salePrice = this.finalTotal - this.total;
            this.coupon.alert = data['data']['message'];
            })
        },
        deleteCart(product) {
            product['isLoaded'] = true;
            store.dispatch('deleteCart', product['id']).then(() => {
                product['isLoaded'] = false;
                this.getCartList();
            })
        },
        next() {
            this.$emit('nextStep');
        }
    },
    components: {
        loading
    }
};
</script>
