import React from 'react';
import { Animated, StyleSheet, View } from "react-native";
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';

const ProgressBar = (props) => {

    const {
        number = 0
    } = props;

    const [fill, setFill] = React.useState(new Animated.Value(0.01));

    // const fill = new Animated.Value(0);


    // React.useEffect(() => {

    //     Animated.timing(
    //     fill,
    //         {
    //         toValue: 80,
    //         delay: 1000
    //         }
    //     ).start();
    //         console.log("fill===>",typeof fill, typeof fill.__getValue())
    // }, [])

    return (
        <View style={styles.progressbar}>
            <View style={[styles.number, { width: `${number}%` }]} />
        </View>
    );
};

export default ProgressBar;

const styles = StyleSheet.create({
    progressbar: {
        height: 6,
        width: "100%",
        backgroundColor: COMMON_COLOR_ENUM.LIGHT_BLUE,
        borderRadius: 10,
        overflow: "hidden"
    },
    number: {
        height: 6,
        backgroundColor: COMMON_COLOR_ENUM.MIDDLE_BLUE,
        borderRadius: 10
    }
});