import React from 'react'
import { Modal, Input, Button, message } from 'antd'

import { connect } from 'react-redux'
import { create_response } from '../../store/actions/core.actions'


class Interview extends React.Component {
    inputField = React.createRef()
    state = {
        messages: [],
        questions: [],
        response: ''
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if(prevProps.appID !== this.props.appID) {
            await this.setState({
                messages: ['Hello, welcome to this interview.'],
                questions: this.props.questions
            })

            this.sendMessage(this.state.questions[0])
        }
    }

    onResponseChange = (e) => {
        this.setState({response: e.currentTarget.value})
    }

    sendMessage = (message) => {
        let messages = this.state.messages
        let questions = [...this.state.questions]
        
        messages.push(message)

        if (this.state.questions.includes(message)) {            
            questions.shift()
        }
        
        this.setState({messages, questions})
    }

    //Submit Response 
    submitResponse = () => {       
        this.props.create_response(
            this.props.token, 
            this.props.appID, 
            this.state.messages.slice(-1)[0],
            this.state.response
        )
        
        this.sendMessage(this.state.response)
        this.inputField.current.state.value = ''
        this.isDone()  
        this.sendMessage(this.state.questions[0])
    }
    
    isDone = () => {
        if (this.state.questions.length === 0) {
            message.info('Thank you for completing the interview.')
            this.props.handleOk()
        }
    }

    // Render methods
    renderMessages = () => {
        return(
            <div className="interview-messages">
                {this.state.messages.map(message => {
                    if(this.props.questions.includes(message)) {
                        return (
                            <div className="interview-message">
                                <h4>{message}</h4>
                            </div>
                        )
                    } else {
                        return (
                            <div className="interview-message">
                                <p>{message}</p>
                            </div>
                        )
                    }                    
                })}
            </div>
        )
    }

    renderFooter = () => {
        return([
            <div className="input-body">
                <Input.TextArea 
                    ref={this.inputField}
                    className="input-response" 
                    placeholder="Enter response here." 
                    onChange={this.onResponseChange}
                    autoSize
                />
                <Button type="primary" onClick={this.submitResponse}>Send</Button>
            </div>           
        ])
    }

    render() {
        return (
            <Modal 
                title={`Interview`}
                visible={this.props.showModal}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
                footer={this.renderFooter()}
            >
                {this.renderMessages()}
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        
        selectedJob: state.core.selectedJob,
        questions: state.core.questions,
        appID: state.core.appID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create_response: (token, appID, question, response) => dispatch(create_response(token, appID, question, response)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Interview)