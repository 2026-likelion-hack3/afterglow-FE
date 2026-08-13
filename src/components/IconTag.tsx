import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../constants/typography";
import { Colors } from "../constants/colors";
import type { SvgProps } from "react-native-svg";
import { Presets } from "../constants/presets";

const Styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    icon: {
        width: 20,
        height: 20
    }
})

type IconTagProps = {
    color?: string,
    Icon: React.FC<SvgProps>,
    text: string
}

export default function IconTag({ color=Colors.text.inverted, Icon, text }: IconTagProps) {
    return (
        <View style={ [Presets.tag, Styles.tag, { borderColor: color }] }>
            <View style={ Styles.icon }>
                <Icon width={16.67} height={16.67} fill={ color } />
            </View>
            <Text style={ [Typography.label.default, { color }] }>{ text }</Text>
        </View>
    )
}