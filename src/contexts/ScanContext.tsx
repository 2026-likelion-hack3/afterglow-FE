import { createContext, useState } from "react";

type ScanContextType = {
    frontImageUri: string | null
    setFrontImageUri: (imageUri: string | null) => void
    brandName: string | null
    setBrandName: (brandName: string | null) => void
    productName: string
    setProductName: (productName: string) => void
    skincareFunction: string | null
    setSkincareFunction: (skincareFunction: string | null) => void
    ingredients: string[]
    setIngredients: (ingredients: string[]) => void
    featureTags: string[]
    setFeatureTags: (featureTags: string[]) => void
    BackImageUri: string | null
    setBackImageUri: (imageUri: string | null) => void
};

export const ScanContext = createContext<ScanContextType | null>(null);

export function ScanProvider({ children }: { children: React.ReactNode }) {
    const [frontImageUri, setFrontImageUri] = useState<string | null>(null);
    const [brandName, setBrandName] = useState<string | null>(null);
    const [productName, setProductName] = useState<string>('');
    const [skincareFunction, setSkincareFunction] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [featureTags, setFeatureTags] = useState<string[]>([]);
    const [BackImageUri, setBackImageUri] = useState<string | null>(null);

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
            }}
        >
            {children}
        </ScanContext.Provider>
    );
}