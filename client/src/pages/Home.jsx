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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/category/men"); // Navigates to the "/category/men" route
  };

  const categoriesLimit = 4;

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

  const filteredProducts = products.reduce((acc, product) => {
    if (
      !acc.some((item) => item.category === product.category) &&
      acc.length < categoriesLimit
    ) {
      acc.push(product);
    }
    return acc;
  }, []);

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
              <br />
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
          <h1 className="text-center best-tag">Best Selling Shoes</h1>
          <div className="main-product-card">
            {filteredProducts?.map((p) => (
              <div
                key={p._id}
                className="card card-product m-2"
                style={{ width: "18rem" }}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="text-center">
                    {" "}
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="main-promo-card">
          <section className="promo-card">
            <h2>Men Shoes</h2>
            <p className="promo-sub-heading">
              Classic style meets contemporary comfort for men.
            </p>
            <button
              className="btn-promo"
              onClick={() => navigate("/category/men")}
            >
              Shop Now <ArrowForwardIcon />{" "}
            </button>
            <br />
            <img src="assets/men-14.png" alt="men-img" className="promo-img" />
          </section>
          <section className="promo-card">
            <h2>Women Shoes</h2>
            <p className="promo-sub-heading">
              Empowering fashion embracing individuality versatile designs.
            </p>
            <button
              className="btn-promo"
              onClick={() => navigate("/category/women")}
            >
              Shop Now <ArrowForwardIcon />{" "}
            </button>
            <br />
            <img
              src="assets/women-13.png"
              alt="men-img"
              className="promo-img"
            />
          </section>
          <section className="promo-card">
            <h2>Kids Shoes</h2>
            <p className="promo-sub-heading">
              Playful, comfortable styles sparking imagination and embracing
              adventure.
            </p>
            <button
              className="btn-promo"
              onClick={() => navigate("/category/kids")}
            >
              Shop Now <ArrowForwardIcon />
            </button>
            <br />
            <img src="assets/kids-9.png" alt="men-img" className="promo-img" />
          </section>
        </div>
        <div className="sales-strip">
          <p className="sales-heading">Get 25% Off On Your First Purchase!</p>
          <button className="main-shoes-button">
              <LocalMallOutlined />
              Shop Now
            </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
