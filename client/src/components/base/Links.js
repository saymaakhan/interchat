import React from 'react'
import { Menu } from 'antd'
import { connect } from 'react-redux'
import {create_job, get_jobs} from '../../store/actions/core.actions'

import {
    HomeOutlined,
    InfoCircleOutlined,
    LogoutOutlined
} from '@ant-design/icons'

import JobForm from '../modals/JobForm';

const { SubMenu } = Menu;

class Links extends React.Component {
    formRef = React.createRef()

    state = {
        showModal: false,
    }

    addJob = () => {
        this.setState({showModal: true})
    }

    handleOk = async (tags) => {
        let formData;

        if(this.formRef.current) {
            formData = this.formRef.current.getFieldsValue()
        }

        formData.skills = tags
        await this.props.create_job(this.props.token, formData)
        this.props.get_jobs(this.props.token, this.props.userID, this.props.profile_type)

        this.setState({showModal: false})
    }

    handleCancel = () => {
        this.setState({showModal: false})
    }

    render() {
        return (
            <div>
                <Menu
                    className="sidebar-menu"
                    mode='inline'
                    defaultOpenKeys={['home']}
                    defaultSelectedKeys={['home']}
                >
                    <SubMenu key='home' title={<span><HomeOutlined/><span>Home</span></span>}>
                        <Menu.Item key='add-job' onClick={this.addJob}>Add Job</Menu.Item>
                    </SubMenu>
                    <Menu.Item key='about' icon={<InfoCircleOutlined/>}>
                        About
                    </Menu.Item>
                    <Menu.Item key='logout' icon={<LogoutOutlined/>}>
                        Logout
                    </Menu.Item>
                </Menu>

                <JobForm
                    showModal={this.state.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    formRef={this.formRef}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userID: state.auth.userID,
        profile_type: state.auth.profile_type,    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_jobs: (token, userID, profile_type) => dispatch(get_jobs(token, userID, profile_type)),
        create_job: (token, job) => dispatch(create_job(token, job)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Links)