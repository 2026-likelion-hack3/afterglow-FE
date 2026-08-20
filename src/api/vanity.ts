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
    name: 'product.jpg',
    type: 'image/jpeg',
  } as any);

  console.log('FORM_DATA', (formData as any)._parts);

  try {
    const response = await client.post<OcrResponse>(
      '/api/vanity/products/ocr',
      formData
      // headers나 transformRequest를 완전히 비워두어야 
      // Axios가 RN 네이티브 레벨로 FormData를 바르게 전달합니다.
    );

    console.log('[DEBUG SUCCESS]', response.data);
    return response.data;
  } catch (error: any) {
    console.error('[DEBUG ERROR]', error?.message);
    console.error('[DEBUG ERROR] status:', error?.response?.status);
    console.error('[DEBUG ERROR] data:', error?.response?.data);
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