/**
 * 나이 문항 화면
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
        gap: 10.72,
        marginBottom: 24
    }
})

export default function Onboarding() {
    const [age, setAge] = useState('');
    const options = ['40-44세', '45-49세', '50-54세', '55-59세', '60세 이상'];

    return (
        <SafeAreaView style={ Styles.screen }>
            <View style={ Styles.header }>
                <View></View>
                <Text style={ Typography.title.default }>연령대를 알려주세요.</Text>
            </View>
            <View style={ Styles.body }>
                <ScrollView>
                <View style={ Styles.content }>
                    {options.map((option, index) => (
                        <SmallOptionButton text={ option } onPress={ () => setAge(option) } isSelected={ age == option } key={ index } />
                    ))}
                </View>
                </ScrollView>
                <View>
                    <View>
                        <ActionButton text="다음으로" route={'/onboarding/period'}/>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: 8, paddingBottom: 12}}>
                        <SkipButton text="건너뛰기" route={'/(tabs)'} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}