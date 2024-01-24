<template>
    <DashboardLayout>
        <div class="main-panel">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white me-2">
                            <i class="mdi mdi-home"></i>
                        </span> Dashboard
                    </h3>
                </div>
                <div class="row">
                    <div class="col-md-4 stretch-card grid-margin">
                        <div class="card bg-gradient-danger card-img-holder text-white">
                            <div class="card-body">
                                <img src="/assets/images/dashboard/circle.svg" class="card-img-absolute"
                                    alt="circle-image" />
                                <h4 class="font-weight-normal mb-3">Your Tasks <i
                                        class="mdi mdi-chart-line mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{ state.report.tasksCount }}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 stretch-card grid-margin">
                        <div class="card bg-gradient-info card-img-holder text-white">
                            <div class="card-body">
                                <img src="/assets/images/dashboard/circle.svg" class="card-img-absolute"
                                    alt="circle-image" />
                                <h4 class="font-weight-normal mb-3">Your Completed Tasks <i
                                        class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{ state.report.completedTasksCount }}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 stretch-card grid-margin">
                        <div class="card bg-gradient-success card-img-holder text-white">
                            <div class="card-body">
                                <img src="/assets/images/dashboard/circle.svg" class="card-img-absolute"
                                    alt="circle-image" />
                                <h4 class="font-weight-normal mb-3">Your Categories <i
                                        class="mdi mdi-diamond mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{ state.report.categoriesCount }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 grid-margin">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Tasks</h4>
                                <div class="add-items w-100">
                                    <div v-if="state.formData.editingMode" class="row">
                                        <div class="col-md-6 mb-2">
                                            <select v-model="state.formData.category_id" style="border: 1px solid #ebedf2;"
                                                class="me-2 form-control todo-list-input form-control-sm"
                                                id="exampleFormControlSelect3">
                                                <option value="" disabled selected>Select a category</option>
                                                <option v-for="(category, categoryIndex) in state.categories"
                                                    :key="categoryIndex" :value="category.id">
                                                    {{ category.name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.title" type="text"
                                                class="form-control todo-list-input" placeholder="Task title">
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.description" type="text"
                                                class="form-control todo-list-input" placeholder="Task description">
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.due_date" type="date"
                                                class="form-control todo-list-input" placeholder="Due Date">
                                        </div>
                                        <div class="col-12">
                                            <button @click="state.formData.submitting ? null : updateTask()"
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
                                            <select v-model="state.formData.category_id" style="border: 1px solid #ebedf2;"
                                                class="me-2 form-control todo-list-input form-control-sm"
                                                id="exampleFormControlSelect3">
                                                <option value="" disabled selected>Select a category</option>
                                                <option v-for="(category, categoryIndex) in state.categories"
                                                    :key="categoryIndex" :value="category.id">
                                                    {{ category.name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.title" type="text"
                                                class="form-control todo-list-input" placeholder="Task title">
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.description" type="text"
                                                class="form-control todo-list-input" placeholder="Task description">
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <input v-model="state.formData.due_date" type="date"
                                                class="form-control todo-list-input" placeholder="Due Date">
                                        </div>
                                        <div class="col-12">
                                            <button @click="state.formData.submitting ? null : createTask()"
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
                                                <th> Category </th>
                                                <th> Task Title </th>
                                                <th> Description </th>
                                                <th> Status </th>
                                                <th> Due Date </th>
                                                <th> Date Created </th>
                                                <th> Update Status </th>
                                                <th> Edit </th>
                                                <th> Delete </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(task, taskIndex) in state.tasks" :key="taskIndex">
                                                <td> {{ task.category_name }} </td>
                                                <td> {{ task.title }} </td>
                                                <td>
                                                    {{ task.description || 'Not indicated' }}
                                                </td>
                                                <td>
                                                    <label v-if="task.is_completed"
                                                        class="badge badge-gradient-success">DONE</label>
                                                    <label v-else class="badge badge-gradient-warning">PROGRESS</label>
                                                </td>
                                                <td> {{ getDateAndTime(task.due_date) }} </td>
                                                <td> {{ getDateAndTime(task.created_at) }} </td>
                                                <td>
                                                    <button @click="toggleTaskCompletion(task.id)" type="button"
                                                        class="btn btn-fw"
                                                        :class="task.is_completed ? 'btn-warning' : 'btn-success'">
                                                        Mark {{ task.is_completed ? ' Incomplete' : ' Complete' }}
                                                    </button>
                                                </td>
                                                <td>
                                                    <button @click="editTask(task)" type="button"
                                                        class="btn btn-secondary btn-fw">Edit</button>
                                                </td>
                                                <td>
                                                    <button @click="deleteTask(task.id)" type="button"
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
    useTaskStore,
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
const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

const {
    token
} = storeToRefs(userStore);

const {
    fetchTaskReportAPI,
    toggleTaskCompletionAPI,
    fetchTasksAPI,
    createTaskAPI,
    updateTaskAPI,
    deleteTaskAPI
} = taskStore;

const { fetchCategoriesAPI } = categoryStore;

const state = ref({
    report: {
        tasksCount: <number>0,
        completedTasksCount: <number>0,
        categoriesCount: <number>0
    },
    categories: <Category[]>[],
    tasks: <Task[]>[],
    formData: {
        id: <number>0,
        category_id: <string>'',
        title: <string>'',
        description: <string>'',
        due_date: <string>'',
        editingMode: <boolean>false,
        submitting: <boolean>false
    }
});

const cancelEdit = () => {
    state.value.formData.category_id = '';
    state.value.formData.title = '';
    state.value.formData.description = '';
    state.value.formData.due_date = '';
    state.value.formData.editingMode = false;
}

const editTask = (task: Task) => {
    state.value.formData.editingMode = true;
    state.value.formData.category_id = task.category_id.toString();
    state.value.formData.id = task.id;
    state.value.formData.title = task.title;
    state.value.formData.description = task.description;
    state.value.formData.due_date = task.due_date;
};

const createTask = async () => {
    state.value.formData.submitting = true;
    const SUCCESSFUL: boolean = await createTaskAPI(token.value, state.value.formData);
    if (SUCCESSFUL) {
        state.value.formData.category_id = '';
        state.value.formData.title = '';
        state.value.formData.description = '';
        state.value.formData.due_date = '';
        fetchTaskReports();
        fetchTasks();
    }
    state.value.formData.submitting = false;
}

const updateTask = async () => {
    state.value.formData.submitting = true;
    const SUCCESSFUL: boolean = await updateTaskAPI(token.value, state.value.formData, state.value.formData.id);
    if (SUCCESSFUL) {
        state.value.formData.category_id = '';
        state.value.formData.title = '';
        state.value.formData.description = '';
        state.value.formData.due_date = '';
        cancelEdit();
        fetchTasks();
    }
    state.value.formData.submitting = false;
}

const toggleTaskCompletion = async (taskId: string | number) => {
    const SUCCESSFUL: boolean = await toggleTaskCompletionAPI(token.value, taskId);
    if (SUCCESSFUL) {
        fetchTaskReports();
        fetchTasks();
    }
}

const deleteTask = async (id: number | string) => {
    const SUCCESSFUL: boolean = await deleteTaskAPI(token.value, id);
    if (SUCCESSFUL) {
        fetchTaskReports();
        fetchTasks();
    }
}

const fetchTaskReports = async () => {
    const FETCHED_TASK_REPORT: any = await fetchTaskReportAPI(token.value);
    state.value.report.tasksCount = FETCHED_TASK_REPORT.tasks_count;
    state.value.report.completedTasksCount = FETCHED_TASK_REPORT.completed_tasks_count;
    state.value.report.categoriesCount = FETCHED_TASK_REPORT.categories_count;
}

const fetchCategories = async () => {
    const FETCHED_CATEGORIES: Category[] = await fetchCategoriesAPI(token.value);
    state.value.categories = FETCHED_CATEGORIES;
}

const fetchTasks = async () => {
    const FETCHED_TASKS: Task[] = await fetchTasksAPI(token.value);
    state.value.tasks = FETCHED_TASKS;
}

onMounted(() => {
    document.title = 'Dashboard - Task Manager';
    fetchTaskReports();
    fetchCategories();
    fetchTasks();
});
</script>

<style></style>