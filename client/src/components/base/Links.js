import React from 'react'
import { Menu } from 'antd'

import {
    HomeOutlined,
    InfoCircleOutlined,
    LogoutOutlined
} from '@ant-design/icons'

class Links extends React.Component {
    render() {
        return (
            <Menu
                className="sidebar-menu"
                mode='inline'
                defaultOpenKeys={['home']}
                defaultSelectedKeys={['home']}
            >
                <Menu.Item key='home' icon={<HomeOutlined/>}>
                    Home
                </Menu.Item>
                <Menu.Item key='about' icon={<InfoCircleOutlined/>}>
                    About
                </Menu.Item>
                <Menu.Item key='logout' icon={<LogoutOutlined/>}>
                    Logout
                </Menu.Item>
            </Menu>
        )
    }
}

export default Links