import React from 'react'
import { Drawer, Divider, Progress } from 'antd'
import { connect } from 'react-redux'
import {get_responses} from '../../store/actions/core.actions'

class Application extends React.Component {

    renderReport = () => {
        let app = this.props.application

        if(app) {
            return (
                <div>
                    <h2>Responses</h2>
                    {this.props.responses.map(res => (
                        <div className="application-response">
                            <h4>{res.question}</h4>
                            <p>{res.response}</p>                            
                        </div>
                    ))}

                    <Divider/>

                    {this.renderWit()}
                </div>
            )
        }
    }

    renderWit = () => {
        let details = []
        let sentiment = [0, 0]

        this.props.responses.map(res => {
            res.wit.map(wit => {
                let det = wit.entities['wit$message_subject:message_subject']

                det.map(detail => {
                    details.push(detail)
                })

                if(wit.entities['wit$duration:duration']) {
                    det = wit.entities['wit$duration:duration']

                    det.map(detail => {
                        details.push(detail)
                    })
                }

                if(wit.traits && wit.traits['wit$sentiment']) {
                    let multiplier = 1;

                    if (wit.traits['wit$sentiment'][0].value === "negative") {
                        multiplier = 0
                    }

                    sentiment = [
                        sentiment[0] + (wit.traits['wit$sentiment'][0].confidence * multiplier),
                        sentiment[1] + 1
                    ]
                }
            })            
        })

        sentiment = ((sentiment[0]*100)/sentiment[1]).toFixed(0)

        if(sentiment >= 70) {
            sentiment = [sentiment, 'success']
        } else if (sentiment <= 40) {
            sentiment = [sentiment, 'exception']
        } else {
            sentiment = [sentiment, 'normal']
        }

        return(            
            <div className="application-wit">
                <h2>Analysis (using Wit.ai)</h2>

                <h4 style={{marginBottom: '-5px'}}>Overall Sentiment</h4>
                <Progress style={{marginBottom: '10px'}} percent={sentiment[0]} status={sentiment[1]}/>
                
                <h4>Keywords</h4>
                <div className="job-view-skills">
                    {details.map(detail => (
                        <div className="job-view-skill">
                            {detail.body}
                        </div>
                    ))}
                </div>                
            </div>
        )
    }

    render() {
        return (
            <Drawer
                title='Application Report'
                placement="right"
                onClose={this.props.onClose}
                visible={this.props.visible}
                width='30%'
            >
                {this.renderReport()}                
            </Drawer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        
        applications: state.core.applications,  
        selectedApp: state.core.selectedApp,
        responses: state.core.responses,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_responses: (token, appID) => dispatch(get_responses(token, appID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)