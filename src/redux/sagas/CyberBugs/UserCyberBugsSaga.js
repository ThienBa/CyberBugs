import { takeLatest, call, put, delay } from 'redux-saga/effects'
import { ASSIGN_USER_PROJECT_API_SAGA, GET_LIST_PROJECT_API_SAGA, GET_USER_SEARCH, GET_USER_SEARCH_API_SAGA, LOGIN_USER_API, REMOVE_USER_FROM_PROJECT_API_SAGA, SET_USER_LOGIN_REDUCER } from '../../constants/CyberBugs/CyberBugsConstants';
import { userCyberBugsServices } from '../../../services/UserCyberBugsServices'
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../utils/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstants';
import { history } from '../../../utils/history'
import { openNotificationWithIcon } from '../../../utils/Notifications';
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_API_SAGA } from '../../constants/CyberBugs/UserConstants';

function* loginUserApi(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500)
    try {
        const { data, status } = yield call(() => userCyberBugsServices.userLoginApi(action.userLogin));
        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_USER_LOGIN_REDUCER,
                userLogin: data.content,
            })
            history.push("/projectmanagementcyberbugs")
            openNotificationWithIcon('success', 'Login into system cyberbugs successfully!')
        }
    } catch (err) {
        history.push("/login")
        openNotificationWithIcon('warning', 'Email or password invalid!')
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* followLoginUserApi() {
    yield takeLatest(LOGIN_USER_API, loginUserApi)
}

/**
 * Nghiệp vụ get user từ api
 * Ngày 18/10/2021 - Huỳnh Thiên Bá
 */

function* getUserSearchApi(action) {
    try {
        const { data, status } = yield call(() => userCyberBugsServices.getUserSearchApi(action.keyWord));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_SEARCH,
                userSearches: data.content,
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* followGetUserSearchApi() {
    yield takeLatest(GET_USER_SEARCH_API_SAGA, getUserSearchApi)
}

/**
 * Nghiệp vụ assign user task
 * Ngày 18/10/2021 - Huỳnh Thiên Bá
 */

function* assignUserProjectApi(action) {
    try {
        const { status } = yield call(() => userCyberBugsServices.assignUserProjectApi(action.userProject));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT_API_SAGA
            })

            openNotificationWithIcon('success', 'Add user project successfully!')
        }
    } catch (err) {
        openNotificationWithIcon('error', 'Add user project error!')
        console.log(err)
    }
}

export function* followAssignUserProjectApi() {
    yield takeLatest(ASSIGN_USER_PROJECT_API_SAGA, assignUserProjectApi)
}

/**
 * Nghiệp vụ remove user from project
 * Ngày 19/10/2021 - Huỳnh Thiên Bá
 */

function* removeUserFromProjectApi(action) {
    try {
        const { status } = yield call(() => userCyberBugsServices.removeUserFromProjectApi(action.userProject));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT_API_SAGA
            })

            openNotificationWithIcon('success', 'Remove user from project successfully!')
        } else {
            openNotificationWithIcon('error', 'Remove user from project error!')
        }
    } catch (err) {
        openNotificationWithIcon('error', 'Remove user from project error!')
        console.log(err)
    }
}

export function* followRemoveUserFromProjectApi() {
    yield takeLatest(REMOVE_USER_FROM_PROJECT_API_SAGA, removeUserFromProjectApi)
}

function* getUserByProjectIdApiSaga(action) {
    try {
        const { data, status } = yield call(() => userCyberBugsServices.getUserByProjectIdApi(action.projectId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUserByProject: data.content
            })
        }
    } catch (err) {
        console.log(err);
        console.log(err.response.data);
        if (err.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUserByProject: []
            })
        }
    }
}

export function* followGetUserByProjectIdApiSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_API_SAGA, getUserByProjectIdApiSaga)
}
