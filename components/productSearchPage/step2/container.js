import axios from 'axios';
import React, { useEffect } from 'react';
import { HOST, MODEL_STOCK, WAREHOUSE_FILE_LIST } from '../../../envVars';
import { getStorage } from '../../../functions/storageFunc';
import { STEP_NAVIGATE_ENUM } from '../../../navigationVar';
import { fetchCodeMasterGroupData } from '../../common/function/restApi';
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
    const [midGrpObj, setMidGrpObj] = React.useState({});

    const modelInfo = [
        {
            title: "모델",
            content: modelData.model
        },
        {
            title: "바코드",
            content: modelData.barcode
        },
        // {
        //     title: "SKUID",
        //     content: "2341232"
        // },
    ]

    const demoImgSetter = () => {
        switch (modelData.model) {
            case "ZPC2003":
                setBoxLabelImg("https://dp-image-s3.s3.ap-northeast-2.amazonaws.com/static/ZPC2003_box_label.png")
                setProductImg("https://dp-image-s3.s3.ap-northeast-2.amazonaws.com/static/ZPC2003_product.png")
                setPalletImg("https://dp-image-s3.s3.ap-northeast-2.amazonaws.com/static/ZPC2003_pallet.png")
                break;
            case "ZPC2012":
                setBoxLabelImg("https://dp-image-s3.s3.ap-northeast-2.amazonaws.com/static/ZPC2012_box_label.png")
                setProductImg("https://dp-image-s3.s3.ap-northeast-2.amazonaws.com/static/ZPC2012_product.png")
                setPalletImg("https://dp-image-s3.s3.ap-northeast-2.amazonaws.com/static/ZPC2012_pallet.png")
                break;
        
            default:
                break;
        }
    }

    

    const modelDataConverter = async () => {
        const codeData = await fetchCodeMasterGroupData("GRP1", "object");

        setModelGroup(codeData.data)
        console.log("codeData", codeData.data)
        // const idx = codeData.data.map(c => c.code).indexOf(modelData.modelGroupLarge);

        // if (idx !== -1) {
        // }
        // modelData.modelGroupLarge
    }

    const modelGrpObjConverter = async () => {
        const codeData = await fetchCodeMasterGroupData("MODEL_GRP_2", "object");

        console.log('codeData', codeData.data)
        setMidGrpObj(codeData.data || {})

        // modelData.modelGroupLarge
    }

    const fetchModelImg = async () => {
        const HOST = await getStorage("host");
        const imgRs = await axios.get(HOST + WAREHOUSE_FILE_LIST("model", modelData.modelSeq));
        // const rs = await axios.get(HOST + MODEL_STOCK + `?modelSeq=${modelData.modelSeq}`);
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
        // if (rs.data && rs.data.length > 0) {

        //     // const imgRs = await axios.get(`https://d.diilabs.co.kr/admin/v2/upload/modelDetail?seq=${rs.data[0].modelStockSeq}`);
        //     console.log(imgRs.data)
        // } 



    }

    React.useEffect(() => {
        // demoImgSetter();
        modelGrpObjConverter();
        fetchModelImg()
        modelDataConverter();
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

    const boxWidth = modelData.boxWidth || 0;
    const boxHeight = modelData.boxHeight || 0;
    const boxDepth = modelData.boxDepth || 0;

    const productProperty = [
        {
            title: "제품그룹",
            content: midGrpObj[modelData.modelGroupMedium]
        },
        {
            title: "박스사이즈",
            content: `${boxWidth * boxHeight * boxDepth}`
        },
        {
            title: "무게",
            content: `${modelData.modelWeight}`
        },
        // {
        //     title: "용량/인치",
        //     content: "CRF-TD134"
        // },
        {
            title: "팔레트 적재수량",
            content: `${modelData.palletCapacity}`
        },
        // {
        //     title: "팔레트 사이즈",
        //     content: ""
        // },
        // {
        //     title: "수량",
        //     content: ""
        // },
        // {
        //     title: "창고위치",
        //     content: ""
        // },
        // {
        //     title: "ZONE 위치",
        //     content: ""
        // },
    ]


    return (
        <Presenter 
            {...props}
            handleNextStep={handleNextStep}
            modelInfo={modelInfo}
            imgInfo={imgInfo}
            productProperty={productProperty}
        />
    );
};

export default Container;