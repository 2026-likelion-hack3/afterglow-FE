// src/api/onboarding.ts
import apiClient from './client';

export type AgeRange =
  | 'FORTY_TO_FORTY_FOUR'
  | 'FORTY_FIVE_TO_FORTY_NINE'
  | 'FIFTY_TO_FIFTY_FOUR'
  | 'FIFTY_FIVE_TO_FIFTY_NINE'
  | 'SIXTY_OR_OLDER';

export type MenstrualStatus =
  | 'REGULAR'
  | 'IRREGULAR'
  | 'SKIPPED_TWO_MONTHS_OR_MORE'
  | 'MENOPAUSE_ONE_YEAR_OR_MORE'
  | 'ABSENT_DUE_TO_SURGERY_OR_TREATMENT'
  | 'PREFER_NOT_TO_ANSWER';

interface OnboardingRequest {
  ageRange: AgeRange;
  menstrualStatus: MenstrualStatus;
}

interface OnboardingResponse {
  ageRange: AgeRange;
  menstrualStatus: MenstrualStatus;
  onboardingCompletedAt: string;
}

// 온보딩 정보 조회 (기존에 저장된 값 불러오기)
export const getOnboarding = async (): Promise<OnboardingResponse> => {
  const response = await apiClient.get('/api/onboarding');
  return response.data;
};

// 온보딩 정보 저장
export const submitOnboarding = async (
  data: OnboardingRequest
): Promise<OnboardingResponse> => {
  const response = await apiClient.put('/api/onboarding', data);
  return response.data;
};