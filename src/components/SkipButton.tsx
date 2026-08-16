import { Href, router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SkipButtonProps = {
    text: string,
    onPress?: () => void,
    route: Href
}

const Styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: Colors.text.secondary
    }
})

export default function SkipButton({ text, onPress=()=>{}, route }: SkipButtonProps) {
    return (
        <Pressable
            onPress={async () => {
                onPress();
                router.replace(route);
            }}
            style={ [Styles.button] }
        >
            <Text style={ [Typography.text.default, { color: Colors.text.secondary }] }>{ text }</Text>
        </Pressable>
    )
}