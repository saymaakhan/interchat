import React from 'react'
import {Row, Col, Tabs} from 'antd'
import RegisterForm from './RegisterForm'

const { TabPane } = Tabs

class RegisterLayout extends React.Component {
    render() {
        return (
            <div>
                <div className="register-bg"/>
                <Row
                    className="register-page"
                    align="middle"
                    justify="center"
                >
                    <Col md={12} xs={24}>
                        <div className="register-card">
                            <div style={{width: '100%'}}>
                                <h1 className="register-title">InterChat</h1>

                                <Tabs>
                                    <TabPane tab="Login" key="login">
                                        <RegisterForm formType="login"/>
                                    </TabPane>
                                    <TabPane tab="Signup" key="signup">
                                        <RegisterForm formType="signup"/>
                                    </TabPane>
                                </Tabs>

                                <p className="register-footer">
                                    Developed by Shrish Mohapatra and Sayma Khan
                                </p>
                            </div>
                        </div>
                    </Col>

                    <Col md={12} xs={0}/>
                    
                </Row>
            </div>
        )
    }
}

export default RegisterLayout