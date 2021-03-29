<template>
  <div class="footer">
    <div class="footer-box">
      <p class="footer-box__title">商店</p>
      <ul class="footer-box__list">
        <li class="footer-box__item" @click="goLink('/products', '手機')">手機</li>
        <li class="footer-box__item" @click="goLink('/products', '配件')">手機周邊</li>
        <li class="footer-box__item" @click="goLink('/products', '穿戴')">智慧穿戴</li>
        <li class="footer-box__item" @click="goLink('/products', '生活')">智能生活</li>
      </ul>
    </div>
    <div class="footer-box">
      <p class="footer-box__title">服務</p>
      <ul class="footer-box__list">
        <li class="footer-box__item" @click="goLink('/return')">退換貨須知</li>
        <li class="footer-box__item" @click="goLink('/shopping')">購物須知</li>
        <li class="footer-box__item" @click="goLink('/question')">常見問題</li>
        <li class="footer-box__item" @click="goLink('/contact')">聯絡我們</li>
      </ul>
    </div>
    <div class="footer-logo-box">
      <img src="../../../../assets/images/new-shuang-logo.svg" alt="">
    </div>
    <p class="footer-state">©Copright 2021 CHI Exercise works.</p>
  </div>
</template>

<style lang="scss">
  @import "./home-footer.scss"; 
</style>

<script>
export default {
  name: 'homeFooter',
  data () {
    return {
    }
  },
  methods: {
    goLink(status, data = undefined) {
      if (data) {
        this.$router.push({path : status ,query: { status: data }} ).catch(()=>{});
      } else {
        this.$router.push(status).catch(()=>{});
      }
      window.scroll(0,0);
    }
  }
}
</script>