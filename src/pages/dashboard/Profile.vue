<template>
    <DashboardLayout>
        <div class="main-panel">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white me-2">
                            <i class="mdi mdi-home"></i>
                        </span> Profile
                    </h3>
                </div>
                <div class="row">
                    <div class="col-12 grid-margin">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Profile</h4>
                                <div class="add-items w-100">
                                    <div class="row">
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.first_name" type="text"
                                                class="form-control todo-list-input" placeholder="First name">
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.last_name" type="text"
                                                class="form-control todo-list-input" placeholder="Last name">
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="row">
                                                <div class="col-6">
                                                    <label class="form-check-label">
                                                        <input v-model="state.formData.gender" type="radio"
                                                            class="form-check-input" name="gender" id="membershipRadios1"
                                                            value="Male">
                                                        Male
                                                    </label>
                                                </div>
                                                <div class="col-6">
                                                    <label class="form-check-label">
                                                        <input v-model="state.formData.gender" type="radio"
                                                            class="form-check-input" name="gender" id="membershipRadios1"
                                                            value="Female">
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.phone" type="text"
                                                class="form-control todo-list-input" placeholder="Phone">
                                        </div>
                                        <div class="col-12 mb-2">
                                            <input type="file" class="form-control todo-list-input"
                                                placeholder="Profile image">
                                        </div>
                                        <div class="col-12">
                                            <button @click="state.formData.submitting ? null : updateProfile()"
                                                :disabled="state.formData.submitting"
                                                class="add btn btn-gradient-primary font-weight-bold todo-list-add-btn"
                                                id="add-task">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
            <!-- partial:partials/_footer.html -->
            <footer class="footer">
                <div class="container-fluid d-flex justify-content-between">
                    <span class="text-muted d-block text-center text-sm-start d-sm-inline-block">Copyright ©
                        bootstrapdash.com 2024</span>
                    <span class="float-none float-sm-end mt-1 mt-sm-0 text-end"> Free <a
                            href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">Bootstrap
                            admin template</a> from Bootstrapdash.com</span>
                </div>
            </footer>
            <!-- partial -->
        </div>
        <!-- main-panel ends -->
    </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DashboardLayout from '../../layouts/Dashboard.vue';
import { useUserStore } from '../../store';
import { storeToRefs } from 'pinia';
import { useScriptTag } from '@vueuse/core';

useScriptTag('/assets/js/off-canvas.js');
useScriptTag('/assets/js/hoverable-collapse.js');
useScriptTag('/assets/js/misc.js');

/* Pinia values */
const userStore = useUserStore();

const {
    token
} = storeToRefs(userStore);

const {
    fetchProfileAPI,
    updateProfileAPI
} = userStore;

const state = ref({
    formData: {
        first_name: <string>'',
        last_name: <string>'',
        gender: <string>'Male',
        phone: <string>'',
        submitting: <boolean>false
    },
});

const updateProfile = async () => {
    const [file] = (document as any).querySelector('input[type="file"').files;
    state.value.formData.submitting = true;
    const SUCCESSFUL: boolean = await updateProfileAPI(state.value.formData, file);
    if (SUCCESSFUL) {
        fetchProfile();
    }
    state.value.formData.submitting = false;
}

const fetchProfile = async () => {
    const FETCHED_PROFILE: Profile | null = await fetchProfileAPI(token.value);
    if (FETCHED_PROFILE) {
        state.value.formData.first_name = FETCHED_PROFILE.first_name || '';
        state.value.formData.last_name = FETCHED_PROFILE.last_name || '';
        state.value.formData.gender = FETCHED_PROFILE.gender;
        state.value.formData.phone = FETCHED_PROFILE.phone || '';
    }
}

onMounted(() => {
    document.title = 'Profile - Task Manager';
    fetchProfile();
});
</script>

<style></style>