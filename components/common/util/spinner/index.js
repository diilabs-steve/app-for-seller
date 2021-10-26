import React from "react";
import { ActivityIndicator } from "react-native";
import { SPINNER_SIZE_ENUM } from "../../enum/spinnerEnum";

const SpinnerComponent = (props) => {

    const { color, size } = props;    

    return (
        <ActivityIndicator size={size ? size : SPINNER_SIZE_ENUM.LARGE} color={color ? color : "#0000ff" }/>
    )
}

export default SpinnerComponent;
