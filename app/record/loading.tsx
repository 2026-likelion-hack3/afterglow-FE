import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { UserContext } from "@/src/contexts/UserContext";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import LoadingIcon from '@/assets/icons/loading.svg';

function Log({ text }: {
    text: string,
}) : React.JSX.Element {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center',
                borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight,
                borderRadius: 16,
                paddingVertical: 18, paddingHorizontal: 20,
                backgroundColor: Colors.background.card
            }}
        >
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.accent.default }}></View>
                <Text style={ Typography.text.default }>{ text }</Text>
            </View>
            <Text style={ [Typography.secondary.small, { color: Colors.text.muted }] }>읽는 중...</Text>
        </View>
    )
}

export default function loadingScreen() {
    const user = useContext(UserContext);

    useEffect(() => {
        if (!user?.recordSymptom.isCompleted) return;

        const timer = setTimeout(() => {
            router.replace("/result");
        }, 5000);

        return () => clearTimeout(timer);
    }, [user?.recordSymptom.isCompleted]);
    
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ gap: 8 }}>
                <Text style={ Typography.title.default }>기록을 살펴보고 있어요</Text>
                <Text style={ Typography.secondary.default }>5초 안에 끝납니다.</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 100 }}>
                <LoadingIcon width={96} height={98.42}/>
            </View>
            <View style={{ gap: 12 }}>
                {['지난 7일 수면 기록', '화장대 제품 12개', '오늘 답해주신 내용'].map((item, index) => (
                    <Log text={ item } key={ index } />
                ))}
            </View>
            <View style={{ alignItems: 'center',  marginTop: 20 }}>
                <Text style={ [Typography.secondary.small, { color: Colors.text.muted }] }>사진은 휴대폰 안에만 저장됩니다</Text>
            </View>
        </View>
    )
}