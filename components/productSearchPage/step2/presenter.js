import React from 'react';
import { StyleSheet, ScrollView, View } from "react-native";
import { COMMON_PAGE_PADDING } from '../../common/enum/commonStyleEnum';
import ScanInput from '../../common/scanInput';
import CustomContainer from '../../common/util/customContainer';
import ImageButton from '../../common/util/imageButton';
import LeftTitleContent from '../../common/util/leftTitleContent';
import Title from '../../common/util/title';

const Presenter = (props) => {
    const {
        navigation,
        handleNextStep,
        modelInfo = [],
        imgInfo = [],
        productProperty = []
    } = props;
    return (
        <>
        <ScrollView>
            <CustomContainer style={styles.container}>
                <Title>
                    제품정보
                </Title>
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
            </CustomContainer>
            <CustomContainer style={[styles.container, { marginTop: 10 }]}>
                <Title>
                    제품속성
                </Title>
                <View style={{ padding: 10 }}>
                    {productProperty.map((info = {}, idx) => 
                        <LeftTitleContent 
                            title={info.title} 
                            content={info.content} 
                            containerStyle={{ marginTop: 17 }}
                            key={`m-info-${idx}`} 
                        />
                    )}
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