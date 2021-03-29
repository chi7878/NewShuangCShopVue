<template>
    <div class="coupon-list">
        <div class="coupon-list__new-box" v-b-tooltip.top="'新增優惠券'" @click="openPopup()">
            <i class="new-icon fas fa-plus-circle"></i>
            <p class="coupon-list__new-text">新增優惠券</p>
        </div>
        <div class="coupon-list__list-box">
            <perfect-scrollbar class="project-list__list-scrollbar ps-show-always" :options="{suppressScrollX : false, suppressScrollY : true}">
                <ul class="coupon-list__list coupon-list__list_header">
                    <li class="coupon-list__item">
                        <p class="coupon-list__text">名稱</p>
                    </li>
                    <li class="coupon-list__item">
                        <p class="coupon-list__text">折扣碼</p>
                    </li>
                    <li class="coupon-list__item">
                        <p class="coupon-list__text">折扣</p>
                    </li>
                    <li class="coupon-list__item">
                        <p class="coupon-list__text">是否啟用</p>
                    </li>
                    <li class="coupon-list__item">
                        <p class="coupon-list__text">編輯</p>
                    </li>
                    <li class="coupon-list__item">
                        <p class="coupon-list__text">刪除</p>
                    </li>
                </ul>
                <div class="coupon-list__scrollbar-box">
                    <perfect-scrollbar  class="project-list__scrollbar ps-show-always">
                        <ul class="coupon-list__list" v-for="coupon in couponList" :key="coupon['id']">
                            <li class="coupon-list__item">
                                <p class="coupon-list__text">{{coupon['title']}}</p>
                            </li>
                            <li class="coupon-list__item">
                                <p class="coupon-list__text">{{coupon['code']}}</p>
                            </li>
                            <li class="coupon-list__item">
                                <p class="coupon-list__text">{{coupon['percent']}}%</p>
                            </li>
                            <li class="coupon-list__item" >
                                <div @click.prevent="toggleOpened(coupon, coupon['id'])">
                                    <b-form-checkbox v-model="coupon['is_enabled']" name="check-button" switch></b-form-checkbox>
                                </div>
                            </li>
                            <li class="coupon-list__item">
                                <i class="icon-edit fas fa-pencil-alt" @click="openEditPopup(coupon)"></i>            
                            </li>
                            <li class="coupon-list__item">
                                <i class="far fa-trash-alt" @click="deleteCoupon(coupon['id'])"></i>           
                            </li>
                        </ul>
                    </perfect-scrollbar>
                </div>
            </perfect-scrollbar>
        </div>
        <loading v-if="isLoaded"></loading>
        <couponPopup :isEdit="isEdit" :couponInfo="activeCoupon" @closePopup="closePopup($event)" v-if="isPopupOpened"></couponPopup>
        <alertPopup :title="'確定要刪除優惠券嗎?'" :btnName="'刪除'" @closePopup="closeAlert($event)" v-if="isAlertOpened"></alertPopup>
    </div>

</template>

<style lang="scss">
@import './coupon-list.scss';
</style>

<script>
import store from '../../../../store';
import loading from '../../../home-page/components/loading-page/loading-page.vue';
import couponPopup from '../coupon-info-popup/coupon-info-popup.vue';
import alertPopup from '../alert-popup/alert-popup.vue';

export default {
    name: "leftBar",
    data() {
        return {
            isLoaded: false,
            isPopupOpened: false,
            isAlertOpened: false,
            couponList: [],
            isEdit: false,
            activeCoupon: {},
            deleteCouponId: ''
        };
    },
    created() {
        this.isLoaded = true;
        this.getCouponList();
    },
    methods: {
        getCouponList() {
            store.dispatch('getCoupon', 1).then(data => {
                this.couponList = data['data']['coupons'];
                this.couponList.forEach(coupon => coupon['is_enabled'] = coupon['is_enabled'] === 1);
                this.isLoaded = false;
            }).catch(() => this.isLoaded = false);
        },
        toggleOpened(status, id) {
            status['is_enabled'] = !status['is_enabled'];
            store.dispatch('putEditCoupon',{data: {is_enabled: status['is_enabled'] ? 1 : 0}, id}).then(data => {
                if (data['data']['success']) {
                    this.$bvToast.toast(status['is_enabled'] ? '優惠券已啟用' : '優惠券已關閉', {
                    title: '通知',
                    autoHideDelay: 5000,
                    toaster: 'b-toaster-bottom-right'
                    });
                }
            })
        },
        openPopup() {
            this.isPopupOpened = true;
            this.isEdit = false;
        },
        openEditPopup(data) {
            this.isPopupOpened = true;
            this.isEdit = true;
            this.activeCoupon = data;
        },
        closePopup(status) {
            this.isPopupOpened = false;
            if (status) {
                this.$bvToast.toast(status === 'add' ? '優惠券已新增' : '優惠券已修改', {
                title: '通知',
                autoHideDelay: 5000,
                toaster: 'b-toaster-bottom-right'
                });
                this.getCouponList();
            }
        },
        deleteCoupon(id) {
            this.deleteCouponId = id;
            this.isAlertOpened = true;
        },
        closeAlert(status) {
            if (status) {
                store.dispatch('deleteCoupon', this.deleteCouponId).then(data => {
                    if (data['data']['success']) {
                        this.$bvToast.toast('優惠券已刪除', {
                        title: '通知',
                        autoHideDelay: 5000,
                        toaster: 'b-toaster-bottom-right'
                        });
                        this.getCouponList();
                    }
                    this.isAlertOpened = false;
                });
            } else {
                this.isAlertOpened = false;
            }
        }
    },
    components: {
        loading,
        couponPopup,
        alertPopup
    }
};
</script>