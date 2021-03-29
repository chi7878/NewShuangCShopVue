<template>
    <div class="info">
        <div class="info-box">
            <img :src="productInfo['imageUrl']" alt="">    
        </div>
        <div class="info-box">
            <div class="info-content">
                <p class="info-box__title">{{productInfo['title']}}</p>
                <p class="info-box__tag">{{productInfo['category']}}</p>
                <div class="info-box__feature">
                    <p class="info-box__feature-title">特色-</p>
                    <p class="info-box__feature-text">{{productInfo['description']}}</p>
                </div>
                <p class="info-box__price-original">建議售價 NT${{productInfo['origin_price'] | currency}}</p>
                <p class="info-box__price-sale">NT${{productInfo['price'] | currency}}</p>
                <div class="info-box__num-box">
                    <i class="fas fa-minus" :class="{'info-box__add-null': num === 1}" @click="addQty(-1)"></i>
                    <p class="info-box__num">{{num}}</p>
                    <i class="fas fa-plus" :class="{'info-box__add-null': num === productInfo['num']}"  @click="addQty(1)"></i>
                </div>
                <div class="info-box__btns">
                    <p class="info-box__btn" @click="addCart(false)">加入購物車</p>
                    <p class="info-box__btn" @click="addCart(true)">直接購買</p>
                </div>
            </div>
        </div>
        <i class="info-back fas fa-chevron-left" @click="goBack()"></i>
        <loading v-if="isLoaded"></loading>
        <noticePopup v-if="isNoticePopupOpened" title="已加入購物車" @closePopup="closePopup()"></noticePopup>
    </div>
</template>

<style lang="scss">
@import './profuct-info.scss';
</style>

<script>
import store from '../../../../store';
import loading from '../loading-page/loading-page.vue';
import noticePopup from '../notice-popup/notice-popup.vue';

export default {
    name: "loadingPage",
    data() {
        return {
            isLoaded: false,
            productInfo: {},
            num : 1,
            isNoticePopupOpened: false
        };
    },
    methods: {
        getProductInfo() {
            this.isLoaded = true;
            store.dispatch('getProductInfo', this.$route.params.id).then((data) => {
                if (data['data']['success']) {
                    this.productInfo = data['data']['product'];
                }

                this.isLoaded = false;
            }).catch(() => this.isLoaded = false)
        },
        addQty(status) {
            this.num += status;
        },
        goBack() {
            this.$router.push('/products').catch(()=>{});
        },
        addCart(status) {
            store.dispatch('postAddCart',{product_id: this.$route.params.id, qty: this.num}).then(() => {
                if (!status) {
                    this.isNoticePopupOpened = true;
                    this.$emit('updateCart');
                } else {
                    this.$router.push('/checkOrder');
                }
            })
        },
        closePopup() {
            this.isNoticePopupOpened = false;
        }
    },
    mounted() {
        this.getProductInfo();
    },
    components: {
        loading,
        noticePopup
    }
};
</script>