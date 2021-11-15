import React from 'react';
import { Alert } from 'react-native';
import { PARTNER, PARTNER_LIST, WAREHOUSE_LIST } from '../../../envVars';
import { spliteDateNTime } from '../../../functions/dateObjFunc';
import { STEP_NAVIGATE_ENUM } from '../../../navigationVar';
import { restApiObjectConverter, fetchModelStockInfo, fetchPoList, fetchPoDetail } from '../../common/function/restApi';
import SpinnerComponent from '../../common/util/spinner';
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
            text: "발주번호",
            value: "purchaseSeq"
        },
        {
            text: "발주일",
            value: "purchaseDate"
        },
        {
            text: "입고예정일",
            value: "promiseDate"
        },
    ];

    const [searchOption, setSearchOption] = React.useState(OPTIONS[0]);
    const [searchText, setSearchText] = React.useState("");
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [poList, setPoList] = React.useState([]);
    const [partnerObj, setPartnerObj] = React.useState({});
    const [centerObj, setCenterObj] = React.useState({});
    const [activeSpinner, setActiveSpinner] = React.useState(false);

    const handleBarcodeScanned = async (searchText) => {
        setActiveSpinner(true)
        // console.log(searchText?.toISOString()?.split("T")?.[0])
        let params;

        if (searchOption.value === "purchaseSeq") params = `?purchaseSeq=${searchText.trim()}`;
        if (searchOption.value === "purchaseDate") params = `?fromPurchaseDate=${searchText?.toISOString()?.split("T")?.[0]}&toPurchaseDate=${searchText?.toISOString()?.split("T")?.[0]}`;
        if (searchOption.value === "promiseDate") params = `?fromPromiseDate=${searchText?.toISOString()?.split("T")?.[0]}&toPromiseDate=${searchText?.toISOString()?.split("T")?.[0]}`;
        const rs = await fetchPoList(params);
        console.log(rs.data)

        if (rs.status) {
            // navigation.navigate(STEP_NAVIGATE_ENUM.STEP2, {
            //     barcodeData: barcode,
            //     modelData: rs.data[0]
            // });
            const promiseArr = await rs.data?.map(async po => {
                const detailRs = await fetchPoDetail(po.purchaseSeq);

                return detailRs.data;
            })

            const promiseResult = await Promise.all(promiseArr);
            console.log('promiseArr', promiseResult)


        
            setActiveSpinner(false)

            setPoList(promiseResult);
        } else {
            setPoList([]);
            setActiveSpinner(false)
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

    const fetchPartnerObj = async () => {
        const rs = await restApiObjectConverter(PARTNER, {
            key: "partnerSeq",
            value: "partnerName"
        });

        setPartnerObj(rs.data)
    }
    const fetchCenterObj = async () => {
        const rs = await restApiObjectConverter(WAREHOUSE_LIST, {
            key: "centerCode",
            value: "centerName"
        });

        setCenterObj(rs.data)
    }

    React.useEffect(() => {
        fetchPartnerObj();
        fetchCenterObj();
    }, [])

    React.useEffect(() => {
        if (searchOption.value !== "purchaseSeq") {
            handleBarcodeScanned(date)
        }
    }, [searchOption.value])

    const selectDate = (date) => {
        console.log(typeof date);
        setDate(date);
        handleBarcodeScanned(date)

    }
    return (
        <>
        {activeSpinner ?
        <SpinnerComponent/>
        :
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
            poList={poList}
            onCardPress={onCardPress}
            partnerObj={partnerObj}
            centerObj={centerObj}
            selectDate={selectDate}
            date={date}
            setDate={setDate}
        />
        }
        </>
    );
};

export default Container;