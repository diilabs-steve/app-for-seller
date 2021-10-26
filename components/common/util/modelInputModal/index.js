import React from 'react';
import { StyleSheet, View, Text, TextInput, Platform } from 'react-native';
import CommonModal from "../../../common/util/commonModal";
import Title from "../../../common/util/title";
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_FONT_SIZE } from "../../../common/enum/commonStyleEnum"
import { COMMON_COLOR_ENUM } from '../../../common/enum/commonColorEnum';
import CustomContainer from '../../../common/util/customContainer';

const ModelInputModal = (props) => {

    const {
        modelInfo = {},
        setModelInfo,
        quantity,
        setQuantity
    } = props;

    return (
        <CommonModal 
            {...props}
            disabled={!quantity}
        >
            <CustomContainer style={{ paddingHorizontal: 22 }}>
                <Title style={styles.title}>{modelInfo.model}</Title>
                <Title style={styles.subTitle}>{modelInfo.group1}</Title>
            </CustomContainer>

            <CustomContainer style={{ paddingHorizontal: 22, marginBottom: 40 }}>
                <View style={[{ flexDirection: "row" }, styles.line]}>
                    <Text style={[styles.defaultText, { color: COMMON_COLOR_ENUM.DARK_GRAY }]}>해당 모델의</Text>
                    <Text style={[styles.defaultText]}>{` 수량`}</Text>
                    <Text style={[styles.defaultText, { color: COMMON_COLOR_ENUM.DARK_GRAY }]}>을 입력해주세요.</Text>
                </View>
            <TextInput
                style={styles.input}
                onChangeText={(nextText) => {
                    console.log("???", modelInfo.quantity >= parseInt(nextText))
                    if (modelInfo.quantity >= parseInt(nextText) || !nextText) {
                        setModelInfo({
                            ...modelInfo,
                            setQuantity: parseInt(nextText)
                        })
                    }
                }}
                keyboardType="numeric"
                value={`${quantity || ""}`}
                placeholder={"모델수량"}
            />
            </CustomContainer>
        </CommonModal>
    );
};

export default ModelInputModal;

const styles = StyleSheet.create({
    title: {
        marginTop: 25
    },
    subTitle: {
        marginVertical: Platform.OS === "android" ? 4 : 8,
        fontSize: COMMON_FONT_SIZE,
        fontWeight: "500",
        color: COMMON_COLOR_ENUM.DARK_GRAY
    },
    line: {
        marginTop: 8
    },
    defaultText: {
        fontSize: 18
    },
    input: {
        marginTop: 30,
        marginBottom: 10,
        height: 70,
        padding: 10,
        borderBottomWidth: 3,
        borderBottomColor: COMMON_COLOR_ENUM.PRIMARY,
        width: "40%",
        alignSelf: "center",
        textAlign: "center",
        backgroundColor: "#ffffff",
        fontSize: 22.5,
    zIndex:0
  },
});