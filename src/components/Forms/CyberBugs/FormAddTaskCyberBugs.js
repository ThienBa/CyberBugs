import React, { useEffect, useRef, useState } from 'react';
import { Select, Slider } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { getListProjectApiActions } from '../../../redux/actions/CyberBugs/ProjectActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllPriorityApiActions } from '../../../redux/actions/CyberBugs/PriorityActions';
import { getAllTaskTypeApiActions } from '../../../redux/actions/CyberBugs/TaskTypeActions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTaskApiActions } from '../../../redux/actions/CyberBugs/TaskActions';
import { getAllStatusApiActions } from '../../../redux/actions/CyberBugs/StatusActions';
import { getUserByProjectIdApiActions, getUserSearchApiActions } from '../../../redux/actions/CyberBugs/UserActions';
import { setSubmitDrawerActions } from '../../../redux/actions/CyberBugs/DrawerActions';

export default function FormAddTaskCyberBugs() {
    const { arrListProject } = useSelector(state => state.ProjectCyberBugsReducers)
    const { arrPriority } = useSelector(state => state.PriorityReducers)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducers)
    const { arrUserByProject } = useSelector(state => state.ProjectCyberBugsReducers)
    const { arrStatus } = useSelector(state => state.StatusReducers)
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

    const userByProjectOption = arrUserByProject?.map((item, index) => {
        return { label: item.name, value: item.userId.toString() };
    })

    const formik = useFormik({
        enableReinitialize: true, //Load lại formil khi state hoặc props thay đổi
        initialValues: { //Đưa dữ liệu từ reducer vào formik để có thể validation form
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrListProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
        },
        validationSchema: Yup.object().shape({

        }),
        onSubmit: values => {
            dispatch(createTaskApiActions(values))
        },
    });

    useEffect(() => {
        dispatch(getListProjectApiActions())
        dispatch(getAllPriorityApiActions())
        dispatch(getAllTaskTypeApiActions())
        dispatch(getAllStatusApiActions())
        dispatch(setSubmitDrawerActions(formik.handleSubmit))
        dispatch(getUserSearchApiActions(""))
    }, [])

    const logDescription = () => {
        if (editorRef.current) {
            formik.setFieldValue('description', editorRef.current.getContent())
        }
    }

    return (
        <form className="container-fluid" onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="projectId">Project</label>
                        <select name="projectId" id="projectId" className="form-control" onChange={(e) => {
                            const { value } = e.target;
                            dispatch(getUserByProjectIdApiActions(value));
                            formik.setFieldValue('projectId', value)
                        }}>
                            {arrListProject?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.projectName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="statusId">Status</label>
                        <select name="statusId" id="statusId" className="form-control" onChange={formik.handleChange}>
                            {arrStatus?.map((item, index) => {
                                return <option key={index} value={item.statusId}>{item.statusName}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="taskName">Task name</label>
                <input type="text" name="taskName" id="taskName" className="form-control" onChange={formik.handleChange} />
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="priorityId">Priority</label>
                        <select name="priorityId" id="priorityId" className="form-control" onChange={formik.handleChange}>
                            {arrPriority?.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="typeId">Task type</label>
                        <select name="typeId" id="typeId" className="form-control" onChange={formik.handleChange}>
                            {arrTaskType?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="listUserAsign">Assignees</label>
                        <Select
                            mode="tags"
                            name="listUserAsign"
                            id="listUserAsign"
                            style={{ width: '100%' }}
                            placeholder="Tags Mode"
                            optionFilterProp="label"
                            options={userByProjectOption}
                            onChange={(values) => {
                                formik.setFieldValue('listUserAsign', values);
                            }}>
                        </Select>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="timeTracking">Time tracking</label>
                        <Slider defaultValue={30} value={Number(timeTracking.timeTrackingSpent)} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} id="timeTracking" />
                        <div className="row">
                            <div className="col-6">
                                <b>{timeTracking.timeTrackingSpent}h logged</b>
                            </div>
                            <div className="col-6 text-right">
                                <b>{timeTracking.timeTrackingRemaining}h remaining</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="originalEstimate">Original Estimate</label>
                    <input type="number" name="originalEstimate" id="originalEstimate" min="0" defaultValue={0} className="form-control" onChange={formik.handleChange} />
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="timeTrackingSpent">Time spent</label>
                            <input type="number" name="timeTrackingSpent" id="timeTrackingSpent" min="0" defaultValue={0} className="form-control" onChange={(e) => {
                                setTimeTracking({
                                    ...timeTracking,
                                    timeTrackingSpent: e.target.value,
                                })
                                formik.setFieldValue("timeTrackingSpent", e.target.value)
                            }} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="timeTrackingRemaining">Time remaining</label>
                            <input type="number" name="timeTrackingRemaining" id="timeTrackingRemaining" min="0" defaultValue={0} className="form-control" onChange={(e) => {
                                setTimeTracking({
                                    ...timeTracking,
                                    timeTrackingRemaining: e.target.value,
                                })
                                formik.setFieldValue("timeTrackingRemaining", e.target.value)
                            }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group mt-3">
                        <label htmlFor="description">Description</label>
                        <Editor
                            name="description"
                            onEditorChange={logDescription}
                            onInit={(evt, editor) => editorRef.current = editor}
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
                    </div>
                </div>
            </div>
        </form>
    )
}
