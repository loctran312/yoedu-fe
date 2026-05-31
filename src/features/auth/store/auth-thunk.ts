import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMeApi, loginApi, registerApi } from "../api/auth-api";
import type { LoginPayload, RegisterPayload } from "../types/auth-type";

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (
        payload: LoginPayload,
        thunkAPI,
    ) => {
        try {
            const res = await loginApi(payload);

            return res.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    },
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (
        payload: RegisterPayload,
        thunkAPI,
    ) => {
        try {
            const res = await registerApi(payload);

            return res.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Đăng ký tài khoản thất bại',
            );
        }
    },
);

export const getMeThunk = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
    try {
        const res = await getMeApi();

        return res.data.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || 'Lấy thông tin người dùng thất bại',
        );
    }
});