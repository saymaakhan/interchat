import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import {get_jobs, select_job} from '../../store/actions/core.actions'

const { Sider } = Layout

class Jobbar extends React.Component {

    componentDidMount = () => {
        this.props.get_jobs(this.props.token, this.props.userID, this.props.profile_type)
    }

    selectJob = (job) => {
        this.props.select_job(job)
    }

    getCardClass = (job) => {
        if(!this.props.selectedJob) return 'job-card'

        if(job._id === this.props.selectedJob._id) {
            return "job-card job-card-selected"
        } else {
            return "job-card"
        }
    }

    renderJobCard = (job, index) => (
        <div className={this.getCardClass(job)} id={`job-${index}`} onClick={() => {this.selectJob(job)}}>
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
        userID: state.auth.userID,
        profile_type: state.auth.profile_type,

        jobs: state.core.jobs,
        selectedJob: state.core.selectedJob,        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_jobs: (token, userID, profile_type) => dispatch(get_jobs(token, userID, profile_type)),
        select_job: (job) => dispatch(select_job(job))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobbar)