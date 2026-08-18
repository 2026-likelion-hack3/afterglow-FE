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

// 한글 UI 라벨 -> API Enum 매핑 객체
export const ageRangeLabelToEnum: Record<string, AgeRange> = {
  '40-44세': 'FORTY_TO_FORTY_FOUR',
  '45-49세': 'FORTY_FIVE_TO_FORTY_NINE',
  '50-54세': 'FIFTY_TO_FIFTY_FOUR',
  '55-59세': 'FIFTY_FIVE_TO_FIFTY_NINE',
  '60세 이상': 'SIXTY_OR_OLDER',
};

export const menstrualStatusLabelToEnum: Record<string, MenstrualStatus> = {
  '대체로 규칙적이었다': 'REGULAR',
  '주기가 들쭉날쭉해졌다': 'IRREGULAR',
  '두 달 이상 건너뛴 적 있다': 'SKIPPED_TWO_MONTHS_OR_MORE',
  '마지막 월경 후 1년이 지났다': 'MENOPAUSE_ONE_YEAR_OR_MORE',
  '수술이나 치료로 없다': 'ABSENT_DUE_TO_SURGERY_OR_TREATMENT',
  '답하고 싶지 않다': 'PREFER_NOT_TO_ANSWER',
};

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