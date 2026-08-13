import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";

type SecondaryActionButtonProps = {
    text: string,
    onPress: () => void
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
        padding: 20,
        backgroundColor: Colors.background.card,
    }
})

export default function SecondaryActionButton({ text, onPress }: SecondaryActionButtonProps) {
    return (
        <Pressable
            onPress={ onPress }
            style={ Styles.button }
        >
            <Text style={ Typography.text.default }>{ text }</Text>
        </Pressable>
    )
}