import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createProjectApiActions, getProjectCategoryApiActions } from '../../../redux/actions/CyberBugs/CyberBugsActions';

export default function CreateProjectCyberBugs() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProjectCategoryApiActions())
    }, [])

    const { arrProjectCategory } = useSelector(state => state.GetDataProjectCategoryReducers)

    const editorRef = useRef(null);

    const formik = useFormik({
        enableReinitialize: true, //Load lại formil khi state hoặc props thay đổi
        initialValues: {
            projectName: '',
            description: '',
            categoryId: arrProjectCategory[0]?.id,
        },
        onSubmit: values => {
            dispatch(createProjectApiActions(values))
        },
    });


    const log = () => {
        if (editorRef.current) {
            formik.setFieldValue('description', editorRef.current.getContent())
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="w-75">
                <h1 style={{ fontWeight: 300 }}>Create Project</h1>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="projectName">Name</label>
                        <input
                            onChange={formik.handleChange}
                            type="text"
                            id="projectName"
                            name="projectName"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Editor
                            name="description"
                            onEditorChange={log}
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                height: 400,
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
                    <div className="form-group">
                        <label htmlFor="categoryId">Project Category</label>
                        <select
                            onChange={formik.handleChange}
                            value={formik.values.categoryId}
                            name="categoryId"
                            id="categoryId"
                            className="form-control">
                            {arrProjectCategory.map((item, index) => {
                                return (
                                    <option value={item.id} key={index}>{item.projectCategoryName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-info">Create Project</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
