import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../CSS/Header.css";



const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div >
      <form className="d-flex search" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success search-btn" type="submit">
          Search
        </button>
      </form>
    <h4 className="text-center tag">Discover.Shop.Smile.Enjoy</h4>
    </div>
    </>
  );
};

export default SearchInput;