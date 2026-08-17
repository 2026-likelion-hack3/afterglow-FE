import { Pressable, StyleSheet, Text, View } from "react-native";
import Tag from "./Tag";
import { Colors } from "../constants/colors";

type TagButtonListProps = {
    gap?: number
    tagList: Array<string>
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

export default function TagRadioButtonList({ gap=8, tagList, selected, setSelected }: TagButtonListProps) {

    const handleToggle = (option: string) => {
        setSelected(option);
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
                        isSelected={option == selected}
                        backgroundColor={Colors.background.card}
                        big={true}
                    />
                </Pressable>
            ))}
        </View>
    )
}