import React, { useEffect, useState } from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {

    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getProductByCat = async() => {
        try {
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProduct(data?.products);
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(params?.slug) getProductByCat()
    }, [params?.slug])

  return (
    <Layout>
   <h4 className="text-center">{category?.name}</h4>
   <h4 className="text-center">{products?.length} result found</h4>
   <div className="row">
   <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
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
                  <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
   </div>
    </Layout>
  )
}

export default CategoryProduct