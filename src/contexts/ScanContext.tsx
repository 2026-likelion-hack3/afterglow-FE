import { createContext, useState } from "react";
import { CreateProductResponse } from "@/src/api/vanity";

type ScanContextType = {
    frontImageUri: string | null
    setFrontImageUri: (imageUri: string | null) => void
    brandName: string | null
    setBrandName: (brandName: string | null) => void
    productName: string
    setProductName: (productName: string) => void
    // NOTE: 이름은 skincareFunction 이지만 실제로는 구조화 API(structureOcrText)의
    // `type` 필드(예: "수분 세럼")를 담는 용도로 재사용합니다. 기존 Context 필드명을
    // 유지하기 위해 이름은 바꾸지 않았습니다.
    skincareFunction: string | null
    setSkincareFunction: (skincareFunction: string | null) => void
    ingredients: string[] | null
    setIngredients: (ingredients: string[] | null) => void
    // NOTE: 이름은 featureTags 이지만 실제로는 구조화 API의 `interactionTags`
    // (성분 상호작용 경고 태그, 예: RETINOL)를 담습니다. recognision.tsx의
    // "이 태그로 조합 주의를 알려드려요" 문구가 이 데이터를 가리키고 있어
    // interactionTags를 그대로 넣습니다. createProduct 호출 시 payload의
    // interactionTags 필드에도 이 값을 사용합니다.
    // (진짜 "기능 태그"(저자극/보습 등)에 해당하는 API 응답은 아직 없습니다 - TODO)
    featureTags: string[] | null
    setFeatureTags: (featureTags: string[] | null) => void
    BackImageUri: string | null
    setBackImageUri: (imageUri: string | null) => void
    openedDate: string,
    setopenedDate: (openedDate: string) => void,
    usingTime: string,
    setusingTime: (usingTime: string) => void,
    // NEW: createProduct 성공 응답을 저장해 complete.tsx에서 실제 데이터를 보여주기 위함.
    registrationResult: CreateProductResponse | null
    setRegistrationResult: (result: CreateProductResponse | null) => void
};

export const ScanContext = createContext<ScanContextType | null>(null);

export function ScanProvider({ children }: { children: React.ReactNode }) {
    const [frontImageUri, setFrontImageUri] = useState<string | null>(null);
    const [brandName, setBrandName] = useState<string | null>(null);
    const [productName, setProductName] = useState<string>('');
    const [skincareFunction, setSkincareFunction] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<string[] | null>(null);
    const [featureTags, setFeatureTags] = useState<string[] | null>(null);
    const [BackImageUri, setBackImageUri] = useState<string | null>(null);
    const [openedDate, setopenedDate] = useState('');
    const [usingTime, setusingTime] = useState('');
    const [registrationResult, setRegistrationResult] = useState<CreateProductResponse | null>(null);

    return (
        <ScanContext.Provider
            value={{
                frontImageUri, setFrontImageUri,
                brandName, setBrandName,
                productName, setProductName,
                skincareFunction, setSkincareFunction,
                ingredients, setIngredients,
                featureTags, setFeatureTags,
                BackImageUri, setBackImageUri,
                openedDate, setopenedDate,
                usingTime, setusingTime,
                registrationResult, setRegistrationResult
            }}
        >
            {children}
        </ScanContext.Provider>
    );
}