import { axiosClient } from "@/shared/lib/axios"
import type { LoginPayload, RegisterPayload } from "../types/auth-type";

export const loginApi = (payload: LoginPayload) => {
    return axiosClient.post('/auth/login', payload);
};

export const registerApi = (payload: RegisterPayload) => {
    return axiosClient.post('/auth/register', payload);
};

export const getMeApi = () => {
    return axiosClient.get('/users/me');
}