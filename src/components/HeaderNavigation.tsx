import { StyleSheet, View } from "react-native";
import { Typography } from "../constants/typography";
import PreviousButton from "./PreviousButton";

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

type HeaderNavigationProps = {
    title: string,
    route: string
}

export default function HeaderNavigation({ title, route }: HeaderNavigationProps) {
    return (
    <View style={ Styles.header }>
        <View style={ Styles.svgBtn }>
            <PreviousButton route={ route }/>
        </View>
        <View style={ Styles.header }>{ title }</View>
        <View style={ Styles.emptyArea }></View>
    </View>
    )
}