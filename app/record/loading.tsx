import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { Text, View } from "react-native";

export default function loadingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ gap: 8 }}>
                <Text style={ Typography.title.default }>기록을 살펴보고 있어요</Text>
                <Text style={ Typography.secondary.default }>5초 안에 끝납니다.</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 96, height: 98.42, borderStyle: 'dashed', marginVertical: 100, borderWidth: 1, borderColor: Colors.border.default }}>
                    <Text>사진파일</Text>
                </View>
            </View>
            <View style={{ gap: 12 }}>
                {['지난 7일 수면 기록', '화장대 제품 12개', '오늘 답해주신 내용'].map((item, index) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center',
                            borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.default,
                            borderRadius: 16,
                            paddingVertical: 18, paddingHorizontal: 20,
                            backgroundColor: Colors.background.card
                        }}
                        key={index}
                    >
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.accent.default }}></View>
                            <Text style={ Typography.text.default }>{ item }</Text>
                        </View>
                        <Text style={ [Typography.secondary.small, { color: Colors.text.muted }] }>읽는 중...</Text>
                    </View>
                ))}
            </View>
            <View style={{ alignItems: 'center',  marginTop: 20 }}>
                <Text style={ [Typography.secondary.small, { color: Colors.text.muted }] }>사진은 휴대폰 안에만 저장됩니다</Text>
            </View>
        </View>
    )
}