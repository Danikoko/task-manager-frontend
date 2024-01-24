<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth">
                <div class="row flex-grow">
                    <div class="col-lg-4 mx-auto">
                        <slot />
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store';

/* Pinia values */
const userStore = useUserStore();
const {
    loggedIn,
} = storeToRefs(userStore);

const router = useRouter();

const loggedInStatus = computed(() => loggedIn.value);

watch(loggedInStatus, (isLoggedIn: boolean) => {
    if (isLoggedIn == true) {
        router.push({
            name: 'Dashboard'
        });
    }
});
</script>

<style></style>