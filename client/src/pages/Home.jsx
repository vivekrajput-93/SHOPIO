import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../CSS/Home.css";
import LocalMallOutlined from "@mui/icons-material/LocalMallOutlined";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import WifiProtectedSetupRoundedIcon from "@mui/icons-material/WifiProtectedSetupRounded";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //get all cat
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
    getTotal();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/count-product");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="home-section">
          <img src="/assets/Main-Shoes.png" className="shoe-img" />
          <div className="shoes-info">
            <h2>Best Quality Shoes !</h2>
            <h1>Fashion at Your Feet.</h1>
            <h5>
              Step into a world of timeless elegance and unparalleled comfort,
              where every step embraces your unique sense of style.
            </h5>
            <button className="main-shoes-button">
              {" "}
              <LocalMallOutlined />
              Shop Now
            </button>
          </div>
        </div>
        <div className="shoes-strip-section">
          <section>
            <LocalShippingRoundedIcon />
            <span>
            <span className="main-tag">Free Shipping</span>
              <br />
              Above ₹500 only
            </span>
          </section>
          <section>
            <AssignmentTurnedInRoundedIcon />
            <span>
            <span className="main-tag">Certified Products</span>
              <br />
              100% Guarantee
            </span>
          </section>
          <section>
            <LocalAtmRoundedIcon />
            <span>
              <span className="main-tag">Huge Savings</span>
              <br/>
              At lower price
            </span>
          </section>
          <section>
            <WifiProtectedSetupRoundedIcon />
            <span>
            <span className="main-tag">Easy Returns</span>
              <br />
              No Question Asked
            </span>
          </section>
        </div>
        <div className="main-product-container">
          <h1 className="text-center">Best Selling Shoes</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card-product m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text"> $ {p.price}</p> 
                  <p className="card-text"> {p.slug}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;