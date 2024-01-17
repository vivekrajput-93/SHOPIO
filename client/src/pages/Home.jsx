import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Home.css";
import LocalMallOutlined from "@mui/icons-material/LocalMallOutlined";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import WifiProtectedSetupRoundedIcon from "@mui/icons-material/WifiProtectedSetupRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [ setCategories] = useState([]);
  const [ setTotal] = useState(0);
  const [page] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const trendingProducts = products.filter((product) => {
    return !filteredProducts.some((filteredProduct) => {
      return filteredProduct._id === product._id;
    });
  });
  const limitedTrendingProducts = trendingProducts.slice(0, 4);

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
            <button onClick={() => navigate("/everything")} className="main-shoes-button">
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
          <FontAwesomeIcon icon={faShoePrints} className="foot-img" />
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
                  <p className="card-text price-tag"> $ {p.price}.00</p>
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
              className="promo-img "
            />
          </section>
          <section className="promo-card">
            <h2>Kids Shoes</h2>
            <p className="promo-sub-heading">
              Playful, comfortable styles spark embracing
              adventure.
            </p>
            <button
              className="btn-promo"
              onClick={() => navigate("/category/kids")}
            >
              Shop Now <ArrowForwardIcon />
            </button>
            <br />
            <img
              src="assets/kids-9.png"
              alt="men-img"
              className="promo-image "
            />
          </section>
        </div>
        <div className="sales-strip">
          <p className="sales-heading">Get 25% Off On Your First Purchase!</p>
          <button className="main-shoes-button">
            <LocalMallOutlined />
            Shop Now
          </button>
        </div>
        <div className="main-trending-container">
          <h1 className="text-center trend-tag">Trending Shoes</h1>
          <FontAwesomeIcon icon="fa-solid fa-shoe-prints" />
          <div className="main-trending-card">
            {limitedTrendingProducts?.map((p) => (
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
                  <p className="card-text price-tag"> $ {p.price}.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="customer-section">
          <h3 className="text-center best-tag">Customer Review!</h3>
          <div className="customer-main-section">
            <section className="customer-card">
              <img
                src="/assets/star.png"
                alt="star-review"
                className="star-review"
              />
              <p>
                Mike here! I'm thrilled with my recent shoe purchase from
                Shopio. The range is fantastic, and the quality exceeded my
                expectations. The shoes are stylish, comfy, and perfect for my
                active lifestyle.
              </p>
              <div className="customer">
                <img
                  src="/assets/customer-men.jpg"
                  alt="mike"
                  className="customer-img"
                />
                <span className="customer-name">Mike Ross</span>
              </div>
            </section>
            <section className=" review-main">
              <div className="background"></div>
              <div className="customer-text">
                <h4 className="deal text-center">
                  Deal Of The Day 15% Off On All Shoes!
                </h4>
                <p className="sub-deal">
                  Explore top-notch shoes for style and comfort. Visit us now!
                </p>
                <button onClick={() => navigate("/everything")} className="btn-promo">
                  Shop Now <ArrowForwardIcon />
                </button>
              </div>
            </section>
            <section className="customer-card">
              <img
                src="/assets/star.png"
                alt="star-review"
                className="star-review"
              />
              <p>
                Hi, I'm Rachel! I absolutely adore the shoes I bought from
                Shopio. The selection for women is impressive, and the pair I
                got is both stylish and comfortable. The site's easy navigation
                made finding the perfect shoes a breeze.
              </p>
              <div className="customer">
                <img
                  src="/assets/customer-women.jpg"
                  alt="mike"
                  className="customer-img"
                />
                <span className="customer-name">Rachel Green</span>
              </div>
            </section>
          </div>
        </div>
          <ul className="brands-list">
            <li className="brand-logo">
              <img src="/assets/brandsLogo/puma.png" alt="puma" className="logo-img" />
            </li>
            <li className="brand-logo">
              <img src="/assets/brandsLogo/fila.png" alt="fila" className="logo-img" />
            </li>{" "}
            <li className="brand-logo">
              <img src="/assets/brandsLogo/nike.png" alt="nike" className="logo-img nike" />
            </li>{" "}
            <li className="brand-logo">
              <img src="/assets/brandsLogo/adidas.png" alt="adidas" className="logo-img" />
            </li>{" "}
            <li className="brand-logo">
              <img src="/assets/brandsLogo/converse.png" alt="converse" className="logo-img" />
            </li>
          </ul>
      </div>
    </Layout>
  );
};

export default HomePage;
