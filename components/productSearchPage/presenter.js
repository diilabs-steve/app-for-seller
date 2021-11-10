import React from 'react';
import { Text } from "react-native";
import { STEP_NAVIGATE_ENUM } from '../../navigationVar';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationOptions } from '../common/commonVar/navigationOption';
import ProductInfo from './step2';
import ProductScanInput from './step1';


const Presenter = () => {

    const Stack = createStackNavigator();
    const options = {
        headerTitleAlign: "center",
        headerStyle: {
            // backgroundColor: COMMON_COLOR_ENUM.BLUE,
        },
        animationEnabled: false
        // headerTintColor: '#ffffff',
    }
    return (
        <>
        <Stack.Navigator>
            <Stack.Screen name={STEP_NAVIGATE_ENUM.STEP1} component={ProductScanInput} options={Object.assign({ headerTitle: "제품조회" }, navigationOptions)} />
            <Stack.Screen name={STEP_NAVIGATE_ENUM.STEP2} component={ProductInfo} options={Object.assign({ headerTitle: "제품조회 상세" }, navigationOptions)} />
            {/* <Stack.Screen name={STEP_NAVIGATE_ENUM.STEP2} component={Step2} options={options} />
            <Stack.Screen name={STEP_NAVIGATE_ENUM.STEP3} component={Step3} options={options} />
            <Stack.Screen name={STEP_NAVIGATE_ENUM.STEP4} component={Step4} options={options} />
            <Stack.Screen name={STEP_NAVIGATE_ENUM.STEP5} component={Step5} options={options} /> */}
        </Stack.Navigator>
        </>
    );
};

export default Presenter;