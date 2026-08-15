import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../constants/typography";
import { Colors } from "../constants/colors";
import type { SvgProps } from "react-native-svg";

const Styles = StyleSheet.create({
    tag: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    icon: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

type IconTagProps = {
    color?: string,
    Icon: React.FC<SvgProps>,
    iconWidth: number,
    iconHeight: number,
    text: string
}

export default function IconTag({ color=Colors.text.inverted, Icon, iconWidth, iconHeight, text }: IconTagProps) {
    return (
        <View style={ [Styles.tag, { borderColor: color }] }>
            <View style={ Styles.icon }>
                <Icon width={ iconWidth } height={ iconHeight } stroke={ color } />
            </View>
            <Text style={ [Typography.label.default, { color }] }>{ text }</Text>
        </View>
    )
}