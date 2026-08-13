import { StyleSheet, View } from "react-native";
import { Typography } from "../constants/typography";

const Styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    svgBtn: {
        width: 16,
        height: 20
    },
    title: {
        height: 27,
        ...Typography.text.accent
    },
    emptyArea: {
        width: 24,
        height: 17
    }
})

export default function HeaderNavigation(title: string) {
    return (
    <View style={ Styles.header }>
        <View style={ Styles.svgBtn }></View>
        <View style={ Styles.header }>{ title }</View>
        <View style={ Styles.emptyArea }></View>
    </View>
    )
}