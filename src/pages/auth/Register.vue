<template>
    <AuthLayout>
        <div class="auth-form-light text-left p-5">
            <div class="brand-logo">
                <img src="/assets/images/logo.svg">
            </div>
            <h4>New here?</h4>
            <h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
            <form class="pt-3">
                <div class="form-group">
                    <input type="text" v-model="state.formData.name" class="form-control form-control-lg"
                        id="exampleInputUsername1" placeholder="Name">
                </div>
                <div class="form-group">
                    <input type="email" v-model="state.formData.email" class="form-control form-control-lg"
                        id="exampleInputEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                    <input type="password" v-model="state.formData.password" class="form-control form-control-lg"
                        id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-group">
                    <input type="password" v-model="state.formData.password_confirmation"
                        class="form-control form-control-lg" id="exampleInputPassword2" placeholder="Password Confirmation">
                </div>
                <div class="mt-3">
                    <button @click="state.formData.submitting ? null : registerUser()" :disabled="state.formData.submitting"
                        class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                </div>
                <div class="text-center mt-4 font-weight-light"> Already have an account?
                    <RouterLink :to="{ name: 'Login' }" class="text-primary">Login</RouterLink>
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
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

useScriptTag('/assets/js/script.js');

/* Pinia values */
const userStore = useUserStore();
const {
    registerAPI
} = userStore;

const state = ref({
    formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        submitting: <boolean>false
    }
});

const registerParams = computed((): LoginParam => {
    const params = {
        name: state.value.formData.name,
        email: state.value.formData.email,
        password: state.value.formData.password,
        password_confirmation: state.value.formData.password_confirmation,
    }
    return params;
});

const registerUser = async () => {
    state.value.formData.submitting = true;
    await registerAPI(registerParams.value);
    state.value.formData.submitting = false;
}

onMounted(() => {
    document.title = 'Register - Task Manager';
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