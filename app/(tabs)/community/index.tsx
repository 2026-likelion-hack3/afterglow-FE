/**
 * 커뮤니티 화면
 */

import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import NightIcon from '@/assets/icons/night.svg';
import PathIcon from '@/assets/icons/path.svg';
import { router } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "@/src/contexts/UserContext";

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
    like: number
}

type PostProp = {
    prop: PostTypes
}

function Post({ prop }: PostProp) : React.JSX.Element {
    return (
        <Pressable onPress={()=>{router.push(`/(tabs)/community/${prop.id}`)}} style={{
            gap: 8,
            paddingVertical: 16,
            paddingHorizontal: 18,
            backgroundColor: Colors.background.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: Colors.border.defaultLight
        }}>
            <Text style={Typography.text.accent}>{prop.title}</Text>
            <View style={{flexDirection: 'row', gap: 6}}>
                {prop.tags && prop.tags.map((tag, index) => (
                    <View key={index} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }]}>
                        <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>{tag}</Text>
                    </View>
                ))}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[Typography.secondary.small, {color: Colors.text.muted}]}>{prop.info}</Text>
                <Text style={[Typography.secondary.small, {color: Colors.text.muted}]}>저도 그래요 {prop.like}</Text>
            </View>
        </Pressable>
    )
}

export default function CommunityScreen() {
    const user = useContext(UserContext);

    const [selected, setselected] = useState<Array<number>>([]);
    const [selected2, setselected2] = useState<Array<number>>([]);

    const posts : Array<PostTypes> = [
        {
            id: 0,
            title: '밤에 못 자면 다음날 꼭 가려워요',
            tags: ['가려움', '잠 못 잤을 때'],
            info: '폐경 2년차',
            like: 14
        },
        {
            id: 1,
            title: '세라마이드 크림으로 버티는 중',
            tags: ['가려움'],
            info: '이행기',
            like: 9
        },
        {
            id: 2,
            title: '환절기마다 반복돼서 기록 시작했어요',
            tags: ['가려움', '계절·날씨'],
            info: '폐경 4년차',
            like: 6
        }
    ]

    return (
            <View style={ Styles.container }>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={ Typography.title.default }>이야기</Text>
                    <Pressable>
                        <Text style={[Typography.label.default, {color:Colors.text.accent}]}>글쓰기</Text>
                    </Pressable>
                </View>
                 <View style={{ flexDirection:'row', gap: 8}}>
                    {['가려움', '건조·당김', '따가움'].map((text, index)=>(
                        <Pressable onPress={()=>{selected.includes(index) ? setselected([...selected.slice(0,selected.indexOf(index)), ...selected.slice(selected.indexOf(index)+1)]):setselected([...selected, index])}} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }, selected.includes(index) && {backgroundColor:Colors.accent.default, borderColor: Colors.accent.dark, borderWidth: 2}]}>
                            <Text style={[Typography.label.default, {color: Colors.text.secondary}, selected.includes(index) && {color: Colors.text.default}, selected.includes(index) && Typography.label.default]}>{text}</Text>
                        </Pressable>
                    ))}
                </View>
                <View style={{ flexDirection:'row', gap: 8}}>
                    {['잠 못 잤을 때', '스트레스'].map((text, index)=>(
                        <Pressable onPress={()=>{selected2.includes(index) ? setselected2([...selected2.slice(0,selected2.indexOf(index)), ...selected2.slice(selected2.indexOf(index)+1)]):setselected2([...selected2, index])}} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }, selected.includes(index) && {backgroundColor:Colors.accent.default, borderColor: Colors.accent.dark, borderWidth: 2}]}>
                            <Text style={[Typography.label.default, {color: Colors.text.secondary}, selected2.includes(index) && {color: Colors.text.default}, selected2.includes(index) && Typography.label.default]}>{text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={[Typography.secondary.small, {color: Colors.text.secondary}]}>가려움 · 12개</Text>
                <ScrollView>
                <View style={ Styles.content }>
                    {posts.map((post, index) => (
                        <Post prop={post} key={index} />
                    ))}
                </View>
                </ScrollView>
            </View>
    )
};