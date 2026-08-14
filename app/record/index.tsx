/**
 * 증상 기록 화면
 */

import ActionButton from "@/src/components/ActionButton";
import BigOptionButton from "@/src/components/BigOptionButton";
import { Typography } from "@/src/constants/typography";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Styles = StyleSheet.create({
    container: {
        gap: 24,
        marginBottom: 16
    }
})

export default function CommunityScreen() {
    const options = [
        '가려움', '따가움', '예민함', '붉어짐', '트러블'
    ]
    const [selected, setselected] = useState('');
    return (
        <>
            <ScrollView>
            <View style={ Styles.container }>
                <Text style={ Typography.title.big }>지금 어떤{'\n'}상태에 가깝나요?</Text>
                <View style={{ borderStyle: 'solid', borderWidth: 1, borderColor: '#492', height: 288}}>
                    <Text>선택화면</Text>
                </View>
                
                <View style={{ flex: 1, gap: 8 }}>
                    {options.map((option, index) => (
                        <BigOptionButton text={option} onPress={()=>setselected(option)} isSelected={selected == option} key={index} />
                    ))}
                </View>
            </View>
                
            </ScrollView>
            <View style={{ marginBottom: 16, marginTop: 8 }}>
                <ActionButton text="선택 완료" route={'/(tabs)'}/>
            </View>
        </>
    )
}