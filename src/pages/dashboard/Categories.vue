<template>
    <DashboardLayout>
        <div class="main-panel">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white me-2">
                            <i class="mdi mdi-home"></i>
                        </span> Categories
                    </h3>
                </div>
                <div class="row">
                    <div class="col-12 grid-margin">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Categories</h4>
                                <div class="add-items w-100">
                                    <div v-if="state.formData.editingMode" class="row">
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.name" type="text"
                                                class="form-control todo-list-input" placeholder="Category name">
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.description" type="text"
                                                class="form-control todo-list-input" placeholder="Category description">
                                        </div>
                                        <div class="col-12">
                                            <button @click="state.formData.submitting ? null : updateCategory()"
                                                :disabled="state.formData.submitting"
                                                class="add btn btn-gradient-primary font-weight-bold todo-list-add-btn"
                                                id="add-task">Update</button>
                                            <button @click="cancelEdit()"
                                                class="add btn btn-secondary font-weight-bold todo-list-add-btn"
                                                id="">Cancel</button>
                                        </div>
                                    </div>
                                    <div v-else class="row">
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.name" type="text"
                                                class="form-control todo-list-input" placeholder="Category name">
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.description" type="text"
                                                class="form-control todo-list-input" placeholder="Category description">
                                        </div>
                                        <div class="col-12">
                                            <button @click="state.formData.submitting ? null : createCategory()"
                                                :disabled="state.formData.submitting"
                                                class="add btn btn-gradient-primary font-weight-bold todo-list-add-btn"
                                                id="add-task">Add</button>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!state.formData.editingMode" class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th> Name </th>
                                                <th> Description </th>
                                                <th> Date Created </th>
                                                <th> Edit </th>
                                                <th> Delete </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(category, categoryIndex) in state.categories" :key="categoryIndex">
                                                <td> {{ category.name }} </td>
                                                <td>
                                                    {{ category.description || 'Not indicated' }}
                                                </td>
                                                <td> {{ getDateAndTime(category.created_at) }} </td>
                                                <td>
                                                    <button @click="editCategory(category)" type="button"
                                                        class="btn btn-secondary btn-fw">Edit</button>
                                                </td>
                                                <td>
                                                    <button @click="deleteCategory(category.id)" type="button"
                                                        class="btn btn-danger btn-fw">Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
import {
    useUserStore,
    useCategoryStore,
} from '../../store';
import { storeToRefs } from 'pinia';
import constants from '../../constants';
import { useScriptTag } from '@vueuse/core';

useScriptTag('/assets/js/off-canvas.js');
useScriptTag('/assets/js/hoverable-collapse.js');
useScriptTag('/assets/js/misc.js');

const { getDateAndTime } = constants;

/* Pinia values */
const userStore = useUserStore();
const categoryStore = useCategoryStore();

const {
    token
} = storeToRefs(userStore);

const {
    fetchCategoriesAPI,
    createCategoryAPI,
    updateCategoryAPI,
    deleteCategoryAPI
} = categoryStore;

const state = ref({
    categories: <Category[]>[],
    formData: {
        id: <number>0,
        name: <string>'',
        description: <string>'',
        editingMode: <boolean>false,
        submitting: <boolean>false
    },
});

const cancelEdit = () => {
    state.value.formData.name = '';
    state.value.formData.description = '';
    state.value.formData.editingMode = false;
}

const editCategory = (category: Category) => {
    state.value.formData.editingMode = true;
    state.value.formData.id = category.id;
    state.value.formData.name = category.name;
    state.value.formData.description = category.description;
};

const createCategory = async () => {
    state.value.formData.submitting = true;
    const SUCCESSFUL: boolean = await createCategoryAPI(token.value, state.value.formData);
    if (SUCCESSFUL) {
        state.value.formData.name = '';
        state.value.formData.description = '';
        fetchCategories();
    }
    state.value.formData.submitting = false;
}

const updateCategory = async () => {
    state.value.formData.submitting = true;
    const SUCCESSFUL: boolean = await updateCategoryAPI(token.value, state.value.formData, state.value.formData.id);
    if (SUCCESSFUL) {
        state.value.formData.name = '';
        state.value.formData.description = '';
        cancelEdit();
        fetchCategories();
    }
    state.value.formData.submitting = false;
}

const deleteCategory = async (id: number | string) => {
    const SUCCESSFUL: boolean = await deleteCategoryAPI(token.value, id);
    if (SUCCESSFUL) {
        fetchCategories();
    }
}

const fetchCategories = async () => {
    const FETCHED_CATEGORIES: any = await fetchCategoriesAPI(token.value);
    state.value.categories = FETCHED_CATEGORIES;
}

onMounted(() => {
    document.title = 'Categories - Task Manager';
    fetchCategories();
});
</script>

<style></style>