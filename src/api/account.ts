// src/api/account.ts
import apiClient from './client';

export const createAnonymousAccount = async () => {
  const response = await apiClient.post('/api/accounts/anonymous');
  return response.data; // { accessToken: "..." }
};