/**
 * 월경 문항 화면
 */

import ActionButton from "@/src/components/ActionButton";
import SkipButton from "@/src/components/SkipButton";
import SmallOptionButton from "@/src/components/SmallOptionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Colors.background.page
    },
    header: {
        gap: 20,
        paddingVertical: 20,
    },
    body: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: 10.72
    }
})

export default function Onboarding() {
    const [preiod, setPriod] = useState('');
    const options = ['대체로 규칙적이었다', '주기가 들쭉날쭉해졌다', '두 달 이상 건너뛴 적 있다', '마지막 월경 후 1년이 지났다', '수술이나 치료로 없다', '답하고 싶지 않다'];

    return (
        <SafeAreaView style={ Styles.screen }>
            <View style={ Styles.header }>
                <View></View>
                <Text style={ Typography.title.default }>최근 1년간 월경은{'\n'}어떠셨나요?</Text>
            </View>
            <View style={ Styles.body }>
                <ScrollView>
                <View style={ Styles.content }>
                    {options.map((option, index) => (
                        <SmallOptionButton text={ option } onPress={ () => setPriod(option) } isSelected={ preiod == option } key={ index } />
                    ))}
                </View>
                </ScrollView>
                <View style={{ paddingTop: 8 }}>
                    <View>
                        <ActionButton text="다음으로" route={'/(tabs)'}/>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: 8, paddingBottom: 12}}>
                        <SkipButton text="건너뛰기" route={'/(tabs)'} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}