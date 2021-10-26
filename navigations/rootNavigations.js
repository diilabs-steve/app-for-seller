import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MainPageNavigations from "./mainPageNavigations";
import { COMMON_NAVIGATE_ENUM } from "../navigationVar";
import BarcodeScanPage from "../components/common/barcodeScanPage";
import { TouchableOpacity, Image, View } from "react-native";
import CloseImg from "../assets/modal/close_popup.png"


const RootNavigations = (props) => {

    const { ctx } = props;


    const Stack = createStackNavigator();

    
        const modalOption = (props) =>
        ( 
            { 
                headerTitleAlign: "center",
                headerTintColor: '#ffffff',
                headerRight: () => (
                    <CloseBtn {...props}/>
                    ) ,
                headerLeft: () => null,
                animationEnabled: false
            }
        )

    //name하고 title을 분리하자
    return (
        <Stack.Navigator screenOptions={{ animationEnabled: true }} mode="modal">
            <Stack.Screen name={"root"} component={MainPageNavigations} initialParams={{ ctx }} options={{ headerShown: false }} />
            <Stack.Screen name={COMMON_NAVIGATE_ENUM.BARCODE_SCANNER} component={BarcodeScanPage} initialParams={{ ctx }} options={modalOption} />
        </Stack.Navigator>
    )
}

export default RootNavigations;

    const CloseBtn = (props) => {

        const {
            navigation
        } = props

        return (
            <View style={{ flexDirection: "row-reverse" }}>
                <TouchableOpacity onPress={() => { navigation.goBack()}} style={{ marginRight: 20 }}>
                    <Image source={CloseImg} style={{ width: 22, height: 22, resizeMode: "stretch" }} />
                </TouchableOpacity>
            </View>
        )
    }