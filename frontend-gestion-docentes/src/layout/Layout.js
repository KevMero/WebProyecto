import React from 'react'
import Header from '../common/header/header'
import Sidebar from '../common/sidebar/sidebar'
import Footer from '../common/footer';

export const Layout = ({ children, setRefreshCheckLogin }) => {
    return (

            <div className="page-wrapper">
                <div className="page-body-wrapper">
                    <Header setRefreshCheckLogin={setRefreshCheckLogin} />
                    <Sidebar />
                    <div className="page-body">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>


    )
}
