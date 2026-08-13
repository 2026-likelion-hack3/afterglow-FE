import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";

type ActionButtonProps = {
    text: string,
    route: string
}

const Styles = StyleSheet.create({
    button: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: Colors.action.default,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default function ActionButton({ text, route }: ActionButtonProps) {
    return (
        <Pressable
            onPress={() => router.push(route)}
            style={ Styles.button }
        >
            <Text style={ Typography.button.big }>{ text }</Text>
        </Pressable>
    )
}