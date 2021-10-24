import React, { useState } from 'react'
import { Menu, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SearchOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openDrawerAddTaskActions } from '../../../redux/actions/CyberBugs/CyberBugsActions';
import FormAddTaskCyberBugs from '../../Forms/CyberBugs/FormAddTaskCyberBugs';

export default function SideBarCyberBugs() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        collapsed: false,
    })

    const toggleCollapsed = () => {
        setState({
            collapsed: !state.collapsed,
        });
    }

    return (
        <div style={{ backgroundColor: "#001529" }}>
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={state.collapsed}
                style={{ height: "109vh" }}
            >
                <Menu.Item key="1" icon={<PlusCircleOutlined />} onClick={() => {
                    dispatch(openDrawerAddTaskActions(<FormAddTaskCyberBugs />, 'Add task'))
                }}>
                    Create task
                </Menu.Item>
                <Menu.Item key="2" icon={<SearchOutlined />}>
                    Search issue
                </Menu.Item>
            </Menu>
        </div>
    )
}
