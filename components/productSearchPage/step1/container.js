import React from 'react';
import { Alert } from 'react-native';
import { STEP_NAVIGATE_ENUM } from '../../../navigationVar';
import { fetchModelInfo } from '../../common/function/restApi';
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
            value: "model"
        },
        {
            text: "SKU",
            value: "sku"
        },
    ];

    const [searchOption, setSearchOption] = React.useState(OPTIONS[0]);
    
    const [barcode, setBarcode] = React.useState("");


    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    const handleBarcodeScanned = async (barcode) => {

        const rs = await fetchModelInfo(`?barcode=${barcode.trim()}`);
        console.log("", rs.data)

        if (rs.status) {
            navigation.navigate(STEP_NAVIGATE_ENUM.STEP2, {
                barcodeData: barcode,
                modelData: rs.data[0]
            });
        } else {
            setAlertVisible(true);
            setAlertMessage("존재하지 않는 모델입니다.");
            
        }

    }


    return (
        <Presenter 
            {...props}
            handleBarcodeScanned={handleBarcodeScanned}
            alertVisible={alertVisible}
            setAlertVisible={setAlertVisible}
            alertMessage={alertMessage}
            barcode={barcode}
            setBarcode={setBarcode}
            options={OPTIONS}
            searchOption={searchOption}
            setSearchOption={setSearchOption}
        />
    );
};

export default Container;