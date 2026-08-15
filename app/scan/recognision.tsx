/**
 * 인식결과 확인 화면
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
        gap: 24,
        marginBottom: 16
    }
})

export default function AddScreen() {
    return (
        <>
            <HeaderNavigation title="제품 등록" />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={Typography.title.default}>이 제품이 맞나요?</Text>
                </View>
                <View style={{ gap: 14, borderStyle: 'solid', borderWidth: 1, borderColor: Colors.border.default, borderRadius: 16, padding: 20, backgroundColor: Colors.background.card }}>
                    <View style={{gap: 2}}>
                        <Text style={[Typography.secondary.default, {color:Colors.text.secondary}]}>토리든</Text>
                        <Text style={[Typography.title.small]}>다이브인 세럼</Text>
                        <Text style={[Typography.secondary.default, {color:Colors.text.secondary}]}>수분 세럼</Text>
                    </View>
                    <View style={{height:1, backgroundColor: Colors.border.default}}></View>
                    <View>
                        <Text>주요 성분</Text>
                        <Text>히알루론산, 판테놀</Text>
                    </View>
                    <View>
                        <Text>기능 태그</Text>
                        <View style={{ flexDirection:'row', gap: 8}}>
                            <View style={{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.default, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }}><Text style={[Typography.label.default, {color: Colors.text.secondary}]}>저자극</Text></View>
                            <View style={{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.default, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }}><Text style={[Typography.label.default, {color: Colors.text.secondary}]}>보습</Text></View>
                        </View>
                    </View>
                    <View>
                        <Text style={[Typography.secondary.small, {color:Colors.text.muted}]}>이 태그로 조합 주의를 알려드려요.</Text>
                    </View>
                </View>
                <View style={{ gap: 8 }}>
                    <Text style={[Typography.secondary.small, {color: Colors.text.secondary}]}>다르면 눌러서 고칠 수 있어요.</Text>
                </View>
            </View>
            </ScrollView>

            <View style={{ marginBottom: 14, marginTop: 8, gap: 20 }}>
                <ActionButton text="맞아요, 다음" route={'/add/confirm'}/>
                <SecondaryActionButton text="다시 찍기" onPress={()=>{router.back()}} />
            </View>
        </>
    )
}