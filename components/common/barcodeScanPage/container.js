import React from "react";
import Presenter from "./presenter";

const Container = (props) => {

    const { } = props;

    console.log("라우트??", props.route.params)

    return (
        <Presenter {...props} />
    )
}

export default Container;