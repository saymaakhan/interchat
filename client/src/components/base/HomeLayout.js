import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import {local_authenticate} from '../../store/actions/auth.actions'

import Sidebar from './Sidebar'
import Jobbar from './Jobbar'
import JobView from '../views/JobView'

class HomeLayout extends React.Component {
    render() {
        if(!this.props.token) {
            this.props.local_authenticate()

            if(!this.props.isAuth) return <Redirect to='/register'/>
        }

        return (
            <div>
                <Layout className="home-layout">
                    <Sidebar/>
                    <Jobbar/>

                    <Layout className="inner-layout">
                        <JobView/>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        token: state.auth.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        local_authenticate: () => dispatch(local_authenticate()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout)