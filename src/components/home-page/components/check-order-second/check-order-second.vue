<template>
    <div class="check-info">
        <div class="check-info-box check-info-pay">
            <p class="check-info-box__title">信用卡資料</p>
            <b-form class="check-info-input" :class="[judugeValueNull(formValue['cardNumber']) ? 'check-info-input_warn' : 'check-info-input_null']">
                <label>卡片號碼*</label>
                <b-form-input placeholder="∗∗∗∗-∗∗∗∗-∗∗∗∗-∗∗∗∗" v-model="formValue['cardNumber']['value']" @blur="isFocused('cardNumber')"></b-form-input>
                <p class="check-info-input__text">{{formValue['cardNumber']['value'].length > formValue['cardNumber']['maxLength'] ? '卡片號碼最多19字' : '請輸入名稱'}}</p>
            </b-form>
            <b-form class="check-info-input" :class="[judugeValueNull(formValue['cardCVC']) ? 'check-info-input_warn' : 'check-info-input_null']">
                <label>安全碼*</label>
                <b-form-input v-model="formValue['cardCVC']['value']" @blur="isFocused('cardCVC')"></b-form-input>
                <p class="check-info-input__text">{{formValue['cardCVC']['value'].length > formValue['cardCVC']['maxLength'] ? '安全碼最多3字' : '請輸入安全碼'}}</p>
            </b-form>
            <b-form class="check-info-input" :class="[judugeValueNull(formValue['cardDate']) ? 'check-info-input_warn' : 'check-info-input_null']">
                <label>有效日期*</label>
                <b-form-input placeholder="yy/mm" v-model="formValue['cardDate']['value']" @blur="isFocused('cardDate')"></b-form-input>
                <p class="check-info-input__text">{{formValue['cardDate']['value'].length > formValue['cardDate']['maxLength'] ? '有效日期最多5字' : '請輸入有效日期'}}</p>
            </b-form>
            <b-form class="check-info-input" :class="[judugeValueNull(formValue['cardName']) ? 'check-info-input_warn' : 'check-info-input_null']">
                <label>持卡人姓名*</label>
                <b-form-input v-model="formValue['cardName']['value']" @blur="isFocused('cardName')"></b-form-input>
                <p class="check-info-input__text">{{formValue['cardName']['value'].length > formValue['cardName']['maxLength'] ? '持卡人姓名最多50字' : '請輸入持卡人姓名'}}</p>
            </b-form>
        </div>
        <div class="check-info-box check-info-customer">
            <p class="check-info-box__title">個人資料</p>
            <b-form class="check-info-input" :class="[judugeValueNull(formValue['name']) ? 'check-info-input_warn' : 'check-info-input_null']">
                <label>姓名*</label>
                <b-form-input v-model="formValue['name']['value']" @blur="isFocused('name')"></b-form-input>
                <p class="check-info-input__text">{{formValue['name']['value'].length > formValue['name']['maxLength'] ? '姓名最多50字' : '請輸入姓名'}}</p>
            </b-form>
            <b-form class="check-info-input" :class="[judugeValueNull(formValue['phone']) ? 'check-info-input_warn' : 'check-info-input_null']">
                <label>電話*</label>
                <b-form-input v-model="formValue['phone']['value']" @blur="isFocused('phone')"></b-form-input>
                <p class="check-info-input__text">{{formValue['phone']['value'].length > formValue['phone']['maxLength'] ? '電話最多10字' : '請輸入電話'}}</p>
            </b-form>
            <b-form class="check-info-input" :class="[judugeValueNull(formValue['mail']) ? 'check-info-input_warn' : 'check-info-input_null']">
                <label>Email*</label>
                <b-form-input v-model="formValue['mail']['value']" @blur="isFocused('mail')"></b-form-input>
                <p class="check-info-input__text">{{formValue['mail']['value'].length > formValue['mail']['maxLength'] ? 'Email最多200字' : '請輸入Email'}}</p>
            </b-form>
            <b-form class="check-info-input" :class="[judugeValueNull(formValue['address']) ? 'check-info-input_warn' : 'check-info-input_null']">
                <label>收件地址*</label>
                <b-form-input v-model="formValue['address']['value']" @blur="isFocused('address')"></b-form-input>
                <p class="check-info-input__text">{{formValue['address']['value'].length > formValue['address']['maxLength'] ? '收件地址最多200字' : '請輸入收件地址'}}</p>
            </b-form>
            <b-form class="check-info-input">
                <label>留言</label>
                <b-form-textarea class="check-info-input__textarea" v-model="formValue['message']['value']"></b-form-textarea>
            </b-form>
        </div>
        <div class="check-info-btns">
            <p class="check-info-btn" @click="prev()">上一步</p>
            <p class="check-info-btn" :class="{'check-info-btn_null': !showFinish()}" @click="next()">完成訂單</p>
        </div>
        <loading title="建立訂單中..." v-if="isLoaded"></loading>
    </div>
</template>

<style lang="scss">
@import "./check-order-second.scss";
</style>

<script>
import store from '../../../../store';
import loading from '../loading-page/loading-page.vue';

export default {
    name: "checkOrderSecond",
    data() {
        return {
            formValue: {
                cardNumber: {value: '', maxLength: 19, isFocused: false},
                cardCVC: {value: '', maxLength: 3, isFocused: false},
                cardDate: {value: '', maxLength: 5, isFocused: false},
                cardName: {value: '', maxLength: 50, isFocused: false},
                name: {value: '', maxLength: 50, isFocused: false},
                phone: {value: '', maxLength: 10, isFocused: false},
                mail: {value: '', maxLength: 200, isFocused: false},
                address: {value: '', maxLength: 200, isFocused: false},
                message: {value: ''},
            },
            isLoaded: false
        };
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
        next() {
            const postData = {
                message: this.formValue.message.value,
                user: {
                    address: this.formValue.address.value,
                    email: this.formValue.mail.value,
                    name: this.formValue.name.value,
                    tel: this.formValue.phone.value,
                }
            }
            this.isLoaded = true;
            store.dispatch('postAddOrder', postData).then(data => {
                if (data['data']['success']) {
                    this.$emit('nextStep');
                    this.isLoaded = false;
                }
            }).catch(() => this.isLoaded = false);
        },
        prev() {
            this.$emit('prevStep');
        }
    },
    components: {
        loading
    }

};
</script>
