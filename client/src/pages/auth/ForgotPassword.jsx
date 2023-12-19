import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import  toast from 'react-hot-toast';
import axios from "axios";
import {  useNavigate } from "react-router-dom";



const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");




    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const  res = await axios.post("/api/v1/auth/forgot-password", { email, newPassword, answer})
            if(res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
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
          <h1>Reset Password.</h1>
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

            <div class="form-group">
              <label htmlForfor="exampleInputPassword"> New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                placeholder="Password"
                required

              />
            </div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail">Answer</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your secret answer"
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

export default ForgotPassword;
