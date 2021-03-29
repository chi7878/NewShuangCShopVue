<template>
    <div class="project-list">
        <div class="project-list__new-box" v-b-tooltip.top="'新增商品'" @click="openPopup()">
            <i class="new-icon fas fa-plus-circle"></i>
            <p class="project-list__new-text">新增商品</p>
        </div>
        <div class="project-list__list-box">
            <perfect-scrollbar class="project-list__list-scrollbar ps-show-always" :options="{suppressScrollX : false, suppressScrollY : true}">
                <ul class="project-list__list project-list__list_header" >
                    <li class="project-list__item">
                        <p class="project-list__text">分類</p>
                    </li>
                    <li class="project-list__item">
                        <p class="project-list__text">名稱</p>
                    </li>
                    <li class="project-list__item">
                        <p class="project-list__text">原價</p>
                    </li>
                    <li class="project-list__item">
                        <p class="project-list__text">售價</p>
                    </li>
                    <li class="project-list__item">
                        <p class="project-list__text">是否啟用</p>
                    </li>
                    <li class="project-list__item">
                        <p class="project-list__text">編輯</p>
                    </li>
                    <li class="project-list__item">
                        <p class="project-list__text">刪除</p>
                    </li>
                </ul>
                <div class="project-list__scrollbar-box">
                    <perfect-scrollbar  class="project-list__scrollbar ps-show-always">
                        <ul class="project-list__list" v-for="product in productList" :key="product['id']">
                            <li class="project-list__item">
                                <p class="project-list__text">{{product['category']}}</p>
                            </li>
                            <li class="project-list__item">
                                <p class="project-list__text">{{product['title']}}</p>
                            </li>
                            <li class="project-list__item">
                                <p class="project-list__text">NT${{product['origin_price'] | currency}}</p>
                            </li>
                            <li class="project-list__item">
                                <p class="project-list__text">NT${{product['price'] | currency}}</p>
                            </li>
                            <li class="project-list__item">
                                <div class="project-list__checkbox" @click.prevent="toggleOpened(product, product['id'])">
                                    <b-form-checkbox v-model="product['is_enabled']" name="check-button" switch></b-form-checkbox>
                                </div>
                            </li>
                            <li class="project-list__item">
                                <i class="icon-edit fas fa-pencil-alt" @click="openEditPopup(product)"></i>            
                            </li>
                            <li class="project-list__item">
                                <i class="far fa-trash-alt" @click="deleteCoupon(product['id'])"></i>           
                            </li>
                        </ul>
                    </perfect-scrollbar>
                </div>
            </perfect-scrollbar>  
        </div>
        <productPopup :isEdit="isEdit" :product="activeProductInfo" @closePopup="closePopup($event)" v-if="isPopupOpened"></productPopup>
        <alertPopup :title="'確定要刪除商品嗎?'" :btnName="'刪除'" @closePopup="closeAlert($event)" v-if="isAlertOpened"></alertPopup>
    </div>
</template>

<style lang="scss">
@import './product-list.scss';
</style>

<script>
import store from '../../../../store';
import productPopup from '../product-info-popup/product-info-popup.vue';
import alertPopup from '../alert-popup/alert-popup.vue';

export default {
    name: "leftBar",
    props: {
        productList: Array,
    },
    data() {
        return {
            isPopupOpened: false,
            isEdit: false,
            activeProductInfo: {},
            deleteProductId: '',
            isAlertOpened: false
        };
    },
    methods: {
        toggleOpened(status, id) {
            status['is_enabled'] = !status['is_enabled'];
            store.dispatch('putEditProduct',{data: {is_enabled: status['is_enabled'] ? 1 : 0}, id}).then(data => {
                if (data['data']['success']) {
                    this.$bvToast.toast(status['is_enabled'] ? '商品已啟用' : '商品已關閉', {
                    title: '通知',
                    autoHideDelay: 5000,
                    toaster: 'b-toaster-bottom-right'
                    });
                }
            })
        },
        closePopup(status) {
            this.isPopupOpened = false;
            if (status) {
                this.$bvToast.toast(status === 'add' ? '商品已新增' : '商品已修改', {
                title: '通知',
                autoHideDelay: 5000,
                toaster: 'b-toaster-bottom-right'
                });
                this.$emit('updateList');
            }
        },
        openPopup() {
            this.isPopupOpened = true;
            this.isEdit = false;
        },
        openEditPopup(product) {
            this.isPopupOpened = true;
            this.isEdit = true;
            this.activeProductInfo = product;
        },
        deleteCoupon(id) {
            this.deleteProductId = id;
            this.isAlertOpened = true;
        },
        closeAlert(status) {
            if (status) {
                store.dispatch('deleteProduct', this.deleteProductId).then(data => {
                    if (data['data']['success']) {
                        this.$bvToast.toast('商品已刪除', {
                        title: '通知',
                        autoHideDelay: 5000,
                        toaster: 'b-toaster-bottom-right'
                        });
                        this.$emit('updateList');
                    }
                    this.isAlertOpened = false;
                });
            } else {
                this.isAlertOpened = false;
            }
        }
    },
    components: {
        productPopup,
        alertPopup
    }
};
</script>