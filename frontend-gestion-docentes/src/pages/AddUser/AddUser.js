import React from 'react'
import { Layout } from "../../layout/Layout";
import {FormUser} from "../../components/Forms/FormUser"

export const AddUser = ({setRefreshCheckLogin}) => {
    return (

        <Layout setRefreshCheckLogin={setRefreshCheckLogin}>
        <div className="main ">
          <br />
          <div className='m-auto col-md-8 col-lg-7 col-xl-5'>
          <FormUser />
          </div>
        </div>
      </Layout>
       
    )
}
