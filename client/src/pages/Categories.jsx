import React from "react";
import Layout from "../components/Layouts/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {categories?.map((cat) => (
            <div className="col-md-6 mb-3 gx-3 gy-3" key={cat._id}>
              <Link to={`/category/${cat.slug}`} className="btn btn-danger">
                {cat.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
