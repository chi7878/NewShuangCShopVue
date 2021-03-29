<template>
    <div class="login">
        <div class="login-effect"></div>
        <customerLogin v-if="activeRoute === 'login'"></customerLogin>
        <innerLogin v-if="activeRoute === 'innerLogin'"></innerLogin>
    </div>
</template>

<style lang="scss">
@import './login.scss';
</style>

<script>
import customerLogin from '../../components/customer-login/customer-login';
import innerLogin from '../../components/inner-login/inner-login';

export default {
    data() {
        return {
            activeRoute: 'login'
        }
    },
    components: {
        customerLogin,
        innerLogin
    },
    created() {
        this.activeRoute = this.$route.name;
    },
    watch:{
        $route (to){    
        this.activeRoute = to.name;
        }
    } 
}
</script>