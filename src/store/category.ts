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

const useCategoryStore = defineStore('category', () => {

    /** API ROUTES */
    const fetchCategoriesAPI = async (token: string): Promise<Category[]> => {
        try {
            const RESPONSE: AxiosResponse = await axios.get(`${API_URL}categories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return RESPONSE.data.data;
        } catch (error) {
            return [];
        }
    }

    const fetchSingleCategoryAPI = async (token: string, categoryId: any): Promise<Category | null> => {
        try {
            const RESPONSE: AxiosResponse = await axios.get(`${API_URL}categories/${categoryId}`, {
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

    const createCategoryAPI = async (token: string, createCategoryParams: any) => {
        try {
            const RESPONSE: AxiosResponse = await axios.post(`${API_URL}categories`, createCategoryParams, {
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

    const updateCategoryAPI = async (token: string, updateCategoryParams: any, categoryId: any) => {
        try {
            const RESPONSE: AxiosResponse = await axios.patch(`${API_URL}categories/${categoryId}`, updateCategoryParams, {
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

    const deleteCategoryAPI = async (token: string, categoryId: any): Promise<boolean> => {
        try {
            const RESPONSE: AxiosResponse = await axios.delete(`${API_URL}categories/${categoryId}`, {
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

    return {
        fetchCategoriesAPI,
        fetchSingleCategoryAPI,
        deleteCategoryAPI,
        createCategoryAPI,
        updateCategoryAPI
    }
});

export default useCategoryStore;

