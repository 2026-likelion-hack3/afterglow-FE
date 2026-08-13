import { router } from 'expo-router';
import PreviousIcon from '@/assets/icons/previous.svg';
import { Pressable, StyleSheet } from 'react-native';

type PreviousButtonProps = {
    route: string
}

const Styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

/**
 * 이전 버튼 컴포넌트
 * @param route 경로
 */
export default function PreviousButton({ route }: PreviousButtonProps) {
    return (
        <Pressable
            onPress={() => router.push(route)}
            style={ Styles.button }
        >
            <PreviousIcon width={9} height={18}></PreviousIcon>
        </Pressable>
    )
}