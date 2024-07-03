import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './components/Header';
import TextInputs from './components/TextInputs';
import Contntents from './components/Contents';
import Divider from './components/Divider';

const STORAGE_TODO_KEY = '@ToDos';
const STORAGE_TAB_KEY = '@Tab';
export default function App() {
    const [tab, setTab] = useState('work');
    const [text, setText] = useState('');
    const [toDos, setToDos] = useState({});

    useEffect(() => {
        loadStorageData();
    }, []);
    /******************** TAB **********************/
    const handleTab = (tab) => {
        setTab(tab);
        try {
            AsyncStorage.setItem(STORAGE_TAB_KEY, tab);
        } catch (err) {
            console.log(err);
        }
    };
    /******************** TODOS **********************/
    const loadStorageData = async () => {
        try {
            const todos = await AsyncStorage.getItem(STORAGE_TODO_KEY);
            const tab = await AsyncStorage.getItem(STORAGE_TAB_KEY);
            setToDos(JSON.parse(todos));
            setTab(tab);
        } catch (e) {
            console.log(e);
        }
    };

    const doneToDos = (id) => {
        const newTodos = { ...toDos };
        newTodos[id].done = !newTodos[id].done;
        setToDos(newTodos);
    };

    const saveToDos = async (toSave) => {
        try {
            await AsyncStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(toSave));
        } catch (err) {
            console.log(err);
        }
    };
    const submitToDo = () => {
        if (!text) alert('텍스트를 입력하세요');
        else {
            const newToDos = Object.assign({}, toDos, { [Date.now()]: { text, type: tab, done: false } });
            setToDos(newToDos);
            saveToDos(newToDos);
            setText('');
        }
    };
    const [editingId, setEditingId] = useState(null);
    const deleteTodo = (id) => {
        Alert.alert('Delete To Do', 'Are you Sure?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    const newToDos = { ...toDos };
                    delete newToDos[id];
                    setToDos(newToDos);
                    saveToDos(newToDos);
                },
            },
        ]);
    };
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Header
                tab={tab}
                handleTab={handleTab}
            />
            <TextInputs
                tab={tab}
                text={text}
                setText={setText}
                submitToDo={submitToDo}
            />
            <Divider />
            <Contntents
                tab={tab}
                toDos={toDos}
                editingId={editingId}
                doneToDos={doneToDos}
                deleteTodo={deleteTodo}
                setEditingId={setEditingId}
                setToDos={setToDos}
                saveToDos={saveToDos}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});
