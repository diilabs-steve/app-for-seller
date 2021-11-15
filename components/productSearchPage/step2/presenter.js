import React from 'react';
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { COMMON_COLOR_ENUM } from '../../common/enum/commonColorEnum';
import { COMMON_PAGE_PADDING, COMMON_SMALL_FONT_SIZE } from '../../common/enum/commonStyleEnum';
import ScanInput from '../../common/scanInput';
import CustomContainer from '../../common/util/customContainer';
import ImageButton from '../../common/util/imageButton';
import LeftTitleContent from '../../common/util/leftTitleContent';
import Title from '../../common/util/title';

const Presenter = (props) => {
    const {
        navigation,
        modelObj,
        modelInfo = [],
        imgInfo = [],
        productProperty = [],
        largeGrpObj,
        midGrpObj,
        smallGrpObj,
        productObj,
        modelListObj
    } = props;
    return (
        <>
        <ScrollView>
            <CustomContainer style={styles.container}>
                <View style={{height: "100%", paddingBottom: 500}}>
                    <Title>
                        {productObj.productName}
                    </Title>
                    <Text style={{ fontSize: COMMON_SMALL_FONT_SIZE, marginTop: 10 }}>
                        {productObj.productSeq}
                    </Text>
                    <View style={{ padding: 10 }}>
                        {modelInfo.map((info = {}, idx) => 
                            <LeftTitleContent title={info.title} content={info.content} key={`m-info-${idx}`} />
                        )}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 25, height: 100 }}>
                        {imgInfo.map((info = {}, idx) => 
                            <ImageButton
                                title={info.title}
                                state={info.state}
                                setState={info.setState}
                                onPicture={info.onPicture}
                                displayMode={info.displayMode}
                            />
                        )}
                    </View>
                    <View style={{ padding: 10, marginTop: 60 }}>
                        <Title>
                            구성항목
                        </Title>
                        {productObj?.productModels?.map((info = {}, idx) => 
                            <ModelItem modelListObj={modelListObj} info={info} style={{}} />
                        )}
                    </View>
                </View>
            </CustomContainer>
        </ScrollView>
        
        </>
    );
};

const ModelItem = (props) => {

    const {
        style = {},
        info = {},
        modelListObj = {},
    } = props;

    console.log('info=>', info, modelListObj)

    return (
        <>
        <View style={[styles.modelItem, style]}>
            {info.masterFlag && <MasterMark />}
            <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 10 }}>
                <Text style={{ fontSize: COMMON_SMALL_FONT_SIZE }}> {info.model}</Text>
                <Text style={{ fontSize: COMMON_SMALL_FONT_SIZE, color: COMMON_COLOR_ENUM.DARK_GRAY }}>{info.modelSeq}</Text>
            </View>
            <Text>{modelListObj[info.modelSeq]}</Text>
        </View>
        </>
    )
}

const MasterMark = () => {
    return (
        <View style={styles.marker}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
                M
            </Text>
        </View>
    )
}

export default Presenter;

const styles = StyleSheet.create({
    container: {
        padding: COMMON_PAGE_PADDING
    },
    modelItem: {
        position: "relative",
        borderBottomWidth: 1, 
        borderBottomColor: COMMON_COLOR_ENUM.GRAY, 
        paddingVertical: 15, 
        paddingHorizontal: 30
    },
    marker: { 
        position: "absolute", 
        top: 17, 
        backgroundColor: "#5759E3", 
        width: 25, 
        height: 25, 
        justifyContent: "center", 
        alignItems: "center", 
        borderRadius: 40 
    }
});