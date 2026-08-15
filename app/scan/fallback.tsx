/**
 * 성분표 정보 인식 실패 시 화면
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import AlertButton from '@/assets/icons/alert.svg';
import { useState } from "react";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 18,
        marginBottom: 16
    }
})

export default function ScanScreen() {
    const [selected, setselected] = useState<Array<number>>([]);
    const [selected2, setselected2] = useState<Array<number>>([]);
    const [input, setInput] = useState('')
    return (
        <>
            <HeaderNavigation title="제품 등록" />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={Typography.title.default}>등록된 정보가 없어요</Text>
                    <Text style={[Typography.secondary.default, {color: Colors.text.secondary}]}>괜찮습니다. 종류만 골라주셔도 추천에 쓸 수 있어요.</Text>
                </View>
                <View style={{gap:10}}>
                    <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>어떤 종류인가요?</Text>
                    <View style={{ flexDirection:'row', gap: 8}}>
                        {['세안', '토너', '세럼', '크림', '선크림'].map((text, index)=>(
                            <Pressable onPress={()=>{selected.includes(index) ? setselected([...selected.slice(0,selected.indexOf(index)), ...selected.slice(selected.indexOf(index)+1)]):setselected([...selected, index])}} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.default, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }, selected.includes(index) && {backgroundColor:Colors.accent.default, borderColor: Colors.accent.dark, borderWidth: 2}]}>
                                <Text style={[Typography.label.default, {color: Colors.text.secondary}, selected.includes(index) && {color: Colors.text.default}, selected.includes(index) && Typography.label.default]}>{text}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View style={{gap:10}}>
                    <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>제품 이름 (선택)</Text>
                    <TextInput value={input} onChangeText={setInput} placeholder="기억나는 대로 적어주세요" style={[Typography.text.default, {color:Colors.text.muted, paddingVertical:18, paddingHorizontal:20}]} />
                </View>
                <View style={{gap:10}}>
                    <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>혹시 이런 성분이 있나요?</Text>
                    <View style={{ flexDirection:'row', gap: 8}}>
                        {['레티놀', '산'].map((text, index)=>(
                            <Pressable onPress={()=>{selected2.includes(index) ? setselected2([...selected2.slice(0,selected2.indexOf(index)), ...selected2.slice(selected2.indexOf(index)+1)]):setselected2([...selected2, index])}} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.default, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }, selected.includes(index) && {backgroundColor:Colors.accent.default, borderColor: Colors.accent.dark, borderWidth: 2}]}>
                                <Text style={[Typography.label.default, {color: Colors.text.secondary}, selected2.includes(index) && {color: Colors.text.default}, selected2.includes(index) && Typography.label.default]}>{text}</Text>
                            </Pressable>
                        ))}
                    </View>
                    <Text style={[Typography.secondary.small, {color: Colors.text.muted}]}>있으면 함께 쓰면 안 되는 조합을 알려드려요</Text>
                </View>
            </View>
            </ScrollView>

            <View style={{ marginBottom: 14, marginTop: 8, gap: 10 }}>
                <ActionButton text="등록하기" route={'/scan/info'}/>
            </View>
        </>
    )
}