/**
 * 최근 쓴 제품 문항 화면
 */
import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
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
        '디자인 없음'
    ]
    const [selected, setselected] = useState('');
    const user = useContext(UserContext);

    return (
        <>
            <HeaderNavigation title="증상 기록" key={0} />
            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={ [Typography.label.default, { color: Colors.text.accent }] }>3 / 4</Text>
                    <Text style={ Typography.title.default }>최근 새로 쓴 제품이 있나요?</Text>
                </View>
                <View style={{ gap: 12 }}>
                    {options.map((option, index) => (
                        <SmallOptionButton text={option} onPress={()=>setselected(option)} isSelected={selected == option} key={index} />
                    ))}
                </View>
            </View>
                
            </ScrollView>
            <View style={{ marginBottom: 14, marginTop: 8 }}>
                <ActionButton text="선택 완료" route={'/record/loading'} onPress={()=>{user?.recordSymptom.setRecentProduct(selected); user?.recordSymptom.setIsCompleted(true);}}/>
            </View>
        </>
    )
}