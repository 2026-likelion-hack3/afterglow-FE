import client from './client';

/**
 * ⚠️ 타입 관련 참고사항
 * 아래 타입/함수는 Swagger에서 실제로 확인된 예시를 기준으로 작성했습니다.
 * enum 계열 필드(registrationSource, openingPeriod, usageTiming, interactionTags)는
 * Swagger 예시에 값이 "하나씩만" 나와있어서, 그 값 외의 실제 허용 목록은 확인하지 못했습니다.
 * `(string & {})`로 열어두어 알려진 리터럴 외의 값도 타입 에러 없이 쓸 수 있게 했습니다.
 * 정확한 전체 enum 목록을 확인하시면 이 유니언을 좁혀주세요.
 */

// ---- POST /api/vanity/products/ocr ----
export interface OcrResponse {
  rawText: string;
}

/**
 * 이미지를 업로드해 OCR 텍스트를 추출합니다.
 * @param imageUri CameraCapture.takePhoto()가 반환하는 로컬 파일 uri
 */
export const extractOcrText = async (imageUri: string): Promise<OcrResponse> => {
  const filename = imageUri.split('/').pop() ?? 'photo.jpg';
  const extMatch = /\.(\w+)$/.exec(filename);
  const ext = extMatch ? extMatch[1] : 'jpg';

  const formData = new FormData();
  // React Native의 FormData는 파일 필드에 { uri, name, type } 객체를 요구합니다.
  formData.append('image', {
    uri: imageUri,
    name: filename,
    type: `image/${ext}`,
  } as unknown as Blob);

  // Content-Type을 수동으로 지정하지 않습니다.
  // RN 환경에서 axios가 FormData를 감지해 boundary가 포함된
  // multipart/form-data 헤더를 자동으로 설정해줍니다.
  const response = await client.post<OcrResponse>('/api/vanity/products/ocr', formData);
  return response.data;
};

// ---- POST /api/vanity/products/ocr/structure ----
export type InteractionTag = 'RETINOL' | (string & {});

export interface StructuredProductInfo {
  name: string;
  brand: string;
  type: string;
  keyIngredients: string;
  interactionTags: InteractionTag[];
}

/**
 * OCR로 추출한 rawText를 구조화된 제품 정보로 변환합니다.
 */
export const structureOcrText = async (rawText: string): Promise<StructuredProductInfo> => {
  const response = await client.post<StructuredProductInfo>(
    '/api/vanity/products/ocr/structure',
    { rawText }
  );
  return response.data;
};

// ---- POST /api/vanity/products ----
export type OpeningPeriod = 'RECENT' | (string & {});
export type UsageTiming = 'MORNING' | (string & {});
export type RegistrationSource = 'BARCODE' | (string & {});

export interface CreateProductRequest {
  name: string;
  brand: string;
  type: string;
  keyIngredients: string;
  functionTags: string[];
  openedAt: string; // 'YYYY-MM-DD'
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

/**
 * 최종 제품 정보를 저장합니다.
 */
export const createProduct = async (
  payload: CreateProductRequest
): Promise<CreateProductResponse> => {
  const response = await client.post<CreateProductResponse>('/api/vanity/products', payload);
  return response.data;
};