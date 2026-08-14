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
        <View style={ [Styles.tag, { borderColor: color }] }>
            <View style={ Styles.icon }>
                <Icon width={16.67} height={16.67} fill={ color } />
            </View>
            <Text style={ [Typography.label.default, { color }] }>{ text }</Text>
        </View>
    )
}