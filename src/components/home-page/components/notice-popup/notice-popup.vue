<template>
    <div class="popup">
        <div class="popup-box">
            <p class="popup-title">{{title}}</p>
            <button class="popup-button" @click="confirm()">OK</button>
        </div>
    </div>
</template>

<style lang="scss">
@import './notice-popup.scss';
</style>

<script>
export default {
    name: 'notice-popup',
    props: {
        title: String
    },
    data() {
        return {

        }
    },
    methods: {
        confirm() {
            this.$emit('closePopup');
        }
    }
}
</script>