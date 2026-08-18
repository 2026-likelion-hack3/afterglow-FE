import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { UserContext } from "@/src/contexts/UserContext";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoadingIcon from '@/assets/icons/loading.svg';
// ↓↓↓ API 연동 추가 ↓↓↓
import { submitFullRecord, symptomLabelToEnum, onsetPeriodLabelToEnum } from "@/src/api/episode";
// ↑↑↑ API 연동 추가 ↑↑
import { RecordSymptomContext } from "@/src/contexts/RecordContext";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    logContainer: {
        justifyContent: 'center', alignItems: 'center',
        paddingVertical: 100
    },
    logWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight,
        borderRadius: 16,
        paddingVertical: 18, paddingHorizontal: 20,
        backgroundColor: Colors.background.card
    },
    log: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        width: 10, height: 10,
        borderRadius: 5,
        backgroundColor: Colors.accent.default
    },
    caption: {
        alignItems: 'center',
        marginTop: 20
    }
})

function Log({ text }: {
    text: string,
}) : React.JSX.Element {
    return (
        <View
            style={Styles.logWrapper}
        >
            <View style={Styles.log}>
                <View style={Styles.dot}></View>
                <Text
                    style={ Typography.text.default }
                >{ text }</Text>
            </View>
            <Text
                style={ [Typography.secondary.small, { color: Colors.text.muted }] }
            >읽는 중...</Text>
        </View>
    )
}

export default function loadingScreen() {
    const user = useContext(UserContext);
    const record = useContext(RecordSymptomContext);

    useEffect(() => {
        if (!record?.isCompleted) return;

        // ============================================
        // API 연동: 서버에 증상 기록 저장
        // ============================================
        const submitToServer = async () => {
            const symptom = symptomLabelToEnum[user.recordSymptom.state];
            const onsetPeriod = onsetPeriodLabelToEnum[user.recordSymptom.duration];

            // state나 duration이 매핑 목록에 없는 값이면 여기서 멈춤
            // (화면 쪽 옵션 문구가 매핑표랑 다를 때 여기 걸림 - 콘솔 확인)
            if (!symptom || !onsetPeriod) {
                console.log('❌ 매핑 실패 - state:', user.recordSymptom.state, 'duration:', user.recordSymptom.duration);
                return;
            }

            try {
                const episodeId = await submitFullRecord({
                    // ⚠️ TODO: 증상 극좌표 격자(원형 선택 UI) 완성되면 아래 3개 값을
                    //          실제 좌표 기반 값으로 교체할 것
                    angle: 0,              // TODO: 원형 격자 좌표값으로 교체
                    radius: 0.5,           // TODO: 원형 격자 좌표값으로 교체
                    severity: 'MODERATE',  // TODO: 원형 격자 좌표값(중심거리)으로 교체

                    primarySymptom: symptom,
                    onsetPeriod: onsetPeriod,

                    // ⚠️ TODO: part.tsx 화면 옵션 완성되면 실제 선택값으로 교체
                    //          (현재 part.tsx는 '디자인 없음' 임시 상태라 고정값 사용)
                    bodyParts: ['WHOLE_FACE'],  // TODO: part.tsx 완성 후 매핑 함수로 교체

                    recentNewProductName: user.recordSymptom.recentProduct || undefined,
                });
                console.log('✅ episode 저장 완료, episodeId:', episodeId);
            } catch (error) {
                console.log('❌ episode 저장 실패:', error);
            }
        };

        submitToServer();
        // ============================================
        // API 연동 끝
        // ============================================

        const timer = setTimeout(() => {
            router.replace("/result");
        }, 5000);

        return () => clearTimeout(timer);
    }, [record?.isCompleted]);
    
    return (
        <View style={Styles.container}>
            <View style={{ gap: 8 }}>
                <Text
                    style={ Typography.title.default }
                >기록을 살펴보고 있어요</Text>
                <Text
                    style={ Typography.secondary.default }
                >5초 안에 끝납니다.</Text>
            </View>
            <View style={Styles.logContainer}>
                <LoadingIcon width={96} height={98.42}/>
            </View>
            <View style={{ gap: 12 }}>
                {['지난 7일 수면 기록', '화장대 제품 12개', '오늘 답해주신 내용'].map((item, index) => (
                    <Log
                        key={ index }
                        text={ item }
                    />
                ))}
            </View>
            <View style={Styles.caption}>
                <Text
                    style={ [Typography.secondary.small, { color: Colors.text.muted }] }
                >사진은 휴대폰 안에만 저장됩니다</Text>
            </View>
        </View>
    )
}