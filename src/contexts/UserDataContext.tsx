import { createContext, useState } from "react";

type UserContextType = {
    age: string;
    setAge: (age: string) => void;
    period: string;
    setPeriod: (period: string) => void;
};

export const UserDataContext = createContext<UserContextType | null>(null);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
    const [age, setAge] = useState("");
    const [period, setPeriod] = useState("");

    return (
        <UserDataContext.Provider
            value={{
                age, setAge,
                period, setPeriod
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
}