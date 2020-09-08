import React from 'react'
import { Layout } from 'antd'
import Links from './Links'

const { Sider } = Layout

class Sidebar extends React.Component {
    state = {
        collapsed: false
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed})
    }

    renderLogo = () => {
        if(this.state.collapsed) {
            return <p className="logo-title">IC</p>
        } else {
            return <p className="logo-title">InterChat</p>
        }
    }

    render() {
        return (
            <Sider
                className="sidebar"
                theme='light'
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="sidebar-header">
                    { this.renderLogo() }
                </div>

                <div className="sidebar-content">
                    <Links/>
                </div>
            </Sider>
        )
    }
}

export default Sidebar