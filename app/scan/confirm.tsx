/**
 * 스캔 완료 화면
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import AlertButton from '@/assets/icons/alert.svg';
import { useState } from "react";
import TagButtonList from "@/src/components/TagButtonList";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 18,
        marginBottom: 16
    },
    card: {
        borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 16,
        padding: 20
    },
    buttonContainer: {
        marginBottom: 14, marginTop: 8,
        gap: 12
    }
})

export default function ScanScreen() {
    const ingredientsList = ['세안', '토너', '세럼', '크림', '선크림'];
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(ingredientsList);
    const infoList = ['정제수', '글리세린', '나이아신아마이드', '레**놀', '토코페롤'];

    return (
        <>
            <HeaderNavigation title="제품 등록" />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text
                        style={Typography.title.big}
                    >이게 맞는지{'\n'}한 번만 봐주세요</Text>
                    <Text
                        style={[Typography.secondary.default, {color: Colors.text.secondary}]}
                    >글씨가 일부 흐려서 확실하지 않아요</Text>
                </View>
                <View style={[Styles.card, {gap: 8, backgroundColor: Colors.background.subtle}]}>
                    <Text
                        style={[Typography.label.default, {color: Colors.text.secondary}]}
                    >읽어낸 부분</Text>
                    <Text
                        style={Typography.text.small}
                    >{infoList.join(', ')}</Text>
                </View>
                <View style={[Styles.card, {gap: 10, backgroundColor: Colors.background.card}]}>
                    <Text
                        style={[Typography.label.default, {color: Colors.text.secondary}]}
                    >이렇게 이해했어요</Text>
                    <TagButtonList
                        tagList={ingredientsList}
                        selection={selectedIngredients}
                        setSelection={setSelectedIngredients}
                    />
                    <Text
                        style={[Typography.secondary.small, {color:Colors.text.secondary}]}
                    >맞으면 그대로 두시고, 아니면 지워주세요</Text>
                </View>
                <Text
                    style={[Typography.secondary.small, {color:Colors.text.muted}]}
                >세 번째 시도라면 건너뛰기를 권해드려요</Text>
            </View>
            </ScrollView>

            <View style={Styles.buttonContainer}>
                <ActionButton text="맞아요, 다음" route={'/scan/info'}/>
                <SecondaryActionButton text="다시찍기" onPress={()=>{router.push('/scan/ingredients')}} />
            </View>
        </>
    )
}