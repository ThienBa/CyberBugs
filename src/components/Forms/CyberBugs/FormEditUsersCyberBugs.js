import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { setSubmitDrawerActions } from '../../../redux/actions/CyberBugs/DrawerActions';
import { editUserApiActions } from '../../../redux/actions/CyberBugs/UserActions';

export default function FormEditUsersCyberBugs() {
    const { userId, name, email, phoneNumber } = useSelector(state => state.DrawerReducers.userEdit)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSubmitDrawerActions(formik.handleSubmit))
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: userId,
            name,
            email,
            phoneNumber
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            name: Yup.string().required('Name is required'),
            phoneNumber: Yup.string().required('Phone number is required').matches(
                /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
                "Invalid phone number"
            ),
        }),
        onSubmit: values => {
            dispatch(editUserApiActions(values))
        },
    });

    return (
        <div className='container-fluid'>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-2">
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input type="text" name="id" className="form-control" disabled value={formik.values.id} />
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger ml-1">{formik.errors.email}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-danger ml-1">{formik.errors.name}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone number</label>
                            <input type="text" name="phoneNumber" className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div className="text-danger ml-1">{formik.errors.phoneNumber}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
