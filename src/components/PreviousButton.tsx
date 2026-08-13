import { router } from 'expo-router';
import PreviousIcon from '@/assets/icons/previous.svg';
import { Pressable } from 'react-native';

type PreviousButtonProps = {
    route: string
}

/**
 * 이전 버튼 컴포넌트
 * @param route 경로
 */
export default function PreviousButton({ route }: PreviousButtonProps) {
    return (
        <Pressable
            onPress={() => router.push(route)}
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <PreviousIcon width={9} height={18}></PreviousIcon>
        </Pressable>
    )
}