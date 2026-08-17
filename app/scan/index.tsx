/**
 * 제품 스캔 화면
 */

import ActionButton from "@/src/components/ActionButton";
import CameraCapture, {
  CameraCaptureRef,
} from "@/src/components/CameraCapture";

import HeaderNavigation from "@/src/components/HeaderNavigation";
import SecondaryActionButton from "@/src/components/SecondaryActionButton";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        marginBottom: 16
    },
    cameraContainer: {
        height: 230,
        borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.sand[400], borderRadius: 20,
        backgroundColor: Colors.background.subtle
    },
    card: {
        gap: 8,
        borderStyle: 'solid', borderWidth: 1, borderColor: Colors.border.defaultLight, borderRadius: 16,
        backgroundColor: Colors.background.card,
        padding: 20
    },
    buttonContainer: {
        marginBottom: 14,
        marginTop: 8,
        gap: 12
    }
})

export default function ScanScreen() {
    const cameraRef = useRef<CameraCaptureRef>(null);

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleTakePhoto = async () => {
    const uri = await cameraRef.current?.takePhoto();

    if (!uri) {
      return;
    }

    console.log("촬영 완료:", uri);

    setPhotoUri(uri);
  };
    return (
        <>
            <HeaderNavigation title="제품 등록" />

            <ScrollView>
            <View style={ Styles.container }>
                <View style={{ gap: 8 }}>
                    <Text
                        style={Typography.title.big}
                    >제품 앞면이 보이게{'\n'}찍어주세요</Text>
                    <Text
                        style={[Typography.secondary.default, {color: Colors.text.secondary}]}
                    >이름과 브랜드를 읽어올게요</Text>
                </View>
                {/* 카메라 - 개발 필요 */}
                <View style={Styles.cameraContainer}>
                    <CameraCapture ref={cameraRef} />
                </View>
                <View style={Styles.card}>
                    <Text
                        style={[Typography.text.accent]}
                    >글씨가 안 읽히나요?</Text>
                    <Text
                        style={[Typography.secondary.small, {color: Colors.text.secondary}]}
                    >밝은 곳에서 다시 찍거나, 아래에서 이름을 직접 적으셔도 됩니다.</Text>
                </View>
            </View>
            </ScrollView>

            <View style={Styles.buttonContainer}>
                <ActionButton text="촬영" route={'/scan/recognision'} onPress={handleTakePhoto}/>
                <SecondaryActionButton text="직접 입력하기" onPress={()=>{}} />
            </View>
        </>
    )
}