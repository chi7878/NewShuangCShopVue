<template>
    <div class="popup">
        <div class="popup-box">
            <p class="popup-title">{{title}}</p>
            <div class="popup-btns">
                <button class="popup-button" color="primary" @click="closePopup(false)">取消</button>
                <button class="popup-button" color="primary" @click="closePopup(true)">{{btnName}}</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import './alert-popup.scss';
</style>

<script>
export default {
    name: 'alertPopup',
    props: {title: String, btnName: String},
    data() {
        return {}
    },
    methods: {
        changeTab(tab) {
            this.activeTab = tab;
        },
        closePopup(status) {
            this.$emit('closePopup', status);
        }
    }
}
</script>