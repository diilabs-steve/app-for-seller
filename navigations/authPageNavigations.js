import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { AUTH_NAVIGATE_ENUM } from "../navigationVar";
import { COMMON_COLOR_ENUM } from "../components/common/enum/commonColorEnum";
import SignInPage from "../components/auth/signInPage";
import SignUpPage from "../components/auth/signUpPage";


const AuthPageNavigations = (props) => {

    const { ctx } = props;

    const Stack = createStackNavigator();

    const options = {
        headerTitleAlign: "center",
        headerStyle: {
            backgroundColor: COMMON_COLOR_ENUM.BLUE,
        },
        headerTintColor: '#ffffff',
    }

    //name하고 title을 분리하자
    return (
        <Stack.Navigator>
            <Stack.Screen name={AUTH_NAVIGATE_ENUM.SIGNIN} title="로그인" component={SignInPage} initialParams={{ ctx }} options={{ headerShown: false }} />
            <Stack.Screen name={AUTH_NAVIGATE_ENUM.SIGNUP} title="회원가입" component={SignUpPage} initialParams={{ ctx }} options={options} />
            {/* <Stack.Screen name={AUTH_NAVIGATE_ENUM.SIGNUP_SUCCESS} title="회원가입" component={SignUpSuccessPage} initialParams={{ ctx }} options={options} />
            <Stack.Screen name={AUTH_NAVIGATE_ENUM.TRIAL_SIGNIN} title="트라이얼 로그인" component={TrialSignInPage} initialParams={{ ctx }} options={options} /> */}
        </Stack.Navigator>
    )
}

export default AuthPageNavigations;