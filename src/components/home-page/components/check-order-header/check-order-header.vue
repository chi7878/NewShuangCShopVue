<template>
    <div class="check-header">
    <div class="check-header-box">
        <p class="check-header-text check-header-text_active" :class="{'check-header-text_active': activeTab >= 0}">訂單確認</p>
        <p class="check-header-text" :class="{'check-header-text_active': activeTab >= 1}">付款資料</p>
        <p class="check-header-text" :class="{'check-header-text_active': activeTab >= 2}">訂單完成</p>
        <div class="check-header-box__position" :style="{width: ((activeTab + 1) * 33.3333) + '%' }"></div>
        <div class="check-header-box__position"></div>
    </div>
</div>

</template>

<style lang="scss">
@import "./check-order-header.scss";
</style>

<script>
export default {
    name: "checkOrder-Header",
    props: {
        activeTab: Number,
    },
    data() {
        return {
        };
    }
};
</script>
