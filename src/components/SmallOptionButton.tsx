import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";
import { Presets } from "../constants/presets";

type SmallOptionButtonProps = {
    text: string,
    onPress: () => void,
    isSelected: boolean
}

const Styles = StyleSheet.create({
    button: {
        alignItems: 'flex-start',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.border.default,
        borderRadius: 10,
        padding: 20,
        backgroundColor: Colors.background.card,
    },
    selected: {
        borderColor: Colors.accent.dark,
        backgroundColor: Colors.accent.default,
    }
})

export default function SmallOptionButton({ text, onPress, isSelected }: SmallOptionButtonProps) {
    return (
        <Pressable
            onPress={ onPress }
            style={ [Presets.button, Styles.button, isSelected && Styles.selected] }
        >
            <Text style={ isSelected ? Typography.text.default : Typography.text.accent }>{ text }</Text>
        </Pressable>
    )
}