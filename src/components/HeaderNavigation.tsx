import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../constants/typography";
import PreviousButton from "./PreviousButton";

const Styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    button: {
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
            <View style={ Styles.button }>
                <PreviousButton route={ route }/>
            </View>
            <View style={ Styles.header }>
                <Text>{ title }</Text>
            </View>
            <View style={ Styles.emptyArea }></View>
        </View>
    )
}