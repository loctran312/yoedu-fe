import { axiosClient } from '@/shared/lib/axios';

import type { LoginPayload, RegisterPayload } from '../types/auth-type';

const API_URL_PREFIX = '/auth';

export const loginApi = async (payload: LoginPayload) => {
  const res = await axiosClient.post(`${API_URL_PREFIX}/login`, payload);

  return res.data;
};

export const registerApi = async (payload: Omit<RegisterPayload, 'confirmPassword'>) => {
  const res = await axiosClient.post(`${API_URL_PREFIX}/register`, payload);

  return res.data;
};
