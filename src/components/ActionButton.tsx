import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";
import { Presets } from "../constants/presets";

type ActionButtonProps = {
    text: string,
    route: string
}

const Styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 16,
        padding: 20,
        backgroundColor: Colors.action.default,
    }
})

export default function ActionButton({ text, route }: ActionButtonProps) {
    return (
        <Pressable
            onPress={() => router.push(route)}
            style={ [Presets.button, Styles.button] }
        >
            <Text style={ [Typography.button.big, { color: Colors.text.inverted }] }>{ text }</Text>
        </Pressable>
    )
}