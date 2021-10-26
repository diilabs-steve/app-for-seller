import React, { useRef } from "react";
import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { COMMON_COLOR_ENUM } from "../../enum/commonColorEnum";
import { base64UploadCall } from "../../../../functions/s3ImageUploadFunc";
import AlertModal from "../alertModal";



const SignatureComponent = (props) => {

    const { style = {}, onSignatureSuccess, setState, state, setScrollActive, placeholder } = props

    const ref = useRef();
    const [placeholderVisible, setPlaceholderVisible] = React.useState(true);

    const handleSignature = async signature => {
      console.log(signature);
      const url = await base64UploadCall(signature)
      if (url) {
          setState(url);
          onSignatureSuccess && onSignatureSuccess(url);
      }
      setScrollActive && setScrollActive(true);
    //   onOK(signature);
    };
  
    const handleEmpty = () => {
      console.log('Empty');
    }
  
    const handleClear = () => {
      console.log('clear success!');
    }
  
    const handleEnd = () => {
        ref.current.readSignature();
        
    }
    const handleBegin = () => {
        setScrollActive && setScrollActive(false);
        setPlaceholderVisible(false);
    }

    const webstyle = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
      display: none;
    }
    `;
  
    React.useEffect(() => {
        if (state) {
            setPlaceholderVisible(false)
        }
    })


    const DisplayImage = () => {
        return (
            <>
            <TouchableOpacity 
            onPress={() => {
                setState();
                setPlaceholderVisible(true);
            }}
            style={{ position: "absolute", zIndex: 80, right: 25, top: 20 }}>
                <Text style={{ color: COMMON_COLOR_ENUM.PRIMARY, textDecorationLine: "underline", fontWeight: "500", fontSize: 16 }}>
                    다시서명
                </Text>
                {/* <Image  
                    style={{ width: 20, height: 20, resizeMode: "stretch", right: 10 }}
                    source={BackImg} 
                /> */}
            </TouchableOpacity>
            <Image  
                style={{ width: "100%", height: "100%", borderRadius: 10, resizeMode: "stretch" }}
                source={{
                    uri: state,
                    headers: {
                      Accept: '*/*',
                    }
                }}
            />
            </>
        )
    }


    return (
    <>
    <View style={[{ width: "100%", height: 260, overflow: "hidden", marginTop: 10, marginLeft: -3 }, style]}>
        {state ?
            <DisplayImage />
            :
            <SignatureScreen
                ref={ref}
                backgroundColor={COMMON_COLOR_ENUM.MIDDLE_LIGHT_GRAY}
                onEnd={handleEnd}
                onOK={handleSignature}
                onBegin={handleBegin}
                onEmpty={handleEmpty}
                onClear={handleClear}
                autoClear={true}
                descriptionText={""}
                // webStyle={webstyle}
                style={{ borderRadius: 10}}
                backgroundColor="#F4F6F9"
            />
        }
        {placeholderVisible &&
        <View style={{ zIndex: 90,  position: "absolute", top: "10%", marginLeft: "10%" }}>
            <Text style={{ fontSize: 20, fontWeight: "400", color: COMMON_COLOR_ENUM.MIDDLE_GRAY }}>
                {placeholder}
            </Text>
        </View>}
    </View>
    </>
    );
}

export default SignatureComponent;