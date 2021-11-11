import React from 'react';
import Container from './container';
import PropTypes from "prop-types";

const ScanInput = (props) => {
    return (
       <Container {...props} />
    );
};

export default ScanInput;

ScanInput.propTypes = {
    placeholder: PropTypes.any,
    onPress: PropTypes.any,
    state: PropTypes.any,
    setState: PropTypes.any,
    handleBarcodeBtn: PropTypes.any,
    style: PropTypes.any,
    size: PropTypes.any,
    inputStyle: PropTypes.any,
    btnStyle: PropTypes.any,
    scopeIconNone: PropTypes.any,
    onChangeText: PropTypes.any,
    keyboardType: PropTypes.any
}