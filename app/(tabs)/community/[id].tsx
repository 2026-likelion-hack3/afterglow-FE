/**
 * 게시글 화면
 * @param id 게시글 고유번호
 */

import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import NightIcon from '@/assets/icons/night.svg';
import PathIcon from '@/assets/icons/path.svg';
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "@/src/contexts/UserContext";
import HeaderNavigation from "@/src/components/HeaderNavigation";

const Styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 16,
        flex: 1,
        gap: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        gap: 12,
        marginBottom: 24
    },
    card: {
        borderRadius: 18,
        padding: 20
    }
})

const SleepStyles = StyleSheet.create({
    container: {
        gap: 2,
        backgroundColor: Colors.sand[200]
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        gap: 6
    }
})

const RoutineStyles = StyleSheet.create({
    container: {
        gap: 8
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selected: {
        borderRadius: 60,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: Colors.accent.light
    },
    selectedText: {
        ...Typography.text.accent,
        color: '#42362F'
    },
    list: {
        height: 48,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }
})

type PostTypes = {
    id: number
    title: string
    tags?: Array<string>
    info: string
    like: number,
    content: string
    reply?: Array<String>
}

type PostProp = {
    prop: PostTypes
}

function Post({ prop }: PostProp) : React.JSX.Element {
    return (
        <View style={{
            gap: 8,
            paddingVertical: 16,
            paddingHorizontal: 18,
            backgroundColor: Colors.background.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: Colors.border.defaultLight
        }}>
            <Text style={Typography.text.accent}>{prop.title}</Text>
            <View>
                {prop.tags && prop.tags.map((tag, index) => (
                    <View key={index} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }]}>
                        <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>{tag}</Text>
                    </View>
                ))}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{prop.info}</Text>
                <Text>저도 그래요 {prop.like}</Text>
            </View>
        </View>
    )
}

export default function CommunityScreen() {
    const user = useContext(UserContext);
    const {id} = useLocalSearchParams<{id:string}>()
    const postId = parseInt(id);
    const getPost: PostTypes = postId == 0 ? {
            id: 0,
            title: '밤에 못 자면 다음날 꼭 가려워요',
            tags: ['가려움', '잠 못 잤을 때'],
            info: '폐경 2년차',
            like: 14,
            content: `작년부터 유난히 밤에 잠을 설치는데, 그런 날 아침이면 볼이랑 목 쪽이 따갑고 가려워요. 처음엔 화장품 탓인 줄 알고 몇 번 바꿔봤는데 소용이 없더라고요.

요즘은 잠을 잘 잔 날과 아닌 날을 적어두고 있어요. 확실히 차이가 보입니다.`
        } : postId == 1 ? {
            id: 1,
            title: '세라마이드 크림으로 버티는 중',
            tags: ['가려움'],
            info: '이행기',
            like: 9,
            content: ``
        } : {
            id: 2,
            title: '환절기마다 반복돼서 기록 시작했어요',
            tags: ['가려움', '계절·날씨'],
            info: '폐경 4년차',
            like: 6,
            content: ''
        }

    return (
        <View style={ Styles.container }>
            <HeaderNavigation title="이야기" />
            <ScrollView>
            <View style={ Styles.content }>
                <Post prop={getPost} />
            </View>
            </ScrollView>
        </View>
    )
};