import { ListAxiosServices } from "./ListAxiosServices";

class UserCyberBugsServices extends ListAxiosServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    userLoginApi = (userLogin) => {
        return this.post('Users/signin', userLogin)
    }
    getUserSearchApi = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }
    assignUserProjectApi = (userProject) => {
        return this.post('Project/assignUserProject', userProject)
    }
    removeUserFromProjectApi = (userProject) => {
        return this.post('Project/removeUserFromProject', userProject)
    }
    getUserByProjectIdApi = (projectId) => {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`)
    }

    //==========================================USERS==========================================
    userSignUpApi = (newUser) => {
        return this.post('Users/signup', newUser)
    }
    getUsersApi = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`)
    }
    deleteUserApi = (userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`)
    }
    editUserApi = (userEdit) => {
        return this.put(`Users/editUser`, userEdit)
    }
}

export const userCyberBugsServices = new UserCyberBugsServices()