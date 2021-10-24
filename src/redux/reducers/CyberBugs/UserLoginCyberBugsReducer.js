import { USER_LOGIN } from "../../../utils/constants/settingSystem";
import { SET_USER_LOGIN_REDUCER } from "../../constants/CyberBugs/CyberBugsConstants";

let userLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin
}

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_USER_LOGIN_REDUCER: {
            return { ...state, userLogin: action.userLogin }
        }
        default: return { ...state }
    }
}