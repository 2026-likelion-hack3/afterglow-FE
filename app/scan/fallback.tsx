/**
 * 성분표 정보 인식 실패 시 화면
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import AlertButton from '@/assets/icons/alert.svg';
import { useContext, useState } from "react";
import TagButtonList from "@/src/components/TagButtonList";
import { ScanContext } from "@/src/contexts/ScanContext";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 18,
        marginBottom: 16
    },
    textarea: {
        borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 16,
        paddingVertical: 18, paddingHorizontal: 20,
        backgroundColor: Colors.background.card,
        includeFontPadding: false
    },
    buttonContainer: { marginBottom: 14, marginTop: 8, gap: 10 }
})

export default function ScanScreen() {
    const scan = useContext(ScanContext);
    const [selectedType, setselectedType] = useState<Array<string>>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<Array<string>>([]);
    const [input, setInput] = useState('');
    const typeList = ['세안', '토너', '세럼', '크림', '선크림'];
    const ingredientsList = ['레티놀', '산'];

    return (
        <>
            <View style={{paddingVertical: 20}}>
                <HeaderNavigation title="제품 등록" />
            </View>

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text
                        style={Typography.title.default}
                    >등록된 정보가 없어요</Text>
                    <Text
                        style={[Typography.secondary.default, {color: Colors.text.secondary}]}
                    >괜찮습니다. 종류만 골라주셔도 추천에 쓸 수 있어요.</Text>
                </View>
                <View style={{gap:10}}>
                    <Text
                        style={[Typography.label.default, {color: Colors.text.secondary}]}
                    >어떤 종류인가요?</Text>
                    <TagButtonList
                        tagList={typeList}
                        selection={selectedType}
                        setSelection={setselectedType}
                    />
                </View>
                <View style={{gap:10}}>
                    <Text
                        style={[Typography.label.default, {color: Colors.text.secondary}]}
                    >제품 이름 (선택)</Text>
                    <TextInput
                        placeholder="기억나는 대로 적어주세요"
                        placeholderTextColor={Colors.text.muted}
                        value={input}
                        onChangeText={setInput}
                        textAlignVertical="top"
                        style={[Styles.textarea, Typography.text.default]}
                    />
                </View>
                <View style={{gap:10}}>
                    <Text
                        style={[Typography.label.default, {color: Colors.text.secondary}]}
                    >혹시 이런 성분이 있나요?</Text>
                    <TagButtonList
                        tagList={ingredientsList}
                        selection={selectedIngredients}
                        setSelection={setSelectedIngredients}
                    />
                    <Text
                        style={[Typography.secondary.small, {color: Colors.text.muted}]}
                    >있으면 함께 쓰면 안 되는 조합을 알려드려요</Text>
                </View>
            </View>
            </ScrollView>

            <View style={Styles.buttonContainer}>
                <ActionButton
                    text="등록하기"
                    route={'/scan/info'}
                    disabled={selectedType.length == 0}
                />
            </View>
        </>
    )
}