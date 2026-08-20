import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

export type CameraCaptureRef = {
  takePhoto: () => Promise<string | null>;
  isReady: () => boolean;
};

type CameraCaptureProps = {
  facing?: "front" | "back";
  borderRadius?: number
};

const CameraCapture = forwardRef<CameraCaptureRef, CameraCaptureProps>(({ facing = "back", borderRadius = 20 }, ref) => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);

  // 부모가 호출할 수 있는 메서드 공개
  useImperativeHandle(ref, () => ({
    takePhoto: async () => {
      if (!cameraRef.current || !isCameraReady) {
        console.warn("[CameraCapture] 카메라가 아직 준비되지 않았습니다.");
        return null;
      }

      const photo = await cameraRef.current.takePictureAsync();

      return photo?.uri ?? null;
    },
    isReady: () => !!cameraRef.current && isCameraReady,
  }));

  // 아직 권한 상태를 가져오는 중
  if (!permission) {
    return null;
  }

  // 권한이 없으면 자동으로 요청
  if (!permission.granted) {
    requestPermission();
    return null;
  }

  return (
    <View style={{
      flex: 1,
      borderRadius,
    }}>
      <CameraView
        ref={cameraRef}
        style={{
          flex: 1,
          borderRadius,
        }}
        facing={facing}
        onCameraReady={() => setIsCameraReady(true)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
  },

  camera: {
    flex: 1,
    borderRadius: 20,
  },
});

export default CameraCapture;