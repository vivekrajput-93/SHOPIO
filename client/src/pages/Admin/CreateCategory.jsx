import React from 'react'
import Layout from "../../components/Layouts/Layout";
import AdminMenu from '../../components/Layouts/AdminMenu';

const CreateCategory = () => {
  return (
    <Layout>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1>All category</h1>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory