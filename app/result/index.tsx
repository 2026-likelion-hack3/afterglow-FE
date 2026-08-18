/**
 * 기록 분석 결과 화면
 */

import ActionButton from "@/src/components/ActionButton";
import BigOptionButton from "@/src/components/BigOptionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import IconTag from "@/src/components/IconTag";
import { Typography } from "@/src/constants/typography";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import PauseIcon from '@/assets/icons/pause.svg';
import HandIcon from '@/assets/icons/hand.svg';
import AlertIcon from '@/assets/icons/alert.svg';
import { Colors } from "@/src/constants/colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        marginBottom: 16
    },
    footer: {
        marginBottom: 14, marginTop: 8,
        gap: 20
    },
    cardContainer: {
        alignItems: 'flex-start',
        borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.default, borderRadius: 16,
        padding: 20,
        gap: 8,
    }
})

type CardInfo = {
    icon: {
        tagIcon: React.FC<SvgProps>,
        iconWidth: number,
        iconHeight: number,
        tagColor: string,
        tagText: string,
    }
    text: string,
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
            <IconTag
                Icon={ props.icon.tagIcon }
                iconWidth={ props.icon.iconWidth }
                iconHeight={ props.icon.iconHeight }
                text={ props.icon.tagText }
                color={ props.icon.tagColor }
            />
            <Text
                style={ Typography.text.default }
            >{ props.text }</Text>
        </View>
    )
}

const IconSets = {
    pause: {
        tagIcon: PauseIcon,
        iconWidth: 16.67,
        iconHeight: 16.67,
        tagColor: Colors.text.default,
        tagText: '멈춰야 할 것',
    },
    hand: {
        tagIcon: HandIcon,
        iconWidth: 16.75,
        iconHeight: 16.67,
        tagColor: Colors.text.default,
        tagText: '사용할 것',
    },
    alert: {
        tagIcon: AlertIcon,
        iconWidth: 16.68,
        iconHeight: 15.01,
        tagColor: Colors.alert.default,
        tagText: '이럴 때는 병원으로',
    }
}

export default function ResultScreen() {
    const cards: Array<CardInfo> = [
        {
            icon: IconSets.pause,
            text: '기록이 이틀치뿐이라 원인을 좁히기 어렵습니다. 며칠 더 모이면 알려드릴게요.',
            bgColor: Colors.sand[200]
        },
        {
            icon: IconSets.hand,
            text: '최근에 새로 쓰기 시작한 제품이 있다면 며칠 사용을 멈춰보세요.',
            bgColor: Colors.accent.default
        },
        {
            icon: IconSets.alert,
            text: '열감이 있거나 진물이 나면\n피부과에 가보세요.',
            bgColor: Colors.alert.background
        }
    ]

    return (
        <>
            <HeaderNavigation title="결과 확인" key={0} />

            <ScrollView>
            <View style={ Styles.container }>
                <Text
                    style={ Typography.title.default }
                >아직 판단하기 이릅니다.</Text>
                
                <View style={{ gap: 12 }}>
                    {cards.map((obj, index) => (
                        <Card
                            key={index}
                            props={obj}
                        />
                    ))}
                </View>
            </View>
            </ScrollView>

            <View style={Styles.footer}>
                <Text
                    style={{ textAlign: 'center' }}
                >진단이 아닙니다. 최근 7일 기록을 근거로 했습니다.</Text>
                <ActionButton text="확인" route={'/result/routine'}/>
            </View>
        </>
    )
}