/**
 * 정보 (개봉일자, 사용시각) 입력 화면
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import TagRadioButtonList from "@/src/components/TagRadioButtonList";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        marginBottom: 16
    },
    card: {
        gap: 6,
        borderStyle: 'solid', borderWidth: 1, borderColor: Colors.border.defaultLight, borderRadius: 16,
        padding: 20,
        backgroundColor: Colors.background.subtle,
    },
    buttonContainer: {
        marginBottom: 14, marginTop: 8,
        gap: 20
    }
})

export default function ScanScreen() {
    const openedDateList = ['최근', '1~3개월', '6개월 이상'];
    const usingTimeList = ['아침', '저녁', '둘 다'];
    const [openedDate, setopenedDate] = useState('');
    const [usingTime, setusingTime] = useState('');

    return (
        <>
            <HeaderNavigation title="제품 등록" />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={Typography.title.default}>언제부터, 언제 쓰세요?</Text>
                </View>
                <View style={{gap:10}}>
                    <Text
                        style={[Typography.label.default, {color: Colors.text.secondary}]}
                    >개봉한 지 얼마나 됐나요?</Text>
                    <TagRadioButtonList
                        tagList={openedDateList}
                        selected={openedDate}
                        setSelected={setopenedDate}
                    />
                    <Text
                        style={[Typography.secondary.small, {color: Colors.text.muted}]}
                    >정확하지 않아도 괜찮아요</Text>
                </View>
                <View style={{gap:10}}>
                    <Text
                        style={[Typography.label.default, {color: Colors.text.secondary}]}
                    >주로 언제 쓰세요?</Text>
                    <TagRadioButtonList
                        tagList={usingTimeList}
                        selected={usingTime}
                        setSelected={setusingTime}
                    />
                </View>
                <View style={Styles.card}>
                    <Text
                        style={[Typography.text.accent]}
                    >저희는 제품을 팔지 않습니다</Text>
                    <Text
                        style={[Typography.secondary.small, {color: Colors.text.secondary}]}
                    >제휴도 받지 않습니다</Text>
                </View>
            </View>
            </ScrollView>

            <View style={Styles.buttonContainer}>
                <ActionButton text="화장대에 넣기" route={'/scan/complete'}/>
            </View>
        </>
    )
}