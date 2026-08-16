import { createContext, useState } from "react";

type UserContextType = {
    data: {
        age: string;
        setAge: (age: string) => void;
        period: string;
        setPeriod: (period: string) => void;
    };
    recordSymptom: {
        state: string;
        setState: (duration: string) => void;
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
    };
    isReading: boolean;
    setIsReading: (isReading: boolean) => void;
    isWriting: boolean;
    setIsWriting: (isReading: boolean) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [age, setAge] = useState("");
    const [period, setPeriod] = useState("");
    const [state, setState] = useState("");
    const [duration, setDuration] = useState("");
    const [part, setPart] = useState("");
    const [imgURI, setImgURI] = useState("");
    const [recentProduct, setRecentProduct] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [isWriting, setIsWriting] = useState(false);

    return (
        <UserContext.Provider
            value={{
                data: {
                    age, setAge,
                    period, setPeriod
                },
                recordSymptom: {
                    state, setState,
                    duration, setDuration,
                    part, setPart,
                    recentProduct, setRecentProduct,
                    isCompleted, setIsCompleted,
                    imgURI, setImgURI
                },
                isReading, setIsReading,
                isWriting, setIsWriting
            }}
        >
            {children}
        </UserContext.Provider>
    );
}