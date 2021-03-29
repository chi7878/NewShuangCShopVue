<template>
    <div class="main">
        <div class="main-banner">
            <p class="main-banner__title">科技 /</p>
            <p class="main-banner__title">讓生活無限可能</p>
            <div class="main-banner__button" @click="goLink('/products')">
                <p class="main-banner__button-text">MORE</p>
            </div>
        </div>
        <div class="main-content">
            <div class="main-content__hot">
                <p class="main-content__title">人氣商品</p>
                <p class="main-content__small-title">POPULAR PRODUCTS</p>
                <ul class="main-content__hot-list">
                    <li class="main-content__hot-item">
                        <div class="main-content__hot-img">
                            <img src="../../../../assets/images/product/iphone-12-pro-max.jpg" alt="" />
                        </div>
                        <p class="main-content__hot-text">APPLE IPhone 12 Pro Max</p>
                    </li>
                    <li class="main-content__hot-item">
                        <div class="main-content__hot-img">
                            <img src="../../../../assets/images/product/air-pods-pro.jpg" alt="" />
                        </div>
                        <p class="main-content__hot-text">APPLE AirPods Pro</p>
                    </li>
                    <li class="main-content__hot-item">
                        <div class="main-content__hot-img">
                            <img src="../../../../assets/images/product/S21.jpg" alt="" />
                        </div>
                        <p class="main-content__hot-text">SAMSUNG Galaxy S21 Ultra</p>
                    </li>
                    <li class="main-content__hot-item">
                        <div class="main-content__hot-img">
                            <img src="../../../../assets/images/product/google-nest-audio.jpg" alt="" />
                        </div>
                        <p class="main-content__hot-text">Google Nest Audio</p>
                    </li>
                </ul>
            </div>
            <div class="main-content__class">
                <p class="main-content__title">商品分類</p>
                <p class="main-content__small-title">PRODUCT CATEGORY</p>
                <ul class="main-content__class-list">
                    <li class="main-content__class-item" @click="goClassLink('手機')">
                        <p class="main-content__class-title">手機</p>
                    </li>
                    <li class="main-content__class-item" @click="goClassLink('配件')">
                        <p class="main-content__class-title">智慧穿戴</p>
                    </li>
                    <li class="main-content__class-item" @click="goClassLink('穿戴')">
                        <p class="main-content__class-title">周邊</p>
                    </li>
                    <li class="main-content__class-item" @click="goClassLink('生活')">
                        <p class="main-content__class-title">智能生活</p>
                    </li>
                </ul>
            </div>
            <div class="main-content__discount">
                <p class="main-content__discount-title">特色</p>
                <p class="main-content__discount-small-title">Feature</p>
                <div class="main-content__discount-box">
                    <div class="main-content__discount-content">
                        <img :src="require('@/assets/images/illustration/' + featureList[activeFeatureTab]['img'] + '.png')" />
                    </div>
                    <div class="main-content__discount-content">
                        <p class="main-content__discount-content-title">{{featureList[activeFeatureTab]['title']}}</p>
                        <p class="main-content__discount-content-text">{{featureList[activeFeatureTab]['text']}}</p>
                    </div>
                    <p class="main-content__discount-btn main-content__discount-btn_prev" @click="changeFeatureTab(-1)">PREV</p>
                    <p class="main-content__discount-btn main-content__discount-btn_next" @click="changeFeatureTab(+1)">NEXT</p>
                </div>
            </div>
            <div class="main-content__activity">
                <div class="main-content__activity-box">
                    <p class="main-content__activity-title">想搶先知道最新商品與最新活動嗎?</p>
                    <div class="main-content__activity-input-box">
                        <input class="main-content__activity-input" type="text" />
                        <i class="far fa-paper-plane"></i>
                    </div>
                </div>
                <div class="main-content__activity-box">
                    <img src="../../../../assets/images/illustration/undraw-Mailbox-re-dvds.png" width="100%" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "./home-main.scss";
</style>

<script>
export default {
    name: "homeMain",
    data() {
        return {
            featureList: [
                { img: 'undraw-Savings-re-eq4w', title: '商品免運費免手續費', text: '刷卡或分期付款也無須額外收費' },
                { img: 'undraw-On-the-way-re-swjt', title: '超速宅配', text: '超快速宅配三天就到你家門口' },
                { img: 'undraw-travel-together-re-kjf2', title: '保固1年', text: '商品全球都可維修' },
            ],
            activeFeatureTab: 0
        };
    },
    methods: {
        goLink(status) {
            this.$router.push(status).catch(() => {});
            window.scroll(0, 0);
        },
        goClassLink(data) {
            this.$router.push({path : '/products' ,query: { status: data }} ).catch(()=>{});
        },
        changeFeatureTab(status) {
            this.activeFeatureTab +=status;

            if (this.activeFeatureTab < 0) {
                this.activeFeatureTab = this.featureList.length - 1;
            } else if (this.activeFeatureTab > this.featureList.length - 1) {
                this.activeFeatureTab = 0;
            }

        }
    },
};
</script>
