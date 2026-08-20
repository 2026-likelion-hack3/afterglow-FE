/**
 * 기록 조회 화면
 * 디자인 없어서 개발용으로 바로가기 추가
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import Tag from "@/src/components/Tag";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { RecordSymptomContext } from "@/src/contexts/RecordContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";

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
    const recordedRecentDate = [true, true, false, true,true,true,true,true,false, true,true,true,true,true]
    const recordedNumber = 12;
    const record = useContext(RecordSymptomContext);
    return (
        <>
            <View style={{paddingTop: 16, paddingHorizontal: 16, gap: 12, flex: 1, paddingBottom: 12}}>
                <Text style={Typography.title.default}>기록</Text>
                {record?.isCompleted ?
                <>
                <ScrollView>
                    <View style={{flex: 1, gap: 12}}>
                        <View style={{
                            paddingHorizontal: 18,
                            paddingVertical: 14,
                            gap: 10,
                            borderRadius: 16,
                            backgroundColor: Colors.background.card,
                            borderColor: Colors.border.defaultLight,
                            borderWidth: 1,

                        }}>
                            <View>
                                <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>최근 14일</Text>
                                <Text style={Typography.label.default}>{recordedNumber}일 기록</Text>
                            </View>
                            <View
                                style={{
                                    gap: 6, 
                                    flexDirection: 'row'
                                }}
                            >
                                {recordedRecentDate.map((d, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            {width: 15, height: 15, borderRadius: 999, borderWidth: 1, borderColor: Colors.text.default},
                                            d && {backgroundColor: Colors.text.default}
                                        ]}
                                    />
                                ))}
                            </View>
                            <Text style={[Typography.secondary.small, {color: Colors.text.muted}]}>빈 날이 많으면 원인을 좁히기 어려워요</Text>
                        </View>
                        {logs.reverse().map((log, index)=>(
                            <View
                                key={index}
                                style={{
                                    paddingHorizontal: 18,
                                    paddingVertical: 14,
                                    gap: 6,
                                    borderRadius: 16,
                                    backgroundColor: Colors.background.card,
                                    borderColor: Colors.border.defaultLight,
                                    borderWidth: 1,

                                }}
                            >
                                <Text style={Typography.text.accent}>{logs.length - index}회차 · {log.dateInfo}</Text>
                                <Tag
                                    color={Colors.border.defaultLight} textColor={Colors.text.secondary}
                                    text={log.symptom}
                                    backgroundColor={Colors.background.card}
                                />
                                <Text style={[Typography.secondary.small, {color: Colors.text.secondary}]}>{log.checkResult} · {log.additional}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <SecondaryActionButton text={logs.length + '회차 모아서 보기'} onPress={()=>router.push('/(tabs)/log/result')} />
                </>
                :
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
                            <Text style={Typography.text.accent}>아직 기록이 없어요</Text>
                            <Text style={[Typography.text.small, {color: Colors.text.secondary}]}>피부가 불편한 날 한 번 남겨두시면, 사흘 뒤에 무엇 때문이었는지 알려드릴 수 있어요.</Text>
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
                            <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>이렇게 진행됩니다</Text>
                            <Text style={Typography.secondary.default}>증상을 고르고 몇 가지에 답하면{'\n'}오늘 멈출 것과 해볼 것을 알려드려요{'\n'}사흘 뒤 어떻게 됐는지 한 번만 골라주세요</Text>
                        </View>
                    </View>
                    <ActionButton text="증상 기록하기" route={'/record'} />
                </View>
                }
            </View>
        </>
    )
}