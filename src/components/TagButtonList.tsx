import { Pressable, StyleSheet, Text, View } from "react-native";
import Tag from "./Tag";
import { Colors } from "../constants/colors";

type TagButtonListProps = {
    gap?: number
    tagList: Array<string>
    selection: Array<string>,
    setSelection: React.Dispatch<React.SetStateAction<string[]>>
}

export default function TagButtonList({ gap=8, tagList, selection, setSelection }: TagButtonListProps) {

    const handleToggle = (option: string) => {
        // 1. setSelection에 함수형 업데이트 사용
        // 2. 화살표 함수 뒤에 중괄호{}를 없애서 바로 return 되도록 처리
        setSelection((prev: Array<string>) => 
            prev.includes(option) 
                ? prev.filter((item) => item !== option) // 이미 있으면 제거
                : [...prev, option]                      // 없으면 추가
            );
        };
    
    return (
        <View style={{ flexDirection: 'row', gap, flexWrap: 'wrap' }}>
            {tagList.map((option, index)=>(
                <Pressable
                    key={index}
                    onPress={()=>handleToggle(option)}>
                    <Tag
                        key={index}
                        color={Colors.border.defaultLight} textColor={Colors.text.secondary}
                        text={option}
                        isSelected={selection.includes(option)}
                        backgroundColor={Colors.background.card}
                        isLarge={true}
                    />
                </Pressable>
            ))}
        </View>
    )
}