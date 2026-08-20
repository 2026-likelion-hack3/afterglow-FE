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
import { ScanContext } from "@/src/contexts/ScanContext";
import { extractOcrText, structureOcrText } from "@/src/api/vanity";
import { router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";
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
    useEffect(()=>{
        scan?.setBackImageUri(null);
        scan?.setBrandName(null);
        scan?.setFeatureTags(null);
        scan?.setFrontImageUri(null);
        scan?.setIngredients(null);
        scan?.setProductName('');
        scan?.setSkincareFunction(null);
        scan?.setopenedDate('');
        scan?.setusingTime('');
        scan?.setRegistrationResult(null);
    }, [])
    const scan = useContext(ScanContext);
    const cameraRef = useRef<CameraCaptureRef>(null);

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  // OCR + 구조화 API 호출 중인지 여부. ActionButton의 onPress는 await 되지 않고
  // route prop이 곧바로 push 되는 구조라, 여기서는 route prop을 쓰지 않고
  // API 성공 시에만 수동으로 router.push 한다.
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTakePhoto = async () => {
    const uri = await cameraRef.current?.takePhoto();

    if (!uri) {
      return;
    }

    console.log("촬영 완료:", uri);

    setPhotoUri(uri);
    scan?.setFrontImageUri(uri);

    setIsProcessing(true);
    try {
      const { rawText } = await extractOcrText(uri);
      const structured = await structureOcrText(rawText);

      // 구조화 API 응답을 기존 Context 필드에 매핑.
      // (필드명 매핑 근거는 ScanContext.tsx 주석 참고)
      scan?.setBrandName(structured.brand);
      scan?.setProductName(structured.name);
      scan?.setSkincareFunction(structured.type);
      scan?.setIngredients(
        structured.keyIngredients
          ? structured.keyIngredients.split(',').map((item) => item.trim()).filter(Boolean)
          : []
      );
      scan?.setFeatureTags(structured.interactionTags ?? []);

      router.push('/scan/recognision');
    } catch (error) {
      console.error('OCR/구조화 실패:', error);
      // TODO: 프로젝트 내에 OCR 실패 전용 화면(예: /scan/fallback)이 있다면
      // 그쪽으로 안내하는 것이 더 나을 수 있음. 다만 ingredients.tsx에서 쓰이는
      // '/scan/fallback' 라우트가 정확히 어떤 용도인지(에러 화면인지, 후속 스텝인지)
      // 확인되지 않아, 우선은 사용자가 재촬영하거나 "직접 입력하기"를 선택할 수
      // 있도록 현재 화면에 머무르게 처리함.
      Alert.alert(
        '인식에 실패했어요',
        '다시 촬영하시거나 아래에서 직접 입력해주세요.'
      );
    } finally {
      setIsProcessing(false);
    }
  };
    return (
        <>
            <View style={{paddingVertical: 20}}>
                <HeaderNavigation title="제품 등록" />
            </View>

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
                <ActionButton
                    text={isProcessing ? "인식하는 중..." : "촬영"}
                    onPress={handleTakePhoto}
                    disabled={isProcessing}
                />
                <SecondaryActionButton text="직접 입력하기" onPress={()=>{}} />
            </View>
        </>
    )
}