import { Href, router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";

type ActionButtonProps = {
    text: string,
    onPress?: ()=>void,
    route: Href
}

const Styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 20,
        backgroundColor: Colors.action.default,
    }
})

export default function ActionButton({ text, onPress=()=>{}, route }: ActionButtonProps) {
    return (
        <Pressable
            onPress={async () => {
                onPress();
                router.push(route);
            }}
            style={ Styles.button }
        >
            <Text style={ [Typography.button.big, { color: Colors.text.inverted }] }>{ text }</Text>
        </Pressable>
    )
}