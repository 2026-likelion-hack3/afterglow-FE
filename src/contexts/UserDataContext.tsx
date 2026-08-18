import { createContext, useState } from "react";

type UserContextType = {
    age: string | null;
    setAge: (age: string | null) => void;
    period: string | null;
    setPeriod: (period: string | null) => void;
    dailyCheck: string | null;
    setDailyCheck: (dailyCheck: string | null) => void;
};

export const UserDataContext = createContext<UserContextType | null>(null);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
    const [age, setAge] = useState<string | null>(null);
    const [period, setPeriod] = useState<string | null>(null);
    const [dailyCheck, setDailyCheck] = useState<string | null>(null);

    return (
        <UserDataContext.Provider
            value={{
                age, setAge,
                period, setPeriod,
                dailyCheck, setDailyCheck
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
}