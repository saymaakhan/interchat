import React from 'react'
import { Layout } from 'antd'

import Sidebar from './Sidebar'
import Jobbar from './Jobbar'

class HomeLayout extends React.Component {
    render() {
        return (
            <div>
                <Layout className="home-layout">
                    <Sidebar/>
                    <Jobbar/>

                    <Layout className="inner-layout">
                        <p>wow look at this cool job</p>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default HomeLayout