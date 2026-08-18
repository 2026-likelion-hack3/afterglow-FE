import { createContext, useState } from "react";

type RecordSymptomType = {
    state: string;
    setState: (state: string) => void;
    angle: number;
    setAngle: (angle: number) => void;
    extent: string;
    setExtent: (extent: string) => void;
    duration: string;
    setDuration: (duration: string) => void;
    part: string;
    setPart: (part: string) => void;
    recentProduct: string;
    setRecentProduct: (recentProduct: string) => void;
    imgURI: string;
    setImgURI: (recentProduct: string) => void;
    isCompleted: boolean,
    setIsCompleted: (isCompleted: boolean) => void;
}
    
export const RecordSymptomContext = createContext<RecordSymptomType | null>(null);

export function RecordSymptomProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState("");
    const [angle, setAngle] = useState(0);
    const [extent, setExtent] = useState("");
    const [duration, setDuration] = useState("");
    const [part, setPart] = useState("");
    const [imgURI, setImgURI] = useState("");
    const [recentProduct, setRecentProduct] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <RecordSymptomContext.Provider
            value={{
                state, setState,
                angle, setAngle,
                extent, setExtent,
                duration, setDuration,
                part, setPart,
                recentProduct, setRecentProduct,
                isCompleted, setIsCompleted,
                imgURI, setImgURI
            }}
        >
            {children}
        </RecordSymptomContext.Provider>
    );
}