// src/api/episode.ts
import apiClient from './client';

// --- 타입 정의 ---
export type PrimarySymptom =
  | 'DRYNESS_TIGHTNESS'
  | 'ITCHING'
  | 'STINGING'
  | 'REDNESS'
  | 'TROUBLE';

export type Severity = 'NORMAL' | 'MILD' | 'MODERATE' | 'SEVERE';

export type OnsetPeriod =
  | 'TODAY'
  | 'TWO_TO_THREE_DAYS_AGO'
  | 'ONE_WEEK_AGO'
  | 'TWO_WEEKS_OR_MORE';

export type BodyPart =
  | 'FOREHEAD'
  | 'EYE_AREA'
  | 'CHEEK'
  | 'AROUND_MOUTH'
  | 'CHIN'
  | 'WHOLE_FACE';

interface CreateEpisodeRequest {
  angle: number;
  radius: number;
  primarySymptom: PrimarySymptom;
  severity: Severity;
}

interface EpisodeResponse {
  episodeId: number;
}

interface SubmitIntakeRequest {
  onsetPeriod: OnsetPeriod;
  bodyParts: BodyPart[];
  recentNewProductName?: string; // 선택 항목
  notes?: string; // 선택 항목
}

// --- API 함수 ---

// 증상 에피소드 생성 (원형 격자에서 점 찍었을 때)
export const createEpisode = async (
  data: CreateEpisodeRequest
): Promise<EpisodeResponse> => {
  const response = await apiClient.post('/api/episodes', data);
  return response.data;
};

// 문진 제출 (다음 화면)
export const submitIntake = async (
  episodeId: number,
  data: SubmitIntakeRequest
): Promise<void> => {
  await apiClient.post(`/api/episodes/${episodeId}/intake`, data);
};