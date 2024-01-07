import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      console.log(data)
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelChange = async(orderId, value) => {
    try {
        const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}`, {status : value});
        getOrders();
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

 
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((order, index) => {
              return (
                <div className="border shadow">
                  <table className="table" key={index}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <Select bordered={false} onChange={(value) => handelChange(order._id, value)} defaultValue={order?.status}>
                            {status?.map((stat, index) => (
                                <Option key={index} value={stat}>
                                    {stat}
                                </Option>
                            ))}
                        </Select>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createAt).fromNow()}</td>
                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                        <td>{order?.products?.length}</td>
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
    </Layout>
  );
};

export default AdminOrders;