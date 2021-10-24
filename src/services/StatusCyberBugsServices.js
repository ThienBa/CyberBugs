import { ListAxiosServices } from './ListAxiosServices'
class StatusCyberBugsServices extends ListAxiosServices {
    constructor() {
        super()
    }
    getAllStatusApi = () => {
        return this.get('Status/getAll')
    }
}

export const statusCyberBugsServices = new StatusCyberBugsServices();