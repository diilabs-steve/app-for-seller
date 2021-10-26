import axios from "axios";
import React from "react";
import { API_AUTH, HOST } from "../../../envVars";
import { Base64 } from 'js-base64';
import Presenter from "./presenter";
import { getStorage, getUserToken, setStorage, setUserToken } from "../../../functions/storageFunc";
import SpinnerComponent from "../../common/util/spinner";
import { postSignin } from "../../common/function/restApi";

const Container = (props) => {

    /**
     * props
     */
    const { route = {}, navigation } = props;
    const { params = {} } = route;
    const { ctx } = params;

    /**
     * constant
     */
    const { signIn } = React.useContext(ctx);
  
    /**
     * state
     */
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);



    /**
     * handler
     */
    const handleSignIn = async (host = "") => {
        setLoading(true);
        const rs = await postSignin(host, username.trim(), password) || {};

        if (rs.status) {
            setStorage("host", host);
            signIn({ username, password })
            setLoading(false);
        } else {
            setLoading(false);
        }

    }

    const checkUserTokenExist = async () => {
        const token = await getUserToken();

        console.log("체크???", token)

        if (token) {
            setUserToken(token);
            // signIn({ username, password })
        }

    }

    React.useEffect(() => {
        checkUserTokenExist();
    }, [])


    return (
        <>
        {loading ?
        <SpinnerComponent />
        :
        <Presenter 
            {...props}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSignIn={handleSignIn}
            alertVisible={alertVisible}
            setAlertVisible={setAlertVisible}
            alertMessage={alertMessage}
        />}
        </>
    )
}

export default Container;