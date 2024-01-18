import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../CSS/Cart.css";

const CategoryProduct = () => {
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProduct(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  return (
    <div className="product-cat-container">
      <Layout>
        <h4 className="text-center">{category?.name}</h4>
        <div className="row product-cat-container">
          <div className="d-flex flex-wrap ">
            {products?.map((p) => (
              <div
                className="card all-product-card m-2"
                style={{ width: "18rem" }}
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn product-btn-more"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn product-btn-add"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CategoryProduct;
