import React from 'react'
import { Button, Descriptions, Table } from 'antd'
import { connect } from 'react-redux'
import {create_application, get_applications, select_application, get_responses} from '../../store/actions/core.actions'

import Interview from '../modals/Interview'
import Application from '../modals/Application'

class JobView extends React.Component {
    state = {
        showModal: false,
        showDrawer: false,

        application: null
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.selectedJob !== this.props.selectedJob) {
            if(this.props.selectedJob) {
                this.props.get_applications(this.props.token, this.props.selectedJob._id)
            }
        }
    }


    // Drawer methods
    showDrawer = async (application) => {
        await this.props.get_responses(this.props.token, application._doc._id)
        this.setState({showDrawer: true, application})
    }

    closeDrawer = () => {
        this.setState({showDrawer: false, application: null})
    }


    // Modal methods
    showModal = async () => {
        await this.props.create_application(this.props.token, this.props.selectedJob._id)
        this.setState({showModal: true})
    }

    handleOk = async (tags) => {
        this.setState({showModal: false})        
    }

    handleCancel = () => {
        this.setState({showModal: false})
    }


    // Render functions
    renderButton = () => {
        if(this.props.profile_type === "candidate") {
            return <Button type="primary" onClick={this.showModal}>Apply Now</Button>
        } else {
            return <Button>Delete Job</Button>
        }
    }

    renderSkill = (skill) => (
        <div className="job-view-skill">
            {skill}
        </div>        
    )
    
    renderView = () => {
        let job = this.props.selectedJob

        if(job) {
            return (
                <div className="job-view-content">
                    <div className="job-view-header">
                        <div className="job-view-header-attr">
                            <p className="job-view-title">{job.title}</p>
                            <p className="job-view-company">{job.company}</p>
                            <p className="job-view-location">{job.location}</p>
                        </div>
                        {this.renderButton()}
                    </div>
                    
                    <div className="job-view-skills">
                        {job.skills.map((skill, index) => (
                            this.renderSkill(skill)
                        ))}
                    </div>
                    
                    <p className="job-view-description">{job.description}</p>

                    <Descriptions
                        className="job-view-info"
                        layout='vertical'
                        column={10}
                        bordered
                    >
                        <Descriptions.Item label="Experience Level">{`${job.experienceLevel} years`}</Descriptions.Item>
                        <Descriptions.Item label="Employment Type">{job.employmentType}</Descriptions.Item>
                        <Descriptions.Item label="Degree">{job.degree}</Descriptions.Item>
                        <Descriptions.Item label="Term">{job.term}</Descriptions.Item>
                    </Descriptions>
                </div>
            )
        }
    }

    renderApplications = () => {
        if(this.props.profile_type === 'candidate') return <div/>

        return (
            <div>
                <br/>
                <h2>Applications</h2>
                <Table
                    columns={[
                        {
                            title: 'Email',
                            dataIndex: 'email',
                            key: 'email',
                        },
                        {
                            title: 'Score',
                            dataIndex: 'score',
                            key: 'score',
                        },
                        {
                            title: '',
                            key: 'action',
                            render: (text, record) => (
                                <Button size="small" onClick={() => this.showDrawer(record)}>View</Button>
                            )
                        },
                    ]}
                    dataSource={this.props.applications}
                />
            </div>
        )
    }
    
    render (){
        return (
            <div className="job-view">
                {this.renderView()}
                {this.renderApplications()}

                <Interview
                    job={this.props.selectedJob}
                    showModal={this.state.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                />

                <Application
                    visible={this.state.showDrawer}
                    onClose={this.closeDrawer}
                    application={this.state.application}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        profile_type: state.auth.profile_type,
        
        applications: state.core.applications,
        selectedJob: state.core.selectedJob,      
        selectedApp: state.core.selectedApp,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create_application: (token, jobID) => dispatch(create_application(token, jobID)),
        select_application: (application) => dispatch(select_application(application)),
        get_applications: (token, jobID) => dispatch(get_applications(token, jobID)),
        get_responses: (token, appID) => dispatch(get_responses(token, appID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobView)