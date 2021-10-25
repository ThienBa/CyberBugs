import { Input } from 'antd'
import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userSignUpApiActions } from '../../../redux/actions/CyberBugs/UserActions';
import { useDispatch } from 'react-redux';

export default function RegisterCyberBugs() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            passWord: '',
            passwordConfirm: '',
            name: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            passWord: Yup.string()
                .min(6, 'Must be more than 6 characters')
                .max(32, 'Must be 32 characters or less')
                .required('Password is required'),
            passwordConfirm: Yup.string().oneOf([Yup.ref('passWord'), null], 'Password confirm must match'),
            name: Yup.string().required('Name is required'),
            phoneNumber: Yup.string().required('Phone number is required').matches(
                /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
                "Invalid phone number"
            ),
        }),
        onSubmit: values => {
            dispatch(userSignUpApiActions(values))
        }
    });

    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="w-50">
                <h1 className="display-4 text-center">Sign up</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            name="email"
                            prefix={<MailOutlined className="site-form-item-icon text-dark" />}
                            placeholder="Email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger ml-1">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passWord}
                            type="password"
                            name="passWord"
                            prefix={<LockOutlined className="site-form-item-icon text-dark" />}
                            placeholder="Password"
                        />
                        {formik.touched.passWord && formik.errors.passWord ? (
                            <div className="text-danger ml-1">{formik.errors.passWord}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirm}
                            type="password"
                            name="passwordConfirm"
                            prefix={<LockOutlined className="site-form-item-icon text-dark" />}
                            placeholder="Password confirm"
                        />
                        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                            <div className="text-danger ml-1">{formik.errors.passwordConfirm}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                            name="phoneNumber"
                            prefix={<PhoneOutlined className="site-form-item-icon text-dark" />}
                            placeholder="Phone number"
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                            <div className="text-danger ml-1">{formik.errors.phoneNumber}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            name="name"
                            prefix={<UserOutlined className="site-form-item-icon text-dark" />}
                            placeholder="Name"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger ml-1">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-group text-center">
                        <NavLink to="/login"><button className="btn btn-outline-info mr-1">Login</button></NavLink>
                        <button type="submit" className="btn btn-outline-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
