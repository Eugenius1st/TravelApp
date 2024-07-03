import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { theme } from '../Palette';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
// import AntDesign from '@expo/vector-icons/AntDesign';

import { Feather } from '@expo/vector-icons';
const Contents = ({ tab, toDos, editingId, doneToDos, deleteTodo, setEditingId, setToDos, saveToDos }) => {
    const [curInputValue, setCurInputValue] = useState('');
    const handleChoose = (id, text) => {
        setEditingId(id);
        setCurInputValue(text);
    };
    const handleCurContents = (payload) => {
        setCurInputValue(payload);
    };
    const saveEdittedContents = async (key) => {
        if (!curInputValue) alert('텍스트를 입력하세요');
        else if (!editingId) alert('수정될 텍스트를 선택하세요');
        else {
            const newToDos = Object.assign({}, toDos, {
                [key]: { text: curInputValue, type: tab, done: toDos[key].done },
            });
            await setToDos(newToDos);
            await saveToDos(newToDos);
            setCurInputValue('');
            setEditingId(null);
        }
    };
    return (
        <ScrollView>
            {Object.keys(toDos).map(
                (key) =>
                    toDos[key].type === tab && (
                        <View
                            key={key}
                            style={key === editingId ? styles.edittedContentWrapper : styles.contentWrapper}
                        >
                            <View style={styles.checkTextWrapper}>
                                <TouchableOpacity
                                    key={key}
                                    onPress={() => doneToDos(key)}
                                >
                                    {toDos[key].done ? (
                                        <FontAwesome
                                            name="check-square-o"
                                            size={24}
                                            color="gray"
                                        />
                                    ) : (
                                        <Feather
                                            name="square"
                                            size={24}
                                            color="gray"
                                        />
                                    )}
                                </TouchableOpacity>

                                {key === editingId ? (
                                    <TextInput
                                        onSubmitEditing={() => saveEdittedContents(key)}
                                        style={toDos[key].done ? styles.doneText : styles.inputText}
                                        value={curInputValue}
                                        onChangeText={handleCurContents}
                                        keyboardType="default"
                                        returnKeyType="Edit"
                                    />
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => handleChoose(key, toDos[key].text)}
                                        style={toDos[key].done ? styles.doneTextWrapper : styles.contentTextWrapper}
                                    >
                                        <Text style={toDos[key].done ? styles.doneText : styles.contentText}>
                                            {toDos[key].text}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={styles.checkHandleIconWrapper}>
                                <TouchableOpacity onPress={() => deleteTodo(key)}>
                                    {/* onPress = onPressIn + onPressOut */}
                                    <FontAwesome
                                        name="trash"
                                        size={18}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentWrapper: {
        backgroundColor: theme.todoBg,
        marginTop: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    edittedContentWrapper: {
        marginLeft: 10,
        color: 'white',
        backgroundColor: 'white',
        marginTop: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },

    checkTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '93%',
        height: 45, // Here we set the height to 400px
    },
    contentTextWrapper: {
        width: '90%',
        color: 'white',
    },
    contentText: {
        marginLeft: 10,
        paddingVertical: 10,
        width: '90%',
        color: 'white',
    },
    doneTextWrapper: {},
    doneText: {
        color: 'gray',
        marginLeft: 10,
        textDecorationLine: 'line-through',
    },

    inputText: {
        marginLeft: 10,
        width: '90%',
        paddingVertical: 10,
    },
    checkHandleIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Contents;
