import { StyleSheet, View } from 'react-native';

const Divider = () => {
    return <View style={styles.dividerWrapper}></View>;
};
const styles = StyleSheet.create({
    dividerWrapper: {
        height: 10,
    },
});

export default Divider;
