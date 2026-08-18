/**
 * 카메라 촬영 화면
 */

import ActionButton from "@/src/components/ActionButton";
import BigOptionButton from "@/src/components/BigOptionButton";
import CameraCapture, { CameraCaptureRef } from "@/src/components/CameraCapture";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import SkipButton from "@/src/components/SkipButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { RecordSymptomContext } from "@/src/contexts/RecordContext";
import { UserContext } from "@/src/contexts/UserContext";
import { useContext, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import GuideLine from '@/assets/images/Ellipse.svg';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        marginBottom: 16
    },
    cameraContainer: {
        position: 'relative',
        height: 440,
        borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.sand[400], borderRadius: 8,
    },
    overlay: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: "center", justifyContent: "center",
        gap: 20,
        paddingHorizontal: 22
    },
    caption: {
        borderRadius: 8,
        padding: 10,
        backgroundColor: Colors.sand[100],
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 8, paddingBottom: 12
    }
})

export default function RecordScreen() {
    const user = useContext(UserContext);
    const record = useContext(RecordSymptomContext);
    const cameraRef = useRef<CameraCaptureRef>(null);
    
      const [photoUri, setPhotoUri] = useState<string | null>(null);
    
      const handleTakePhoto = async () => {
        const uri = await cameraRef.current?.takePhoto();
    
        if (!uri) {
          return;
        }
    
        console.log("촬영 완료:", uri);
    
        setPhotoUri(uri);
        user?.recordSymptom.setImgURI(uri); user?.recordSymptom.setIsCompleted(true);
        record?.setImgURI(uri); record?.setIsCompleted(true);
      };
    return (
        <>
            <View style={{paddingVertical: 20}}>
                <HeaderNavigation title="증상 기록" key={0} />
            </View>
            <ScrollView>
            <View style={ Styles.container }>
                <Text
                    style={ Typography.title.default }
                >3일 뒤에 비교해 보시라고{'\n'}지금 한 장 남겨둘게요.</Text>
                {/** 개발 필요 */}
                <View style={{ gap: 8 }}>
                    <View style={Styles.cameraContainer}>
                        <CameraCapture ref={cameraRef} borderRadius={8} facing="front" />
                        <View style={Styles.overlay}>
                            <GuideLine />
                            <Text
                                style={[Typography.text.default, {color: Colors.text.secondary, textAlign: 'center'}]}
                            >원 안에 얼굴을 맞춰주세요.</Text>
                        </View>
                    </View>
                    <View style={Styles.caption}>
                        <Text
                            style={ [Typography.secondary.default, { color: Colors.text.secondary }] }
                        >사진은 휴대폰 안에만 보관됩니다.{'\n'}분석할 때만 잠시 보냈다가 곧바로 지웁니다.</Text>
                    </View>
                </View>
            </View>
            </ScrollView>

            <View>
                <View style={{ marginTop: 8 }}>
                    <ActionButton
                        text="촬영하기"
                        route={'/record/loading'}
                        onPress={handleTakePhoto}
                    />
                </View>
                <View style={Styles.buttonContainer}>
                    <SkipButton
                        text="건너뛰기"
                        route={'/record/loading'}
                        onPress={()=> {
                            user?.recordSymptom.setIsCompleted(true);
                            record?.setIsCompleted(true)
                        }}
                    />
                </View>
            </View>
        </>
    )
}