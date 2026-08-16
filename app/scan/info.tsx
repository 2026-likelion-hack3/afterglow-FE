/**
 * 정보 (개봉일자, 사용시각) 입력 화면
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
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
    }
})

export default function ScanScreen() {
    const [selected, setselected] = useState<Array<number>>([]);
    const [selected2, setselected2] = useState<Array<number>>([]);
    return (
        <>
            <HeaderNavigation title="제품 등록" />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={Typography.title.default}>언제부터, 언제 쓰세요?</Text>
                </View>
                <View style={{gap:10}}>
                    <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>어떤 종류인가요?</Text>
                    <View style={{ flexDirection:'row', gap: 8}}>
                        {['최근', '1~3개월', '6개월 이상'].map((text, index)=>(
                            <Pressable onPress={()=>{selected.includes(index) ? setselected([...selected.slice(0,selected.indexOf(index)), ...selected.slice(selected.indexOf(index)+1)]):setselected([...selected, index])}} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }, selected.includes(index) && {backgroundColor:Colors.accent.default, borderColor: Colors.accent.dark, borderWidth: 2}]}>
                                <Text style={[Typography.label.default, {color: Colors.text.secondary}, selected.includes(index) && {color: Colors.text.default}, selected.includes(index) && Typography.label.default]}>{text}</Text>
                            </Pressable>
                        ))}
                    </View>
                    <Text style={[Typography.secondary.small, {color: Colors.text.muted}]}>정확하지 않아도 괜찮아요</Text>
                </View>
                <View style={{gap:10}}>
                    <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>주로 언제 쓰세요?</Text>
                    <View style={{ flexDirection:'row', gap: 8}}>
                        {['아침', '저녁', '둘 다'].map((text, index)=>(
                            <Pressable onPress={()=>{selected2.includes(index) ? setselected2([...selected2.slice(0,selected2.indexOf(index)), ...selected2.slice(selected2.indexOf(index)+1)]):setselected2([...selected2, index])}} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }, selected.includes(index) && {backgroundColor:Colors.accent.default, borderColor: Colors.accent.dark, borderWidth: 2}]}>
                                <Text style={[Typography.label.default, {color: Colors.text.secondary}, selected2.includes(index) && {color: Colors.text.default}, selected2.includes(index) && Typography.label.default]}>{text}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View style={{ gap: 6, borderStyle: 'solid', borderWidth: 1, borderColor: Colors.border.defaultLight, borderRadius: 16, backgroundColor: Colors.background.subtle, padding: 20 }}>
                    <Text style={[Typography.text.accent]}>저희는 제품을 팔지 않습니다</Text>
                    <Text style={[Typography.secondary.small, {color: Colors.text.secondary}]}>제휴도 받지 않습니다</Text>
                </View>
            </View>
            </ScrollView>

            <View style={{ marginBottom: 14, marginTop: 8, gap: 20 }}>
                <ActionButton text="화장대에 넣기" route={'/scan/complete'}/>
            </View>
        </>
    )
}