import React from 'react';
import { StyleSheet, ScrollView, View, Text } from "react-native";
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
        smallGrpObj
    } = props;
    return (
        <>
        <ScrollView>
            <CustomContainer style={styles.container}>
                <View style={{height: "100%", paddingBottom: 500}}>
                    <Title>
                        {modelObj.model}
                    </Title>
                    <Text style={{ fontSize: COMMON_SMALL_FONT_SIZE, marginTop: 10 }}>
                        {modelObj.modelName}
                    </Text>
                    <View style={{ padding: 10, backgroundColor: "#F4F6F9", borderRadius: 30, width: 220, justifyContent: "center", marginTop: 20 }}>
                        <Text style={{ textAlign: "center" }}>
                            {`${largeGrpObj[modelObj.modelGroupLarge]} > ${midGrpObj[modelObj.modelGroupMedium]} > ${smallGrpObj[modelObj.modelGroupSmall]}`}
                        </Text>
                    </View>
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
                            제품속성
                        </Title>
                        {productProperty.map((info = {}, idx) => 
                            <LeftTitleContent title={info.title} content={info.content} key={`m-info-${idx}`} />
                        )}
                    </View>
                </View>
            </CustomContainer>
        </ScrollView>
        
        </>
    );
};

export default Presenter;

const styles = StyleSheet.create({
    container: {
        padding: COMMON_PAGE_PADDING
    }
});