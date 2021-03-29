<template>
    <div class="inner">
    <div class="inner-box">
        <div class="inner-box__content">
            <img src="../../../../assets/images/illustration/undraw-work-together-h63l.png" alt="">
        </div>
        <div class="inner-box__content">
            <p class="inner-box__title">後台登入</p>
            <b-form class="inner-box__input">
                <label class="inner-box__label" for="feedback-user">帳號</label>
                <b-form-input class="inner-box__value" v-model="userValue['user']" @focus="userValue['isUserFoused'] = true" @keydown.enter="$event.preventDefault()"
                id="feedback-user" placeholder="請輸入帳號 or 手機號碼"></b-form-input>
                <p class="inner-box__warn" :class="{ 'inner-box__warn-hidden' :!judugeUserValueNull}">請輸入帳號</p>
            </b-form>
            <b-form class="inner-box__input">
                <label for="feedback-passwoed">密碼</label>
                <b-form-input class="inner-box__value" v-model="userValue['password']" @focus="userValue['isPasswordFoused'] = true" @keydown.enter="$event.preventDefault()"
                type="password" id="feedback-passwoed" placeholder="請輸入密碼"></b-form-input>
                <p class="inner-box__warn" :class="{ 'inner-box__warn-hidden' :!judugePasswordValueNull}">請輸入密碼</p>
            </b-form>
            <button class="inner-box__button" @click="login()">登入</button>
        </div>
        <i class="icn-back fas fa-arrow-left" @click="goBack()" v-b-tooltip.bottom="'回客戶首頁'"></i>
    </div>
    <loading :title="'登入中...'" v-if="isLoaded"></loading>
    <noticePopup :title="'輸入的帳號或密碼錯誤'" @closePopup="closePopup()" v-if="isNoticePopupOpened"></noticePopup>
</div>
</template>

<style lang="scss">
@import './inner-login.scss';
</style>

<script>
import loading from '../../../home-page/components/loading-page/loading-page.vue';
import noticePopup from '../../../home-page/components/notice-popup/notice-popup.vue';
import store from '../../../../store';

export default {
    name: 'customerLogin',
    data() {
        return {
            userValue: {
                user: '',
                password: '',
                isUserFoused: false,
                isPasswordFoused: false,
            },
            isLoaded: false,
            isNoticePopupOpened: false
        }
    },
    created() {
        if (document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1') !== '') {
            this.$router.push('/dashboard').catch(() => {});
        }
    },
    computed: {
        judugeUserValueNull() {
            return this.userValue['user'].replace(/\s+/g, '') === '' && this.userValue['isUserFoused'];
        },
        judugePasswordValueNull() {
            return this.userValue['password'].replace(/\s+/g, '') === '' && this.userValue['isPasswordFoused'];
        }
    },
    methods: {
        goLink(status) {
            this.$router.push(status).catch(() => {});
        },
        login() {
            this.isLoaded = true;
            store.dispatch('postInnerLogin', { username: this.userValue['user'], password: this.userValue['password'] }).then(data => {
                if (data['data']['success']) {
                    document.cookie = `hexToken=${data['data']['token']}; expires= ${new Date(data['data']['expired'])}`;
                    store.state.cookies = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
                    this.$router.push('/dashboard').catch(() => {});
                } else {
                    this.isNoticePopupOpened = true;
                }
                this.isLoaded = false;
            }).catch(() => this.isLoaded = false)
        },
        closePopup() {
            this.isNoticePopupOpened = false;
        },
        goBack() {
            this.$router.push('/login').catch(() => {});
        }
    },
    components: {
        loading,
        noticePopup
    }
}
</script>