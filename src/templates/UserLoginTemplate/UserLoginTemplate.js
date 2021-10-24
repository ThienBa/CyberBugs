import React, { useEffect, useState } from 'react'
import { Route } from 'react-router';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
    const [{ width, height }, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    },[])

    const { Component, ...restParams } = props;
    return <Route {...restParams} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={width / 2} style={{ height: height, backgroundImage: "url('https://images.unsplash.com/photo-1634148828015-e4a47d858586?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80')", backgroundSize: "cover" }}>
                </Sider>
                <Content>
                    <Component {...propsRoute} />
                </Content>
            </Layout>
        </>
    }} />
}