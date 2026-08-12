import { Colors } from "./colors"
export const Fonts = {
    family: {
        default: 'Noto Sans KR'
    },
    weight: {
        black: '900',
        bold: '700',
        regular: '400'
    }
}

const defaultText = {
    color: Colors.text.default,
    fontFamily: Fonts.family.default
}

export const Typography = {
    figure: {
        big: {
            ...defaultText,
            fontWeight: Fonts.weight.black,
            fontSize: 44,
            lineHeight: '110%'
        }
    },
    title: {
        big: {
            ...defaultText,
            fontWeight: Fonts.weight.black,
            fontSize: 32,
            lineHeight: '130%'
        },
        default: {
            ...defaultText,
            fontWeight: Fonts.weight.bold,
            fontSize: 26,
            lineHeight: '135%'
        },
        small: {
            ...defaultText,
            fontWeight: Fonts.weight.bold,
            fontSize: 21,
            lineHeight: '140%'
        }
    },
    text: {
        accent: {
            ...defaultText,
            fontWeight: Fonts.weight.bold,
            fontSize: 18,
            lineHeight: '150%'
        },
        default: {
            ...defaultText,
            fontWeight: Fonts.weight.regular,
            fontSize: 18,
            lineHeight: '155%'
        },
        small: {
            ...defaultText,
            fontWeight: Fonts.weight.regular,
            fontSize: 17,
            lineHeight: '155%'
        }
    },
    button: {
        big: {
            ...defaultText,
            fontWeight: Fonts.weight.bold,
            fontSize: 24,
            lineHeight: '140%'
        },
        accent: {
            ...defaultText,
            fontWeight: Fonts.weight.black,
            fontSize: 24,
            lineHeight: '140%'
        },
        default: {
            ...defaultText,
            fontWeight: Fonts.weight.bold,
            fontSize: 19,
            lineHeight: '140%'
        }
    },
    label: {
        default: {
            ...defaultText,
            fontWeight: Fonts.weight.bold,
            fontSize: 15,
            lineHeight: '140%'
        }
    },
    secondary: {
        default: {
            ...defaultText,
            fontWeight: Fonts.weight.regular,
            fontSize: 15,
            lineHeight: '150%'
        },
        small: {
            ...defaultText,
            fontWeight: Fonts.weight.regular,
            fontSize: 14,
            lineHeight: '145%'
        }
    }
}