import {
    defineStore
} from 'pinia';
import axios, { AxiosResponse } from 'axios';
import __CONSTANTS__ from '../constants.ts';
import '../../global.d.ts';

const {
    API_URL,
    errorAlert,
    successAlert
} = __CONSTANTS__;

const useTaskStore = defineStore('task', () => {

    /** API ROUTES */
    const fetchTasksAPI = async (token: string): Promise<Task[]> => {
        try {
            const RESPONSE: AxiosResponse = await axios.get(`${API_URL}tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return RESPONSE.data.data;
        } catch (error) {
            return [];
        }
    }

    const fetchSingleTaskAPI = async (token: string, taskId: any): Promise<Task | null> => {
        try {
            const RESPONSE: AxiosResponse = await axios.get(`${API_URL}tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return RESPONSE.data.data;
        } catch (ERROR: any) {
            let ERROR_MESSAGE: string = '';
            ERROR_MESSAGE = (
                ERROR.response.data.message
                    ? ERROR.response.data.message
                    : ERROR.message
            );
            errorAlert(ERROR_MESSAGE);
            return null;
        }
    }

    const createTaskAPI = async (token: string, createTaskParams: any) => {
        try {
            const RESPONSE: AxiosResponse = await axios.post(`${API_URL}tasks`, createTaskParams, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            successAlert(RESPONSE.data.message);
            return true;
        }
        catch (ERROR: any) {
            let ERROR_MESSAGE: string = '';
            ERROR_MESSAGE = (
                ERROR.response.data.message
                    ? ERROR.response.data.message
                    : ERROR.message
            );
            errorAlert(ERROR_MESSAGE);
            return false;
        }
    };

    const updateTaskAPI = async (token: string, updateTaskParams: any, taskId: any) => {
        try {
            const RESPONSE: AxiosResponse = await axios.patch(`${API_URL}tasks/${taskId}`, updateTaskParams, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            successAlert(RESPONSE.data.message);
            return true;
        }
        catch (ERROR: any) {
            let ERROR_MESSAGE: string = '';
            ERROR_MESSAGE = (
                ERROR.response.data.message
                    ? ERROR.response.data.message
                    : ERROR.message
            );
            errorAlert(ERROR_MESSAGE);
            return false;
        }
    };

    const toggleTaskCompletionAPI = async (token: string, taskId: any) => {
        try {
            const RESPONSE: AxiosResponse = await axios.patch(`${API_URL}tasks/${taskId}/toggle-task-completion`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            successAlert(RESPONSE.data.message);
            return true;
        }
        catch (ERROR: any) {
            let ERROR_MESSAGE: string = '';
            ERROR_MESSAGE = (
                ERROR.response.data.message
                    ? ERROR.response.data.message
                    : ERROR.message
            );
            errorAlert(ERROR_MESSAGE);
            return false;
        }
    };

    const deleteTaskAPI = async (token: string, taskId: any): Promise<boolean> => {
        try {
            const RESPONSE: AxiosResponse = await axios.delete(`${API_URL}tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            successAlert(RESPONSE.data.message);
            return true;
        } catch (ERROR: any) {
            let ERROR_MESSAGE: string = '';
            ERROR_MESSAGE = (
                ERROR.response.data.message
                    ? ERROR.response.data.message
                    : ERROR.message
            );
            errorAlert(ERROR_MESSAGE);
            return false;
        }
    }

    const fetchTaskReportAPI = async (token: string): Promise<Task[]> => {
        try {
            const RESPONSE: AxiosResponse = await axios.get(`${API_URL}get-task-report`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return RESPONSE.data.data;
        } catch (error) {
            return [];
        }
    }

    return {
        fetchTasksAPI,
        fetchSingleTaskAPI,
        toggleTaskCompletionAPI,
        deleteTaskAPI,
        createTaskAPI,
        updateTaskAPI,
        fetchTaskReportAPI
    }
});

export default useTaskStore;

