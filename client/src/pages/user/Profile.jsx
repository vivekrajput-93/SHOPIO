import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layouts/UserMenu";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
  }, [auth?.user]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/update", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error)
      } else {
        setAuth({...auth, user : data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser;
        localStorage.getItem('auth', JSON.stringify(ls));
        toast.success('Profile is updated successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong !");
    }
  };

  return (
    <>
      <Layout>
        <div className="register">
          <h1 className="mt-2">User's Profile.</h1>
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
              
                disabled
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
              
              />
            </div>
            <button type="submit" className="btn btn-dark m-1">
              Update
            </button>
            <button
              type="submit"
              onClick={() => navigate("/user")}
              className="btn btn-dark"
            >
              Dashboard
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
