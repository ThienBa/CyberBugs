import Swal from "sweetalert2";
import { GET_DATA_API } from "../constants/TodolistConstants";
import Axios from 'axios'

// const outputMessage = (dispatch, Promise) => {
//   Promise.then((res) => {
//     Swal.fire({
//       title: 'Success!',
//       text: 'Successful action!',
//       icon: 'success',
//       confirmButtonText: 'OK'
//     })
//     dispatch(getTaskListAPI())
//   }).catch((err) => {
//     Swal.fire({
//       title: 'Error!',
//       text: err.response.data,
//       icon: 'error',
//       confirmButtonText: 'OK'
//     })
//   })
// }

export const getTaskListAPI = () => {
    return async dispatch => {
        try {
            const { data, status } = await Axios({
                url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
                method: "GET"
            })
            if (status === 200) {
                dispatch({
                    type: GET_DATA_API,
                    taskList: data
                })
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.Message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }


        //#Viết theo promise axios
        // Promise.then((res) => {
        //   // console.log("Thành công!", result.data)
        //   dispatch({
        //     type: GET_DATA_API,
        //     taskList: res.data
        //   })
        // }).catch((error) => {
        //   // console.log(error.response.data)
        // });
    }
}

export const deleteTaskAPI = (taskName) => {
    return async dispatch => {
        try {
            const { data, status } = await Axios({
                url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: 'DELETE'
            })
            if (status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: data,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })

                dispatch(getTaskListAPI())
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.Message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

        // outputMessage(dispatch)
    }
}

export const doneTaskAPI = (taskName) => {
    return async dispatch => {
        try {
            const { status } = await Axios({
                url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
                method: 'PUT'
            })
            if (status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: "Done task successfully!",
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                dispatch(getTaskListAPI());
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.Message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
}

export const resetTaskAPI = (taskName) => {
    return async dispatch => {
        try {
            const { status } = await Axios({
                url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
                method: 'PUT'
            })
            if (status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: "Reset task successfully!",
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                dispatch(getTaskListAPI());
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.Message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
}

export const addTask = (error, value) => {
    return async dispatch => {
        try {
            if (error === "") {
                const { status } = await Axios({
                    url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
                    method: "POST",
                    data: {
                        taskName: value
                    }
                })
                if (status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Add task successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    dispatch(getTaskListAPI())
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.Message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }
}