import React from 'react';
import Presenter from './presenter';
import ProductImg from "../../assets/hambergerMenu/product.png";
import OrderImg from "../../assets/hambergerMenu/order.png";
import AgencyFeeImg from "../../assets/hambergerMenu/agencyfee.png";
import CallcenterImg from "../../assets/hambergerMenu/callcenter.png";
import CapaImg from "../../assets/hambergerMenu/capa.png";
import GoodsImg from "../../assets/hambergerMenu/goods.png";
import InventoryImg from "../../assets/hambergerMenu/inventory.png";
import PurchaseOrderImg from "../../assets/hambergerMenu/purchaseorder.png";
import ContectImg from "../../assets/hambergerMenu/contect.png";
import LogoutImg from "../../assets/hambergerMenu/logout.png";
import ProfileImg from "../../assets/hambergerMenu/profile.png";
import NoticeImg from "../../assets/hambergerMenu/notice.png";
import { MAIN_NAVIGATE_ENUM } from '../../navigationVar';
import { clearStorage } from '../../functions/storageFunc';



const Container = (props) => {

    const { route = {}, navigation } = props;
    const { params = {} } = route;
    const { ctx } = params;

    const { signOut } = React.useContext(ctx);


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

    const handleSignOut = () => {
        clearStorage();
        signOut();
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
                imgStyle: { width: 55.65, height: 59.54 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.MODEL_SEARCH)
            },
            {
                title: "상품조회",
                image: GoodsImg,
                imgStyle: { width: 58.49, height: 58.84 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.PRODUCT_SEARCH)
            },
            {
                title: "대행료",
                image: AgencyFeeImg,
                imgStyle: { width: 58, height: 58 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.INVENTORY_INVESTIGATE) 
            },
            {
                title: "발주정보",
                image: PurchaseOrderImg,
                imgStyle: { width: 67.32, height: 58.48 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.INVENTORY_MOVEMENT)
            },
        ],
        row2: [
            {
                title: "재고정보",
                image: InventoryImg,
                imgStyle: { width: 66.91, height: 66.56, bottom: 10 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.PALLET_MENAGEMENT) 
            },
            {
                title: "주문정보",
                image: OrderImg,
                imgStyle: { width: 63.56, height: 65, bottom: 5 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.CONFIRM_INCOMING_PO)
            },
            {
                title: "캐파조회",
                image: CapaImg,
                imgStyle: { width: 62.48, height: 59 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.CONFIRM_INCOMING_PROD_LOCATION)
            },
            {
                title: "상담이력",
                image: CallcenterImg,
                imgStyle: { width: 56, height: 58 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.LOAN_PICKING)
            }
        ]
    }
    const bottomMenuInfo = [
            {
                title: "공지사항",
                image: NoticeImg,
                imgStyle: { width: 18, height: 18.54 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.PRODUCT_INFO)
            },
            {
                title: "개인정보",
                image: ProfileImg,
                imgStyle: { width: 18, height: 18 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.GOODS_INFO)
            },
            {
                title: "1:1문의",
                image: ContectImg,
                imgStyle: { width: 27, height: 27, top: 7, left: 2 },
                onPress: () => navigation.navigate(MAIN_NAVIGATE_ENUM.INVENTORY_INVESTIGATE) 
            },
            {
                title: "로그아웃",
                image: LogoutImg,
                imgStyle: { width: 24.19, height: 16.55 },
                onPress: () => handleSignOut()
            },
    ]

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
            bottomMenuInfo={bottomMenuInfo}
            host={host}
        />
    );
};

export default Container;