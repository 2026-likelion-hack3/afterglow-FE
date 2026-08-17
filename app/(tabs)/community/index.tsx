/**
 * 커뮤니티 화면
 */

import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/src/contexts/UserContext";
import TagButtonList from "@/src/components/TagButtonList";
import { useFocusEffect } from "@react-navigation/native";
import Tag from "@/src/components/Tag";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";

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
    },
    card: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border.defaultLight,
        padding: 20
    },
    suggestionButton: {
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: Colors.text.default,
        backgroundColor: Colors.background.subtle
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

type NoPostsProp = {
    getLastHistory: () => {
        lastItem: string[], lastArr: string[], postCount: number
    } | null
    undo: () => void
}

function NoPosts({ getLastHistory, undo }: NoPostsProp) : React.JSX.Element {
    const lastHistory = getLastHistory();
    return (
        <View style={{gap: 16}}>
            <View style={[
                Styles.card,
                {gap: 12, backgroundColor: Colors.background.card}
            ]}>
                {
                lastHistory ?
                <>
                    <Text style={Typography.text.accent}>아직 이 조건에 맞는 글이 없어요</Text>

                    <Text style={[Typography.secondary.default, {color: Colors.text.secondary}]}>조건을 하나 풀어보시겠어요?</Text>
                    <Pressable style={Styles.suggestionButton} onPress={undo}>
                        <Text style={[Typography.label.default, {textAlign: 'center'}]}>{lastHistory.lastArr.join(' + ')}만 보기 · {lastHistory.postCount}개</Text>
                    </Pressable>
                    {lastHistory.lastItem[0] &&
                        <Text style={[Typography.secondary.small, {color: Colors.text.muted}]}>마지막에 더한 "{lastHistory.lastItem[0]}" 때문에 결과가 없어졌어요</Text>
                    }
                </>
                :
                <>
                    <Text style={Typography.text.accent}>아직 글이 없어요</Text>
                </>
                }
                
            </View>
            <View style={[
                Styles.card,
                {gap: 10, backgroundColor: Colors.background.subtle}
            ]}>
                <Text style={Typography.text.accent}>첫 글을 남겨주시겠어요?</Text>
                <Text style={[Typography.secondary.small, {color: Colors.text.secondary}]}>비슷한 분들이 나중에 이 글을 보게 됩니다</Text>
                <SecondaryActionButton text="경험 남기기" onPress={() => router.push('/(tabs)/community/post')} />
            </View>
        </View>
    )
}

export default function CommunityScreen() {
    const user = useContext(UserContext);

    useFocusEffect(()=>{
        user?.setIsReading(false);
        user?.setIsWriting(false);
    });

    const symptomsList = ['가려움', '건조·당김', '따가움'];
    const situationsList = ['잠 못 잤을 때', '스트레스'];

    const [selectedSymptoms, setselectedSymptoms] = useState<Array<string>>([]);
    const [selectedSituations, setselectedSituations] = useState<Array<string>>([]);

    // 배열의 변경 이력
    type HistoryEntry = {
        type: "selectedSymptoms" | "selectedSituations"
        previous: string[];
    }

    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const previousSelectedSymptoms = useRef(selectedSymptoms);
    const previousSelectedSituations = useRef(selectedSituations);
    const undoingType = useRef<
        "selectedSymptoms" | "selectedSituations" | null
    >(null);

    // items가 변경될 때마다 history에 기록
    useEffect(() => {
        if (previousSelectedSymptoms.current === selectedSymptoms) return;
        if (undoingType.current === "selectedSymptoms") {
            previousSelectedSymptoms.current = selectedSymptoms;
            undoingType.current = null;
            return;
        }
        setHistory((prev) => [
            ...prev,
            {
                type: "selectedSymptoms",
                previous: previousSelectedSymptoms.current,
            },
        ]);
        previousSelectedSymptoms.current = selectedSymptoms;
    }, [selectedSymptoms]);

    useEffect(() => {
        if (previousSelectedSituations.current === selectedSituations) return;
        if (undoingType.current === "selectedSituations") {
            previousSelectedSituations.current = selectedSituations;
            undoingType.current = null;
            return;
        }
        setHistory((prev) => [
            ...prev,
            {
            type: "selectedSituations",
            previous: previousSelectedSituations.current,
            },
        ]);
        previousSelectedSituations.current = selectedSituations;
    }, [selectedSituations]);
    
    const isUndoing = useRef(false);

    const getAddedItems = (
        previous: string[],
        current: string[]
    ) => {
        return current.filter(
            (item) => !previous.includes(item)
        );
    };

    const getLastHistory = () => {
        if (history.length === 0) return null;
        const last = history[history.length - 1];
        if (last.previous.length === 0) return null;

        let symptoms = selectedSymptoms;
        let situations = selectedSituations;

        let added: string[];
        if (last.type === "selectedSymptoms") {
            added = getAddedItems(
                last.previous,
                selectedSymptoms
            );
        } else {
            added = getAddedItems(
                last.previous,
                selectedSymptoms
            );
        }
        const undoPosts = getFilteredPosts(
            symptoms,
            situations,
        );

        return {
            lastItem: added,
            lastArr: [
                ...symptoms,
                ...situations,
            ],
            postCount: undoPosts.length,
        };
    }

    const undo = () => {
        if (history.length === 0) return null;
        const last = history[history.length - 1];
        undoingType.current = last.type;
        if (last.type === "selectedSymptoms") {
            setselectedSymptoms(last.previous);
        } else {
            setselectedSituations(last.previous);
        }
        setHistory((prev) => prev.slice(0, -1));
    };

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

    const selectedTags = [
        ...selectedSymptoms,
        ...selectedSituations,
    ];

    const getFilteredPosts = (
        symptoms: string[],
        situations: string[],
    ) => {
        const selectedTags = [
            ...symptoms,
            ...situations,
        ];

        return posts.filter((post) => {
            if (selectedTags.length === 0) {
                return true;
            }

            return selectedTags.every((tag) =>
                post.tags?.includes(tag)
            );
        });
    };

    const filteredPosts = getFilteredPosts(
        selectedSymptoms,
        selectedSituations,
    );

    return (
            <View style={ Styles.container }>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={ Typography.title.default }>이야기</Text>
                    <Pressable onPress={()=>router.push('/community/post')}>
                        <Text style={[Typography.label.default, {color:Colors.text.accent}]}>글쓰기</Text>
                    </Pressable>
                </View>
                <TagButtonList
                    tagList={symptomsList}
                    selection={selectedSymptoms}
                    setSelection={setselectedSymptoms}
                />
                <TagButtonList
                    tagList={situationsList}
                    selection={selectedSituations}
                    setSelection={setselectedSituations}
                />
                <Text
                    style={[
                        Typography.secondary.small,
                        {color: Colors.text.secondary}
                    ]}
                >{[
                    [...selectedSymptoms, ...selectedSituations].join(' + ') || '전체',
                    filteredPosts.length + '개'].join(' · ')}</Text>
                <ScrollView>
                <View style={ Styles.content }>
                    {
                    filteredPosts.length > 0 ?
                    <>
                        {filteredPosts.map((post, index) => (
                            <Post prop={post} key={index} />
                        ))}
                    </>
                    :
                        <NoPosts getLastHistory={getLastHistory} undo={undo} />
                    }
                </View>
                </ScrollView>
            </View>
    )
};