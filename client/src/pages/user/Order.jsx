import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrder = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h4 className="text-center">All Orders</h4>
            {orders?.map((order, index) => {
              return (
                <div className="border shadow">
                <table className="table" key={index}>
                  <thead>
                    <tr>
                      <td scope="col">#</td>
                      <td scope="col">Status</td>
                      <td scope="col">Buyer</td>
                      <td scope="col">Date</td>
                      <td scope="col">Payment</td>
                      <td scope="col">Quantity</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{index + 1}</th>
                      <th>{order?.status}</th>
                      <th>{order?.buyer?.name}</th>
                      <th>{moment(order?.createAt).fromNow()}</th>
                      <th>{order?.payment.success ? "Success" : "Failed"}</th>
                      <th>{order?.products?.length}</th>
                    </tr>
                  </tbody>
                </table>
                <div className="btn-btn-danger">
                {order?.products.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                </div>
              </div>
            ))}
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
