<template>
    <div class="error-page text-center">
        <div class="main-wrapper">
            <div class="error-box">
                <h1>404</h1>
                <h3 class="h2 mb-3"><i class="fas fa-exclamation-circle"></i> Oops! Page not found!</h3>
                <p class="h4 font-weight-normal">The page you requested was not found.</p>
                <RouterLink :to="{ name: 'Dashboard' }" class="btn btn-primary">Back to Home</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    document.title = 'Error - Task Manager';
})
</script>

<style scoped></style>