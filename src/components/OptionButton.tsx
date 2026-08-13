import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";

type OptionButtonProps = {
    text: string,
    onPress: () => void,
    isSelected: boolean
}

const Styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.border.default,
        borderRadius: 16,
        paddingHorizontal: 23,
        backgroundColor: Colors.background.card,
    },
    selected: {
        borderColor: Colors.accent.dark,
        backgroundColor: Colors.accent.default,
    }
})

export default function OptionButton({ text, onPress, isSelected }: OptionButtonProps) {
    return (
        <Pressable
            onPress={ onPress }
            style={ [Styles.button, isSelected && Styles.selected] }
        >
            <Text style={ Typography.button.big }>{ text }</Text>
        </Pressable>
    )
}