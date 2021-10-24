import React from 'react'
import { Route } from 'react-router';
import SideBarCyberBugs from '../../components/CyberBugsComponents/SideBar/SideBarCyberBugs';
import MenuCyberBugs from '../../components/CyberBugsComponents/Menu/MenuCyberBugs';
import "../../index.css";
import ModalCyberBugs from '../../components/CyberBugsComponents/Modal/ModalCyberBugs';

export const CyberBugsTemplate = (props) => {
    const { Component, ...resParams } = props;
    return <Route {...resParams} render={(propsRoute) => {
        return (
            <div className="jira">
                <SideBarCyberBugs />
                <MenuCyberBugs />
                <div className="main" style={{ width: "75vw" }}>
                    <Component {...propsRoute} />
                </div>
                <ModalCyberBugs />
            </div>
        )
    }}></Route>
}