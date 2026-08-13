import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../constants/typography";
import { Colors } from "../constants/colors";

const Styles = StyleSheet.create({
    tag: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.alert.text,
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 8
    }
})

type TagProps = {
    text: string
}

export default function Tag({ text }: TagProps) {
    return (
        <View style={ Styles.tag }>
            <Text style={ [Typography.label.default, { color: Colors.alert.text }] }>{ text }</Text>
        </View>
    )
}