import React from 'react'
import { Layout } from '../../layout/Layout'

export const Home = ({setRefreshCheckLogin}) => {
    return (
        
        <Layout setRefreshCheckLogin={setRefreshCheckLogin}>
            <br/><br/>
            <div className="col-lg-12 ">
    <div className="jumbotron jumbotron-fluid text-center ">
        <div className="container">
            <h1 className="display-4">Bienvenido</h1>
            <p className="lead">Sistema de Gestión Laboral </p>
            <p>
                <a href="/add-user" className="btn btn-outline-primary btn-lg mr-3"> Crear usuarios</a>
                <a href="/users" className="btn btn-outline-warning btn-lg mr-3"> Ver usuarios</a>

            </p>
        </div>
    </div>



</div>
        </Layout>
    )
}
