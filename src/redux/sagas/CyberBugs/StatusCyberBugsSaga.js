import { call, takeLatest, put } from 'redux-saga/effects'
import { statusCyberBugsServices } from "../../../services/StatusCyberBugsServices"
import { STATUS_CODE } from '../../../utils/constants/settingSystem'
import { GET_ALL_STATUS, GET_ALL_STATUS_API_SAGA } from '../../constants/CyberBugs/StatusConstants'

function* getAllStatusApiSaga() {
    try {
        const { data, status } = yield call(() => statusCyberBugsServices.getAllStatusApi())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_STATUS,
                arrStatus: data.content,
            })
        }
    } catch (err) {
        alert(err.response?.data)
    }

}

export function* followGetAllStatusApiSaga() {
    yield takeLatest(GET_ALL_STATUS_API_SAGA, getAllStatusApiSaga)
}