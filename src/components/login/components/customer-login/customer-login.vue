<template>
    <div class="customer">
        <div class="customer-box">
            <div class="customer-box__content">
                <img src="../../../../assets/images/illustration/undraw-Social-media-rew-12q.png" alt="">
            </div>
            <div class="customer-box__content">
                <p class="customer-box__title">會員登入</p>
                <b-form class="customer-box__input">
                    <label for="feedback-user">帳號</label>
                    <b-form-input class="customer-box__value"  id="feedback-user" placeholder="請輸入帳號 or 手機號碼"></b-form-input>
                </b-form>
                <b-form class="customer-box__input">
                    <label for="feedback-passwoed">密碼</label>
                    <b-form-input class="customer-box__value" type="password" id="feedback-passwoed" placeholder="請輸入密碼"></b-form-input>
                </b-form>
                <button class="customer-box__button">登入</button>
                <p class="customer-box__text">忘記密碼?</p>
            </div>
            <i class="icn-back fas fa-arrow-left" v-b-tooltip.bottom="'回首頁'" @click="goLink('/products')"></i>
            <i class="icn-dashboard fas fa-columns" v-b-tooltip.bottom="'後台'" @click="goLink('/innerLogin')"></i>
        </div>
    </div>
</template>

<style lang="scss">
@import './customer-login.scss';
</style>

<script>
export default {
    name: 'customerLogin',
    data() {
        return {

        }
    },
    methods: {
        goLink(status) {
            this.$router.push(status).catch(() => {});
        }
    }
}
</script>