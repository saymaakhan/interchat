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

export default App;