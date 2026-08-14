/**
 * 온보딩 화면
 */

import ActionButton from "@/src/components/ActionButton";
import SkipButton from "@/src/components/SkipButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { StyleSheet, Text, View } from "react-native";

const Styles = StyleSheet.create({
    body: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: "center",
        gap: 10.72
    }
})

export default function Onboarding() {
    return (
        <>
            <View style={ Styles.body }>
                <View style={ Styles.content }>
                    <Text style={[Typography.title.big, { color: Colors.border.dark }]}>피부가 불편한 날,{'\n'}지금 가진 제품으로{'\n'}3일 안에 답을 드려요</Text>
                    <Text style={[Typography.text.default, { color: '#6B6B6B' }]}>애프터글로우는 광고성으로 제품을 권하지 않습니다.</Text>
                </View>
                <View>
                    <View>
                        <ActionButton text="시작하기" route={'/onboarding/age'}/>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: 8, paddingBottom: 12}}>
                        <SkipButton text="건너뛰기" route={'/(tabs)'} />
                    </View>
                </View>
            </View>
        </>
    )
}