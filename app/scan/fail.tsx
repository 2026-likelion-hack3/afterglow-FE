/**
 * 성분표 글씨 인식 실패 시 화면
 */

import ActionButton from "@/src/components/ActionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { router } from "expo-router";
import { LayoutAnimation, Platform, Pressable, ScrollView, StyleSheet, Text, UIManager } from "react-native";
import { View } from "react-native";
import AlertIcon from '@/assets/icons/alert.svg';
import { useContext, useState } from "react";
import TagButtonList from "@/src/components/TagButtonList";
import { ScanContext } from "@/src/contexts/ScanContext";
import Animated, { Easing, LinearTransition, useAnimatedStyle, withTiming } from "react-native-reanimated";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 18,
        marginBottom: 16
    },
    alertCaption: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: Colors.alert.background,
        borderRadius: 16,
        paddingVertical: 18, paddingHorizontal: 20
    },
    iconContainer: {
        width: 20, height: 20,
        justifyContent: 'center', alignItems: 'center'
    },
    devider: {
        flexDirection:'row',
        alignItems: 'center',
        gap: 12
    },
    line: {
        flex:1,
        height: 1,
        backgroundColor: Colors.border.defaultLight
    },
    card: {
        gap: 10,
        borderStyle: 'solid', borderWidth: 1, borderColor: Colors.border.defaultLight, borderRadius: 16,
        padding: 20,
        backgroundColor: Colors.background.card
    },
    buttonContainer: { marginBottom: 14, marginTop: 8, gap: 10 }
})

function TagContainer({ children, opacity }
    : { children: React.ReactNode, opacity: number }
) : React.JSX.Element {
    return (
        <View style={{opacity}}>
            {children}
        </View>
    )
}

export default function ScanScreen() {
    const scan = useContext(ScanContext);
    const ingredientsList = ['레티놀','산','비타민씨'];
    const extendedIngredientsList = ['레티놀','산','비타민씨', '고농도', '에탄올', '글리세린', '오일', '향료',  '메칠파라벤', '디메치콘', '구연산', '콜라겐', '파라벤', '비오틴'];
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [list, setList] = useState<string[]>(ingredientsList);
    const [isExpanded, setIsExpanded] = useState(false);
    const [opacity, setOpacity] = useState(0)

    return (
        <>
            <HeaderNavigation title="제품 등록" />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text
                        style={Typography.title.default}
                    >글씨를 잘 못 읽었어요</Text>
                </View>
                <View style={Styles.alertCaption}>
                    <View style={Styles.iconContainer}>
                        <AlertIcon width={16.68} height={15.01} />
                    </View>
                    <View style={{gap:4}}>
                        <Text
                            style={[Typography.text.accent, {color: Colors.alert.text}]}
                        >사진이 조금 흐려요</Text>
                        <Text
                            style={[Typography.secondary.small, {color: Colors.alert.text}]}
                        >밝은 곳에서 조금 더 가까이 찍어보세요</Text>
                    </View>
                </View>
                <ActionButton text="다시 찍기" route={'/scan/ingredients'}/>
                <View style={Styles.devider}>
                    <View style={Styles.line}></View>
                    <View>
                        <Text
                            style={[Typography.secondary.small, {color:Colors.text.muted}]}
                        >또는</Text>
                    </View>
                    <View style={Styles.line}></View>
                </View>
                <Animated.View
                    style={[Styles.card, {overflow: "hidden"}]}
                    layout={LinearTransition.duration(300).easing(Easing.quad)} 
                >
                    <Text
                        style={[Typography.text.accent]}
                    >성분을 직접 골라주셔도 돼요</Text>
                    <Text
                        style={[Typography.secondary.small, {color: Colors.text.secondary}]}
                    >제품 뒷면에 이런 말이 있으면 골라주세요</Text>
                    <View>
                        <TagButtonList
                            tagList={list}
                            selection={selectedIngredients}
                            setSelection={setSelectedIngredients}
                        />
                    </View>
                    {/* <TagButtonList
                        tagList={ingredientsList}
                        selection={selectedIngredients}
                        setSelection={setSelectedIngredients}
                    />
                    {isExpanded &&
                    <View style={{overflow: 'hidden'}}>
                    <TagButtonList
                        tagList={extendedIngredientsList}
                        selection={selectedIngredients}
                        setSelection={setSelectedIngredients}
                    />
                    </View>
                    } */}
                    <Pressable
                        style={{alignSelf: 'center'}}
                        onPress={()=>{
                            if (!isExpanded) {
                                setList(extendedIngredientsList);
                            } else {
                                setList(ingredientsList);
                            }
                            setIsExpanded(!isExpanded);
                        }}
                    >
                        <View>
                        <Text
                            style={[
                                Typography.secondary.default,
                                {
                                    color:Colors.text.secondary,
                                    textDecorationColor: Colors.text.secondary, textDecorationLine: "underline", textDecorationStyle: "solid"
                                }
                            ]}
                        >{isExpanded ? '접기' : '펼치기'}</Text>
                        </View>
                    </Pressable>
                </Animated.View>
            </View>
            </ScrollView>

            <View style={Styles.buttonContainer}>
                {/* 1. 선택 전까지 비활성화된 버튼 보이기
                <ActionButton
                    text="다음"
                    route={'/scan/info'}
                    onPress={()=>{
                        if (selectedIngredients.length > 0) scan?.setIngredients(selectedIngredients)
                    }}
                    deactivated={selectedIngredients.length == 0}
                /> */}
                {/* 2. 선택 후 버튼 보이기
                selectedIngredients.length > 0 && <ActionButton
                    text="다음"
                    route={'/scan/info'}
                    onPress={()=>{
                        if (selectedIngredients.length > 0) scan?.setIngredients(selectedIngredients)
                    }}
                    deactivated={selectedIngredients.length == 0}
                /> */}
                <SecondaryActionButton text="건너뛰기" onPress={()=>{router.push('/scan/info')}} />
                <Text
                    style={[Typography.secondary.small, {color: Colors.text.muted, textAlign: 'center'}]}
                >건너뛰셔도 등록은 끝납니다</Text>
            </View>
        </>
    )
}