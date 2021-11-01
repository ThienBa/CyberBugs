import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { getProjectCategoryApiActions, updateProjectApiActions } from '../../../redux/actions/CyberBugs/ProjectActions';
import * as Yup from 'yup'
import { setSubmitDrawerActions } from '../../../redux/actions/CyberBugs/DrawerActions';

export default function FormEditProjectCyberBugs() {
    const { arrProjectCategory } = useSelector(state => state.GetDataProjectCategoryReducers)
    const { id, projectName, description, categoryId } = useSelector(state => state.DrawerReducers.projectEdit)
    const editorRef = useRef(null);
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,  //Reload formik when state or props change
        initialValues: { //Put data from reducer into formik to be able to validate form
            id,
            projectName,
            description,
            categoryId,
        },
        validationSchema: Yup.object().shape({

        }),
        onSubmit: values => {
            dispatch(updateProjectApiActions(values))
        },
    });

    useEffect(() => {
        dispatch(setSubmitDrawerActions(formik.handleSubmit))
        dispatch(getProjectCategoryApiActions())
    }, [])

    const log = () => {
        if (editorRef.current) {
            formik.setFieldValue('description', editorRef.current.getContent())
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="w-100">
                <form className='container-fluid' onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-2">
                            <div className="form-group">
                                <label htmlFor="projectName">ID</label>
                                <input
                                    value={formik.values.id}
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    className="form-control"
                                    disabled={true} />
                            </div>
                        </div>
                        <div className="col-10">
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
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectName">Name</label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.projectName}
                            type="text"
                            id="projectName"
                            name="projectName"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Editor
                            onEditorChange={log}
                            value={formik.values.description}
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
                </form>
            </div>
        </div>
    )
}
