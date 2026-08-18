/**
 * 월경 문항 화면
 */

import ActionButton from "@/src/components/ActionButton";
import SkipButton from "@/src/components/SkipButton";
import SmallOptionButton from "@/src/components/SmallOptionButton";
import { Typography } from "@/src/constants/typography";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { UserContext } from "@/src/contexts/UserContext";
import { UserDataContext } from "@/src/contexts/UserDataContext";

const Styles = StyleSheet.create({
    header: {
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

const completeOnboarding = async () => await AsyncStorage.setItem("onboardingCompleted", "true");

export default function Onboarding() {
    const [period, setPeriod] = useState('');
    const options = ['대체로 규칙적이었다', '주기가 들쭉날쭉해졌다', '두 달 이상 건너뛴 적 있다', '마지막 월경 후 1년이 지났다', '수술이나 치료로 없다', '답하고 싶지 않다'];
    const user = useContext(UserContext);
    const userData = useContext(UserDataContext);

    return (
        <>
            <View style={ Styles.header }>
                <Text style={ Typography.title.default }>최근 1년간 월경은{'\n'}어떠셨나요?</Text>
            </View>
            <View style={ Styles.body }>
                <ScrollView>
                <View style={ Styles.content }>
                    {options.map((option, index) => (
                        <SmallOptionButton text={ option } onPress={ () => setPeriod(option) } isSelected={ period == option } key={ index } />
                    ))}
                </View>
                </ScrollView>
                <View style={{ paddingTop: 8 }}>
                    <View>
                        <ActionButton text="다음으로" route={'/(tabs)'} onPress={() => {user?.data.setPeriod(period); userData?.setPeriod(period); completeOnboarding(); router.replace('/(tabs)')}} disabled={!period} />
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: 8, paddingBottom: 12}}>
                        <SkipButton text="건너뛰기" route={'/(tabs)'} onPress={ completeOnboarding } />
                    </View>
                </View>
            </View>
        </>
    )
}