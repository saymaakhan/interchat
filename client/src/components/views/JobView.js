import React from 'react'
import { Button, Descriptions } from 'antd'
import { connect } from 'react-redux'

class JobView extends React.Component {

    renderButton = () => {
        if(this.props.profile_type === "candidate") {
            return <Button type="primary">Apply Now</Button>
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
                <div className="job-view">
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
    
    render (){
        return (
            <div>
                {this.renderView()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        profile_type: state.auth.profile_type,
        
        selectedJob: state.core.selectedJob,        
    }
}

export default connect(mapStateToProps)(JobView)