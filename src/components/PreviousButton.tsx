import { Href, router } from 'expo-router';
import PreviousIcon from '@/assets/icons/previous.svg';
import { Pressable, StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

/**
 * 이전 버튼 컴포넌트
 */
export default function PreviousButton() {
    return (
        <Pressable
            onPress={() => router.back()}
            style={ Styles.button }
        >
            <PreviousIcon width={9} height={18}></PreviousIcon>
        </Pressable>
    )
}