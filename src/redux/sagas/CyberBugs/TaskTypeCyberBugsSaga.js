import { takeLatest, call, put } from 'redux-saga/effects'
import { taskTypeCyberBugsServices } from '../../../services/TaskTypeCyberBugsServices'
import { STATUS_CODE } from "../../../utils/constants/settingSystem"
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_API_SAGA } from "../../constants/CyberBugs/TaskTypeConstants"

function* getAllTaskTypeApiSaga(action) {
    try {
        const {data, status} = yield call(()=> taskTypeCyberBugsServices.getAllTaskTypeApi())

        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_ALL_TASK_TYPE,
                arrTaskType: data.content
            })
        }
    }catch(err){
       alert(err.response.data)
    }
}

export function* followGetAllTaskTypeApiSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_API_SAGA, getAllTaskTypeApiSaga)
}