import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import  toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");


    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const  res = await axios.post("/api/v1/auth/register", {name, email, password, phone, address,answer})
            if(res && res.data.success) {
                toast.success(res.data.message)
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
          <h1>Register Page.</h1>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputName">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="form-control"
                id="exampleInputName"
                placeholder="Enter Name"
                required
              />
            </div>
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
            <div class="form-group">
              <label for="exampleInputPhone">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                class="form-control"
                id="exampleInputPhone"
                placeholder="Enter phone number"
                required

              />
            </div>{" "}
            <div class="form-group">
              <label for="exampleInputAddress">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                class="form-control"
                id="exampleInputAddress"
                placeholder="Enter adddress"
                required

              />
            </div>
            <div class="form-group">
              <label for="exampleInputAddress">Quest</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                class="form-control"
                id="exampleInputAddress"
                placeholder="What is made node.js ?"
                required

              />
            </div>
            <button type="submit" class="btn btn-primary">
            Register
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
