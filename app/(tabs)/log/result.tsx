/**
 * 기록 조회 화면
 * 디자인 없어서 개발용으로 바로가기 추가
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type log = {
    symptom: string,
    dateInfo: string,
    checkResult: string,
    additional: string
}

export default function LogScreen() {
    const logs: log[] = [
        {symptom: '가려움', dateInfo: '8월 12일~14일', checkResult: '진행 중', additional: '오늘 3일째'},
        {symptom: '건조·당김', dateInfo: '8월 3일~5일', checkResult: '좋아졌다', additional: '고농도 앰플'},
        {symptom: '붉어짐', dateInfo: '7월 22일~24일', checkResult: '비슷하다', additional: '판단 보류'},
    ]
    return (
        <>
            <View style={{paddingTop: 16, paddingHorizontal: 16, gap: 16, flex: 1}}>
                <HeaderNavigation title="기록" />
                <ScrollView style={{flex: 1}}>
                <View style={{gap: 16}}>
                    <View style={{gap: 8}}>
                        <Text style={Typography.title.default}>3회차를 모아봤어요</Text>
                        <Text style={[Typography.secondary.default, {color: Colors.text.secondary}]}>한 번으로는 알 수 없던 것들입니다</Text>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 18,
                            gap: 6,
                            borderRadius: 16,
                            backgroundColor: Colors.background.card,
                            borderColor: Colors.border.defaultLight,
                            borderWidth: 1,

                        }}
                    >
                        <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>반복해서 걸린 원인</Text>
                        <Text style={Typography.text.default}><Text style={Typography.text.accent}>3번 중 2번</Text>은 잠을 못 잔 날이었습니다</Text>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 18,
                            gap: 6,
                            borderRadius: 16,
                            backgroundColor: Colors.background.card,
                            borderColor: Colors.border.defaultLight,
                            borderWidth: 1,

                        }}
                    >
                        <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>회복 속도</Text>
                        <Text style={Typography.text.default}>좋아지기까지 평균 <Text style={Typography.text.accent}>4일</Text> 걸리셨어요</Text>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 18,
                            gap: 6,
                            borderRadius: 16,
                            backgroundColor: Colors.background.card,
                            borderColor: Colors.border.defaultLight,
                            borderWidth: 1,

                        }}
                    >
                        <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>안 맞았던 성분</Text>
                        <Text style={Typography.text.default}><Text style={Typography.text.accent}>고농도 앰플 계열</Text>에서 <Text style={Typography.text.accent}>두 번</Text> 반복됐습니다</Text>
                    </View>
                    
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 18,
                            gap: 8,
                            borderRadius: 16,
                            backgroundColor: Colors.background.subtle,

                        }}
                    >
                        <Text style={Typography.text.accent}>원인 찾기는 계속 무료입니다</Text>
                        <Text style={[Typography.secondary.small, {color: Colors.text.secondary}]}>모아보기만 4,900원이고, 다음 회차가 쌓이면 다시 만들 수 있어요.</Text>
                    </View>
                    <Pressable
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 16,
                            padding: 20,
                            backgroundColor: Colors.action.default,
                        }}
                    >
                        <Text style={[
                            Typography.button.big,
                            { color: Colors.text.inverted },
                        ]}>모아보기 받기</Text>
                    </Pressable>
                </View>
                </ScrollView>
            </View>
        </>
    )
}