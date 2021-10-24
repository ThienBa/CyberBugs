import React from 'react'
import { Drawer, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawerEditProjectActions } from '../../../redux/actions/CyberBugs/CyberBugsActions';


export default function DrawerEditProject() {
    const { visible, Component, handleSubmitEditForm, title } = useSelector(state => state.DrawerEditProjectReducers)
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(closeDrawerEditProjectActions());
    };

    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                {Component}
                <Space style={{ position: 'absolute', top: 15, right: 10, zIndex: 10 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={() => { handleSubmitEditForm() }} type="primary">
                        Submit
                    </Button>
                </Space>
            </Drawer >
        </>
    );
}
