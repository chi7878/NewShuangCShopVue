<template>
    <div class="">
        <homeHeader></homeHeader>
        <checkOrderHeader :activeTab="activeTab"></checkOrderHeader>
        <keep-alive>
            <checkOrderFirst @nextStep="nextStep" v-if="activeTab === 0"></checkOrderFirst>
            <checkOrderSecond @prevStep="prevStep" @nextStep="nextStep" v-else-if="activeTab === 1"></checkOrderSecond>
            <checkOrderFinished v-else-if="activeTab === 2"></checkOrderFinished>
        </keep-alive>
        <homeFooter></homeFooter>
    </div>
</template>

<style lang="scss">
@import "./check-order.scss";
</style>

<script>
import checkOrderFirst from '../../components/check-order-first/check-order-first.vue';
import checkOrderSecond from '../../components/check-order-second/check-order-second.vue';
import checkOrderFinished from '../../components/check-order-finished/check-order-finished.vue';
import checkOrderHeader from '../../components/check-order-header/check-order-header.vue';
import homeHeader from '../../components/home-header/home-header.vue';
import homeFooter from '../../components/home-footer/home-footer.vue';

export default {
    name: "productList",
    data() {
        return {
            activeTab: 0,
        };
    },
    methods: {
        nextStep() {
            this.activeTab += 1;
            window.scroll(0,0);
        },
        prevStep() {
            this.activeTab -= 1;
            window.scroll(0,0);
        }
    },
    components: {
        checkOrderFirst,
        checkOrderSecond,
        checkOrderFinished,
        checkOrderHeader,
        homeHeader,
        homeFooter
    }
};
</script>
