import React from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { authenticate } from "../../store/actions/auth.actions"

import {Form, Input, Button, Checkbox, Select, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;

class RegisterForm extends React.Component {
    formRef = React.createRef()

    onFinish = async (type) => {
        let formData;

        if(this.formRef.current) {
            formData = this.formRef.current.getFieldsValue()
            await this.props.authenticate(formData, type)

            if(this.props.message !== '') {
                message.info(this.props.message)
            }

            console.log(this.props.isAuth)
        }

        console.log(formData)
    }

    renderLogin = () => (
        <Form ref={this.formRef} onFinish={() => {this.onFinish('login')}}>      
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please enter email.' },
                    { type: 'email', message: 'Please enter valid email format.' }
                ]}
            >
                <Input id='email' prefix={<UserOutlined/>} placeholder="Email" autoComplete="email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: "Please enter password." },
                ]}
            >
                <Input id='password' prefix={<LockOutlined/>} autoComplete="new-password" placeholder="Password" type="password"/>
            </Form.Item>
            
            <Form.Item>
                <Form.Item style={{float: 'left'}} noStyle>
                    <Checkbox id='remember'>Remember me</Checkbox>
                </Form.Item>

                <a href="/" style={{float: 'right'}}>Forgot Password?</a>
            </Form.Item>

            <Form.Item>
                <Button
                    id='login-button'
                    type='primary'
                    htmlType='submit'
                    className='register-button'
                >
                   Log In  
                </Button>
            </Form.Item>
            
        </Form>
    )

    renderSignup = () => (
        <Form ref={this.formRef} onFinish={() => {this.onFinish('signup')}}> 
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please enter email.' },
                    { type: 'email', message: 'Please enter valid email format.' }
                ]}
            >
                <Input id='email' prefix={<UserOutlined/>} placeholder="Email" autoComplete="email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: "Please enter password." },
                ]}
            >
                <Input id='password' prefix={<LockOutlined/>} autoComplete="new-password" placeholder="Password" type="password"/>
            </Form.Item>

            <Form.Item
                name="confirm_password"                
                dependencies={['password']}
                rules={[
                    { required: true, message: "Please enter password." },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if(!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }

                            return Promise.reject('The two passwords do not match.')
                        }
                    })
                ]}
            >
                <Input id='confirm_password' prefix={<LockOutlined/>} autoComplete="new-password" placeholder="Confirm Password" type="password"/>
            </Form.Item>

            <Form.Item
                name="profile_type"
            >
                <Select placeholder="Business or Candidate">
                    <Option value="business">Business</Option>
                    <Option value="candidate">Candidate</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button
                    id='signup-button'
                    type='primary'
                    htmlType='submit'
                    className='register-button'
                >
                   Sign Up  
                </Button>
            </Form.Item> 
        </Form>
    )


    render() {
        if(this.props.isAuth) return <Redirect to='/home'/>

        if(this.props.formType === "login") {
            return this.renderLogin()
        } else {
            return this.renderSignup()
        }
    }

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        message: state.auth.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (user, type) => dispatch(authenticate(user, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)