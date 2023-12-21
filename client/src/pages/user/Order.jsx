import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from '../../components/Layouts/UserMenu'

const Order = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">ALL Orders</div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
