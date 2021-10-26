import React from 'react';
import { COMMON_NAVIGATE_ENUM } from '../../../navigationVar';
import { Alert } from "react-native";
import Presenter from './presenter';

const Container = (props) => {

    const {
        onBarcodeScanned,
        route = {},
        navigation,
        state,
        setState,
        scanKey = ""
    } = props;


    const { params = {} } = route;
    const { key, barcodeData, usage } = params;
    
    let prevUsage = "";
    const usageConstant = `scan-code-${Math.random() + scanKey}`;


    React.useEffect(() => {
        console.log(usage, ", prev=>", prevUsage)
        if (usage && usage.includes(scanKey)) {
            setState && setState(barcodeData);
            onBarcodeScanned && onBarcodeScanned(barcodeData);
        }
    }, [key, barcodeData])

    const handleBarcodeBtn = () => {
        // setUsage(usageConstant);
        console.log(route.name)
        prevUsage = usageConstant;
        navigation.navigate(COMMON_NAVIGATE_ENUM.BARCODE_SCANNER, {
            usage: usageConstant,
            pageName: route.name

        })
    }    

    return (
        <Presenter 
            {...props} 
            state={state}
            setState={setState}
            handleBarcodeBtn={handleBarcodeBtn}
        />
    );
};

export default Container;