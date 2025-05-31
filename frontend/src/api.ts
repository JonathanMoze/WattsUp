import axios, { AxiosError } from "axios";


export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const registerUser = async (
    email: string,
    username: string,
    password: string
) => {
    const response = await api.post(
        "user/register/",
        {email:email, username:username, password:password},
        {withCredentials: true}
    );
    return response.data;
}

export const login = async (email: string, password: string) => {
    try{
        const response = await api.post(
            "token/",
            {email:email, password: password},
            {withCredentials: true}
        );
        return response.data.success;
    } catch (error) {
        return false
    }

}

export const is_authenticated = async () => {
    const response = await api.post(
        "token/authenticated/",
        {},
        {withCredentials: true}
    );
    return response.data;
}

export const refresh_token = async () => {
    try{
        const response = await api.post(
            "token/refresh/",
            {},
            {withCredentials: true}
        );
        return response.data.refreshed;
    } catch (error) {
        return false
    }
}

export const call_refresh = async (error: AxiosError, func : Function) => {
    if (error.response && error.response.status === 401) {
        const token_refreshed = await refresh_token();
        if(token_refreshed) {
            const newResponse = await func();
            return newResponse.data
        }
    }
    return false;
}

export const logout = async () => {
    try{
        const response = await api.post(
            "token/logout/",
            {},
            {withCredentials: true}
        );
        return response.data.success;
    } catch (error) {
        return false;
    }
}
