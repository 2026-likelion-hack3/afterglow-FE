/**
 * 일일 체크 화면
 */

import HeaderNavigation from "@/src/components/HeaderNavigation";
import OptionButton from "@/src/components/OptionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { UserContext } from "@/src/contexts/UserContext";
import { UserDataContext } from "@/src/contexts/UserDataContext";
import { recordCheckIn, CheckInStatus } from "@/src/api/checkIn";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  source?: ImageSourcePropType | null;
  text: string;
}

function ImageCard({ source=null, text }: Props) : React.JSX.Element {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {source ? (
            <Image
                source={source}
                style={{
                    width: 200,
                    height: 200,
                }}
                resizeMode="contain"
            />
            ) : (
            <Text style={[Typography.label.default, {lineHeight: 200, color: Colors.text.secondary}]}>{text}</Text>
            )}
        </View>
    );
}

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        gap: 20
    },
})

export default function DailyCheckScreen() {
    const user = useContext(UserContext);
    const userData = useContext(UserDataContext);
    const [selected, setselected] = useState('');
    const options = ['좋아졌다', '비슷하다', '나빠졌다'];

    useEffect(()=>{
        userData?.setDailyCheck(null);
    }, [])

    const onPress = async (option: string) => {
        setselected(option);
        userData?.setDailyCheck(option);

        // 1. episodeId 확인
        const episodeId = user?.recordSymptom?.episodeId;
        if (!episodeId) {
            console.error("체크인 실패: UserContext에 episodeId가 존재하지 않습니다.");
            return;
        }

        // 2. 한글 선택 옵션을 API 전용 CheckInStatus 타입으로 매핑
        let status: CheckInStatus;
        if (option === '좋아졌다') {
            status = 'IMPROVED';
        } else if (option === '비슷하다') {
            status = 'SAME';
        } else if (option === '나빠졌다') {
            status = 'WORSE';
        } else {
            return;
        }

        // 3. 오늘 날짜를 YYYY-MM-DD 형식으로 생성
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // 4. API 호출 및 처리
        try {
            await recordCheckIn(episodeId, formattedDate, status);
            
            // API 성공 시에만 기존 300ms 딜레이 후 메인 화면으로 이동
            setTimeout(() => {
                router.replace('/');
            }, 300);
        } catch (error) {
            console.error("체크인 API 호출 중 오류 발생:", error);
            // 실패 시 router.replace('/')를 실행하지 않아 현재 화면 유지
        }
    }

    const imgURI: ImageSourcePropType | null = null;
    const imgAlt = '8월 5일'

    return (
        <SafeAreaView style={ Styles.screen }>
            <HeaderNavigation title="일일 체크" />
            <ScrollView>
            <View style={{gap:24, marginBottom: 16}}>
                <Text style={Typography.title.big}>처음과 비교해{'\n'}지금 어떠세요?</Text>
                <View style={{gap: 6, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 200, height: 200, borderRadius: 14, backgroundColor: Colors.background.card}}>
                        <ImageCard source={imgURI} text={'첫날 이미지'}/>
                    </View>
                    <Text style={[Typography.text.default, {color: Colors.text.secondary, textAlign: 'center'}]}>{imgAlt}</Text>
                </View>
                <View style={{gap:8}}>
                    {options.map((option, index)=>(
                        <OptionButton
                            key={index}
                            text={option}
                            isSelected={option == selected}
                            onPress={() => onPress(option)}
                        />
                    ))}
                </View>
                <Text style={[Typography.text.default, {color: Colors.text.secondary, textAlign:'center'}]}>가려움 기준으로 답해주세요.</Text>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}