import React from 'react';
import { Alert } from 'react-native';
import { STEP_NAVIGATE_ENUM } from '../../../navigationVar';
import { fetchModelInfo, fetchModelStockInfo } from '../../common/function/restApi';
import Presenter from './presenter';

const Container = (props) => {

    const {
        navigation,
        route = {}
    } = props;
    const { params = {} } = route;
    const { barcodeData = null } = params;


    const OPTIONS = [
        {
            text: "바코드",
            value: "barcode"
        },
        {
            text: "제품명",
            value: "modelName"
        },
        {
            text: "SKU",
            value: "skuNumber"
        },
    ];

    const [searchOption, setSearchOption] = React.useState(OPTIONS[0]);
    const [searchText, setSearchText] = React.useState("");
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [modelList, setModelList] = React.useState([]);

    const handleBarcodeScanned = async (searchText) => {
        console.log(searchText)
        let params;

        if (searchOption.value === "barcode") params = `?barcode=${searchText.trim()}`;
        if (searchOption.value === "modelName") params = `?modelName=${searchText}`;
        if (searchOption.value === "skuNumber") params = `?skuNumber=${searchText}`;

        const rs = await fetchModelStockInfo(params);
        console.log(rs.data)

        if (rs.status) {
            // navigation.navigate(STEP_NAVIGATE_ENUM.STEP2, {
            //     barcodeData: barcode,
            //     modelData: rs.data[0]
            // });
            setModelList(rs.data);
        } else {
            // setAlertVisible(true);
            // setAlertMessage("존재하지 않는 모델입니다.");
        }

    }

    const onCardPress = (modelInfo) => {
        navigation.navigate(STEP_NAVIGATE_ENUM.STEP2, {
            barcodeData: modelInfo.barcode,
            modelData: modelInfo
        }); 
    }


    return (
        <Presenter 
            {...props}
            handleBarcodeScanned={handleBarcodeScanned}
            alertVisible={alertVisible}
            setAlertVisible={setAlertVisible}
            alertMessage={alertMessage}
            searchText={searchText}
            setSearchText={setSearchText}
            options={OPTIONS}
            searchOption={searchOption}
            setSearchOption={setSearchOption}
            modelList={modelList}
            onCardPress={onCardPress}
        />
    );
};

export default Container;