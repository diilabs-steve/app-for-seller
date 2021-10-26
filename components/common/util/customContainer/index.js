import React from 'react';
import { ImageBackground, TouchableWithoutFeedback, StyleSheet, Keyboard, View } from 'react-native';
import TrialImg from "../../../../assets/global/trial.png";
import { getStorage } from '../../../../functions/storageFunc';


const CustomContainer = (props) => {
    const {
        style = {},
        children
    } = props;

    const [source, setSource] = React.useState(null);

    React.useEffect(() => {
        checkIsTrial();
    }, [])

    const checkIsTrial = async () => {
        const HOST = await getStorage("host");

        if (HOST.includes("trial")) {
            setSource(TrialImg);
        } else {
            setSource(null);
        }
    }

    return (
    
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
    }}>
        <View source={source}  style={[styles.defaultStyle, style]}>
            {children}
        </View>
    </TouchableWithoutFeedback>
    );
};

export default CustomContainer;

const styles = StyleSheet.create({
    defaultStyle: { backgroundColor: "white" }
})