/**
 * 카메라 촬영 화면
 */

import ActionButton from "@/src/components/ActionButton";
import BigOptionButton from "@/src/components/BigOptionButton";
import SkipButton from "@/src/components/SkipButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        marginBottom: 16
    }
})

export default function CommunityScreen() {
    return (
        <>
            <ScrollView>
            <View style={ Styles.container }>
                <Text style={ Typography.title.default }>3일 뒤에 비교해 보시라고{'\n'}지금 한 장 남겨둘게요.</Text>
                {/** 개발 필요 */}
                <View style={{ gap: 8 }}>
                    <View style={{ borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.border.default, borderRadius: 8, height: 440}}>
                        <Text>카메라화면미개발</Text>
                    </View>
                    <View style={{ backgroundColor: Colors.sand[100], borderRadius: 8, padding: 10 }}>
                        <Text style={ [Typography.secondary.default, { color: Colors.text.secondary }] }>사진은 휴대폰 안에만 보관됩니다.{'\n'}분석할 때만 잠시 보냈다가 곧바로 지웁니다.</Text>
                    </View>
                </View>
            </View>
                
            </ScrollView>
            <View>
                <View style={{ marginTop: 8 }}>
                    <ActionButton text="촬영하기" route={'/(tabs)'}/>
                </View>
                <View style={{ alignItems: 'center', paddingTop: 8, paddingBottom: 12}}>
                    <SkipButton text="건너뛰기" route={'/(tabs)'} />
                </View>
            </View>
        </>
    )
}