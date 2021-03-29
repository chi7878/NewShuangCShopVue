<template>
    <div class="product">
        <div class="product-header">
            <b-carousel class="product-carousel" :interval="4000" controls indicators>
                <b-carousel-slide :img-src="require('@/assets/images/carousel/carousel-1.jpg')"></b-carousel-slide>
                <b-carousel-slide :img-src="require('@/assets/images/carousel/carousel-2.jpg')"></b-carousel-slide>
            </b-carousel>
        </div>
        <div class="product-nav">
            <p class="product-nav__title">分類</p>
            <ul class="product-nav__list">
                <li
                    class="product-nav__item"
                    :class="{ 'product-nav__item_active': activeCategory === '全部' }"
                    @click="changeClass('全部')"
                >
                    全部
                </li>
                <li
                    class="product-nav__item"
                    :class="{ 'product-nav__item_active': activeCategory === '配件' }"
                    @click="changeClass('配件')"
                >
                    配件
                </li>
                <li
                    class="product-nav__item"
                    :class="{ 'product-nav__item_active': activeCategory === '手機' }"
                    @click="changeClass('手機')"
                >
                    手機
                </li>
                <li
                    class="product-nav__item"
                    :class="{ 'product-nav__item_active': activeCategory === '穿戴' }"
                    @click="changeClass('穿戴')"
                >
                    穿戴
                </li>
                <li
                    class="product-nav__item"
                    :class="{ 'product-nav__item_active': activeCategory === '耳機' }"
                    @click="changeClass('耳機')"
                >
                    耳機
                </li>
                <li
                    class="product-nav__item"
                    :class="{ 'product-nav__item_active': activeCategory === '生活' }"
                    @click="changeClass('生活')"
                >
                    生活
                </li>
            </ul>
        </div>
        <div class="product-main">
            <div class="product-null" v-if="productList.length === 0">
                <p>商品還在上架中...</p>
            </div>
            <ul class="product-list">
                <li class="product-item" v-for="product in productList[nowPage]" :key="product['id']" @click="goProductInfo(product['id'])">
                    <div class="product-item__content">
                        <div class="product-item__box">
                            <img :src="product['imageUrl']" alt="" />
                        </div>
                        <div class="product-item__box">
                            <p class="product-item__title">{{ product["title"] }}</p>
                            <p class="product-item__price">NT${{ product["price"] | currency }}</p>
                        </div>
                        <div class="product-item__hover">
                            <p class="product-item__hover-text">{{ product["category"] }}</p>
                            <p class="product-item__hover-text">VIEW</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="product-page-nav" v-if="productList.length !== 0">
            <i
                class="product-page-nav__btn fas fa-angle-left"
                :class="{ 'product-page-nav__btn_null': nowPage === 0 }"
                @click="changePage('prev')"
            ></i>
            <p
                class="product-page-nav__item"
                v-for="item in productList.length"
                :key="item"
                @click="changePage(item - 1)"
                :class="{ 'product-page-nav__item_active': nowPage === item - 1 }"
            >
                {{ item }}
            </p>
            <i
                class="product-page-nav__btn fas fa-angle-right"
                :class="{ 'product-page-nav__btn_null': nowPage === productList.length - 1 }"
                @click="changePage('next')"
            ></i>
        </div>
        <loading v-if="isLoaded"></loading>
    </div>
</template>

<style lang="scss">
@import "./product-list.scss";
</style>

<script>
import store from '../../../../store';
import loading from '../loading-page/loading-page.vue';

export default {
    name: "productList",
    data() {
        return {
            originalProductList: [],
            productList: [],
            nowPage: 0,
            activeCategory: "全部",
            isLoaded: false
        };
    },
    methods: {
        changePage(status) {
            this.nowPage = status === "prev" ? this.nowPage - 1 : status === "next" ? this.nowPage + 1 : status;
        },
        getProduct() {
            this.isLoaded = true;
            store.dispatch("getProductListAll").then((data) => {
                if (data["data"]["success"]) {
                    this.originalProductList = data["data"]["products"].filter(product => product['is_enabled'] === 1);
                    this.cutProductPage(this.originalProductList);
                }
                this.isLoaded = false;
            }).catch(() => this.isLoaded = false);
        },
        cutProductPage(data) {
            this.productList = [];
            let list = [];
            list =
                this.activeCategory === "全部"
                    ? data
                    : data.filter((product) => product["category"] === this.activeCategory);

            for (let i = 0; i < list.length; i += 10) {
                this.productList.push(list.slice(i, i + 10));
            }
        },
        changeClass(status) {
            this.activeCategory = status;
            this.page = 0;
            this.cutProductPage(
                status === "全部"
                    ? this.originalProductList
                    : this.originalProductList.filter((product) => product["category"] === status)
            );
        },
        goProductInfo(id) {
            this.$router.push(`/product/${id}`);
        }
    },
    mounted() {
        if (this.$route.query['status']) {
            this.activeCategory = this.$route.query['status'];
        }

        this.getProduct();
    },
    watch:{
      $route (to){
        if (to.query['status']) {
            this.activeCategory = to.query['status'];
        }

        this.getProduct();
      }
    },
    components: {
      loading
    }

};
</script>
