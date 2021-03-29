<template>
  <div class="">
    <homeHeader class="home-header"></homeHeader>
    <homeMain v-if="['index', 'home'].includes(activeRoute)"></homeMain>
    <aboutUs v-else-if="activeRoute === 'about'"></aboutUs>
    <contactUs v-else-if="activeRoute === 'contact'"></contactUs>
    <news v-else-if="activeRoute === 'news'"></news>
    <question v-else-if="activeRoute === 'question'"></question>
    <returnPackage v-else-if="activeRoute === 'return'"></returnPackage>
    <shopping v-else-if="activeRoute === 'shopping'"></shopping>
    <productList v-else-if="activeRoute === 'products'"></productList>
    <productInfo v-else-if="activeRoute === 'product'" @updateCart="getCart"></productInfo>
    <homeFooter></homeFooter>
    <button class="cart" v-if="['product', 'products'].includes(activeRoute) && cartNum > 0" @click="goLink('/checkOrder')">
      <i class="fas fa-shopping-cart"></i>
      <p class="cart-notice">{{cartNum}}</p>
    </button>
  </div>
</template>

<style lang="scss">
  @import './home.scss';
</style>

<script>
import homeHeader from '../../components/home-header/home-header.vue';
import homeFooter from '../../components/home-footer/home-footer.vue';
import homeMain from '../../components/home-main/home-main.vue';
import aboutUs from '../../components/about-us/about-us.vue';
import contactUs from '../../components/contact-us/contact-us.vue';
import news from '../../components/news/news.vue';
import question from '../../components/question/question.vue';
import returnPackage from '../../components/return-package/return-package.vue';
import shopping from '../../components/shopping/shopping.vue';
import productList from '../../components/product-list/product-list.vue';
import productInfo from '../../components/product-info/product-info.vue';

import store from '../../../../store';

export default {
  name: 'HelloWorld',
  data () {
    return {
      activeRoute: '',
      cartNum: 0
    }
  },
  components: {
    homeHeader,
    homeFooter,
    homeMain,
    aboutUs,
    contactUs,
    news,
    question,
    returnPackage,
    shopping,
    productList,
    productInfo
  },
  created() {
    this.activeRoute = this.$route.name;
    this.getCart();
  },
  methods: {
    getCart() {
      store.dispatch('getCart').then((data) => {
        this.cartNum = data['data']['data']['carts'].length;
      })
    },
    goLink(status) {
      this.$router.push(status).catch(() => {});
    }
  },
  watch:{
    $route (to){    
      this.activeRoute = to.name;
    }
  } 
}
</script>
