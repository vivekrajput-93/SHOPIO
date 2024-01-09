import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import "../../CSS/Navbar.css";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: " ",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="left-link">
            <Link to="/" className="navbar-brand">
              <img
                src="/assets/shopio-logos_transparent.png"
                alt="logo"
                className="logo"
              />
            </Link>
            <li className="nav-item">
                <NavLink to="/everything" className="nav-link normal-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category/socks" className="nav-link normal-link">
                  Socks
                </NavLink>
              </li>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link home-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>

                <ul className="dropdown-menu drip-link">
                  {categories?.map((cat) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${cat.slug}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu drip-link">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/login"
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                  <NavLink to="/cart" className="nav-link cart-link">
                  <LocalMallOutlinedIcon /> <div className="cart-section">{cart.length === 0 ? '0' : cart?.length}</div>

                  </NavLink>
              </li>
               
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
