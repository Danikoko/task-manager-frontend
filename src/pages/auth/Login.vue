<template>
    <AuthLayout>
        <div class="auth-form-light text-left p-5">
            <div class="brand-logo">
                <img src="/assets/images/logo.svg">
            </div>
            <h4>Hello! let's get started</h4>
            <h6 class="font-weight-light">Sign in to continue.</h6>
            <form class="pt-3">
                <div class="form-group">
                    <input type="email" v-model="state.formData.email" class="form-control form-control-lg"
                        id="exampleInputEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                    <input type="password" v-model="state.formData.password" class="form-control form-control-lg"
                        id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="mt-3">
                    <button @click="state.formData.submitting ? null : logUserIn()" :disabled="state.formData.submitting"
                        class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                </div>
                <div class="text-center mt-4 font-weight-light"> Don't have an account?
                    <RouterLink :to="{ name: 'Register' }" class="text-primary">Create</RouterLink>
                </div>
            </form>
        </div>
    </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from "../../layouts/Auth.vue";
import {
    ref,
    computed,
    onMounted
} from 'vue';
import { useUserStore } from '../../store';
import { useScriptTag } from '@vueuse/core';

interface LoginParam {
    email: string,
    password: string
}

useScriptTag('/assets/js/script.js');

/* Pinia values */
const userStore = useUserStore();
const {
    loginAPI
} = userStore;

const state = ref({
    formData: {
        email: '',
        password: '',
        submitting: <boolean>false
    }
});

const loginParams = computed((): LoginParam => {
    const params = {
        email: state.value.formData.email,
        password: state.value.formData.password,
    };
    return params;
});

const logUserIn = async () => {
    state.value.formData.submitting = true;
    await loginAPI(loginParams.value);
    state.value.formData.submitting = false;
}

onMounted(() => {
    document.title = 'Login - Task Manager';
});
</script>

<style scoped>
.pin-toggler,
.password-toggler {
    cursor: pointer;
    width: 30px;
    height: 30px;
    color: #cccccc;
    font-size: 18px;
    border-radius: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 10px;
}

.pin-toggler:hover,
.password-toggler:hover {
    color: #FF9F43;
}

.password-toggler {
    font-size: 15px !important;
    top: 70%;
    right: 0px;
}
</style>