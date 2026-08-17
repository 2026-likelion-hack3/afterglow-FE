/**
 * 커뮤니티 화면
 */

import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/src/contexts/UserContext";
import TagButtonList from "@/src/components/TagButtonList";
import { useFocusEffect } from "@react-navigation/native";
import Tag from "@/src/components/Tag";

const Styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 16,
        flex: 1,
        gap: 16
    },
    content: {
        gap: 12,
        marginBottom: 24
    },
    postContainer: {
        gap: 8,
        paddingVertical: 16,
        paddingHorizontal: 18,
        backgroundColor: Colors.background.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border.defaultLight
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
        <Pressable
            onPress={()=>{
                router.push(`/(tabs)/community/${prop.id}`);
            }}
            style={Styles.postContainer}
        >
            <Text style={Typography.text.accent}>{prop.title}</Text>
            <View style={{flexDirection: 'row', gap: 6}}>
                {prop.tags && prop.tags.map((tag, index) => (
                    <Tag
                        key={index}
                        color={Colors.border.defaultLight} textColor={Colors.text.secondary}
                        text={tag}
                        backgroundColor={Colors.background.card}
                    />
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

    useFocusEffect(()=>{
        user?.setIsReading(false);
        user?.setIsWriting(false);
    });

    const symptomList = ['가려움', '건조·당김', '따가움'];
    const situationList = ['잠 못 잤을 때', '스트레스'];

    const [symptom, setsymptom] = useState<Array<string>>([]);
    const [situation, setsituation] = useState<Array<string>>([]);

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
                    <Pressable onPress={()=>router.push('/community/post')}>
                        <Text style={[Typography.label.default, {color:Colors.text.accent}]}>글쓰기</Text>
                    </Pressable>
                </View>
                <TagButtonList
                    tagList={symptomList}
                    selection={symptom}
                    setSelection={setsymptom}
                />
                <TagButtonList
                    tagList={situationList}
                    selection={situation}
                    setSelection={setsituation}
                />
                <Text
                    style={[
                        Typography.secondary.small,
                        {color: Colors.text.secondary}
                    ]}
                >{[...symptom, ...situation, posts.length + '개'].join(' · ')}</Text>
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