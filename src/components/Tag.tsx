import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../constants/typography";
import { Colors } from "../constants/colors";
import { Presets } from "../constants/presets";

const Styles = StyleSheet.create({
    tag: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 8
    }
})

type TagProps = {
    color?: string,
    text: string
}

export default function Tag({ color=Colors.alert.text, text }: TagProps) {
    return (
        <View style={ [Presets.tag, Styles.tag, { borderColor: color }] }>
            <Text style={ [Typography.label.default, { color }] }>{ text }</Text>
        </View>
    )
}