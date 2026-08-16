/**
 * 완료 화면
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import AlertIcon from '@/assets/icons/alert.svg';
import { router } from "expo-router";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        marginBottom: 16
    }
})

export default function ScanScreen() {
    const [selected, setselected] = useState<Array<number>>([]);
    const [selected2, setselected2] = useState<Array<number>>([]);
    return (
        <>
            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={Typography.title.big}>화장대에 넣었어요</Text>
                    <Text style={[Typography.secondary.default, {color:Colors.text.secondary}]}>다이브인 세럼 · 저녁 · 개봉 1~3개월</Text>
                </View>
                <View style={{ gap:10, backgroundColor: Colors.alert.background, borderRadius: 16, padding: 20}}>
                    <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                        <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <AlertIcon width={16.68} height={15.01} />
                        </View>
                        <Text style={[Typography.text.accent, {color: Colors.alert.text}]}>같이 쓸 때 주의하세요</Text>
                    </View>
                    <View>
                        <Text style={[Typography.text.small, {color: Colors.alert.text}]}>저녁에 쓰시는 레티놀 세럼과 겹칩니다. 번갈아 쓰시는 걸 권해요.</Text>
                        <Text style={[Typography.secondary.small, {color: Colors.alert.text}]}>금지가 아니라 주의입니다</Text>
                    </View>
                </View>
                <Text style={[Typography.secondary.small, {color: Colors.text.secondary}]}>지금 12개가 등록돼 있어요</Text>
            </View>
            </ScrollView>

            <View style={{ marginBottom: 14, marginTop: 8, gap: 12 }}>
                <ActionButton text="화장대 보기" route={'/(tabs)/cosmetics'}/>
                <SecondaryActionButton text="하나 더 등록하기" onPress={()=>router.replace('/scan')} />
            </View>
        </>
    )
}