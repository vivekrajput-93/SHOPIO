import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => --prev);
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state : location.pathname
        })
        return () => clearInterval(interval)
    }, [count, navigate ,location, path])
  return (
    <>
      <div class="d-flex flex-column justify-content-center align-items-center" style={{height : "100vh"}}>
        <h3>Redirecting to the login page in {count} sec..</h3>
        <div class="spinner-border" role="status">
        </div>
      </div>
    </>
  );
};

export default Spinner;

