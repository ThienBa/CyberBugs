import { ListAxiosServices } from "./ListAxiosServices";

class PriorityCyberBugsServices extends ListAxiosServices {
    constructor() {
        super();
    }
    getAllPriorityApi = () => {
        return this.get('Priority/getAll')
    }
}

export const priorityCyberBugsServices = new PriorityCyberBugsServices();