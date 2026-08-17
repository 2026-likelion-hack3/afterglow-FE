// src/api/checkIn.ts
import client from './client';

export type CheckInStatus = 'IMPROVED' | 'SAME' | 'WORSE';

interface CheckInResponse {
  checkInDate: string; // 'YYYY-MM-DD'
  status: CheckInStatus;
}

export const recordCheckIn = async (
  episodeId: number,
  date: string, // 'YYYY-MM-DD' 형식
  status: CheckInStatus
): Promise<CheckInResponse> => {
  const response = await client.put<CheckInResponse>(
    `/api/episodes/${episodeId}/check-ins/${date}`,
    { status }
  );
  return response.data;
};

export const getCheckIns = async (
  episodeId: number
): Promise<CheckInResponse[]> => {
  const response = await client.get<CheckInResponse[]>(
    `/api/episodes/${episodeId}/check-ins`
  );
  return response.data;
};