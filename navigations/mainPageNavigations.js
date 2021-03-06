import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { MAIN_NAVIGATE_ENUM } from "../navigationVar";
import MainPage from "../components/mainPage";
import ModelSearchPage from "../components/modelSearchPage";
import ProductSearchPage from "../components/productSearchPage";
import AgencyFeePage from "../components/agencyFeePage";
import PurchaseOrderSearchPage from "../components/purchaseOrderSearchPage";
import OrderSearchPage from "../components/orderSearchPage";


const MainPageNavigations = (props) => {

    const {
        route
    } = props;
    const {
        params
    } = route
    const {
        ctx
    } = params

    const Stack = createStackNavigator();
    const options = {
        headerShown: false
    }

    const screenInfo = [
        {
            name: MAIN_NAVIGATE_ENUM.MAIN,
            component: MainPage,
            screenListeners: {
                    state: (e) => {
                    // Do something with the state
                    console.log('state changed', e.data);
                    },
            },
            initialParams: { ctx },
            options: { headerShown: false }
        },
        {
            name: MAIN_NAVIGATE_ENUM.MODEL_SEARCH,
            component: ModelSearchPage,
            screenListeners: {
                    state: (e) => {
                    // Do something with the state
                    console.log('state changed', e.data);
                    },
            },
            initialParams: { ctx },
            options: { headerShown: false }
        },
        {
            name: MAIN_NAVIGATE_ENUM.PRODUCT_SEARCH,
            component: ProductSearchPage,
            screenListeners: {
                    state: (e) => {
                    // Do something with the state
                    console.log('state changed', e.data);
                    },
            },
            initialParams: { ctx },
            options: { headerShown: false }
        },
        {
            name: MAIN_NAVIGATE_ENUM.AGENCY_FEE,
            component: AgencyFeePage,
            screenListeners: {
                    state: (e) => {
                    // Do something with the state
                    console.log('state changed', e.data);
                    },
            },
            initialParams: { ctx },
            options: { headerShown: false }
        },
        {
            name: MAIN_NAVIGATE_ENUM.PURCHASE_ORDER_SEARCH,
            component: PurchaseOrderSearchPage,
            screenListeners: {
                    state: (e) => {
                    // Do something with the state
                    console.log('state changed', e.data);
                    },
            },
            initialParams: { ctx },
            options: { headerShown: false }
        },
        {
            name: MAIN_NAVIGATE_ENUM.ORDER_SEARCH,
            component: OrderSearchPage,
            screenListeners: {
                    state: (e) => {
                    // Do something with the state
                    console.log('state changed', e.data);
                    },
            },
            initialParams: { ctx },
            options: { headerShown: false }
        },
    ]


    return (
        <Stack.Navigator>
            {screenInfo.map((s, idx) =>
                <Stack.Screen 
                    key={`main-sc-${idx}`}    
                    screenListeners={s.screenListeners}
                    name={s.name}
                    component={s.component}
                    options={s.options}
                    initialParams={s.initialParams}
                />
            )}
        </Stack.Navigator>
    )
}

export default MainPageNavigations;