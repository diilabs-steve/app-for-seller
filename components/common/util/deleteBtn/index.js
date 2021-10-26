import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import TrashcanImg from "../../../../assets/button/trashcan.png";

const DeleteBtn = (props) => {

    const {
        title,
        onPress = () => {},
        style = {}
    } = props;

    return (
        <TouchableOpacity 
            style={[{ flexDirection: "row", justifyContent: "center", alignItems: "center" }, style]}
            onPress={onPress}    
        >
            <Image source={TrashcanImg} style={{ width: 10, height: 15, resizeMode: "stretch", marginRight: 5 }} />
            <Text>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default DeleteBtn;