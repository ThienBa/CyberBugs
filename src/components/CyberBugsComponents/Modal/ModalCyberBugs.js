import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStatusApiActions } from '../../../redux/actions/CyberBugs/StatusActions';
import { getAllPriorityApiActions } from '../../../redux/actions/CyberBugs/PriorityActions';
import { handleChangeSelectUserAssignActions, handleChangeTaskActions, handleDeleteUserAssignActions } from '../../../redux/actions/CyberBugs/TaskActions';
import parse from 'html-react-parser';
import { getAllTaskTypeApiActions } from '../../../redux/actions/CyberBugs/TaskTypeActions';
import { Editor } from '@tinymce/tinymce-react';
import { Popconfirm, Select } from 'antd';
import { addCommentApiSagaActions, deleteCommentApiSagaActions, editCommentApiSagaActions } from '../../../redux/actions/CyberBugs/CommentActions';



export default function ModalCyberBugs() {
    const { taskDetailModal } = useSelector(state => state.TaskReducers)
    const { arrStatus } = useSelector(state => state.StatusReducers)
    const { arrPriority } = useSelector(state => state.PriorityReducers)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducers)
    const { projectDetail } = useSelector(state => state.ProjectCyberBugsReducers)
    const { arrComment } = useSelector(state => state.CommentReducers)
    const { userLogin } = useSelector(state => state.UserLoginCyberBugsReducer)
    const [contentDescription, setContentDescription] = useState(taskDetailModal.description)
    const [visibleEditor, setVisibleEditor] = useState(false)

    //Add comment
    const [editorAddComment, setEditorAddComment] = useState({
        visible: false,
        content: '',
        disableSaveComment: true,
    });
    const editorAddCommentRef = useRef(null);
    //Edit comment
    const [editorEditComment, setEditorEditComment] = useState({
        visible: false,
        content: '',
        disableSaveComment: true,
        idComment: '',
    })
    const editorEditCommentRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllStatusApiActions())
        dispatch(getAllPriorityApiActions())
        dispatch(getAllTaskTypeApiActions())
    }, [])

    const renderOptionsSelect = () => {
        return projectDetail.members?.filter(member => {
            const index = taskDetailModal.assigness.findIndex(item => item.id == member.userId);
            if (index !== -1) {
                return false;
            }
            return true;
        }).map((item, index) => {
            return { label: item.name, value: item.userId }
        })
    }

    const renderProgressTimeTracking = () => {
        const valueMax = Number(taskDetailModal.timeTrackingSpent) + Number(taskDetailModal.timeTrackingRemaining)
        const widthProgress = Math.round(taskDetailModal.timeTrackingSpent / valueMax * 100);
        return <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: `${widthProgress}%` }} aria-valuenow={Number(taskDetailModal.timeTrackingSpent)} aria-valuemin={0} aria-valuemax={valueMax} />
        </div>
    }

    const renderDescription = () => {
        return <div>
            {visibleEditor ? <div>
                <Editor
                    name="description"
                    initialValue={taskDetailModal.description}
                    onEditorChange={(value) => {
                        setContentDescription(value);
                    }}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                <div className="form-group">
                    <button className="btn btn-primary m-1" onClick={() => {
                        dispatch(handleChangeTaskActions('description', contentDescription));
                        setVisibleEditor(false);
                    }}>Save</button>
                    <button className="btn btn-secondary m-1" onClick={() => {
                        setVisibleEditor(false);
                    }}>Close</button>
                </div>
            </div> : <div onClick={() => { setVisibleEditor(!visibleEditor) }}>{parse(taskDetailModal.description)}</div>
            }
        </div >
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(handleChangeTaskActions(name, value));
    }

    //=============================================HANDLE COMMENTS=============================================
    //Edit comment
    const handleChangeEditorEditComment = () => {
        if (editorEditCommentRef.current.getContent()) {
            setEditorEditComment({
                ...editorEditComment,
                content: editorEditCommentRef.current.getContent(),
                disableSaveComment: false,
            })
        } else {
            setEditorEditComment({
                ...editorEditComment,
                disableSaveComment: true,
            })
        }
    }

    const renderComments = () => {
        return arrComment?.filter(item => item.taskId === taskDetailModal?.taskId).reduceRight((listComment, item, index) => {
            listComment.push(<div className="comment-item" key={index}>
                <div className="display-comment mt-2" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={item.user.avatar} alt={item.user.name} />
                    </div>
                    <div>
                        <b style={{ marginBottom: 5 }}>
                            {item.user.name}
                        </b>
                        {editorEditComment.visible && editorEditComment.idComment === item.id ?
                            <div>
                                <Editor
                                    name="description"
                                    onEditorChange={handleChangeEditorEditComment}
                                    value={editorEditComment.content}
                                    onInit={(evt, editor) => editorEditCommentRef.current = editor}
                                    init={{
                                        height: 150,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                                <div className="form-group">
                                    <button className="btn btn-primary m-1" disabled={editorEditComment.disableSaveComment} onClick={() => {
                                        dispatch(editCommentApiSagaActions(taskDetailModal.taskId, editorEditComment.idComment, editorEditComment.content))
                                        setEditorEditComment({
                                            ...editorEditComment,
                                            visible: false,
                                        })
                                    }}>Save</button>
                                    <button className="btn btn-secondary m-1" onClick={() => {
                                        setEditorEditComment({
                                            ...editorEditComment,
                                            visible: false,
                                        })
                                    }}>Close</button>
                                </div>
                            </div> :
                            <div>
                                {parse(item.contentComment)}
                            </div>
                        }
                        {userLogin.id === item.userId ?
                            <div>
                                <span style={{ color: '#929398', cursor: 'pointer' }} onClick={() => {
                                    setEditorEditComment({
                                        ...setEditorEditComment,
                                        content: item.contentComment,
                                        visible: true,
                                        disableSaveComment: true,
                                        idComment: item.id
                                    })
                                }}>Edit</span>
                                •
                                <Popconfirm placement="topLeft" title="Are you sure delete the comment?" onConfirm={() => {
                                    dispatch(deleteCommentApiSagaActions(taskDetailModal.taskId, item.id))
                                }} okText="Yes" cancelText="No">
                                    <span style={{ color: '#929398', cursor: 'pointer' }} >Delete</span>
                                </Popconfirm>
                            </div> : ""}
                    </div>
                </div>
            </div>)
            return listComment;
        }, [])
    }

    //Add comment
    const handleChangeEditorAddComment = () => {
        if (editorAddCommentRef.current.getContent()) {
            setEditorAddComment({
                ...editorAddComment,
                content: editorAddCommentRef.current.getContent(),
                disableSaveComment: false,
            })
        } else {
            setEditorAddComment({
                ...editorAddComment,
                disableSaveComment: true
            })
        }
    }

    const renderBlockAddComment = () => {
        if (editorAddComment.visible) {
            return <div>
                <Editor
                    name="description"
                    onEditorChange={handleChangeEditorAddComment}
                    onInit={(evt, editor) => editorAddCommentRef.current = editor}
                    init={{
                        height: 150,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                <div className="form-group">
                    <button className="btn btn-primary m-1" disabled={editorAddComment.disableSaveComment} onClick={() => {
                        dispatch(addCommentApiSagaActions(taskDetailModal.taskId, editorAddComment.content))
                        setEditorAddComment({
                            ...editorAddComment,
                            visible: false,
                        })
                    }}>Save</button>
                    <button className="btn btn-secondary m-1" onClick={() => {
                        setEditorAddComment({
                            ...editorAddComment,
                            visible: false,
                        })
                    }}>Close</button>
                </div>
            </div>
        }
        return <div className="block-comment" style={{ display: 'flex' }}>
            <div className="avatar">
                <img src={userLogin.avatar} alt={userLogin.name} />
            </div>
            <div className="input-comment">
                <input type="text" placeholder="Add a comment ..." onClick={() => {
                    setEditorAddComment({
                        ...editorAddComment,
                        disableSaveComment: true,
                        visible: !editorAddComment.visible
                    })
                }} />
                <p>
                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                    <span>press
                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                        to comment</span>
                </p>
            </div>
        </div>
    }

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title" style={{
                            width: '550px',
                        }}>
                            <div className="row">
                                <div className="col-1 p-0 text-right">
                                    {taskDetailModal.typeId == 1 ? <i className="fa fa-bug text-danger"></i> : <i className="fa fa-bookmark" />}
                                </div>
                                <div className="col-3">
                                    <select name="typeId" className="form-control" value={taskDetailModal.typeId} onChange={handleChange}>
                                        {arrTaskType?.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.taskType}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-8">
                                    <h5>{taskDetailModal.taskName}</h5>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-7">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <b>Description</b>
                                        {renderDescription()}
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        {renderBlockAddComment()}
                                        <div className="lastest-comment">
                                            {renderComments()}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name="statusId" className="custom-select" value={taskDetailModal.statusId} onChange={handleChange}>
                                            {arrStatus?.map((item, index) => {
                                                return <option key={index} value={item.statusId}>{item.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className="row">
                                            {taskDetailModal.assigness?.map((item, index) => {
                                                return (
                                                    <div key={index} className="col-6 mt-2">
                                                        <div style={{ display: 'flex' }} className="item">
                                                            <div className="avatar">
                                                                <img src={item.avatar} alt={item.name} />
                                                            </div>
                                                            <p className="name mt-1 ml-1">
                                                                {item.name}
                                                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                                                    dispatch(handleDeleteUserAssignActions(item.id))
                                                                }} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            <div className="col-6 mt-2">
                                                <Select
                                                    showSearch
                                                    options={renderOptionsSelect()}
                                                    onSelect={(value) => {
                                                        let userAssign = projectDetail.members?.find(item => item.userId == value);
                                                        userAssign = { ...userAssign, id: userAssign.userId }
                                                        dispatch(handleChangeSelectUserAssignActions(userAssign))
                                                    }}
                                                    value={<><i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span></>}
                                                    style={{ width: 140 }}
                                                    optionFilterProp="label"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority mt-3" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select className="form-control" name="priorityId" value={taskDetailModal.priorityId} onChange={handleChange}>
                                            {arrPriority?.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="number" name="originalEstimate" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={handleChange} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        <div style={{ display: 'flex' }}>
                                            <i className="fa fa-clock" />
                                            <div style={{ width: '100%' }}>
                                                {renderProgressTimeTracking()}
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className="logged">{taskDetailModal.timeTrackingSpent}h logged</p>
                                                    <p className="estimate-time">{taskDetailModal.timeTrackingRemaining}h remaining</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name="timeTrackingSpent" onChange={handleChange} value={taskDetailModal.timeTrackingSpent} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name="timeTrackingRemaining" onChange={handleChange} value={taskDetailModal.timeTrackingRemaining} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
