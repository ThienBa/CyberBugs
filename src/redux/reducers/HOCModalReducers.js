import React from "react";
const initialState = {
    Component: <p>Nội dung mặc định!</p>
}

export const HOCModalReducers = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_FORM_MODAL":{
            return {...state, Component: action.Component}
        }
        default:
            return state
    }
};
