<template>
    <div class="coupon-popup">
        <div class="coupon-popup__box">
            <p class="coupon-popup-title">{{isEdit ? '編輯優惠券': '新增優惠券'}}</p>
            <div class="coupon-popup-scrollbar-box" >
                <perfect-scrollbar class="coupon-popup-scrollbar">
                    <div class="coupon-popup-form">
                        <b-form class="coupon-popup-form__input" :class="[judugeValueNull(formValue['name']) ? 'coupon-popup-form__input_warn' : 'coupon-popup-form__input_null']">
                            <label>優惠券名稱*</label>
                            <b-form-input v-model="formValue['name']['value']" @blur="isFocused('name')"></b-form-input>
                            <p class="coupon-popup-form__input-text">{{formValue['name']['value'].length > formValue['name']['maxLength'] ? '優惠券名稱最多200字' : '請輸入優惠券名稱'}}</p>
                        </b-form>
                        <div class="oupon-popup-form__slide">
                            <b-form-checkbox v-model="formValue['isOpened']['value']" name="check-button" switch>啟用</b-form-checkbox>
                        </div>
                    </div>
                    <div class="coupon-popup-form">
                        <b-form class="coupon-popup-form__input" :class="[judugeValueNull(formValue['code']) ? 'coupon-popup-form__input_warn' : 'coupon-popup-form__input_null']">
                            <label>折扣碼*</label>
                            <b-form-input v-model="formValue['code']['value']" @blur="isFocused('code')"></b-form-input>
                            <p class="coupon-popup-form__input-text">{{formValue['code']['value'].length > formValue['code']['maxLength'] ? '折扣碼最多10字' : '請輸入折扣碼'}}</p>
                        </b-form>
                        <b-form class="coupon-popup-form__input"  :class="[judugeValueNull(formValue['percent']) ? 'coupon-popup-form__input_warn' : 'coupon-popup-form__input_null']">
                            <label>折扣(%)*</label>
                            <b-form-input v-model="formValue['percent']['value']" @blur="isFocused('percent')"></b-form-input>
                            <p class="coupon-popup-form__input-text">{{formValue['percent']['value'].length > formValue['percent']['maxLength'] ? '折扣最多3字' : '請輸入折扣'}}</p>
                        </b-form>
                    </div>
                </perfect-scrollbar>
            </div>
            <div class="coupon-popup-buttons">
                <button class="coupon-popup-button" mat-dialog-close color="warn" @click="closePopup('')">取消</button>
                <button class="coupon-popup-button" :class="{'coupon-popup-button_disabled': !showConfirm}" color="primary" @click="addProduct()">{{isEdit ? '編輯': '新增'}}</button>
            </div>
            <div class="coupon-popup-close">
                <button class="coupon-popup-button-close"  @click="closePopup('')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import './coupon-info-popup.scss';
</style>

<script>
import store from '../../../../store';
export default {
    name: 'couponInfoPopup',
    props:{
        isEdit: Boolean, 
        couponInfo: Object
    },
    data() {
        return {
            formValue: {
                name: {value:'', maxLength: 200, isFocused: false},
                code: {value:'', maxLength: 10, isFocused: false},
                percent: {value:'', maxLength: 3, isFocused: false},
                isOpened: {value:true}
            }
        }
    },
    created() {
        if (this.isEdit) {
            this.formValue['name']['value'] = this.couponInfo['title'];
            this.formValue['code']['value'] = this.couponInfo['code'];
            this.formValue['percent']['value'] = this.couponInfo['percent'].toString();
            this.formValue['isOpened']['value'] = this.couponInfo['is_enabled'];
        }
    },
    computed: {
        showConfirm() {
            return Object.keys(this.formValue).filter(item => item !== 'isOpened')
            .every(item => this.formValue[item]['value'].replace(/\s+/g, '') !== '' && this.formValue[item]['value'].replace(/\s+/g, '').length <= this.formValue[item]['maxLength']);
        }
    },
    methods: {
        judugeValueNull(status) {
            return (status['value'].replace(/\s+/g, '') === '' || status['value'].replace(/\s+/g, '').length > status['maxLength']) 
            && status['isFocused'];
        },
        isFocused(data) {
            this.formValue[data]['isFocused'] = true;
        },
        showFinish() {
            return Object.keys(this.formValue).filter(item => item !== 'message')
            .every(item => this.formValue[item]['value'].replace(/\s+/g, '') !== '' && this.formValue[item]['value'].replace(/\s+/g, '').length <= this.formValue[item]['maxLength']);
        },
        addProduct() {
            if (this.showConfirm) {
                const data = {
                    title: this.formValue['name']['value'],
                    code: this.formValue['code']['value'],
                    percent: this.formValue['percent']['value'],
                    is_enabled: this.formValue['isOpened']['value'] ? 1 : 0,
                }

                if (this.isEdit) {
                    store.dispatch('putEditCoupon', {data, id: this.couponInfo['id']}).then(data => {
                        if (data['data']['success']) {
                            this.$bvToast.toast('優惠券已更改', {
                            title: '通知',
                            autoHideDelay: 5000,
                            toaster: 'b-toaster-bottom-right'
                            });
                            this.closePopup('edit');
                        }
                    });
                } else {
                    store.dispatch('postAddCoupon', data).then(data => {
                        if (data['data']['success']) {
                            // this.dialogRef.close('edit');
                            this.$bvToast.toast('優惠券已新增', {
                            title: '通知',
                            autoHideDelay: 5000,
                            toaster: 'b-toaster-bottom-right'
                            });
                            this.closePopup('add');
                        }
                    });
                }
            }
        },
        closePopup(status) {
            this.$emit('closePopup', status);
        }
    }
}
</script>