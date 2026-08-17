import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";

export type CameraCaptureRef = {
  takePhoto: () => Promise<string | null>;
};

const CameraCapture = forwardRef<CameraCaptureRef>((_, ref) => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  // 부모가 호출할 수 있는 메서드 공개
  useImperativeHandle(ref, () => ({
    takePhoto: async () => {
      if (!cameraRef.current) {
        return null;
      }

      const photo = await cameraRef.current.takePictureAsync();

      return photo?.uri ?? null;
    },
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
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
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