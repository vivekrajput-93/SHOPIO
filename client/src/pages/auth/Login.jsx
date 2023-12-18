import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import  toast from 'react-hot-toast';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const location =  useLocation();



    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const  res = await axios.post("/api/v1/auth/login", { email, password,})
            if(res && res.data.success) {
                toast.success(res.data.message)
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token : res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/",);
            } else {
                toast.error(res.data.error)
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !")
        }
    }

  return (
    <>
      <Layout>
        <div className="register">
          <h1>Login Page.</h1>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
                required

              />
            </div>
            <div class="form-group">
              <label htmlForfor="exampleInputPassword">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                placeholder="Password"
                required

              />
            </div>
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
