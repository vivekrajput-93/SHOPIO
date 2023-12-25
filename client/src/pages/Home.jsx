import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox } from "antd";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      

    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // filter by cat
  const handefilter = (value, id)  => {
    let all = [...checked];
    if(value) {
      all.push(id);
    } else {
      all = all.filter((cat) => cat !== id)
    }
    setChecked(all)
  }



  // get all product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column check">
            {categories?.map((cat) => (
              <Checkbox className="checkbox"  key={cat._id} onChange={(e) => handefilter(e.target.checked, cat._id)}>
                <h4>{cat.name}</h4>
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(checked, null, 4)}
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            {products?.map((pro) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={pro._id}
              >
                <img
                  className="card-img-top"
                  src={`/api/v1/product/product-photo/${pro._id}`}
                  alt={pro.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{pro.name}</h5>
                  <p className="card-text">{pro.description}</p>
                  <span>$ {pro.price}</span>
                  <hr />
                  <button className="btn btn-primary ms-1">More </button>
                  <button className="btn btn-secondary ms-1">CART </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
