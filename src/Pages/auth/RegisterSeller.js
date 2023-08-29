import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import vektor from "../../assets/image/Vector.png";
import blanja from "../../assets/image/Blanja.png";
import Swal from "sweetalert2";
import axios from "axios";

const Register = ({ label, ...props }) => {
  const navigate = useNavigate();
  const auth = useNavigate((state) => state.auth);
  // const dispatch = useDispatch();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "seller",
  });

   if (auth === user) {
     alert("salah");
   }
   console.log(user);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      role: "seller",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(form)
    if (user.fullname === "" || user.email === "" || user.password === "") {
      Swal.fire({
        title: "Register Failed",
        text: `Make sure your data is correct!`,
        icon: "failed",
      });
    }
    // }else {
    //     if (form.password !== form.password2) {
    //       alert("Password harus sama");
    //       return navigate ("/register")
    //     }
    const body = {
      fullname: user.fullname,
      password: user.password,
      email: user.email,
    };
    axios
      .post(`${process.env.REACT_APP_API_BACKEND}/users/register`, body)
      .then((response) => {
        console.log(response.data.message)
        if (response.data.code !== 200) {
          Swal.fire({
            title: "Account Registered",
            text: `Log In to your account now!`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Account Registered",
            text: `Log In to your account now!`,
            icon: "success",
          });
         
        }
        return navigate("/login");
      })
      .catch((err) => {
        console.log(err.data.message)
        Swal.fire({
          title: "Register Failed",
          text: `Make sure your data is correct!`,
          icon: "failed",
        });
      });
  };
  
  if (auth.id) return navigate("/login");

  return (
    <div>
      <div className="form-signin">
        <div className="header-login">
          <img className="mb-4" src={vektor} alt="" />
          <img className="mb-4 mt-4 ms-2" src={blanja} alt="" />
          <h1 className="title-login mb-3">Please Sign Up With Your Account</h1>
          <ul className="nav nav-justified mb-4 mt-5" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <Link to="/register">
                <button className="w-100 btn costemers" type="submit">
                  Customer
                </button>
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <button className="w-100 btn seler" type="submit">
                Seller
              </button>
            </li>
          </ul>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-floating">
            <input id="floatingInput" name="fullname" type="text" {...props} value={user.fullname} 
            onChange={handleChange} placeholder="Full Name" className="form-control mb-3" required/>
            <label htmlFor="floatingInput">Full Name</label>
          </div>

          <div className="form-floating">
            <input id="floatingEmail" name="email" type="email" {...props} value={user.email} 
            className="form-control mb-3 " placeholder="Email Address" onChange={handleChange} required/>
            <label htmlFor="floatingEmail">Email Address</label>
          </div>

          <div className="form-floating">
            <input id="floatingPassword" name="password" type="password" {...props} className="form-control mt-3 " 
            placeholder="Password" value={user.password} onChange={handleChange} required/>
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-sign mt-5" type="submit">
            Register
          </button>
          <label className="login mb-3 mt-4" for="">
            Don't have a Blanja account?
            <Link to="/login" className="page-login">
              Login
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Register;
