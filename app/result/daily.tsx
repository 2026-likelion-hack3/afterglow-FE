/**
 * 결과 화면 - 일일 추천
 */

import ActionButton from "@/src/components/ActionButton";
import BigOptionButton from "@/src/components/BigOptionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import IconTag from "@/src/components/IconTag";
import { Typography } from "@/src/constants/typography";
import { ComponentType, useState } from "react";
import { Image, ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop, SvgProps } from "react-native-svg";
import PauseIcon from '@/assets/icons/pause.svg';
import HandIcon from '@/assets/icons/hand.svg';
import AlertIcon from '@/assets/icons/alert.svg';
import { Colors } from "@/src/constants/colors";

import { FlatList, Dimensions } from "react-native";
import Tag from "@/src/components/Tag";

const { width } = Dimensions.get("window");

type CarouselProp = {
    cards: Array<CardInfo>
}

function Carousel({ cards }: CarouselProp) {
    const CARD_WIDTH = width - 32 - 30;
    const GAP = 12;
    return (
        <FlatList
            data={cards}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingRight: 30,
            }}
            snapToInterval={CARD_WIDTH + GAP}
            decelerationRate="fast"
            renderItem={({ item, index }) => (
                <View style={{
                    width: CARD_WIDTH,
                    marginRight: index === cards.length - 1 ? -30 : GAP
                }}>
                    <Card props={item} />
                </View>
            )}
            keyExtractor={(_, index) => index.toString()}
        />
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20
    },
    img: {
        width: "100%"
    }
})

type tagType = {
    color?: string,
    text: string
}

type CardInfo = {
    icon: {
        tagIcon: React.FC<SvgProps>,
        iconWidth: number,
        iconHeight: number,
        tagColor: string,
        tagText: string,
    },
    description?: {
        title: string,
        name: string,
        imgsource?: ImageSourcePropType | null,
        tags?: Array<tagType> | null,
    } | null,
    text: string,
    bgSvg: React.ComponentType<SvgProps>
}

type CardProp = {
    props: CardInfo
}

function Card({ props } : CardProp
) : React.JSX.Element {
    return (
        <View style={{
            flex: 1,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: Colors.border.default,
            borderRadius: 16
        }}>
            <props.bgSvg />
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                paddingVertical: 30,
                paddingHorizontal: 33,
            }}>
                <View style={{ alignItems: 'center' }}>
                    <IconTag
                        Icon={ props.icon.tagIcon }
                        iconWidth={ props.icon.iconWidth }
                        iconHeight={ props.icon.iconHeight }
                        text={ props.icon.tagText }
                        color={ props.icon.tagColor }
                    />
                </View>
                <Text style={[Typography.title.small, {textAlign: 'center'}]}>{ props.text }</Text>
                {
                    props.description?.imgsource &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={Styles.img} source={props.description.imgsource} />
                    </View>
                }
                {
                    props.description &&
                    <View style={{ gap: 4 }}>
                        <Text style={[Typography.text.accent, {color: Colors.text.accent, textAlign: 'center'}]}>{ props.description.title }</Text>
                        <Text style={[Typography.secondary.default, {color: Colors.text.accent, textAlign: 'center'}]}>{ props.description.name }</Text>
                    </View>
                }
                {
                    props.description?.tags &&
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        {props.description.tags.map((tag, index) => (
                            <Tag key={index} text={tag.text} color={tag.color ?? Colors.alert.text} />
                        ))}
                    </View>
                }
            </View>
        </View>
    )
}

type gradientpoint = {
    offset: string,
    color: string
}

type svgobj = {
    point: {
        rx: string,
        ry: string,
        cx: string,
        cy: string,
    },
    gradientpoints: Array<gradientpoint>
}

function makeBgSvg(obj: svgobj) {
    return () => (
        <Svg
            width="100%"  height="100%"
            style={{ position: "absolute" }}
        >
            <Defs>
                <RadialGradient
                    id="gradient"
                    rx={obj.point.rx}  ry={obj.point.ry}
                    cx={obj.point.cx}  cy={obj.point.cy}
                >
                    {obj.gradientpoints.map((point, index) => (
                        <Stop key={index} offset={point.offset} stopColor={point.color} />
                    ))}
                </RadialGradient>
            </Defs>

            <Rect
                width="100%"  height="100%"  fill="url(#gradient)"
                rx={16}
            />
        </Svg>
    )
}

export default function ResultScreen() {
    const cards: Array<CardInfo> = [
        {
            icon: {
                tagIcon: PauseIcon,
                iconWidth: 16.67,
                iconHeight: 16.67,
                tagColor: Colors.text.inverted,
                tagText: '멈춰야 할 것',
            },
            text: '2주 전부터 쓰신 고농도 앰플을 3일간 멈춰보세요.',
            bgSvg: makeBgSvg({
                point: { rx: "135.8%", ry: "100%", cx: "50%", cy: "0%" },
                gradientpoints: [
                    {offset: "1%", color: '#878170'},
                    {offset: "35%", color: Colors.sand[400] },
                    {offset: "75%", color: Colors.sand[300] },
                    {offset: "100%", color: Colors.sand[200] },
                ]
            }),
            description: {
                title: '최근 새로 쓴 제품',
                name: '윤작 카밍&컴포팅 앰플',
                tags: [{text: '고농도'}, {text: '보습'}]
            }
        },
        {
            icon: {
                tagIcon: HandIcon,
                iconWidth: 16.75,
                iconHeight: 16.67,
                tagColor: Colors.text.inverted,
                tagText: '사용할 것',
            },
            text: '지금 가지고 계신\n세라마이드 크림을 사용해 보세요.',
            bgSvg: makeBgSvg({
                point: { rx: "149.9%", ry: "100%", cx: "50%", cy: "0%" },
                gradientpoints: [
                    {offset: "0.46%", color: '#C28936' },
                    {offset: "55.29%", color: '#FAC87E' },
                    {offset: "100%", color: '#FCD37F' },
                ],
            }),
            description: {
                title: '현재 사용하면 좋은 제품',
                name: '멀티 세라마이드 크림',
                tags: [{text: '보습'}, {text: '세라마이드'}]
            }
        },
        {
            icon: {
                tagIcon: AlertIcon,
                iconWidth: 16.68,
                iconHeight: 15.01,
                tagColor: Colors.alert.default,
                tagText: '이럴 때는 병원으로',
            },
            text: '3일 뒤에도 열감이 있거나 진물이 나면\n피부과에 가보세요!',
            bgSvg: makeBgSvg({
                point: { rx: "135.8%", ry: "100%", cx: "50%", cy: "0%" },
                gradientpoints: [
                    {offset: "0%", color: '#FFCCBE' },
                    {offset: "100%", color: '#E2DBCF' },
                ]
            })
        }
    ]

    return (
        <>
            <HeaderNavigation title="결과 확인" key={0} />

            <View style={ Styles.container }>
                <Text style={ Typography.title.big }>오늘부터는{'\n'}이렇게 해 보세요!</Text>
                
                {/* 캐러셀 */}
                <Carousel cards={cards} />
            </View>

            <View style={{ marginBottom: 14, marginTop: 20, gap: 20 }}>
                <Text style={{ textAlign: 'center' }}>진단이 아닙니다. 최근 7일 기록을 근거로 했습니다.</Text>
                <View style={{
                    gap: 10
                }}>
                    <ActionButton text="좋아졌다" route={'/result/routine'}/>
                    <Pressable style={{
                        borderRadius: 16,
                        padding: 16,
                        backgroundColor: Colors.background.card
                    }}>
                        <Text style={ [Typography.text.accent, { color: '#3D5C80', textAlign: 'center' }] }>같은 가려움을 겪은 분들의 이야기 12개</Text>
                        <Text style={ [Typography.secondary.small, { color: Colors.text.secondary, textAlign: 'center' }] }>같은 피부고민을 겪는 사람들의 이야기를 확인해 보세요.</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}