import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { Typography } from "../constants/typography";

type BigOptionButtonProps = {
    text: string,
    extent?: string,
    description?: string,
    onPress: () => void,
    isSelected: boolean
}

const Styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.border.default,
        borderRadius: 18,
        paddingVertical: 17.5,
        paddingHorizontal: 24,
        backgroundColor: Colors.background.card,
    },
    selected: {
        borderColor: Colors.accent.dark,
        backgroundColor: Colors.accent.default,
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default function BigOptionButton({ text, extent='', description='', onPress, isSelected }: BigOptionButtonProps) {
    return (
        <Pressable
            onPress={ onPress }
            style={ [Styles.button, isSelected && Styles.selected] }
        >
            <Text style={ isSelected ? Typography.button.accent : Typography.button.big }>{ text }</Text>
            <View>
                {extent && (<Text style={ Typography.text.accent }>{ extent }</Text>)}
                {description && (<Text style={ Typography.secondary.default }>{ description }</Text>)}
            </View>
        </Pressable>
    )
}