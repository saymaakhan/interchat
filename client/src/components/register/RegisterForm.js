import React from 'react'
import {Form, Input, Button, Checkbox, Select} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;

class RegisterForm extends React.Component {
    formRef = React.createRef()

    onFinish = () => {
        let formData;

        if(this.formRef.current) {
            formData = this.formRef.current.getFieldsValue()
        }

        console.log(formData)
    }

    renderLogin = () => (
        <Form ref={this.formRef} onFinish={this.onFinish}>      
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
        <Form ref={this.formRef} onFinish={this.onFinish}>
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
                rules={[
                    { required: true, message: "Please enter password." },
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
        if(this.props.formType === "login") {
            return this.renderLogin()
        } else {
            return this.renderSignup()
        }
    }

}

export default RegisterForm