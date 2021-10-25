import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Input, Table, Button, Popconfirm } from 'antd'
import { deleteUserApiActions, getUsersApiActions } from '../../../redux/actions/CyberBugs/UserActions';
import FormEditUsersCyberBugs from '../../../components/Forms/CyberBugs/FormEditUsersCyberBugs';
import { openDrawerActions } from '../../../redux/actions/CyberBugs/DrawerActions';
import { getDataDrawerEditUserActions } from '../../../redux/actions/CyberBugs/DrawerActions'

export default function UserManagementCyberBugs() {
    const { arrListUser } = useSelector(state => state.UserCyberBugsReducers)
    const { userLogin } = useSelector(state => state.UserLoginCyberBugsReducer)
    const dispatch = useDispatch();
    const inputSearchRef = useRef(null)

    useEffect(() => {
        dispatch(getUsersApiActions())
    }, [])

    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                let disabledDelete = false;
                if (userLogin.id === record.userId) {
                    disabledDelete = true;
                }
                return <>
                    <Button type="dashed" className="mr-1 text-info" onClick={() => {
                        dispatch(openDrawerActions(<FormEditUsersCyberBugs />, 'Edit user'))
                        dispatch(getDataDrawerEditUserActions(record))
                    }}>Edit</Button>
                    <Popconfirm disabled={disabledDelete} placement="topRight" title={"Are you sure you want to delete this user?"} onConfirm={() => {
                        dispatch(deleteUserApiActions(record.userId))
                    }} okText="Yes" cancelText="No">
                        <Button disabled={disabledDelete} type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            },
            width: '15%'
        },
    ];

    return (
        <div className="container mt-5">
            <div className="form-group">
                <div className="row">
                    <div className="col-10">
                        <Input placeholder="Search user" ref={inputSearchRef} />
                    </div>
                    <div className="col-2">
                        <Button type="primary" onClick={() => {
                            dispatch(getUsersApiActions(inputSearchRef.current.state.value))
                        }}>Search</Button>
                    </div>
                </div>
            </div>

            <Table columns={columns} rowKey={"userId"} dataSource={arrListUser} size="middle" />
        </div>
    )
}
