/**
 * 일일 체크 화면
 */

import HeaderNavigation from "@/src/components/HeaderNavigation";
import OptionButton from "@/src/components/OptionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { UserContext } from "@/src/contexts/UserContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Image, ImageSourcePropType, ScrollView, Text, View } from "react-native";

interface Props {
  source?: ImageSourcePropType | null;
  text: string;
}

function ImageCard({ source=null, text }: Props) : React.JSX.Element {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {source ? (
            <Image
                source={source}
                style={{
                    width: 200,
                    height: 200,
                }}
                resizeMode="contain"
            />
            ) : (
            <Text style={[Typography.label.default, {lineHeight: 200, color: Colors.text.secondary}]}>{text}</Text>
            )}
        </View>
    );
}


export default function DailyCheckScreen() {
    const user = useContext(UserContext);
    const [selected, setselected] = useState('');
    const options = ['좋아졌다', '비슷하다', '나빠졌다'];
    const onPress = (option: string) => {
        setselected(option);
        const interval = setInterval(() => {
            router.replace('/')
            clearInterval(interval)
        }, 300);
    }
    const imgURI: ImageSourcePropType | null = null;
    const imgAlt = '8월 5일'
    return (
        <View style={{flex: 1,paddingTop: 16, paddingHorizontal: 16}}>
            <HeaderNavigation title="일일 체크" />
            <ScrollView>
            <View style={{gap:24, marginBottom: 16}}>
                <Text style={Typography.title.big}>처음과 비교해{'\n'}지금 어떠세요?</Text>
                <View style={{gap: 6, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 200, height: 200, borderRadius: 14, backgroundColor: Colors.background.card}}>
                        <ImageCard source={imgURI} text={'첫날 이미지'}/>
                    </View>
                    <Text style={[Typography.text.default, {color: Colors.text.secondary, textAlign: 'center'}]}>{imgAlt}</Text>
                </View>
                <View style={{gap:8}}>
                    {options.map((option, index)=>(
                        <OptionButton
                            key={index}
                            text={option}
                            isSelected={option == selected}
                            onPress={() => onPress(option)}
                        />
                    ))}
                </View>
                <Text style={[Typography.text.default, {color: Colors.text.secondary, textAlign:'center'}]}>가려움 기준으로 답해주세요.</Text>
            </View>
            </ScrollView>
        </View>
    )
}