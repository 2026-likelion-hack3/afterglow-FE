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
    ingredients: string[] | null
    setIngredients: (ingredients: string[] | null) => void
    featureTags: string[] | null
    setFeatureTags: (featureTags: string[] | null) => void
    BackImageUri: string | null
    setBackImageUri: (imageUri: string | null) => void
    openedDate: string,
    setopenedDate: (openedDate: string) => void,
    usingTime: string,
    setusingTime: (usingTime: string) => void,
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
                usingTime, setusingTime
            }}
        >
            {children}
        </ScanContext.Provider>
    );
}