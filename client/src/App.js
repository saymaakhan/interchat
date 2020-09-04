import React from 'react';
import 'antd/dist/antd.less'
import './App.less';

import AppRouter from './routers/AppRouter'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRouter/>
      </div>
    </BrowserRouter>
  );
}

/*

LoginForm <react>
|
send fields to backend <request>
|
response from backend and make changes to frontend
(taking us to next page)


[store]
reducers/
  manage global state for the application = {
    currentUser: 'cat@gmail.com'
  }

  auth.reducer.js <currentUser, token, isAuth>
  core.reducer.js <jobs, applications, ..>

actions/
  async requests to backend API
  ex. login()
    - take login fields
    - send request to backend (/auth/login)
    - wait for response
    - "dispatch": call to reducers

*/

export default App;