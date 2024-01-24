<template>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <RouterLink class="navbar-brand brand-logo" to="/"><img src="/assets/images/logo.svg" alt="logo" />
                </RouterLink>
                <RouterLink class="navbar-brand brand-logo-mini" to="/"><img src="/assets/images/logo-mini.svg"
                        alt="logo" /></RouterLink>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-stretch">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="mdi mdi-menu"></span>
                </button>
                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item nav-profile dropdown">
                        <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <div class="nav-profile-img">
                                <img :src="profile.image ? `${MEDIA_URL + profile.image}` : '/assets/images/faces/face1.jpg'"
                                    alt="image">
                                <span class="availability-status online"></span>
                            </div>
                            <div class="nav-profile-text">
                                <p class="mb-1 text-black">{{ `${profile.first_name} ${profile.last_name || ''}` }}</p>
                            </div>
                        </a>
                        <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                            <a class="dropdown-item" href="#">
                                <i class="mdi mdi-cached me-2 text-success"></i> Activity Log </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" @click="saveLogoutAPI()">
                                <i class="mdi mdi-logout me-2 text-primary"></i> Signout </a>
                        </div>
                    </li>
                    <li class="nav-item nav-logout d-none d-lg-block">
                        <a class="nav-link" href="#" @click="saveLogoutAPI()">
                            <i class="mdi mdi-power"></i>
                        </a>
                    </li>
                </ul>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                    data-toggle="offcanvas">
                    <span class="mdi mdi-menu"></span>
                </button>
            </div>
        </nav>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_sidebar.html -->
            <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    <li class="nav-item nav-profile">
                        <a href="#" class="nav-link">
                            <div class="nav-profile-image">
                                <img :src="profile.image ? `${MEDIA_URL + profile.image}` : '/assets/images/faces/face1.jpg'"
                                    alt="profile">
                                <span class="login-status online"></span>
                                <!--change to offline or busy as needed-->
                            </div>
                            <div class="nav-profile-text d-flex flex-column">
                                <span class="font-weight-bold mb-2">{{ `${profile.first_name} ${profile.last_name || ''}`
                                }}</span>
                                <span class="text-secondary text-small">User</span>
                            </div>
                            <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Dashboard' }">
                            <span class="menu-title">Dashboard</span>
                            <i class="mdi mdi-home menu-icon"></i>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Categories' }">
                            <span class="menu-title">Categories</span>
                            <i class="mdi mdi-crosshairs-gps menu-icon"></i>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Profile' }">
                            <span class="menu-title">Profile</span>
                            <i class="mdi mdi-contacts menu-icon"></i>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
            <!-- partial -->
            <slot />
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store';
import { useIdle } from '@vueuse/core';
import constants from '../constants';

const { idle } = useIdle(30 * 60 * 1000); // 30 min

const { MEDIA_URL } = constants;

/* Pinia values */
const userStore = useUserStore();
const { saveLogoutAPI } = userStore;
const {
    loggedIn,
    profile
} = storeToRefs(userStore);

const router = useRouter();
const loggedInStatus = computed(() => loggedIn.value);

watch(idle, idleValue => {
    if (idleValue) {
        // Log user out after 30 minutes of inactivity
        saveLogoutAPI();
    }
});

watch(loggedInStatus, (isLoggedIn: boolean) => {
    if (isLoggedIn == false) {
        router.push({
            name: 'Login'
        });
    }
});

</script>

<style scoped></style>