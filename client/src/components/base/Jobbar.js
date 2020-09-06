import React from 'react'
import { Layout } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {get_jobs} from '../../store/actions/core.actions'

const { Sider } = Layout

class Jobbar extends React.Component {

    componentDidMount = () => {
        this.props.get_jobs()
    }

    renderJobCard = (job, index) => (
        <div className="job-card" id={`job-${index}`}>
            <div className="job-card-header">
                <p className="job-position">{job.title}</p>
                <div className="job-header-details">                                    
                    <p className="job-location">{job.company}</p>
                    <p className="job-industry">{job.industry}</p>
                </div>                                
            </div>
            <div className="job-card-body">
                <div className="job-tag">
                    <p className="job-tag-text">
                        {job.employmentType}
                    </p>
                </div>
                <div className="job-tag">
                    <p className="job-tag-text">
                        {job.degree}
                    </p>
                </div>
                <div className="job-tag">
                    <p className="job-tag-text">
                        {job.location}
                    </p>
                </div>
            </div>
        </div>
    )

    renderJobs = () => {
        return (
            <div className="jobs-list">
                {
                    this.props.jobs.map((job, index) => (
                        this.renderJobCard(job, index)
                    ))
                }
            </div>
        )
        
    }

    render(){
        return(
            <Sider className="jobbar" trigger={null} theme="light">
                <div className="jobbar-menu">
                    {this.renderJobs()}
                </div>
            </Sider>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        jobs: state.core.jobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_jobs: (token) => dispatch(get_jobs(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobbar)