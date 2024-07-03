import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Pressable,
    TextInput,
} from 'react-native';
import { useState } from 'react';

const TextInputs = ({ tab, text, setText, submitToDo }) => {
    const onChangeText = (payload) => setText(payload);

    return (
        <View>
            <TextInput
                value={text}
                onSubmitEditing={submitToDo}
                onChangeText={onChangeText}
                style={styles.input}
                placeholder={tab === 'work' ? 'Add a to do' : 'Where do you want to go'}
                keyboardType="default"
                returnKeyType="Done"
                autoCorrect
                autoCapitalize="sentences"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginTop: 20,
        marginHorizontal: 10,
        fontSize: 15,
    },
});

export default TextInputs;
