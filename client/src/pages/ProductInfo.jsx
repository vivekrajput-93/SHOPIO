import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../CSS/ProductInfo.css";

const ProductInfo = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([])
  const navigate = useNavigate()
  const [cart, setCart] = useCart();


  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      similarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

// get related product
const similarProduct = async(pid, cid) => {
  try {
    const { data } = await axios.get(
      `/api/v1/product/related-product/${pid}/${cid}`
    );
    setRelatedProduct(data?.products)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            className="card-img-top similar-product-img"
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            
          />
        </div>
        <div className="col-md-6 product-info-card">
            <h1 className="text-center similar-info">Product Info.</h1>
            <h6>Name : {product.name}</h6>
            <h6 className="product-desc">Description : <p>{product.description}</p></h6>
            <h6>Price : {product.price}</h6>
            <h6>Category : {product?.category?.name}</h6>
            <button
                    className="btn product-btn-add"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
        </div>
        <hr className="similar-product-line" />
        <div className="row container">
          <h5 className="similar-tag">Similar Product-</h5>
         {relatedProduct < 1 && (<h4 className="text-center">No Similar Product Found</h4>)}
          <div className="d-flex flex-wrap similar-product ">
            {relatedProduct?.map((p) => (
              <div className="card similar-product-container m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body ">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button className="btn product-btn-more" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
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
      </div>
    </Layout>
  );
};

export default ProductInfo;
