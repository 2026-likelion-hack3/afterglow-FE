import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";
import PreviousIcon from '@/assets/icons/previous.svg'; // test svg

const tabArr = [
    {text:'홈', width: 30, height: 30},
    {text:'홈', width: 30, height: 30},
    {text:'홈', width: 30, height: 30},
    {text:'홈', width: 30, height: 30}
];

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
        color: Colors.border.default,
        ...Typography.secondary.small
    },
    selectedTabText: {
        color: Colors.text.accent,
        ...Typography.label.default
    }
})

function Tabs({ Icon=PreviousIcon, text, width, height, isSelected=false, onPress=()=>{} }: {
    Icon?: React.FC<SvgProps>,
    text: string,
    width: number,
    height: number,
    isSelected?: boolean,
    onPress?: () => void
}) : React.JSX.Element {
    return (
        <Pressable style={ Styles.tab } onPress={ onPress }>
            <View style={ Styles.tabIcon }>
                <Icon width={ width } height={ height } fill={ isSelected ? Colors.text.accent : Colors.border.default}/>
            </View>
            <View>
                <Text style={ [Styles.tabText, isSelected && Styles.selectedTabText] }>{ text }</Text>
            </View>
        </Pressable>
    )
}

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    return (
        <View style={ [Styles.screen, { paddingTop: insets.top }] }>
            <Stack screenOptions={{ headerShown: false }} />
            <View style={ [Styles.tabBar, { paddingBottom: insets.bottom }] }>
                {tabArr.map((item, index)=>(
                    <Tabs text={item.text} width={item.width} height={item.height} key={index}></Tabs>
                ))}
            </View>
        </View>
    );
}