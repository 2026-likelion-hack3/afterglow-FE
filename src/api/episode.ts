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

// 통합 제출 함수 (Context 값 받아서 두 API 순서대로 호출)
export const submitFullRecord = async (data: {
  angle: number;
  radius: number;
  primarySymptom: PrimarySymptom;
  severity: Severity;
  onsetPeriod: OnsetPeriod;
  bodyParts: BodyPart[];
  recentNewProductName?: string;
  notes?: string;
}) => {
  const episode = await createEpisode({
    angle: data.angle,
    radius: data.radius,
    primarySymptom: data.primarySymptom,
    severity: data.severity,
  });

  await submitIntake(episode.episodeId, {
    onsetPeriod: data.onsetPeriod,
    bodyParts: data.bodyParts,
    recentNewProductName: data.recentNewProductName,
    notes: data.notes,
  });

  return episode.episodeId;
};

// --- 화면 텍스트(한글) -> API enum 값 매핑 ---

// record/index.tsx의 증상 선택 옵션과 매칭
export const symptomLabelToEnum: Record<string, PrimarySymptom> = {
  '건조 · 당김': 'DRYNESS_TIGHTNESS',
  '가려움': 'ITCHING',
  '따가움': 'STINGING',
  '붉어짐': 'REDNESS',
  '트러블': 'TROUBLE',
};

// record/duration.tsx의 옵션과 매칭
export const onsetPeriodLabelToEnum: Record<string, OnsetPeriod> = {
  '오늘부터': 'TODAY',
  '2~3일 전부터': 'TWO_TO_THREE_DAYS_AGO',
  '일주일쯤 전부터': 'ONE_WEEK_AGO',
  '2주 이상 됐다': 'TWO_WEEKS_OR_MORE',
};