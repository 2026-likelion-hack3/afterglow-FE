import { StyleSheet, View, Text, Image } from "react-native"
import Svg, { Circle, Defs, RadialGradient, Rect, Stop, Text as SvgText, TSpan} from "react-native-svg"

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
    },
    text: {
        fontFamily: 'KMU80 VF',
        fontSize: 51,
        fontWeight: 300,
        lineHeight: 79.05,
        letterSpacing: -0.765
    },
    svgText: {
        fontFamily: 'KMU80 VF',
        fontSize: 51,
        fontWeight: '300',
        letterSpacing: -0.765,
    }
})

const logo = require('@/assets/images/logo.png');

export default function SplashScreenView() {
    return (
        <View style={Styles.container}>
            <Svg
                width="100%"  height="100%"
                style={{ position: "absolute" }}
            >
                <Defs>
                    <RadialGradient
                        id="bg"
                        rx="161.75%"  ry="84.33%"
                        cx="0%"  cy="7.46%"
                    >
                        <Stop offset="0%" stopColor="#FAC87E" />
                        <Stop offset="25%" stopColor="#FCD37F" />
                        <Stop offset="75%" stopColor="#E2DBCF" />
                        <Stop offset="100%" stopColor="#F0F0F0" />
                    </RadialGradient>
                    <RadialGradient
                        id="gradient"
                        rx="0%"  ry="0%"
                        cx="50%"  cy="50%"
                        fx="0%" fy="0%"
                    >
                        <Stop offset="6.73%" stopColor="#C28936" stopOpacity="1" />
                        <Stop offset="56.25%" stopColor="#FAC87E" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#fcd37f" stopOpacity="0" />
                    </RadialGradient>
                </Defs>
                <Rect
                    width="100%"  height="100%"  fill="url(#bg)"
                />
                <Rect width="100%" height="100%" fill="url(#gradient)" />
            </Svg>
            <View style={[Styles.container, {justifyContent: 'flex-end', gap: 244}]}>
                <Svg
                    width="100%" height="100%"
                    style={{ position: "absolute" }}
                >
                    <Defs>

                        <RadialGradient
                            id="textGrad"
                            rx="101.65%" ry="81.65%"
                            cx="25%" cy="89.45%"
                        >
                            <Stop offset="0%" stopColor="#212121" />
                            <Stop offset="100%" stopColor="#6A4C40" />
                        </RadialGradient>
                    </Defs>
                    <SvgText
                        fill="url(#textGrad)"
                        fontFamily="KMU80 VF"
                        fontSize="51"
                        fontWeight="300"
                    >
                        <TSpan x="12" y="244">예전같지 않은 날,</TSpan>
                        <TSpan x="12" dy="79">3일만에 이유를</TSpan>
                        <TSpan x="12" dy="79">알 수 있도록.</TSpan>
                    </SvgText>
                </Svg>
                <View style={{alignItems:'center'}}>
                    <Image source={logo} style={{width: 173, height: 27}} />
                </View>
                <View></View>
            </View>
        </View>
    )
}