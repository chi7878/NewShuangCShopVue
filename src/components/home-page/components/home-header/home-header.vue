<template>
  <div class="header">
    <div class="header-box" @click="goLink('/home')">
      <img src="../../../../assets/images/new-shuang-logo.svg" alt="logo">
    </div>
    <ul class="header-box">
      <li class="header-box__item" @click="goLink('/home')">首頁</li>
      <li class="header-box__item" @click="goLink('/products')">商品</li>
      <li class="header-box__item" @click="goLink('/news')">消息</li>
      <li class="header-box__item" @click="goLink('/about')">關於</li>
      <li class="header-box__item" @click="goLink('/login')">登入</li>
    </ul>
    <div class="header-menu" @click="isMenuOpened = true">
      <i class="fas fa-bars"></i>
    </div>
    <div class="header-menu-box" :class="{'header-menu-box_open': isMenuOpened}">
      <p class="header-menu-box__item" @click="goLink('/home')">首頁</p>
      <p class="header-menu-box__item" @click="goLink('/products')">商品</p>
      <p class="header-menu-box__item" @click="goLink('/news')">消息</p>
      <p class="header-menu-box__item" @click="goLink('/about')">關於</p>
      <p class="header-menu-box__item" @click="goLink('/login')">登入</p>
      <i class="fas fa-times header-menu-box__close" @click="isMenuOpened = false"></i>
    </div>
  </div>
</template>

<style lang="scss">
  @import "./home-header.scss"; 
</style>

<script>
export default {
  name: 'homeHeader',
  data () {
    return {
      isMenuOpened: false
    }
  },
  methods: {
    goLink(status) {
      this.$router.push(status).catch(()=>{});
      this.isMenuOpened = false;
      window.scroll(0,0);
    }
  },

}
</script>