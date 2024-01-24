import { computed } from 'vue';
import {
    defineStore,
    skipHydrate
} from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import axios, { AxiosResponse } from 'axios';
import __CONSTANTS__ from '../constants';
import '../../global.d.ts';

const {
    API_URL,
    successAlert,
    errorAlert
} = __CONSTANTS__;

const useUserStore = defineStore('user', () => {
    const userState = useLocalStorage('userState', '');
    const profileState = useLocalStorage('profileState', '');
    const token = useLocalStorage('token', '');

    const loggedIn = computed(() => !!token.value);
    const user = computed((): User => (
        userState.value
            ? JSON.parse(userState.value)
            : null
    ));
    const profile = computed((): Profile => (
        profileState.value
            ? JSON.parse(profileState.value)
            : null
    ));
    const userProfileImage = computed(() => (
        profile.value.image
    ));

    /** API ROUTES */

    const registerAPI = async (registerParams: any) => {
        try {
            const RESPONSE: AxiosResponse = await axios.post(`${API_URL}auth/register`, registerParams);
            saveLogin(RESPONSE.data.user, RESPONSE.data.token, RESPONSE.data.profile);
        }
        catch (ERROR: any) {
            let ERROR_MESSAGE: string = '';
            ERROR_MESSAGE = (
                ERROR.response.data.message
                    ? ERROR.response.data.message
                    : ERROR.message
            );
            errorAlert(ERROR_MESSAGE);
        }
    };

    const loginAPI = async (loginParams: any) => {
        try {
            const RESPONSE: AxiosResponse = await axios.post(`${API_URL}auth/login`, loginParams);
            saveLogin(RESPONSE.data.user, RESPONSE.data.token, RESPONSE.data.profile);
        }
        catch (ERROR: any) {
            let ERROR_MESSAGE: string = '';
            ERROR_MESSAGE = (
                ERROR.response.data.message
                    ? ERROR.response.data.message
                    : ERROR.message
            );
            errorAlert(ERROR_MESSAGE);
        }
    };

    const fetchProfileAPI = async (token: string): Promise<Profile | null> => {
        try {
            const RESPONSE: AxiosResponse = await axios.get(`${API_URL}profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            saveProfile(RESPONSE.data.data);
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

    const updateProfileAPI = async (updateProfileParams: any, file: any) => {
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('first_name', updateProfileParams.first_name);
        formData.append('last_name', updateProfileParams.last_name);
        formData.append('gender', updateProfileParams.gender);
        formData.append('phone', updateProfileParams.phone);
        formData.append('_method', 'patch');
        try {
            const RESPONSE: AxiosResponse = await axios.post(`${API_URL}profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                    'Content-Type': 'multipart/form-data'
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

    const saveLogoutAPI = async () => {
        try {
            await axios.post(`${API_URL}auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });
        }
        catch (ERROR: any) {
            //
        }
        saveLogout();
    };

    const saveLogin = async (userParam: any, tokenParam: string, profileParam: any) => {
        const stringifiedUserData = JSON.stringify(userParam);
        const stringifiedProfileData = JSON.stringify(profileParam);
        userState.value = stringifiedUserData;
        profileState.value = stringifiedProfileData;
        token.value = tokenParam;
    };

    const saveProfile = async (profileParam: any) => {
        const stringifiedProfileData = JSON.stringify(profileParam);
        profileState.value = stringifiedProfileData;
    };

    const saveLogout = async () => {
        localStorage.clear();
        userState.value = '';
        profileState.value = '';
        token.value = '';
    };

    return {
        userState: skipHydrate(userState),
        profileState: skipHydrate(profileState),
        token: skipHydrate(token),
        loggedIn,
        user,
        profile,
        userProfileImage,
        registerAPI,
        loginAPI,
        fetchProfileAPI,
        updateProfileAPI,
        saveLogoutAPI
    }
});

export default useUserStore;

