/**
 * 기록 조회 화면
 * 디자인 없어서 개발용으로 바로가기 추가
 */

import ActionButton from "@/src/components/ActionButton";
import { ScrollView, View } from "react-native";

export default function LogScreen() {
    return (
        <ScrollView>
            <View style={{gap: 4}}>
            <ActionButton text="온보딩 1 - 시작 화면" route={'/onboarding'} />
            <ActionButton text="온보딩 2 - 나이 선택" route={'/onboarding/age'} />
            <ActionButton text="온보딩 3 - 월경 정보 선택" route={'/onboarding/period'} />
            <ActionButton text="증상기록 1 - 증상 선택" route={'/record'} />
            <ActionButton text="증상기록 2 - 경과 선택" route={'/record/duration'} />
            <ActionButton text="증상기록 3 - 부위 선택" route={'/record/part'} />
            <ActionButton text="증상기록 4 - 최근 제품 입력" route={'/record/recent'} />
            <ActionButton text="증상기록 5 - 사진 촬영" route={'/record/camera'} />
            <ActionButton text="증상기록 로딩" route={'/record/loading'} />
            <ActionButton text="결과 1 - 글" route={'/result'} />
            <ActionButton text="결과 2 - 루틴 추천" route={'/result/routine'} />
            <ActionButton text="결과 3 - 제품 제안" route={'/result/daily'} />
            <ActionButton text="화장품 등록 1 - 정면 촬영" route={'/scan'} />
            <ActionButton text="화장품 등록 2 - 정보 확인" route={'/scan/recognision'} />
            <ActionButton text="화장품 등록 3 - 후면 촬영" route={'/scan/ingredients'} />
            <ActionButton text="화장품 등록 4 - 실패" route={'/scan/fail'} />
            <ActionButton text="화장품 등록 5 - 성분 검출 실패" route={'/scan/fallback'} />
            <ActionButton text="화장품 등록 6 - 성분 확인" route={'/scan/confirm'} />
            <ActionButton text="화장품 등록 7 - 정보 입력" route={'/scan/info'} />
            <ActionButton text="화장품 등록 8 - 완료 화면" route={'/scan/complete'} />
            <ActionButton text="일일 체크" route={'/daily/check'} />
            </View>
        </ScrollView>
    )
}