import { TextStyle } from "react-native"
import { Colors } from "./colors"
export const Fonts = {
    family: {
        default: 'Noto Sans KR'
    },
    weight: {
        black: {
            fontFamily: 'Noto Sans KR Black'
        } satisfies TextStyle,
        bold: {
            fontFamily: 'Noto Sans KR Bold'
        } satisfies TextStyle,
        regular: {
            fontFamily: 'Noto Sans KR Regular'
        } satisfies TextStyle,
    }
} as const

export const Typography = {
    figure: {
        big: {
            color: Colors.text.default,
            ...Fonts.weight.black,
            fontSize: 44,
            lineHeight: 48.4 // 44*110%
        } satisfies TextStyle,
    },
    title: {
        big: {
            color: Colors.text.default,
            ...Fonts.weight.black,
            fontSize: 32,
            lineHeight: 41.6 // 32*130%
        } satisfies TextStyle,
        default: {
            color: Colors.text.default,
            ...Fonts.weight.bold,
            fontSize: 26,
            lineHeight: 35.1 // 26*135%
        } satisfies TextStyle,
        small: {
            color: Colors.text.default,
            ...Fonts.weight.bold,
            fontSize: 21,
            lineHeight: 29.4 // 21*1.4
        } satisfies TextStyle
    },
    text: {
        accent: {
            color: Colors.text.default,
            ...Fonts.weight.bold,
            fontSize: 18,
            lineHeight: 27 // 18*1.5
        } satisfies TextStyle,
        default: {
            color: Colors.text.default,
            ...Fonts.weight.regular,
            fontSize: 18,
            lineHeight: 27.9 // 18*1.55
        } satisfies TextStyle,
        small: {
            color: Colors.text.default,
            ...Fonts.weight.regular,
            fontSize: 17,
            lineHeight: 26.35 // 17*1.55
        } satisfies TextStyle
    },
    button: {
        big: {
            color: Colors.text.default,
            ...Fonts.weight.bold,
            fontSize: 24,
            lineHeight: 33.6 // 24*1.4
        } satisfies TextStyle,
        accent: {
            color: Colors.text.default,
            ...Fonts.weight.black,
            fontSize: 24,
            lineHeight: 33.6 // 24*1.4
        } satisfies TextStyle,
        default: {
            color: Colors.text.default,
            ...Fonts.weight.bold,
            fontSize: 19,
            lineHeight: 26.6 // 19*1.4
        } satisfies TextStyle
    },
    label: {
        default: {
            color: Colors.text.default,
            ...Fonts.weight.bold,
            fontSize: 15,
            lineHeight: 21 // 15*1.4
        } satisfies TextStyle
    },
    secondary: {
        default: {
            color: Colors.text.default,
            ...Fonts.weight.regular,
            fontSize: 15,
            lineHeight: 22.5 // 15*1.5
        } satisfies TextStyle,
        small: {
            color: Colors.text.default,
            ...Fonts.weight.regular,
            fontSize: 14,
            lineHeight: 20.3 // 14*14.5
        } satisfies TextStyle
    }
}