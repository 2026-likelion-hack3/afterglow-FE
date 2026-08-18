import { createContext, useState } from "react";

type PostContextType = {
    symptomTags: string[] | null;
    setSymptomTags: (symptomTags: string[] | null) => void;
    situationTags: string[] | null;
    setSituationTags: (situationTags: string[] | null) => void;
    content: string
    setContent: (content: string) => void
    isChecked: boolean
    setIsChecked: (isChecked: boolean) => void
};

export const PostContext = createContext<PostContextType | null>(null);

export function PostProvider({ children }: { children: React.ReactNode }) {
    const [symptomTags, setSymptomTags] = useState<string[] | null>(null);
    const [situationTags, setSituationTags] = useState<string[] | null>(null);
    const [content, setContent] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    return (
        <PostContext.Provider
            value={{
                symptomTags, setSymptomTags,
                situationTags, setSituationTags,
                content, setContent,
                isChecked, setIsChecked
            }}
        >
            {children}
        </PostContext.Provider>
    );
}