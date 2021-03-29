<template>
    <div class="product-popup">
        <div class="product-popup__box">
            <p class="product-popup-title">{{this.isEdit ? '編輯商品': '新增商品'}}</p>
            <div class="product-popup-scrollbar-box" >
                <perfect-scrollbar class="product-popup-scrollbar">
                    <div class="product-popup-form">
                        <b-form class="product-popup-form__input" :class="[judugeValueNull(formData['name']) ? 'product-popup-form__input_warn' : 'product-popup-form__input_null']">
                            <label>商品名稱*</label>
                            <b-form-input v-model="formData['name']['value']" @blur="isFocused('name')"></b-form-input>
                            <p class="product-popup-form__input-text">{{formData['name']['value'].length > formData['name']['maxLength'] ? '名稱最多200字' : '請輸入名稱'}}</p>
                        </b-form>
                        <b-form class="product-popup-form__input" :class="[judugeValueNull(formData['num']) ? 'product-popup-form__input_warn' : 'product-popup-form__input_null']">
                            <label>數量*</label>
                            <b-form-input type="number" v-model="formData['num']['value']" @blur="isFocused('num')"></b-form-input>
                            <p class="product-popup-form__input-text">{{formData['name']['value'].length > formData['name']['maxLength'] ? '數量最多3位數' : '請輸入數量'}}</p>
                        </b-form>
                        <div class="product-popup-form__slide">
                            <b-form-checkbox v-model="formData['isOpened']['value']" name="check-button" switch>啟用</b-form-checkbox>
                        </div>
                    </div>
                    <div class="product-popup-form">
                        <b-form class="product-popup-form__input" :class="[judugeValueNull(formData['originalPrice']) ? 'product-popup-form__input_warn' : 'product-popup-form__input_null']">
                            <label>原價*</label>
                            <b-input-group prepend="$">
                                <b-form-input type="number" v-model="formData['originalPrice']['value']" @blur="isFocused('originalPrice')"></b-form-input>
                            </b-input-group>
                            <p class="product-popup-form__input-text">請輸入價格</p>
                        </b-form>
                        <b-form class="product-popup-form__input"  :class="[judugeValueNull(formData['sellingPrice']) ? 'product-popup-form__input_warn' : 'product-popup-form__input_null']">
                            <label>售價*</label>
                            <b-input-group prepend="$">
                                <b-form-input type="number" v-model="formData['sellingPrice']['value']" @blur="isFocused('sellingPrice')"></b-form-input>
                            </b-input-group>
                            <p class="product-popup-form__input-text">請輸入價格</p>
                        </b-form>
                    </div>
                    <div class="product-popup-form">
                        <b-form class="product-popup-form__input" :class="[judugeValueNull(formData['class']) ? 'product-popup-form__input_warn' : 'product-popup-form__input_null']">
                            <label>分類*</label>
                            <b-form-input v-model="formData['class']['value']" @blur="isFocused('class')"></b-form-input>
                            <p class="product-popup-form__input-text">{{formData['class']['value'].length > formData['class']['maxLength'] ? '分類最多50字' : '請輸入分類'}}</p>
                        </b-form>
                        <b-form class="product-popup-form__input"  :class="[judugeValueNull(formData['unit']) ? 'product-popup-form__input_warn' : 'product-popup-form__input_null']">
                            <label>單位*</label>
                            <b-form-input v-model="formData['unit']['value']" @blur="isFocused('unit')"></b-form-input>
                            <p class="product-popup-form__input-text">{{formData['unit']['value'].length > formData['unit']['maxLength'] ? '單位最多50字' : '請輸入單位'}}</p>
                        </b-form>
                    </div>
                    <div class="product-popup-form">
                        <b-form class="product-popup-form__input" :class="[judugeValueNull(formData['content']) ? 'product-popup-form__input_warn' : 'product-popup-form__input_null']">
                            <label>產品描述</label>
                            <b-form-textarea v-model="formData['content']['value']"></b-form-textarea>
                            <p class="product-popup-form__input-text">描述最多300字</p>
                        </b-form>
                        <div class="product-popup-img-box">
                            <b-form class="product-popup-form__input" floatLabel="always">
                                <label>請輸入圖片網址</label>
                                <b-form-input v-model="formData['imgUrl']['value']" @blur="isFocused('imgUrl')"></b-form-input>
                            </b-form>
                            <div class="product-popup-img-upload">
                                <p class="product-popup-img-upload__text">或上傳圖片</p>
                                <label for="img-file">
                                    <p>{{!formData['fileName']['value'] ? '選擇檔案' : formData['fileName']['value']}}</p>
                                    <i class="fas fa-paperclip"></i>
                                    <input type="file"  name="" id="img-file" @change="changeImg($event)">
                                </label>
                            </div>
                        </div>
                    </div>
                </perfect-scrollbar>
            </div>
            <div class="product-popup-buttons">
                <button class="product-popup-button" @click="closePopup('')">取消</button>
                <button class="product-popup-button" :class="{'product-popup-button_disabled': !showFinish}" @click="addProduct()">{{this.isEdit ? '編輯': '新增'}}</button>
            </div>
            <div class="product-popup-close">
                <button class="product-popup-button-close" @click="closePopup('')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <loading :title="'上傳中...'" v-if="isUploaded"></loading>
    </div>
</template>

<style lang="scss">
@import './product-info-popup.scss';
</style>

<script>
import loading from '../../../home-page/components/loading-page/loading-page.vue';
import store from '../../../../store';

export default {
    name: 'productInfoPopup',
    props: {
        isEdit: Boolean,
        product: Object
    },
    data() {
        return {
            formData: {
                name: {value:'', maxLength: 200, isFocused: false},
                num: {value:'', maxLength: 3, isFocused: false}, 
                isOpened : {value: true}, 
                originalPrice: {value:'', maxLength: 10, isFocused: false}, 
                sellingPrice: {value:'', maxLength: 10, isFocused: false}, 
                class: {value:'', maxLength: 50, isFocused: false}, 
                unit: {value:'', maxLength: 50, isFocused: false}, 
                content: {value:'', maxLength: 300, isFocused: false}, 
                imgUrl: {value:'', maxLength: 9999, isFocused: false}, 
                fileName: {value:'', maxLength: 9999, isFocused: false}, 
            },
            isUploaded: false
        }
    },
    created() {
        if (this.isEdit) {
            this.formData['name']['value'] = this.product['title'];
            this.formData['num']['value'] = this.product['num'].toString();
            this.formData['isOpened']['value'] = this.product['is_enabled'];
            this.formData['originalPrice']['value'] = this.product['origin_price'].toString();
            this.formData['sellingPrice']['value'] = this.product['price'].toString();
            this.formData['class']['value'] = this.product['category'];
            this.formData['unit']['value'] = this.product['unit'];
            this.formData['content']['value'] = this.product['description'];
            this.formData['imgUrl']['value'] = this.product['imageUrl'];
        }
    },
    computed: {
        showConfirm() {
            return Object.keys(this.formData).filter(item => item !== 'isOpened' && item !== 'fileName' )
            .every(item => this.formData[item]['value'].replace(/\s+/g, '') !== '' && this.formData[item]['value'].replace(/\s+/g, '').length <= this.formData[item]['maxLength']);
        },
        showFinish() {
            return Object.keys(this.formData).filter(item => item !== 'isOpened' && item !== 'fileName')
            .every(item => this.formData[item]['value'].replace(/\s+/g, '') !== '' && this.formData[item]['value'].replace(/\s+/g, '').length <= this.formData[item]['maxLength']);
        }
    },
    methods: {
        judugeValueNull(status) {
            return (status['value'].replace(/\s+/g, '') === '' || status['value'].replace(/\s+/g, '').length > status['maxLength']) 
            && status['isFocused'];
        },
        isFocused(data) {
            this.formData[data]['isFocused'] = true;
        },
        changeImg(event) {
            if (event.target.files[0]) {
                this.isUploaded = true;
                store.dispatch('postUploadImg', event.target.files[0]).then(data => {
                    if (data['data']['success']) {
                        this.formData['imgUrl']['value'] = data['data']['imageUrl'];
                        this.formData['fileName']['value'] = event.target.files[0].name;
                    }

                    this.isUploaded = false;
                }).catch(() => this.isUploaded = false);
            }
        },
        addProduct() {
            if (this.showFinish) {
                const data = {
                    title: this.formData['name']['value'],
                    category: this.formData['class']['value'],
                    origin_price: this.formData['originalPrice']['value'],
                    price: this.formData['sellingPrice']['value'],
                    unit: this.formData['unit']['value'],
                    description: this.formData['content']['value'],
                    is_enabled: this.formData['isOpened']['value'] ? 1 : 0,
                    imageUrl: this.formData['imgUrl']['value'],
                    num: this.formData['num']['value']
                }

                if (this.isEdit) {
                    store.dispatch('putEditProduct', {data, id:this.product['id']}).then(data => {
                    if (data['data']['success']) {
                        this.closePopup('edit');
                    }
                    });
                } else {
                    store.dispatch('postAddProduct', data).then(data => {
                    if (data['data']['success']) {
                        this.closePopup('add');
                    }
                    });
                }
            }
        },
        closePopup(status) {
            this.$emit('closePopup', status);
        }
    },
    components: {
        loading
    }
}
</script>