import { Href, router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";
import { Presets } from "../constants/presets";

type SkipButtonProps = {
    text: string,
    route: Href
}

const Styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: Colors.action.default,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: Colors.text.secondary
    }
})

export default function SkipButton({ text, route }: SkipButtonProps) {
    return (
        <Pressable
            onPress={() => router.push(route)}
            style={ [Presets.button, Styles.button] }
        >
            <Text style={ [Typography.text.default, { color: Colors.text.secondary }] }>{ text }</Text>
        </Pressable>
    )
}