import React from 'react'
import {Route, Switch} from 'react-router-dom'
import RegisterLayout from '../components/register/RegisterLayout'

const AppRouter = (props) => (
    <Switch>
        <Route exact path="/" component={RegisterLayout}/>
        <Route exact path="/register" component={RegisterLayout}/>
    </Switch>
)

export default AppRouter