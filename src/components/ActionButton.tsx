import { Href, router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";

type ActionButtonProps = {
    text: string,
    onPress?: ()=>void,
    route: Href
    deactivated?: boolean
}

const Styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 20,
        backgroundColor: Colors.action.default,
    },
    deactivated: {
        backgroundColor: Colors.background.subtle,
    },
    deactivatedText: {
        color: Colors.text.muted
    }
})

export default function ActionButton({ text, onPress=()=>{}, route, deactivated=false }: ActionButtonProps) {
    return (
        <Pressable
            onPress={async () => {
                if (!deactivated) {
                    onPress();
                    router.push(route);
                }
            }}
            style={[
                Styles.button,
                deactivated && Styles.deactivated
            ]}
        >
            <Text style={[
                Typography.button.big,
                { color: Colors.text.inverted },
                deactivated && Styles.deactivatedText
            ]}>{ text }</Text>
        </Pressable>
    )
}