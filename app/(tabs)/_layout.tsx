import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { router, Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";
import { useContext, useState } from "react";

import HomeIcon from '@/assets/icons/home.svg';
import CosmeticsIcon from '@/assets/icons/cosmetics.svg';
import LogsIcon from '@/assets/icons/logs.svg';
import CommunityIcon from '@/assets/icons/community.svg';
import { UserContext } from "@/src/contexts/UserContext";

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background.page,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: Colors.background.card,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingTop: 12,
        paddingHorizontal: 25
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabIcon: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabText: {
        ...Typography.secondary.small,
        color: Colors.border.default
    },
    selectedTabText: {
        ...Typography.label.default,
        color: Colors.text.accent
    }
})

function Tabs({ Icon, text, width, height, onPress, current }: {
    Icon: React.FC<SvgProps>,
    text: string,
    width: number,
    height: number,
    onPress: () => void,
    current: string
}) : React.JSX.Element {
    return (
        <Pressable style={ Styles.tab } onPress={ onPress }>
            <View style={ Styles.tabIcon }>
                <Icon
                    width={ width }
                    height={ height }
                    color={ text == current ? Colors.text.accent : Colors.border.default}
                />
            </View>
            <View>
                <Text
                    style={ [Styles.tabText, text == current && Styles.selectedTabText] }
                >{ text }</Text>
            </View>
        </Pressable>
    )
}

export default function TabLayout() {
    const user = useContext(UserContext);
    const tabArr = [
        {
            text: '홈',
            width: 24,
            height: 25.33,
            Icon: HomeIcon,
            onPress: () => {
                setselectedTab('홈');
                router.replace('/(tabs)');
            }
        },
        {
            text: '화장대',
            width: 30,
            height: 30,
            Icon: CosmeticsIcon,
            onPress: () => {
                setselectedTab('화장대');
                router.replace('/(tabs)/cosmetics');
            }
        },
        {
            text: '기록',
            width: 30,
            height: 30,
            Icon: LogsIcon,
            onPress: () => {
                setselectedTab('기록');
                router.replace('/(tabs)/log');
            }
        },
        {
            text: '이야기',
            width: 30,
            height: 30,
            Icon: CommunityIcon,
            onPress: () => {
                setselectedTab('이야기');
                router.replace('/(tabs)/community');
            }
        }
    ];

    const [selectedTab, setselectedTab] = useState('홈');

    const insets = useSafeAreaInsets();
    return (
        <View style={ [Styles.screen, { paddingTop: insets.top }] }>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
            {
            !user?.isReading && !user?.isWriting &&
                <View style={ [Styles.tabBar, { paddingBottom: 16 }] }>
                {tabArr.map((item, index)=>(
                    <Tabs
                        Icon={item.Icon}
                        text={item.text}
                        width={item.width}
                        height={item.height}
                        onPress={item.onPress}
                        current={selectedTab}
                        key={index}
                    />
                ))}
                </View>
            }
        </View>
    );
}