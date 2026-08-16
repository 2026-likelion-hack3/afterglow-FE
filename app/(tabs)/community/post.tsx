/**
 * 게시글 작성 화면
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
import ActionButton from "@/src/components/ActionButton";

const Styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 14,
        paddingHorizontal: 16,
        flex: 1,
        gap: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1,
        gap: 16,
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
    post: PostTypes,
    likes: number
    setLikes: (likes: number)=>void
}

function Post({ post, likes, setLikes }: PostProp) : React.JSX.Element {
    const [isPressed, setIsPressed] = useState(false);
    function onPress() {
        if (isPressed) {
            setIsPressed(false);
            setLikes(likes - 1);
        } else {
            setIsPressed(true);
            setLikes(likes + 1);
        }
    }
    return (
        <>
            <View style={{gap: 10}}>
                <Text style={Typography.title.default} >{post.title}</Text>
                <View style={{flexDirection: 'row', gap: 6}}>
                    {post.tags && post.tags.map((tag, index) => (
                        <View key={index} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }]}>
                            <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>{tag}</Text>
                        </View>
                    ))}
                </View>
                <Text>{post.info} · 3일 전</Text>
            </View>
            <View style={{
                gap: 8,
                padding: 20,
                backgroundColor: Colors.background.card,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: Colors.border.defaultLight
            }}>
                <Text style={Typography.text.small}>{post.content}</Text>
            </View>
            
            <View style={{flexDirection: 'row', gap: 10}}>
                <Pressable
                    onPress={onPress}
                    style={[
                        {paddingVertical: 12, paddingHorizontal: 18, borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight },
                        isPressed && {borderColor: Colors.text.default}
                    ]}
                >
                    <Text style={[Typography.secondary.small, {color: Colors.text.muted}]}>저도 그래요 {likes}</Text>
                </Pressable>
                <View
                    style={{paddingVertical: 12, paddingHorizontal: 18, borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight }}
                >
                    <Text style={[Typography.secondary.small, {color: Colors.text.muted}]}>댓글 {post.reply ? post.reply.length : 0}</Text>
                </View>
            </View>
        </>
    )
}

export default function CommunityScreen() {
    const user = useContext(UserContext);
    
    const [selected, setselected] = useState<Array<number>>([]);
    const [selected2, setselected2] = useState<Array<number>>([]);

    return (
        <View style={ Styles.container }>
            <HeaderNavigation title="경험 남기기" />
            <ScrollView>
            <View style={ Styles.content }>
                <View style={{gap:6, paddingVertical: 16, paddingHorizontal: 18, borderRadius: 16, borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight}}>
                    <Text style={Typography.label.default}>이런 내용은 쓸 수 없어요</Text>
                    <Text>제품명과 브랜드명 (성분은 괜찮아요)
병원명과 시술 가격
진단명 단정, 치료법 권유</Text>
                </View>
                <View style={{gap:10}}>
                    <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>증상 태그 · 하나는 꼭 골라주세요</Text>
                    <View style={{ flexDirection:'row', gap: 8}}>
                        {['가려움', '건조·당김', '따가움'].map((text, index)=>(
                            <Pressable onPress={()=>{selected.includes(index) ? setselected([...selected.slice(0,selected.indexOf(index)), ...selected.slice(selected.indexOf(index)+1)]):setselected([...selected, index])}} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }, selected.includes(index) && {backgroundColor:Colors.accent.default, borderColor: Colors.accent.dark, borderWidth: 2}]}>
                                <Text style={[Typography.label.default, {color: Colors.text.secondary}, selected.includes(index) && {color: Colors.text.default}, selected.includes(index) && Typography.label.default]}>{text}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View style={{gap:10}}>
                    <Text style={[Typography.label.default, {color: Colors.text.secondary}]}>상황 태그 · 선택</Text>
                    <View style={{ flexDirection:'row', gap: 8}}>
                        {['잠 못 잤을 때', '스트레스'].map((text, index)=>(
                            <Pressable onPress={()=>{selected2.includes(index) ? setselected2([...selected2.slice(0,selected2.indexOf(index)), ...selected2.slice(selected2.indexOf(index)+1)]):setselected2([...selected2, index])}} style={[{alignSelf:'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200, paddingVertical: 8, paddingHorizontal:16 }, selected.includes(index) && {backgroundColor:Colors.accent.default, borderColor: Colors.accent.dark, borderWidth: 2}]}>
                                <Text style={[Typography.label.default, {color: Colors.text.secondary}, selected2.includes(index) && {color: Colors.text.default}, selected2.includes(index) && Typography.label.default]}>{text}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View><Text>미구현</Text></View>
            </View>
            </ScrollView>
            <ActionButton text="작성 완료" route={'/(tabs)/community'} />
        </View>
    )
};