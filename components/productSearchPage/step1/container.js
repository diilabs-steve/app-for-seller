import React from 'react';
import { Alert } from 'react-native';
import { STEP_NAVIGATE_ENUM } from '../../../navigationVar';
import { fetchInfraList, fetchModelInfo, fetchProductList } from '../../common/function/restApi';
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
            text: "상품명",
            value: "productName"
        },
        {
            text: "상품번호",
            value: "productSeq"
        }
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
        if (searchOption.value === "productName") params = `?productName=${searchText}`;
        if (searchOption.value === "productSeq") params = `?productSeq=${searchText}`;

        const rs = await fetchProductList(params);
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

    const fetchInfraConverter = async () => {
        const rs = await fetchInfraList();

        console.log('infra??', rs.data)
    }

    const onCardPress = (modelInfo) => {
        navigation.navigate(STEP_NAVIGATE_ENUM.STEP2, {
            barcodeData: modelInfo.barcode,
            modelData: modelInfo
        }); 
    }

    React.useEffect(() => {
        fetchInfraConverter();
    }, [])

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