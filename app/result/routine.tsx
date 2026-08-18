/**
 * 결과 화면 - 루틴 추천
 */

import ActionButton from "@/src/components/ActionButton";
import BigOptionButton from "@/src/components/BigOptionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import IconTag from "@/src/components/IconTag";
import { Typography } from "@/src/constants/typography";
import { useState } from "react";
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import MorningIcon from '@/assets/icons/morning.svg';
import NightIcon from '@/assets/icons/night.svg';
import { Colors } from "@/src/constants/colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        marginBottom: 16
    },
    img: {
        width: "100%"
    },
    cardContainer: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.border.default,
        borderRadius: 16,
        padding: 20,
        gap: 8,
    },
    routineContainer: {
        flex: 1,
        gap: 5.42,
        padding: 5,
    },
    imgContainer: {
        minHeight: 100,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 10.84, backgroundColor: Colors.background.card,
    }
})

type products = {
    imgsource?: ImageSourcePropType | null,
    name: string
}

type CardInfo = {
    icon: {
        tagIcon: React.FC<SvgProps>,
        iconWidth: number,
        iconHeight: number,
        tagColor: string,
        tagText: string,
    }
    suggestedProducts: Array<products>,
    bgColor: string
}

type CardProp = {
    props: CardInfo
}

function Card({ props } : CardProp
) : React.JSX.Element {
    return (
        <View
            style={[Styles.cardContainer, { backgroundColor: props.bgColor }]}
        >
            <View style={{ alignItems: 'center' }}>
                <IconTag
                    Icon={ props.icon.tagIcon }
                    iconWidth={ props.icon.iconWidth }
                    iconHeight={ props.icon.iconHeight }
                    text={ props.icon.tagText }
                    color={ props.icon.tagColor }
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                {props.suggestedProducts.map((product, index) => (
                    <View
                        style={Styles.routineContainer}
                        key={index}
                    >
                        <View style={Styles.imgContainer}>
                            {product.imgsource &&
                            <Image
                                source={product.imgsource}
                                style={Styles.img}
                            />
                            }
                        </View>
                        <Text
                            style={[Typography.secondary.default, { textAlign: 'center' }]}
                        >{product.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const IconSets = {
    morning: {
        tagIcon: MorningIcon,
        iconWidth: 16.67,
        iconHeight: 16.67,
        tagColor: Colors.text.default,
        tagText: '아침 루틴',
    },
    night: {
        tagIcon: NightIcon,
        iconWidth: 15.83,
        iconHeight: 15,
        tagColor: Colors.text.default,
        tagText: '저녁 루틴',
    },
}

export default function ResultScreen() {
    const cards: Array<CardInfo> = [
        {
            icon: IconSets.morning,
            suggestedProducts: [
                {name: '약산성 세라마이드 크림', imgsource: null},
                {name: '저분자 히알루론산 토너', imgsource: null},
                {name: 'PDRN 펩타이드 앰플', imgsource: null}
            ],
            bgColor: Colors.sand[100]
        },
        {
            icon: IconSets.night,
            suggestedProducts: [
                {name: '약산성 세라마이드 크림', imgsource: null},
                {name: '저분자 히알루론산 토너', imgsource: null},
                {name: 'PDRN 펩타이드 앰플', imgsource: null}
            ],
            bgColor: Colors.sand[300]
        }
    ]

    return (
        <>
            <HeaderNavigation title="결과 확인" key={0} />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text style={ Typography.title.default }>3일간 이렇게 해 보세요.</Text>
                    <Text style={ [Typography.secondary.default, { color: Colors.text.secondary }] }>가지고 계신 제품만으로 짰습니다.</Text>
                </View>
                
                <View style={{ gap: 12 }}>
                    {cards.map((obj, index) => (
                        <Card props={obj} key={index} />
                    ))}
                </View>
            </View>
            </ScrollView>

            <View style={{ marginBottom: 14, marginTop: 8, gap: 20 }}>
                <ActionButton text="확인" route={'/result/daily'}/>
            </View>
        </>
    )
}