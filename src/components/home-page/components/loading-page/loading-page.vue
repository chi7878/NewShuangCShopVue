<template>
    <div class="loading">
        <div class="loading-box">
            <p>{{title ? title : 'LOADING...'}}</p>
            <b-spinner  type="grow" label="Spinning"></b-spinner>        
        </div>
    </div>
</template>

<style lang="scss">
@import "./loading-page.scss";
</style>

<script>
export default {
    name: "loadingPage",
    props: {
        title: String
    },
    data() {
        return {
        };
    }
};
</script>
