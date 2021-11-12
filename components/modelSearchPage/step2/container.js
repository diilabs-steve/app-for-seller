import axios from 'axios';
import React, { useEffect } from 'react';
import { HOST, MODEL, MODEL_STOCK, MODEL_STOCK_MODEL, WAREHOUSE_FILE_LIST } from '../../../envVars';
import { getStorage } from '../../../functions/storageFunc';
import { STEP_NAVIGATE_ENUM } from '../../../navigationVar';
import { fetchCodeMasterGroupData } from '../../common/function/restApi';
import SpinnerComponent from '../../common/util/spinner';
import Presenter from './presenter';

const Container = (props) => {

    const {
        navigation,
        route = {}
    } = props;

    const { params = {} } = route;
    const { modelData = {} } = params;

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
    const [modelObj, setModelObj] = React.useState({});
    const [modelStockObj, setModelStockObj] = React.useState({});
    const [spinnerActive, setSpinnerActive] = React.useState(true);

    const modelInfo = [
        {
            title: "SKU",
            content: `(내부) ${modelStockObj.modelStockSeq}\n(외부) ${modelStockObj.skuNumber}`
        },
        // {
        //     title: "색상",
        //     content: modelData.barcode
        // },
        {
            title: "가격",
            content: `${modelStockObj.purchasePrice}`
        }
    ]

    const palletTypeConverter = async () => {
        const codeData = await fetchCodeMasterGroupData("PALLET_TYPE", "object");

        setPalletTypeObj(codeData.data || {})

    }
    const modelMidGrpObjConverter = async () => {
        const codeData = await fetchCodeMasterGroupData("MODEL_GRP_2", "object");

        setMidGrpObj(codeData.data || {})

    }
    const modelLargeGrpObjConverter = async () => {
        const codeData = await fetchCodeMasterGroupData("MODEL_GRP_1", "object");

        setLargeGrpObj(codeData.data || {})
    }
    const modelSmallGrpObjConverter = async () => {
        const codeData = await fetchCodeMasterGroupData("MODEL_GRP_3", "object");

        setSmallGrpObj(codeData.data || {})
    }
    const modelDivisionObjConverter = async () => {
        const codeData = await fetchCodeMasterGroupData("MODEL_GRP_DIV", "object");

        setModelDivisionObj(codeData.data || {})
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
            const rs = await axios.get(HOST + MODEL + `/${modelData.modelSeq}`);
            console.log('rs.data??', rs.data)

            setModelObj(rs.data);
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
        // demoImgSetter();
        fetchModelData();
        modelLargeGrpObjConverter();
        modelMidGrpObjConverter();
        modelSmallGrpObjConverter();
        modelDivisionObjConverter();
        palletTypeConverter();
        fetchModelImg();
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

    const boxWidth = modelObj.boxWidth || 0;
    const boxHeight = modelObj.boxHeight || 0;
    const boxDepth = modelObj.boxDepth || 0;
    const modelWidth = modelObj.modelWidth || 0;
    const modelHeight = modelObj.modelHeight || 0;
    const modelDepth = modelObj.modelDepth || 0;

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
            content: `${modelObj.modelWeight}`
        },
        {
            title: "용량/인치",
            content: `${modelDivisionObj[modelObj.modelDivision]}`
        },
        {
            title: "팔레트 적재수량",
            content: `${modelObj.palletCapacity}`
        },
        {
            title: "팔레트 사이즈",
            content: `${palletTypeObj[modelObj.palletType]}`
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
            modelObj={modelObj}
            largeGrpObj={largeGrpObj}
            midGrpObj={midGrpObj}
            smallGrpObj={smallGrpObj}
        />
        }
        </>
    );
};

export default Container;