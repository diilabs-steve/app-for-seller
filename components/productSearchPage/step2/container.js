import axios from 'axios';
import React, { useEffect } from 'react';
import { HOST, INFRA, MODEL, MODEL_STOCK, MODEL_STOCK_MODEL, PARTNER_LIST, WAREHOUSE_FILE_LIST } from '../../../envVars';
import { getStorage } from '../../../functions/storageFunc';
import { STEP_NAVIGATE_ENUM } from '../../../navigationVar';
import { fetchCodeMasterGroupData, fetchProductDetail, restApiObjectConverter } from '../../common/function/restApi';
import SpinnerComponent from '../../common/util/spinner';
import Presenter from './presenter';

const Container = (props) => {

    const {
        navigation,
        route = {}
    } = props;

    const { params = {} } = route;
    const { modelData = {}, productInfo = {} } = params;

    console.log("model데이터==>>", modelData)

    const handleNextStep = () => {
        navigation.navigate(STEP_NAVIGATE_ENUM.STEP3);
    }

    const [boxLabelImg, setBoxLabelImg] = React.useState("");
    const [productImg, setProductImg] = React.useState("");
    const [palletImg, setPalletImg] = React.useState("");
    const [modelGroup, setModelGroup] = React.useState("");
    const [modelDivisionObj, setModelDivisionObj] = React.useState({}); 
    const [largeGrpObj, setLargeGrpObj] = React.useState({}); 
    const [midGrpObj, setMidGrpObj] = React.useState({}); 
    const [smallGrpObj, setSmallGrpObj] = React.useState({}); 
    const [palletTypeObj, setPalletTypeObj] = React.useState({}); 
    const [productObj, setProductObj] = React.useState({});
    const [modelStockObj, setModelStockObj] = React.useState({});
    const [patnerObj, setPartnerObj] = React.useState({});
    const [infraObj, setInfraObj] = React.useState({});
    const [modelGroupObj, setModelGroupObj] = React.useState({});
    const [serviceTypeObj, setServiceTypeObj] = React.useState({});
    const [spinnerActive, setSpinnerActive] = React.useState(true);

    const modelInfo = [
        {
            title: "판매사",
            content: `${patnerObj[productObj.partnerSeq]}`
        },
        // {
        //     title: "브랜드",
        //     content: productObj.brand
        // },
        {
            title: "인프라",
            content: `${infraObj[productObj.infraSeq]}`
        },
        {
            title: "제품군",
            content: modelGroupObj[productObj.modelGroup]
        },
        {
            title: "서비스타입",
            content: `${serviceTypeObj[productObj.serviceType]}`
        },
        {
            title: "소요시간",
            content: `${productObj.installDuration}분`
        },
    ]

    const fetchTypeData = async () => {
        const partner = await restApiObjectConverter(PARTNER_LIST, {
            key: "partnerSeq",
            value: "partnerName"
        })
        setPartnerObj(partner.data);



    }
    const fetchInfra = async () => {
               const infra = await restApiObjectConverter(INFRA, {
            key: "infraSeq",
            value: "infraName"
        })
        setInfraObj(infra.data); 
    }
    const fetchModelGroup = async () => {
        const modelGroup = await fetchCodeMasterGroupData("MODEL_GROUP", "object");
        setModelGroupObj(modelGroup.data);
    }
    const fetchServiceType = async () => {
        const serviceType = await fetchCodeMasterGroupData("SERVICE_TYPE", "object");
        setServiceTypeObj(serviceType.data);
    }

    const fetchModelImg = async () => {
        const HOST = await getStorage("host");
        const imgRs = await axios.get(HOST + WAREHOUSE_FILE_LIST("model", modelData.modelSeq));
        console.log("imgrs==>", imgRs.data, HOST + WAREHOUSE_FILE_LIST("model", modelData.modelSeq))
        if (imgRs.data) {
            imgRs.data?.forEach((img, idx) => {
                console.log("img?????", img)
                if (img.tableColumn === "PIC_BOX_LABEL") {
                    setBoxLabelImg(img.uploadUrl);
                }
                if (img.tableColumn === "PIC_MODEL") {
                    setProductImg(img.uploadUrl);
                }
                if (img.tableColumn === "PIC_PALLET_STACK") {
                    setPalletImg(img.uploadUrl);
                }
            })
        }


    }

    const fetchModelData = async () => {
        const HOST = await getStorage("host");
        try {
            const rs = await fetchProductDetail(productInfo.productSeq);
            console.log('rs.data??', rs.data)

            setProductObj(rs.data);
            fetchModelStockData(rs.data?.modelSeq, rs.data?.brand);

        } catch (error) {
            
        }
    }
    const fetchModelStockData = async (modelSeq, partnerSeq) => {
        const HOST = await getStorage("host");
        try {
            const rs = await axios.get(HOST + MODEL_STOCK_MODEL + `?modelSeq=${modelSeq}&modelStockSeq=${modelData.modelStockSeq}`);
            console.log('rs.data.stock??', rs.data)
            
            if (rs.data?.length) {
                const stockInfo = rs.data[0];
                setModelStockObj(stockInfo);
            }

        } catch (error) {
            
        }
    }

    React.useEffect(() => {
        fetchTypeData();
        fetchModelData();
        fetchModelImg();
        fetchInfra();
        fetchModelGroup();
        fetchServiceType();
        setTimeout(() => {
            setSpinnerActive(false);
        }, 3000);
    }, [])

    const imgInfo = [
        {
            title: "박스 라벨지",
            state: boxLabelImg,
            setState: setBoxLabelImg,
            onPicture: (img) => {
                console.log("이미지?",img)
                setBoxLabelImg(img);
            }
        },
        {
            title: "제품사진",
            state: productImg,
            setState: setProductImg,
            onPicture: (img) => {
                console.log("이미지?",img)
                setProductImg(img);
            }
        },
        {
            title: "팔레트 적재사진",
            state: palletImg,
            setState: setPalletImg,
            onPicture: (img) => {
                console.log("이미지?",img)
                setPalletImg(img);
            }
        }
    ]

    const boxWidth = productObj.boxWidth || 0;
    const boxHeight = productObj.boxHeight || 0;
    const boxDepth = productObj.boxDepth || 0;
    const modelWidth = productObj.modelWidth || 0;
    const modelHeight = productObj.modelHeight || 0;
    const modelDepth = productObj.modelDepth || 0;

    const productProperty = [
        {
            title: "제품사이즈",
            content: `${modelWidth} X ${modelHeight} X ${modelDepth}`
        },
        {
            title: "박스사이즈",
            content: `${boxWidth} X ${boxHeight} X ${boxDepth}`
        },
        {
            title: "무게",
            content: `${productObj.modelWeight}`
        },
        {
            title: "용량/인치",
            content: `${modelDivisionObj[productObj.modelDivision]}`
        },
        {
            title: "팔레트 적재수량",
            content: `${productObj.palletCapacity}`
        },
        {
            title: "팔레트 사이즈",
            content: `${palletTypeObj[productObj.palletType]}`
        }
    ]


    return (
        <>
        {spinnerActive ? 
        <SpinnerComponent/>
        :
        <Presenter 
            {...props}
            handleNextStep={handleNextStep}
            modelInfo={modelInfo}
            imgInfo={imgInfo}
            productProperty={productProperty}
            modelObj={productObj}
            largeGrpObj={largeGrpObj}
            midGrpObj={midGrpObj}
            smallGrpObj={smallGrpObj}
            productObj={productObj}
        />
        }
        </>
    );
};

export default Container;