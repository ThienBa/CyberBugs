import React from 'react'
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { userLoginApiActions } from '../../../redux/actions/CyberBugs/UserActions';
import { NavLink } from 'react-router-dom';


export default function LoginCyberBugs(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            passWord: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            passWord: Yup.string()
                .min(6, 'Must be more than 6 characters')
                .max(32, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            dispatch(userLoginApiActions(values))
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center h-100">
            <div>
                <h1 className="display-4">Login CyberBugs</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    name="normal_login"
                    className="login-form"
                >
                    <div className="form-group">
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            name="email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            name="passWord"
                            placeholder="Password"
                        />
                        {formik.touched.Password && formik.errors.Password ? (
                            <div className="text-danger">{formik.errors.passWord}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <Button style={{ backgroundColor: "#5A89E5" }} htmlType="submit" className="login-form-button w-100 text-white">
                            Log in
                        </Button>
                    </div>
                    <div className="form-group text-center mb-0">
                        <Button className="mr-1" type="link" style={{ backgroundColor: "#1877F2", color: "#fff", width: 40, height: 40, borderRadius: "50%", border: "none" }}>
                            <i className="fab fa-facebook-f"></i>
                        </Button>
                        <Button type="link" style={{ backgroundColor: "#1DA1F2", color: "#fff", width: 40, height: 40, borderRadius: "50%", border: "none" }}>
                            <i className="fab fa-twitter"></i>
                        </Button>
                    </div>
                    <div className="form-group text-right">
                        Or  <NavLink to="/register">register now!</NavLink>
                    </div>
                </form>
            </div>
        </div >
    )
}
