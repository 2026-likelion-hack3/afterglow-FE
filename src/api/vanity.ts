import client from './client';

export interface OcrResponse {
  rawText: string;
}

export const extractOcrText = async (imageUri: string): Promise<OcrResponse> => {
  const filename = imageUri.split('/').pop() ?? 'photo.jpg';
  const extMatch = /\.(\w+)$/.exec(filename);
  const ext = extMatch ? extMatch[1] : 'jpg';

  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    name: filename,
    type: `image/${ext}`,
  } as unknown as Blob);

  // [DEBUG 3] FormData 생성 완료 로그
  console.log('[DEBUG 3] FormData 생성 완료. 요청 보내는 중...');

  try {
    const response = await client.post<OcrResponse>('/api/vanity/products/ocr', formData);
    console.log('[DEBUG SUCCESS] rawText 응답 성공:', response.data);
    return response.data;
  } catch (error: any) {
    // [DEBUG ERROR] 상세 에러 로그
    console.error('[DEBUG ERROR] message:', error?.message);
    console.error('[DEBUG ERROR] code:', error?.code);
    console.error('[DEBUG ERROR] status:', error?.response?.status);
    console.error('[DEBUG ERROR] response data:', error?.response?.data);
    throw error;
  }
};

export type InteractionTag = 'RETINOL' | (string & {});

export interface StructuredProductInfo {
  name: string;
  brand: string;
  type: string;
  keyIngredients: string;
  interactionTags: InteractionTag[];
}

export const structureOcrText = async (rawText: string): Promise<StructuredProductInfo> => {
  const response = await client.post<StructuredProductInfo>(
    '/api/vanity/products/ocr/structure',
    { rawText }
  );
  return response.data;
};

export type OpeningPeriod = 'RECENT' | (string & {});
export type UsageTiming = 'MORNING' | (string & {});
export type RegistrationSource = 'BARCODE' | (string & {});

export interface CreateProductRequest {
  name: string;
  brand: string;
  type: string;
  keyIngredients: string;
  functionTags: string[];
  openedAt: string;
  openingPeriod: OpeningPeriod;
  usageTiming: UsageTiming;
  interactionTags: InteractionTag[];
  registrationSource: RegistrationSource;
  barcode?: string;
  photoKey?: string;
}

export interface ProductDto {
  id: number;
  name: string;
  brand: string;
  type: string;
  keyIngredients: string;
  functionTags: string[];
  openedAt: string;
  usageTiming: UsageTiming;
  interactionTags: InteractionTag[];
  registrationSource: RegistrationSource;
  barcode?: string;
  photoKey?: string;
}

export interface CreateProductResponse {
  product: ProductDto;
  warnings: string[];
}

export const createProduct = async (
  payload: CreateProductRequest
): Promise<CreateProductResponse> => {
  const response = await client.post<CreateProductResponse>('/api/vanity/products', payload);
  return response.data;
};