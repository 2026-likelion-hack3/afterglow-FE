// src/api/account.ts
import apiClient from './client';

export const createAnonymousAccount = async () => {
  const response = await apiClient.post('/api/accounts/anonymous');
  return response.data; // { accessToken: string }
};

// 회원가입용 이메일 인증코드 요청 (로그인 상태 필요 - 익명 계정 토큰 있어야 함)
export const requestSignupVerificationCode = async (email: string) => {
  await apiClient.post('/api/accounts/me/email/verification-codes', { email });
};

// 회원가입용 이메일 인증코드 검증
export const verifySignup = async (email: string, code: string) => {
  const response = await apiClient.post('/api/accounts/me/email/verification', {
    email,
    code,
  });
  return response.data; // { accessToken: string }
};

// 로그인용 이메일 인증코드 요청 (이미 가입된 이메일)
export const requestLoginVerificationCode = async (email: string) => {
  await apiClient.post('/api/accounts/login/verification-codes', { email });
};

// 로그인용 이메일 인증코드 검증
export const verifyLogin = async (email: string, code: string) => {
  const response = await apiClient.post('/api/accounts/login/verification', {
    email,
    code,
  });
  return response.data; // { accessToken: string }
};

// 계정 삭제
export const deleteAccount = async () => {
  await apiClient.delete('/api/accounts/me');
};