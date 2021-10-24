import { ListAxiosServices } from "./ListAxiosServices";

class CommentCyberBugsServices extends ListAxiosServices {
    constructor() {
        super();
    }
    getAllCommentApi = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`);
    }
    insertCommentApi = (commentInsert) => {
        return this.post('Comment/insertComment', commentInsert);
    }
    updateCommentApi = (idComment, contentComment) => {
        return this.put(`Comment/updateComment?id=${idComment}&contentComment=${contentComment}`);
    }
    deleteCommentApi = (idComment) => {
        return this.delete(`Comment/deleteComment?idComment=${idComment}`);
    }
}

export const commentCyberBugsServices = new CommentCyberBugsServices();