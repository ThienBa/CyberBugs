import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_API_SAGA } from "../../constants/CyberBugs/PriorityConstants"
import { takeLatest, call, put } from 'redux-saga/effects'
import { priorityCyberBugsServices } from "../../../services/PriorityCyberBugsServices"
import { STATUS_CODE } from "../../../utils/constants/settingSystem"

function* getAllPriorityApiSaga(action) {
    try {
        const {data, status} = yield call(()=> priorityCyberBugsServices.getAllPriorityApi())

        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_ALL_PRIORITY,
                arrPriority: data.content
            })
        }
    }catch(err){
        alert(err.response.data)
    }
}

export function* followGetAllPriorityApiSaga() {
    yield takeLatest(GET_ALL_PRIORITY_API_SAGA, getAllPriorityApiSaga)
}