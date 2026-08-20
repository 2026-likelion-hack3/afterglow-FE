/**
 * 화장대 화면
 */

import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { router } from "expo-router";
import { Text } from "react-native";
import { View } from "react-native";

export default function CosmeticsScreen() {
    return (
        <>
            <View style={{paddingTop: 16, paddingHorizontal: 16, gap: 16, flex: 1}}>
                <Text style={Typography.title.default}>화장대</Text>
                <View style={{ paddingBottom: 12, flex: 1, justifyContent: 'space-between'}}>
                    <View style={{gap: 16}}>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 18,
                                gap: 12,
                                borderRadius: 16,
                                backgroundColor: Colors.background.card,
                                borderColor: Colors.border.defaultLight,
                                borderWidth: 1,

                            }}
                        >
                            <Text style={Typography.text.accent}>아직 등록하신 제품이 없어요</Text>
                            <Text style={[Typography.text.small, {color: Colors.text.secondary}]}>쓰시는 제품을 넣어두시면, 피부가 뒤집힌 날 무엇을 멈춰야 할지 짚어드릴 수 있어요.</Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 18,
                                gap: 10,
                                borderRadius: 16,
                                backgroundColor: Colors.background.subtle,

                            }}
                        >
                            <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>한 개만 넣으셔도 됩니다</Text>
                            <Text style={Typography.secondary.default}>앞면을 찍으면 이름을 읽어드리고{'\n'}뒷면 성분표는 건너뛰셔도 등록이 끝납니다</Text>
                        </View>
                    </View>
                    <SecondaryActionButton text="제품 등록하기" onPress={()=>{router.push('/scan')}} />
                </View>
            </View>
        </>
    )
}