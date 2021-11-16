import React from 'react';
import { Alert } from 'react-native';
import { STEP_NAVIGATE_ENUM } from '../../../navigationVar';
import { fetchInfraList, fetchModelInfo, fetchOrderList, fetchProductList } from '../../common/function/restApi';
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
            text: "송장번호",
            value: "customerOrderInvoiceSeq"
        },
        {
            text: "고객명",
            value: "receiverName"
        },
        {
            text: "전화번호",
            value: "receiverPhone"
        },
        {
            text: "설치기사",
            value: "userId"
        },
        {
            text: "주문일자",
            value: "orderDate"
        },
    ];

    const [searchOption, setSearchOption] = React.useState(OPTIONS[0]);
    const [searchText, setSearchText] = React.useState("");
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [infraObj, setInfraObj] = React.useState({});
    const [orderList, setOrderList] = React.useState([]);

    const handleBarcodeScanned = async (searchText) => {
        console.log(searchText)
        let params;

        if (searchOption.value === "barcode") params = `?barcode=${searchText.trim()}`;
        if (searchOption.value === "productName") params = `?productName=${searchText}`;
        if (searchOption.value === "productSeq") params = `?productSeq=${searchText}`;

        const rs = await fetchOrderList(params);
        console.log(rs.data)

        if (rs.status) {
            // navigation.navigate(STEP_NAVIGATE_ENUM.STEP2, {
            //     barcodeData: barcode,
            //     modelData: rs.data[0]
            // });
            setOrderList(rs.data);
        } else {
            // setAlertVisible(true);
            // setAlertMessage("존재하지 않는 모델입니다.");
        }

    }

    const fetchInfraConverter = async () => {
        const rs = await fetchInfraList();
        const obj = {};
        rs.data?.forEach(d => {
            Object.assign(obj, {
                [d.infraSeq]: d.infraName
            });
        })
        setInfraObj(obj);
        console.log('infra??', rs.data)
    }

    const onCardPress = (productInfo) => {
        console.log('productInfo', productInfo)
        navigation.navigate(STEP_NAVIGATE_ENUM.STEP2, {
            barcodeData: productInfo.barcode,
            productInfo
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
            orderList={orderList}
            onCardPress={onCardPress}
            infraObj={infraObj}
        />
    );
};

export default Container;