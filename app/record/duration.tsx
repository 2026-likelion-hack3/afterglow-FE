/**
 * 언제부터 문항 화면 (C2-1)
 */

import ActionButton from "@/src/components/ActionButton";
import SmallOptionButton from "@/src/components/SmallOptionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { UserContext } from "@/src/contexts/UserContext";
import { useContext, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        marginBottom: 16
    }
})

export default function RecordScreen() {
    const options = [
        '오늘부터', '2~3일 전부터', '일주일쯤 전부터', '2주 이상 됐다'
    ]
    const [selected, setselected] = useState('');
    const user = useContext(UserContext);

    return (
        <>
            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={ [Typography.label.default, { color: Colors.text.accent }] }>1 / 4</Text>
                    <Text style={ Typography.title.default }>언제부터 그러셨나요?</Text>
                </View>
                <View style={{ gap: 12 }}>
                    {options.map((option, index) => (
                        <SmallOptionButton text={option} onPress={()=>setselected(option)} isSelected={selected == option} key={index} />
                    ))}
                </View>
                <View style={{ gap: 8, backgroundColor: Colors.background.subtle, borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.default, borderRadius: 16, padding: 20 }}>
                    <Text style={[Typography.label.default, { color: Colors.text.secondary }]}>다음 질문</Text>
                    <Text style={[Typography.secondary.small, { color: Colors.text.secondary }]}>어느 부위인가요?{'\n'}최근 새로 쓴 제품이 있나요?</Text>
                </View>
            </View>
            </ScrollView>

            <View style={{ marginBottom: 14, marginTop: 8 }}>
                <ActionButton text="선택 완료" route={'/record/part'} onPress={ () => user?.recordSymptom.setDuration(selected) }/>
            </View>
        </>
    )
}