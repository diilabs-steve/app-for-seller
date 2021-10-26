import axios from 'axios';
import React from 'react';
import { Alert } from 'react-native';
import { MAIN_NAVIGATE_ENUM } from '../../navigationVar';
import { BARCODE_START_WITH_ENUM } from '../common/enum/typeEnum';
import Presenter from './presenter';
import ScanImg from "../../assets/main/scan.png";
import Profile from "../../assets/main/profile.png";
import Collect from "../../assets/main/collect.png";
import IncomePo from "../../assets/main/income_po.png";
import InvenInvest from "../../assets/main/inven_invest.png";
import IncomeMove from "../../assets/main/inven_move.png";
import LoanDeliv from "../../assets/main/loan_deliv.png";
import Pallet from "../../assets/main/pallet.png";
import ProductImg from "../../assets/main/product.png";
import LocationImg from "../../assets/main/location.png";
import PickingTrunkImg from "../../assets/main/picking_trunk.png";
import OutgoingTrunkImg from "../../assets/main/outgoing_trunk.png";
import IncomingTrunkImg from "../../assets/main/incoming_trunk.png";
import PickingLoanImg from "../../assets/main/picking_loan.png";
import GoodsImg from "../../assets/main/goods.png";
import { fetchCodeMasterGroupData } from '../common/function/restApi';
import { getStorage } from '../../functions/storageFunc';

const Container = (props) => {

    const {
        navigation
    } = props;

    const [barcode, setBarcode] = React.useState("");
    const [seqTypes, setSeqTypes] = React.useState({});
    const [host, setHost] = React.useState("");

    const dashBoardInfo = [
        {
            title: "전산수량",
            content: "200개"
        },
        {
            title: "입력수량",
            content: "189개"
        },
        {
            title: "차이",
            content: "-11개"
        }
    ]

    const fetchHost = async () => {
        const HOST = await getStorage("host");

        setHost(HOST)
    }
    const fetchData = async () => {
        // Alert.alert("???")
        // axios.get("http://devdfs.diilabs.co.kr/order/list")
        // .then(rs => {
        //     console.log("data?",rs.data)
        // })

        // .catch(err => Alert.alert("err"))
    }
    const fetchSeqTypes = async () => {
        try {
            const rs = await fetchCodeMasterGroupData("SEQUENCE", "object");
            console.log(rs.data)
            setSeqTypes(rs.data)
        } catch (error) {
            console.log("seq types error", error)
        }
    }

    const onBarcodeScanned = (barcodeData = "") => {

        if (barcodeData.startsWith(seqTypes["간선일련번호"])) {
            navigation.navigate(MAIN_NAVIGATE_ENUM.PIKING_TRUNK, {
                barcodeData
            });
        }
        if (barcodeData.startsWith(seqTypes["발주일련번호"])) {
            navigation.navigate(MAIN_NAVIGATE_ENUM.CONFIRM_INCOMING_PO, {
                barcodeData
            });
        }
        if (barcodeData.startsWith(seqTypes["상차일련번호"])) {
            navigation.navigate(MAIN_NAVIGATE_ENUM.OUTGOING_TRUNK, {
                barcodeData
            });
        }
        if (barcodeData.startsWith(seqTypes["상품일련번호"])) {
            navigation.navigate(MAIN_NAVIGATE_ENUM.GOODS_INFO, {
                barcodeData
            });
        }
        if (barcodeData.startsWith(seqTypes["운송일련번호"])) {
            navigation.navigate(MAIN_NAVIGATE_ENUM.INCOMING_TRUNK, {
                barcodeData
            });
        }
        if (barcodeData.startsWith(seqTypes["제품일련번호"])) {
            navigation.navigate(MAIN_NAVIGATE_ENUM.PRODUCT_INFO, {
                barcodeData
            });
        }
        if (barcodeData.startsWith(seqTypes["차용일련번호"])) {
            navigation.navigate(MAIN_NAVIGATE_ENUM.LOAN_PICKING, {
                barcodeData
            });
        }
        // if (barcodeData.startsWith(seqTypes["주문일련번호"])) {
        //     navigation.navigate(MAIN_NAVIGATE_ENUM.CONFIRM_INCOMING_PO, {
        //         barcodeData
        //     });
        // }

        

    }

    const navigationInfo = {
        row1: [
            {
                title: "제품정보",
                image: ProductImg,
                imgStyle: { width: 25.65, height: 29.54 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.PRODUCT_INFO)
            },
            {
                title: "상품정보",
                image: GoodsImg,
                imgStyle: { width: 28, height: 30 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.GOODS_INFO)
            },
            {
                title: "재고조사",
                image: InvenInvest,
                imgStyle: { width: 32.54, height: 31.19 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.INVENTORY_INVESTIGATE) 
            },
            {
                title: "재고이동",
                image: IncomeMove,
                imgStyle: { width: 37.79, height: 37.17 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.INVENTORY_MOVEMENT)
            },
        ],
        row2: [
            {
                title: "팔렛관리",
                image: Pallet,
                imgStyle: { width: 31.09, height: 30.8 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.PALLET_MENAGEMENT) 
            },
            {
                title: "발주입고",
                image: IncomePo,
                imgStyle: { width: 38.02, height: 25.41, top: 5 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.CONFIRM_INCOMING_PO)
            },
            {
                title: "위치지정",
                image: LocationImg,
                imgStyle: { width: 32.54, height: 31.19 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.CONFIRM_INCOMING_PROD_LOCATION)
            },
            {
                title: "차용피킹",
                image: PickingLoanImg,
                imgStyle: { width: 36.26, height: 32.58 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.LOAN_PICKING)
            },

        ],
        row3: [
            {
                title: "간선피킹",
                image: PickingTrunkImg,
                imgStyle: { width: 33.17, height: 31.07 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.PIKING_TRUNK)
            },
            {
                title: "간선출고",
                image: OutgoingTrunkImg,
                imgStyle: { width: 38.93, height: 24.54, top: 5 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.OUTGOING_TRUNK)
            },
            {
                title: "간선입고",
                image: IncomingTrunkImg,
                imgStyle: { width: 38.93, height: 24.54, top: 5 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.INCOMING_TRUNK)
            },
            {
                title: "회수입고",
                image: Collect,
                imgStyle: { width: 48.83, height: 50.58, bottom: 10 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.COLLECT_INCOMING)
            },
        ]
    }

    React.useEffect(() => {
        fetchData();
        fetchSeqTypes();
        fetchHost();
    }, [])

    return (
        <Presenter {...props} 
            barcode={barcode}
            setBarcode={setBarcode}
            dashBoardInfo={dashBoardInfo}
            onBarcodeScanned={onBarcodeScanned}
            navigationInfo={navigationInfo}
            host={host}
        />
    );
};

export default Container;