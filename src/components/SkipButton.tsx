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
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: Colors.action.default,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: Colors.text.secondary
    }
})

export default function ActionButton({ text, route }: ActionButtonProps) {
    return (
        <Pressable
            onPress={() => router.push(route)}
            style={ Styles.button }
        >
            <Text style={ [Typography.text.default, { color: Colors.text.secondary }] }>{ text }</Text>
        </Pressable>
    )
}