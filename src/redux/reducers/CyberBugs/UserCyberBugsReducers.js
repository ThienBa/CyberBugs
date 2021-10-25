import { GET_USERS_REDUCERS } from "../../constants/CyberBugs/UserConstants";

const initialState = {
    arrListUser: [
        {
            "userId": 81,
            "name": "test",
            "avatar": "https://ui-avatars.com/api/?name=test",
            "email": "test@gmail.com",
            "phoneNumber": ""
        },
        {
            "userId": 128,
            "name": "cacaadadaacacaca",
            "avatar": "https://ui-avatars.com/api/?name=cacaadadaacacaca",
            "email": "mrtuan2244@gmail.com",
            "phoneNumber": ""
        },
        {
            "userId": 297,
            "name": "Như",
            "avatar": "https://ui-avatars.com/api/?name=Như",
            "email": "nhu_2912@mail.com",
            "phoneNumber": "0334147000"
        },
        {
            "userId": 301,
            "name": "Nguyen Minh Hieu",
            "avatar": "https://ui-avatars.com/api/?name=Nguyen Minh Hieu",
            "email": "nmhieu03032000@gmail.com",
            "phoneNumber": "0123456789"
        },
        {
            "userId": 313,
            "name": "tamsdfsdfsd",
            "avatar": "https://ui-avatars.com/api/?name=tamsdfsdfsd",
            "email": "tam1999@gmail.com",
            "phoneNumber": "0913427226"
        },
        {
            "userId": 319,
            "name": "ngoc",
            "avatar": "https://ui-avatars.com/api/?name=",
            "email": "arishem511@gmail.com",
            "phoneNumber": "0919231111"
        },
    ]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_REDUCERS: {
            return { ...state, arrListUser: action.arrListUser }
        }
        default:
            return { ...state }
    }
};
