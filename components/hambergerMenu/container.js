import React from 'react';
import Presenter from './presenter';
import ProductImg from "../../assets/hambergerMenu/product.png";
import OrderImg from "../../assets/hambergerMenu/order.png";
import AgencyFeeImg from "../../assets/hambergerMenu/agencyfee.png";
import CallcenterImg from "../../assets/hambergerMenu/callcenter.png";
import CapaImg from "../../assets/hambergerMenu/capa.png";
import GoodsImg from "../../assets/hambergerMenu/order.png";
import InventoryImg from "../../assets/hambergerMenu/inventory.png";
import PurchaseOrderImg from "../../assets/hambergerMenu/purchaseorder.png";



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
                title: "제품조회",
                image: ProductImg,
                imgStyle: { width: 25.65, height: 29.54 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.PRODUCT_INFO)
            },
            {
                title: "상품조회",
                image: GoodsImg,
                imgStyle: { width: 28, height: 30 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.GOODS_INFO)
            },
            {
                title: "대행료",
                image: AgencyFeeImg,
                imgStyle: { width: 32.54, height: 31.19 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.INVENTORY_INVESTIGATE) 
            },
            {
                title: "발주정보",
                image: PurchaseOrderImg,
                imgStyle: { width: 37.79, height: 37.17 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.INVENTORY_MOVEMENT)
            },
        ],
        row2: [
            {
                title: "재고정보",
                image: InventoryImg,
                imgStyle: { width: 31.09, height: 30.8 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.PALLET_MENAGEMENT) 
            },
            {
                title: "주문정보",
                image: OrderImg,
                imgStyle: { width: 38.02, height: 25.41, top: 5 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.CONFIRM_INCOMING_PO)
            },
            {
                title: "캐파조회",
                image: CapaImg,
                imgStyle: { width: 32.54, height: 31.19 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.CONFIRM_INCOMING_PROD_LOCATION)
            },
            {
                title: "상담이력",
                image: CallcenterImg,
                imgStyle: { width: 36.26, height: 32.58 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.LOAN_PICKING)
            }
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