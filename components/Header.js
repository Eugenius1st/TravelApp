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
import { theme } from '../Palette';

const Header = ({ tab, handleTab }) => {
    const work = () => handleTab('work');
    const travel = () => handleTab('travel');

    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={work}
                activeOpacity={0}
            >
                <Text style={{ ...styles.btnText, color: tab === 'work' ? 'white' : theme.gray }}>Work</Text>
            </TouchableOpacity>
            <Pressable onPress={travel}>
                <Text style={{ ...styles.btnText, color: tab === 'travel' ? 'white' : theme.gray }}>Travel</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnText: { color: 'white', fontSize: 24, fontWeight: '600' },
});

export default Header;
