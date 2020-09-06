import React from 'react'
import {Route, Switch} from 'react-router-dom'

import RegisterLayout from '../components/register/RegisterLayout'
import HomeLayout from '../components/base/HomeLayout'

const AppRouter = (props) => (
    <Switch>
        <Route exact path="/" component={RegisterLayout}/>
        <Route exact path="/register" component={RegisterLayout}/>
        <Route path="/home" component={HomeLayout}/>
    </Switch>
)

export default AppRouter