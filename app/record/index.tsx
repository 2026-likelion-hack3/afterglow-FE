/**
 * 증상 기록 화면 (C1)
 */

import ActionButton from "@/src/components/ActionButton";
import BigOptionButton from "@/src/components/BigOptionButton";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { RecordSymptomContext } from "@/src/contexts/RecordContext";
import { UserContext } from "@/src/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        marginBottom: 16
    },
    selectAreaContainer: {
        alignSelf: 'center',
        width: 288, height: 288
    },
    buttonContainer: {
        marginBottom: 14, marginTop: 8
    }
})

type SelectAreaProp = {
    selected: string | null
    setselected: (selected: string | null) => void
    setAngle: (angle: number) => void
    setExtent: (extent: string | null) => void
}

const typePointSet = [
    {
        name: '트러블',
        relPoint: [136, 232.5],
        radian: -1.6674637878166265
    },
    {
        name: '붉어짐',
        relPoint: [210, 202.5],
        radian: -0.671963171590232
    },
    {
        name: '따가움',
        relPoint: [222, 118.5],
        radian: 0.3838176232885688
    },
    {
        name: '가려움',
        relPoint: [200, 84.5],
        radian: 0.8634287072436029
    },
    {
        name: '건조·당김',
        relPoint: [118.5, 68.5],
        radian: 1.8740304791235298
    },
]

function angleDistance(a: number, b: number) {
    const diff = Math.abs(a - b);
    return Math.min(diff, 2 * Math.PI - diff);
}

function SelectArea({ setselected, setAngle, setExtent, selected }: SelectAreaProp) : React.JSX.Element {
    const [point, setPoint] = useState<number[] | null>(null);
    const handlePress = (event: any) => {
        const { locationX, locationY } = event.nativeEvent;
        setPoint([locationX, locationY]);
        // console.log(locationX, locationY);
        let x = locationX - 146;
        let y = locationY - 150;
        let radian = Math.atan2(-y, x);
        let closestDistance = 4;
        let closest = '';
        for (let index = 0; index < typePointSet.length; index++) {
            const typeRadian = typePointSet[index].radian;
            // let distance = Math.abs(typeRadian - radian);
            const distance = angleDistance(typeRadian, radian);
            if (index == 0) {
                closestDistance = distance;
                closest = typePointSet[index].name;
            } else if (distance < closestDistance) {
                closestDistance = distance;
                closest = typePointSet[index].name;
            }
        }
        setselected(closest);
        let degree = radian * 180 / Math.PI;
        setAngle((degree + 360) % 360);
        let length = Math.sqrt(x**2+y**2);
        if (length < 39) {
            setExtent('평소');
        } else if (length < 56) {
            setExtent('약함');
        } else if (length < 94.5) {
            setExtent('보통');
        } else if (length < 130.5) {
            setExtent('심함');
        } else {
            setExtent('아주 심함')
        }
    };

    return (
        <Pressable onPress={handlePress} style={{overflow: 'visible'}}>
            <Svg
                width={288}
                height={288}
                fill="none"
            >
                <G id="shapes">
                    <Circle
                        cx={144} cy={150} r={130.5}
                        fill="#EDECEA" stroke="#DFDCD4"
                    />
                    <Circle
                        cx={144} cy={150} r={94.5}
                        fill="#DAD6CF" stroke="#DFDCD4"
                        strokeWidth={1.5}
                    />
                    <Path stroke="#979797" strokeWidth="1" d="M144 9 V288" />
                    <Path stroke="#979797" d="M4 150 H285" />
                    <Circle
                        cx={144} cy={150} r={56}
                        fill="#CFCCC4" stroke="#B4AFA1"
                    />
                    <Circle
                        cx={144} cy={150} r={39}
                        fill="#B4AFA1" stroke="#7E7A6F"
                    />
                </G>
                <SvgText
                    x="144" y="150"
                    fill="#585448"
                    fontSize="14" fontFamily="Noto Sans KR Regular"
                    textAnchor="middle" alignmentBaseline="middle"
                >평소와 같음</SvgText>
                <G
                    id="axis-label"
                    fill={Colors.text.secondary}
                    fontSize="16" fontFamily="Noto Sans KR Bold"
                    textAnchor="middle" alignmentBaseline="middle"
                >
                    <SvgText x="261" y="164.5" >예민함</SvgText>
                    <SvgText x="27" y="164.5" >잠잠함</SvgText>
                    <SvgText x="183.5" y="276.5" >번들거림</SvgText>
                    <SvgText x="167" y="21.5" >건조</SvgText>
                </G>
                <G
                    id="type"
                    fill={Colors.text.default}
                    fontSize="15" fontFamily="Noto Sans KR Bold"
                    textAnchor="middle" alignmentBaseline="middle"
                >
                    <SvgText x="136" y="232.5" >트러블</SvgText>
                    <SvgText x="210" y="202.5" >붉어짐</SvgText>
                    <SvgText x="222" y="118.5" >따가움</SvgText>
                    <SvgText x="200" y="84.5" >가려움</SvgText>
                    <SvgText x="118.5" y="68.5" >건조 · 당김</SvgText>
                </G>
                {selected && point &&
                    <Circle
                        cx={point[0]} cy={point[1]} r={11.5}
                        fill={Colors.accent.default} stroke={Colors.accent.dark}
                        strokeWidth={3}
                    />
                }
            </Svg>
        </Pressable>
    )
}

export default function RecordScreen() {
    const user = useContext(UserContext);
    const record = useContext(RecordSymptomContext);
    const options = [
        '가려움', '따가움', '건조·당김', '붉어짐', '트러블'
    ]
    const [selected, setselected] = useState<string | null>(null);
    const [angle, setAngle] = useState<number | null>(null);
    const [extent, setExtent] = useState<string | null>(null);
    useEffect(()=>{
        record?.setAngle(0);
        record?.setDuration('');
        record?.setExtent('');
        record?.setImgURI('');
        record?.setIsCompleted(false);
        record?.setPart('');
        record?.setRecentProduct('');
        record?.setState('');
    }, [])
    return (
        <>
            <View style={{paddingVertical: 20}}>
                <HeaderNavigation title="증상 기록" key={0} />
            </View>
            <ScrollView>
            <View style={ Styles.container }>
                <Text
                    style={ Typography.title.big }
                >지금 어떤{'\n'}상태에 가깝나요?</Text>
                {/** 개발 필요 */}
                <View style={Styles.selectAreaContainer}>
                    <SelectArea
                        setAngle={setAngle}
                        setExtent={setExtent}
                        selected={selected} setselected={setselected}
                    />
                </View>
                
                <View style={{ gap: 8 }}>
                    {options.map((option, index) => (
                        <BigOptionButton
                            key={index}
                            text={option}
                            onPress={()=>setselected(option)}
                            isSelected={selected == option}
                            extent={extent ?? undefined}
                            description={"중심에서 멀수록 심해요"}
                        />
                    ))}
                </View>
            </View>
                
            </ScrollView>
            <View style={Styles.buttonContainer}>
                <ActionButton
                    text="선택 완료"
                    route={'/record/duration'}
                    disabled={!selected}
                    onPress={()=>{
                        if (selected) {
                            user?.recordSymptom.setState(selected);
                            record?.setState(selected);
                        }
                        if (angle) record?.setAngle(angle);
                        if (extent) record?.setExtent(extent);
                    }}
                />
            </View>
        </>
    )
}