import React from 'react'
import {Form, Input, Button, Checkbox, Select} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;

class RegisterForm extends React.Component {

    renderLogin = () => (
        <Form>
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please enter email.' },
                    { type: 'email', message: 'Please enter valid email format.' }
                ]}
            >
                <Input id='email' prefix={<UserOutlined/>} placeholder="Email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: "Please enter password." },
                ]}
            >
                <Input id='password' prefix={<LockOutlined/>} placeholder="Password" type="password"/>
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
        <Form>
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please enter email.' },
                    { type: 'email', message: 'Please enter valid email format.' }
                ]}
            >
                <Input id='email' prefix={<UserOutlined/>} placeholder="Email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: "Please enter password." },
                ]}
            >
                <Input id='password' prefix={<LockOutlined/>} placeholder="Password" type="password"/>
            </Form.Item>

            <Form.Item
                name="confirm-password"
                rules={[
                    { required: true, message: "Please enter password." },
                ]}
            >
                <Input id='confirm-password' prefix={<LockOutlined/>} placeholder="Confirm Password" type="password"/>
            </Form.Item>

            <Form.Item
                name="profile-type"
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
        if(this.props.formType === "login") {
            return this.renderLogin()
        } else {
            return this.renderSignup()
        }
    }

}

export default RegisterForm