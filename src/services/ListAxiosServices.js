import Axios from "axios"
import { DOMAIN_CYBERBUGS, TOKEN } from "../utils/constants/settingSystem"

export class ListAxiosServices {
    post = (url, data) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'POST',
            data,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) },
        })
    }
    put = (url, data) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'PUT',
            data,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) },
        })
    }
    get = (url) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'GET',
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) },
        })
    }
    delete = (url) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'DELETE',
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) },
        })
    }
}
export const listAxiosServices = new ListAxiosServices();