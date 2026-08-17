import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../constants/typography";
import { Colors } from "../constants/colors";

const Styles = StyleSheet.create({
    tag: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    selected: {
        backgroundColor: Colors.accent.default,
        borderColor: Colors.accent.dark,
        borderWidth: 2
    },
    selectedText: {
        ...Typography.label.default
    }
})

type TagProps = {
    color?: string,
    text: string,
    textColor?: string,
    backgroundColor?: string,
    isSelected?: boolean
}

export default function Tag({ color=Colors.alert.text, text, textColor=color, backgroundColor="transparent", isSelected=false }: TagProps) {
    return (
        <View style={[
            Styles.tag, { borderColor: color, backgroundColor },
            isSelected && Styles.selected
        ]}>
            <Text style={[
                Typography.label.default, { color: textColor },
                isSelected && Styles.selectedText]
            }>{ text }</Text>
        </View>
    )
}