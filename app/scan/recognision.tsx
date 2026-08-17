/**
 * 인식결과 확인 화면
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import Tag from "@/src/components/Tag";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { ScanContext } from "@/src/contexts/ScanContext";
import { router } from "expo-router";
import { useContext, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        marginBottom: 16
    },
    card: {
        gap: 14,
        borderStyle: 'solid', borderWidth: 1, borderColor: Colors.border.defaultLight, borderRadius: 16,
        padding: 20,
        backgroundColor: Colors.background.card
    },
    line: {height:1, backgroundColor: Colors.border.defaultLight},
    buttonContainer: {
        marginBottom: 14,
        marginTop: 8,
        gap: 12
    }
})

export default function ScanScreen() {
    const scan = useContext(ScanContext);
    const name = ['토리든', '다이브인 세럼', '수분 세럼'];
    const [brandName, setBrandName] = useState('토리든');
    const [productName, setProductName] = useState('다이브인 세럼');
    const [skincareFunction, setSkincareFunction] = useState('수분 세럼');
    const detectedBrandName = useRef(brandName);
    const detectedProductName = useRef(productName);
    const detectedSkincareFunction = useRef(skincareFunction);
    const ingredients = ['히알루론산', '판테놀'];
    const [ingredientsInput, setIngredientsInput] = useState(ingredients.join(', '))
    const tags = ['저자극','보습'];

    return (
        <>
            <HeaderNavigation title="제품 등록" />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={Typography.title.default}>이 제품이 맞나요?</Text>
                </View>
                <View style={Styles.card}>
                    {/* 제품 이름 */}
                    <View>
                        {/* 기존 코드 - 편집 불가
                        <Text
                            style={[Typography.secondary.default, {color:Colors.text.secondary}]}
                        >{ name[0] }</Text>
                        <Text
                            style={[Typography.title.small]}
                        >{ name[1] }</Text>
                        <Text
                            style={[Typography.secondary.default, {color:Colors.text.secondary}]}
                        >{ name[2] }</Text>
                         */}
                        <TextInput
                            placeholder={detectedBrandName.current}
                            placeholderTextColor={Colors.text.secondary}
                            value={brandName}
                            onChangeText={setBrandName}
                            multiline
                            textAlignVertical="top"
                            style={[Typography.secondary.default,{color:Colors.text.secondary, padding: 0, includeFontPadding: false}]}
                        />
                        <TextInput
                            placeholder={detectedProductName.current}
                            value={productName}
                            onChangeText={setProductName}
                            multiline
                            textAlignVertical="top"
                            style={[Typography.title.small, {padding: 0, includeFontPadding: false}]}
                        />
                        <TextInput
                            placeholder={detectedSkincareFunction.current}
                            placeholderTextColor={Colors.text.secondary}
                            value={skincareFunction}
                            onChangeText={setSkincareFunction}
                            multiline
                            textAlignVertical="top"
                            style={[Typography.secondary.default, {color:Colors.text.secondary, padding: 0, includeFontPadding: false}]}
                        />
                    </View>
                    <View style={Styles.line}></View>
                    {/* 주요 성분 */}
                    <View style={{gap:8}}>
                        <Text
                            style={[Typography.label.default, {color: Colors.text.secondary}]}
                        >주요 성분</Text>
                        <Text
                            style={Typography.text.small}
                        >{ingredients.join(', ')}</Text>
                        <TextInput
                            placeholder={ingredients.join(', ')}
                            placeholderTextColor={Colors.text.secondary}
                            value={ingredientsInput}
                            onChangeText={setIngredientsInput}
                            multiline
                            textAlignVertical="top"
                            style={[Typography.text.small, {padding: 0, includeFontPadding: false}]}
                        />
                    </View>
                    {/* 기능 태그 */}
                    <View style={{gap:8}}>
                        <Text
                            style={[Typography.label.default, {color: Colors.text.secondary}]}
                        >기능 태그</Text>
                        <View style={{ flexDirection:'row', gap: 8}}>
                            {tags.map((text, index) => (
                                <Tag
                                    key={index}
                                    color={Colors.border.defaultLight} textColor={Colors.text.secondary}
                                    text={text}
                                    backgroundColor={Colors.background.card}
                                    big={true}
                                />
                            ))}
                        </View>
                    </View>
                    <View>
                        <Text
                            style={[Typography.secondary.small, {color:Colors.text.muted}]}
                        >이 태그로 조합 주의를 알려드려요.</Text>
                    </View>
                </View>
                <View style={{ gap: 8 }}>
                    <Text
                        style={[Typography.secondary.small, {color: Colors.text.secondary}]}
                    >다르면 눌러서 고칠 수 있어요.</Text>
                </View>
            </View>
            </ScrollView>

            <View style={Styles.buttonContainer}>
                <ActionButton
                    text="맞아요, 다음"
                    route={'/scan/ingredients'}
                    onPress={()=>{
                        let userInputIngredients: string[] | null = null;
                        if (ingredientsInput) {
                            userInputIngredients = ingredientsInput.split(',').map(item => item.trim());
                        }
                        scan?.setBrandName(brandName || detectedBrandName.current);
                        scan?.setProductName(productName || detectedProductName.current);
                        scan?.setSkincareFunction(skincareFunction || detectedSkincareFunction.current);
                        scan?.setIngredients(userInputIngredients || ingredients);
                        scan?.setFeatureTags(tags);
                    }}
                />
                <SecondaryActionButton text="다시 찍기" onPress={()=>{router.back()}} />
            </View>
        </>
    )
}