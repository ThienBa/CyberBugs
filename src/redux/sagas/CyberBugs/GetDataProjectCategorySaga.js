import { GET_DATA_PROJECT_CATEGORY, GET_DATA_PROJECT_CATEGORY_SAGA } from "../../constants/CyberBugs/CyberBugsConstants";
import { takeLatest, call, put } from 'redux-saga/effects'
import { ProjectCyberBugsServices } from "../../../services/ProjectCyberBugsServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";

function* getDataProjectCategoryApi(action) {
    try {
        const { data, status } = yield call(() => ProjectCyberBugsServices.getProjectCategoryApi())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_DATA_PROJECT_CATEGORY,
                data: data.content,
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* followGetDataProjectCategoryApi() {
    yield takeLatest(GET_DATA_PROJECT_CATEGORY_SAGA, getDataProjectCategoryApi)
}