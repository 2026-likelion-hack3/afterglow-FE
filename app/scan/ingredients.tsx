/**
 * 성분표 촬영 화면
 */

/**
 * 제품 스캔 화면
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 18,
        marginBottom: 16
    }
})

export default function ScanScreen() {
    return (
        <>
            <HeaderNavigation title="제품 등록" />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={Typography.title.big}>뒷면 성분표도{'\n'}한 장 찍어주세요</Text>
                    <Text style={[Typography.secondary.default, {color: Colors.text.secondary}]}>함께 쓰면 안 되는 조합을 알려드릴 수 있어요</Text>
                </View>
                {/* 개발 필요 */}
                <View style={{height: 230, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.sand[400], backgroundColor: Colors.background.subtle}}>
                    <Text>카메라화면미개발</Text>
                </View>
                <View style={{ gap: 8, borderStyle: 'solid', borderWidth: 1, borderColor: Colors.border.default, borderRadius: 16, backgroundColor: Colors.background.card }}>
                    <Text style={[Typography.text.accent]}>글씨가 안 읽히나요?</Text>
                    <Text style={[Typography.secondary.small, {color: Colors.text.secondary}]}>밝은 곳에서 다시 찍거나, 아래에서 이름을 직접 적으셔도 됩니다.</Text>
                </View>
            </View>
            </ScrollView>

            <View style={{ marginBottom: 14, marginTop: 8, gap: 20 }}>
                <ActionButton text="촬영" route={'/scan/fallback'}/>
                <SecondaryActionButton text="건너뛰기" onPress={()=>{router.push('/scan/info')}} />
            </View>
        </>
    )
}