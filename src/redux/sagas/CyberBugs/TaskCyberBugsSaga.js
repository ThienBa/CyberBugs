import { put, call, takeLatest, select } from 'redux-saga/effects'
import { taskCyberBugsServices } from '../../../services/TaskCyberBugsServices';
import { STATUS_CODE } from '../../../utils/constants/settingSystem';
import { openNotificationWithIcon } from '../../../utils/Notifications';
import { CREATE_TASK_API_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_API_SAGA, UPDATE_CHANGE_TASK_API_SAGA, UPDATE_STATUS_TASK_API_SAGA, HANDLE_CHANGE_SELECT_USER_ASSIGN, HANDLE_CHANGE_TASK, HANDLE_DELETE_USER_ASSIGN } from '../../constants/CyberBugs/TaskConstants';
import { GET_PROJECT_DETAIL_API_SAGA } from '../../constants/CyberBugs/CyberBugsConstants'
import { CLOSE_DRAWER } from '../../constants/CyberBugs/DrawerConstants';
function* createTaskApiSagaTask(action) {
    try {
        const { data, status } = yield call(() => taskCyberBugsServices.createTaskApi(action.newTask));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_API_SAGA,
                projectId: data.content.projectId
            })
            openNotificationWithIcon('success', 'Add task successfully!')
        }
        yield put({
            type: CLOSE_DRAWER
        })

    } catch (err) {
        openNotificationWithIcon('error', 'Add task error!')
    }

}

export function* followCreateTaskApiSagaTask() {
    yield takeLatest(CREATE_TASK_API_SAGA, createTaskApiSagaTask)
}

function* getTaskDetailApiSaga(action) {
    try {
        const { data, status } = yield call(() => taskCyberBugsServices.getTaskDetailApi(action.taskId))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content
            })
        }
    } catch (err) {
        alert(err.response.data)
    }
}

export function* followGetTaskDetailApiSaga() {
    yield takeLatest(GET_TASK_DETAIL_API_SAGA, getTaskDetailApiSaga)
}

function* updateStatusTaskApiSaga(action) {
    try {
        const { status } = yield call(() => taskCyberBugsServices.updateStatusTaskApi(action.statusTaskUpdate))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_API_SAGA,
                projectId: action.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_API_SAGA,
                taskId: action.statusTaskUpdate.taskId
            })
        }
    } catch (err) {
        alert(err.response.data)
    }
}

export function* followUpdateStatusTaskApiSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_API_SAGA, updateStatusTaskApiSaga)
}

function* updateChangTaskApiSaga(action) {
    // eslint-disable-next-line default-case
    switch (action.actionType) {
        case HANDLE_CHANGE_TASK: {
            const { name, value } = action;
            yield put({
                type: HANDLE_CHANGE_TASK,
                name,
                value
            })
        }; break;
        case HANDLE_CHANGE_SELECT_USER_ASSIGN: {
            const { userAssign } = action;
            yield put({
                type: HANDLE_CHANGE_SELECT_USER_ASSIGN,
                userAssign
            })
        }; break;
        case HANDLE_DELETE_USER_ASSIGN: {
            const idUserAssign = action;
            yield put({
                type: HANDLE_DELETE_USER_ASSIGN,
                idUserAssign
            })
        }; break;
    }
    let { taskDetailModal } = yield select(state => state.TaskReducers)

    const listUserAsign = taskDetailModal.assigness.map(item => item.id)
    const taskUpdate = { ...taskDetailModal, listUserAsign }

    try {
        const { status } = yield call(() => taskCyberBugsServices.updateTaskApi(taskUpdate))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_API_SAGA,
                projectId: taskUpdate.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_API_SAGA,
                taskId: taskUpdate.taskId
            })
        }
    } catch (err) {
       alert(err.response.data)
    }
}

export function* followUpdateChangTaskApiSaga() {
    yield takeLatest(UPDATE_CHANGE_TASK_API_SAGA, updateChangTaskApiSaga)
}