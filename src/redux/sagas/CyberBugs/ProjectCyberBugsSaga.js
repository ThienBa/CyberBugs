import { CREATE_PROJECT_API_SAGA, DELETE_PROJECT_API_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_API_SAGA, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_API_SAGA, UPDATE_PROJECT_API_SAGA } from "../../constants/CyberBugs/CyberBugsConstants";
import { takeLatest, call, put, delay } from 'redux-saga/effects'
import { ProjectCyberBugsServices } from "../../../services/ProjectCyberBugsServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstants'
import { history } from "../../../utils/history";
import { openNotificationWithIcon } from "../../../utils/Notifications";
import { GET_USER_BY_PROJECT_ID_API_SAGA } from "../../constants/CyberBugs/UserConstants";
import { CLOSE_DRAWER } from "../../constants/CyberBugs/DrawerConstants";
import { USER_LOGIN } from "../../../utils/constants/settingSystem"

/**
 * Major tạo project
 * 15/10/2021 - Huynh Thien Ba
 */

function* createProjectApi(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500)
    try {
        const { status } = yield call(() => ProjectCyberBugsServices.createProjectAuthorizationApi(action.newProject));
        if (status === STATUS_CODE.SUCCESS) {
            history.push("/projectmanagementcyberbugs")
            openNotificationWithIcon('success', 'Create project successfully!')
        }
    } catch (err) {
        openNotificationWithIcon('error', 'Create project error!')
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* followcreateProjectApi() {
    yield takeLatest(CREATE_PROJECT_API_SAGA, createProjectApi)
}

/**
 * Major lấy dữ liệu project từ api
 * 15/10/2021 - Huynh Thien Ba
 */

function* getListProjectApi() {
    if (!localStorage.getItem(USER_LOGIN)) {
        history.push('/login');
        openNotificationWithIcon('warning', 'Please login!')
        return;
    }

    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500)
    try {
        const { data, status } = yield call(() => ProjectCyberBugsServices.getListProjectApi())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT,
                data: data.content,
            })
            yield put({
                type: GET_USER_BY_PROJECT_ID_API_SAGA,
                projectId: data.content[0].id,
            })
        }
    } catch (err) {
        alert(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* followGetListProjectApi() {
    yield takeLatest(GET_LIST_PROJECT_API_SAGA, getListProjectApi)
}

/**
 * Major update dữ liệu project
 * 18/10/2021 - Huynh Thien Ba
 */


function* updateProjectApi(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500)

    try {
        const { status } = yield call(() => ProjectCyberBugsServices.updateProjectApi(action.projectUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            openNotificationWithIcon('success', 'Update project successfully!')
            yield put({
                type: GET_LIST_PROJECT_API_SAGA,
            })
        } else {
            openNotificationWithIcon('error', 'Update project error!')
        }

        yield put({
            type: CLOSE_DRAWER
        })

    } catch (err) {
        openNotificationWithIcon('error', 'Update project error!')
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* followUpdateProjectApi() {
    yield takeLatest(UPDATE_PROJECT_API_SAGA, updateProjectApi)
}

/**
 * Major delete project
 * 18/10/2021 - Huynh Thien Ba
 */


function* deleteProjectApi(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500)

    try {
        const { status } = yield call(() => ProjectCyberBugsServices.deleteProjectApi(action.projectId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT_API_SAGA,
            })
            openNotificationWithIcon('success', 'Delete project successfully!')
        } else {
            openNotificationWithIcon('error', 'Delete project error!')
        }

    } catch (err) {
        openNotificationWithIcon('error', 'Delete project error!')
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* followDeleteProjectApi() {
    yield takeLatest(DELETE_PROJECT_API_SAGA, deleteProjectApi)
}

/**
 * Major delete project
 * 18/10/2021 - Huynh Thien Ba
 */


function* getProjectDetailApi(action) {
    try {
        const { data, status } = yield call(() => ProjectCyberBugsServices.getProjectDetailApi(action.projectId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL,
                projectDetail: data.content
            })
        }
    } catch (err) {
        openNotificationWithIcon('warning', 'Please select a project!')
        history.push('/projectmanagementcyberbugs')
    }
}

export function* followGetProjectDetailApi() {
    yield takeLatest(GET_PROJECT_DETAIL_API_SAGA, getProjectDetailApi)
}