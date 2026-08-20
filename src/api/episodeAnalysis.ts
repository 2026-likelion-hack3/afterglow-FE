import client from './client';

export type AnalysisConfidence = 'HIGH' | 'MEDIUM' | 'LOW' | (string & {});
export type HoldReason = 'NO_TARGET' | (string & {});
export type CardType = 'WITHHELD' | 'CONTINUE_USE' | (string & {});
export type CauseType = 'PRODUCT' | (string & {});

export interface AnalysisCard {
  type: CardType;
  causeType?: CauseType;
  evidence?: Record<string, unknown>;
  coverageDays?: number;
  continueUseProductIds?: number[];
}

export interface EpisodeAnalysisResponse {
  hold: boolean;
  holdReason?: HoldReason | null;
  confidence?: AnalysisConfidence;
  cards: AnalysisCard[];
}

export const getEpisodeAnalysis = async (
  episodeId: number
): Promise<EpisodeAnalysisResponse> => {
  const response = await client.get<EpisodeAnalysisResponse>(
    `/api/episodes/${episodeId}/analysis`
  );
  return response.data;
};