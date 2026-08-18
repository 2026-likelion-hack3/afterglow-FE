import { Href, router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";

type ActionButtonProps = {
    text: string,
    onPress?: ()=>void,
    route: Href
    disabled?: boolean
}

const Styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 20,
        backgroundColor: Colors.action.default,
    },
    disabled: {
        backgroundColor: Colors.background.subtle,
    },
    disabledText: {
        color: Colors.text.muted
    }
})

export default function ActionButton({ text, onPress=()=>{}, route, disabled=false }: ActionButtonProps) {
    return (
        <Pressable
            onPress={async () => {
                if (!disabled) {
                    onPress();
                    router.push(route);
                }
            }}
            style={[
                Styles.button,
                disabled && Styles.disabled
            ]}
        >
            <Text style={[
                Typography.button.big,
                { color: Colors.text.inverted },
                disabled && Styles.disabledText
            ]}>{ text }</Text>
        </Pressable>
    )
}