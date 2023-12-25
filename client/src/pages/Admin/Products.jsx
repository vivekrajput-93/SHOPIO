import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("somethin went wrong");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product</h1>
        <div className="d-flex">
        {products?.map((pro) => (
          <Link key={pro._id} to={`/dashboard/admin/product/${pro.slug}`} className="pro-link" >
            <div className="card m-2" style={{ width: "18rem" }} key={pro._id}>
              <img className="card-img-top" src={`/api/v1/product/product-photo/${pro._id}`} alt={pro.name} />
              <div className="card-body">
                <h5 className="card-title">{pro.name}</h5>
                <p className="card-text">
                  {pro.description}
                </p>
                <span>$ {pro.price}</span>
              </div>
            </div>
          </Link>
          ))}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
