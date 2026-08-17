/**
 * 게시글 화면
 * @param id 게시글 고유번호
 */

import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "@/src/contexts/UserContext";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import { useFocusEffect } from "@react-navigation/native";
import Tag from "@/src/components/Tag";

const Styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 14,
        paddingHorizontal: 16,
        flex: 1,
        gap: 16
    },
    content: {
        flex: 1,
        gap: 16,
        marginBottom: 24
    },
    postContent: {
        gap: 8,
        padding: 20,
        backgroundColor: Colors.background.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border.defaultLight
    },
    button: {
        paddingVertical: 12, paddingHorizontal: 18,
        borderWidth: 1, borderStyle: 'solid', borderColor: Colors.border.defaultLight, borderRadius: 200,
        backgroundColor: Colors.background.card
    }
})

type PostTypes = {
    id: number
    title: string
    tags?: Array<string>
    info: Array<string>
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
                        <Tag
                            key={index}
                            color={Colors.border.defaultLight} textColor={Colors.text.secondary}
                            text={tag}
                            backgroundColor={Colors.background.card}
                        />
                    ))}
                </View>
                <Text style={[Typography.secondary.small, {color: Colors.text.muted}]}>{post.info.join(' · ')}</Text>
            </View>
            <View style={Styles.postContent}>
                <Text style={Typography.text.small}>{post.content}</Text>
            </View>
            
            <View style={{flexDirection: 'row', gap: 10}}>
                <Pressable
                    onPress={onPress}
                    style={[
                        Styles.button,
                        isPressed && {borderColor: Colors.text.default}
                    ]}
                >
                    <Text
                        style={[
                            Typography.secondary.small,
                            { color: Colors.text.muted },
                            isPressed && Typography.label.default
                        ]}
                    >저도 그래요 {likes}</Text>
                </Pressable>
                <View
                    style={Styles.button}
                >
                    <Text
                        style={[
                            Typography.secondary.small,
                            {color: Colors.text.muted}
                        ]}
                    >댓글 {post.reply ? post.reply.length : 0}</Text>
                </View>
            </View>
        </>
    )
}

export default function CommunityScreen() {
    const user = useContext(UserContext);
    useFocusEffect(() => user?.setIsReading(true))
    const {id} = useLocalSearchParams<{id:string}>()
    const postId = parseInt(id);
    const getexamplePost = () => ( postId == 0 ? {
            id: 0,
            title: '밤에 못 자면 다음날 꼭 가려워요',
            tags: ['가려움', '잠 못 잤을 때'],
            info: ['폐경 2년차', '3일 전'],
            like: 14,
            content: `작년부터 유난히 밤에 잠을 설치는데, 그런 날 아침이면 볼이랑 목 쪽이 따갑고 가려워요. 처음엔 화장품 탓인 줄 알고 몇 번 바꿔봤는데 소용이 없더라고요.

요즘은 잠을 잘 잔 날과 아닌 날을 적어두고 있어요. 확실히 차이가 보입니다.`
        } : postId == 1 ? {
            id: 1,
            title: '세라마이드 크림으로 버티는 중',
            tags: ['가려움'],
            info: ['이행기'],
            like: 9,
            content: ``
        } : {
            id: 2,
            title: '환절기마다 반복돼서 기록 시작했어요',
            tags: ['가려움', '계절·날씨'],
            info: ['폐경 4년차'],
            like: 6,
            content: ''
        })
    const post = getexamplePost();
    const [likes, setLikes] = useState(post.like);

    return (
        <View style={ Styles.container }>
            <HeaderNavigation title="이야기" />
            <ScrollView>
            <View style={ Styles.content }>
                <Post post={post} likes={likes} setLikes={setLikes} />
            </View>
            </ScrollView>
            <Text style={[Typography.secondary.small, {textAlign: 'center', color: Colors.text.muted}]}>개인 경험이며 의학적 조언이 아닙니다</Text>
        </View>
    )
};