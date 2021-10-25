import React, { useEffect, useRef, useState } from 'react'
import { Table, Tag, Popconfirm, Avatar, Popover, AutoComplete } from 'antd';
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {deleteProjectApiActions, getListProjectApiActions } from '../../../redux/actions/CyberBugs/ProjectActions';
import FormEditProjectCyberBugs from '../../../components/Forms/CyberBugs/FormEditProjectCyberBugs';
import { NavLink } from 'react-router-dom';
import { assignUserProjectActions, getUserSearchApiActions, removeUserFromProjectActions } from '../../../redux/actions/CyberBugs/UserActions';
import { getDataDrawerEditProjectActions, openDrawerActions} from '../../../redux/actions/CyberBugs/DrawerActions';

const textPopConfirm = () => {
    return "Are you sure you want to delete this project?"
}

export default function ProjectManagementCyberBugs() {
    const { arrListProject } = useSelector(state => state.ProjectCyberBugsReducers)
    const { userSearches } = useSelector(state => state.ProjectCyberBugsReducers)
    const dispatch = useDispatch();
    const [stateAutoComplete, setStateAutoComplete] = useState('');
    const searchUserRef = useRef();

    const confirm = (id) => {
        dispatch(deleteProjectApiActions(id))
    }

    useEffect(() => {
        dispatch(getListProjectApiActions())
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id', //Phân biệt header table
            key: 'id', //Là thuộc tính
            sorter: (item2, item1) => item2.id - item1.id,
            sortDirections: ['descend'],
        },
        {
            title: 'Project name',
            dataIndex: 'projectName',
            key: 'projectName',
            // ...getColumnSearchProps('projectName'),
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
            },
            sorter: (item2, item1) => {
                if (item2.projectName.trim().toLowerCase() < item1.projectName.trim().toLowerCase()) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
            // ...getColumnSearchProps('categoryName'),
            // sorter: (a, b) => a.categoryName.length - b.categoryName.length,
            // sortDirections: ['descend', 'ascend'],
            sorter: (item2, item1) => {
                if (item2.categoryName.trim().toLowerCase() < item1.categoryName.trim().toLowerCase()) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="magenta">{record.creator?.name}</Tag>
            },
            // ...getColumnSearchProps('description'),
            sorter: (item2, item1) => {
                if (item2.creator.name.trim().toLowerCase() < item1.creator.name.trim().toLowerCase()) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: "Members",
            key: 'members',
            render: (text, record, index) => {
                return <>
                    {record.members?.slice(0, 3).map((item, index) => {
                        return (
                            <Popover key={index} placement="top" title={"Add members"} content={() => {
                                return <table className="table table-striped table-inverse table-responsive">
                                    <thead className="thead-inverse">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Avatar</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.members?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.userId}</td>
                                                    <td>{item.name}</td>
                                                    <td><Avatar src={item.avatar} /></td>
                                                    <td><button onClick={() => {
                                                        dispatch(removeUserFromProjectActions(record.id, item.userId))
                                                    }} className="btn btn-danger" style={{ borderRadius: "50%" }}>X</button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            }} trigger="hover">
                                <Avatar
                                    style={{ marginLeft: -10 }}
                                    src={item.avatar}
                                />
                            </Popover>
                        )
                    })}
                    {record.members?.length > 3 ? <Avatar style={{ marginLeft: -10 }}>...</Avatar> : ""}
                    <Popover placement="top" title={"Add members"} content={() => {
                        return <AutoComplete
                            options={userSearches?.map((item, index) => {
                                return { label: item.name, value: item.userId.toString() };
                            })}
                            style={{ width: "100%" }}
                            value={stateAutoComplete}
                            onChange={(value) => {
                                setStateAutoComplete(value);
                            }}
                            onSelect={(value, options) => {
                                setStateAutoComplete(options.label)
                                dispatch(assignUserProjectActions(record.id, value))
                            }}
                            onSearch={(value) => {
                                if (searchUserRef.current) {
                                    clearTimeout(searchUserRef.current)
                                }
                                //Đặt useRef để khi render lại không mất giá trị
                                searchUserRef.current = setTimeout(() => {
                                    dispatch(getUserSearchApiActions(value))
                                }, 300)
                            }}
                            placeholder="Search here"
                        />
                    }} trigger="click">
                        <Avatar style={{ backgroundColor: "gray", cursor: "pointer", marginLeft: -10 }}>+</Avatar>
                    </Popover>
                </>
            }
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <>
                        <button onClick={() => {
                            dispatch(openDrawerActions(<FormEditProjectCyberBugs />, 'Edit project'))
                            dispatch(getDataDrawerEditProjectActions(record))
                        }} className="btn btn-info mr-2"><EditOutlined /></button>
                        <Popconfirm placement="topRight" title={textPopConfirm} onConfirm={() => { confirm(record.id) }} okText="Yes" cancelText="No">
                            <button className="btn btn-danger"><DeleteOutlined /></button>
                        </Popconfirm>
                    </>
                )
            },
            // ...getColumnSearchProps('categoryName'),
            // sorter: (a, b) => a.categoryName.length - b.categoryName.length,
            // sortDirections: ['descend', 'ascend'],
        },
    ];
    return <div className="container mt-3">
        <h1 style={{ fontWeight: 300 }}>Project Management</h1>
        <Table columns={columns} rowKey={"id"} dataSource={arrListProject} />
    </div>
}
