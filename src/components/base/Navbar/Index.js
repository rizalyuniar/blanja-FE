/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/image/belanja.svg";
import cart from "../../../assets/image/search.svg";
import bell from "../../../assets/image/bell (1) 1.png";
import mail from "../../../assets/image/mail (3) 1.png";
import filter from "../../../assets/image/filter.png";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../configs/redux/actions/userAction";
import Profil from "../../../assets/image/profil.png";
import { Dropdown, Button, Modal, DropdownButton } from "react-bootstrap";
import swal from "sweetalert2";
import axios from "axios";

import "./navbar.css";

const NavbarBase = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const data = useSelector((state) => state.bag);
  console.log(user);
  const handleSignOut = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(signOut());
    swal.fire({
      icon: "success",
      title: `Logout Success!`,
    });
  };

  //Searching path
  const [search, setSearch] = useState([]);
  const handleSearch = () => {
    navigate({
      pathname: "/searchProducts",
      search: "?search=" + search,
    });
  };

  useEffect(() => {
    // getProducts();
    datas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [date_of_brith, setDate_of_brith] = useState("");
  useEffect(() => {
    datas();
  }, []);

  const datas = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data.user);
    setDate_of_brith(response.data.data[0].date_of_brith);
  };

  return (
    // <nav className="navbar navbar-expand-md navbar-light fixed-top mb-4">
    //   <div className="container">
    //     <Link to="/home">
    //       <img src={logo} alt="" className="" />
    //     </Link>
    //     <div className="collapse navbar-collapse ms-auto " id="navbarCollapse">
    //       <ul className="navbar-nav mb-2 mb-md-0 w-50 me-auto">
    //         <div className="input-group rounded nav-search">
    //           <input
    //             type="search"
    //             className="form-control search-input"
    //             placeholder="Search"
    //             aria-label="Search"
    //             aria-describedby="search-addon"
    //             name="search"
    //           />
    //           <span
    //             className="input-group-text search bg-light"
    //             id="search-addon"
    //           >
    //             <i className="bi bi-search"></i>
    //           </span>
    //         </div>
    //       </ul>
    //       {/* {user?.id ? ( */}
    //       <>
    //         <form className="ms-4">
    //           <Link to="/Checkout">
    //             <button
    //               className="btn btn-link position-relative"
    //               style={{
    //                 width: 40,
    //                 height: 40,
    //               }}
    //             >
    //               <img src={cart} alt="" className="icon-cart mb-2" />
    //               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    //                 {/* {data.cart.length} */}
    //               </span>
    //             </button>
    //           </Link>
    //           <img src={bell} alt="" className="icon-cart ms-3 mb-2" />
    //           <img src={mail} alt="" className="icon-cart ms-3 mb-2" />
    //         </form>
    //         {/* <DropdownButton
    //             align="end"
    //             title={
    //               <img
    //                 src={Profil}
    //                 alt=""
    //                 width={35}
    //                 height={35}
    //                 className="rounded-circle"
    //               />
    //             }
    //             variant="link"
    //             id="dropdown-menu-align-end"
    //           >
    //             <Dropdown.Item variant="link">
    //               {" "}
    //               <p className="text-center text-primary">{user.fullname}</p>
    //             </Dropdown.Item>
    //             <Dropdown.Divider />
    //             <Dropdown.Item variant="secondary" eventKey="4">
    //               {" "}
    //               <Link to="/profil">Profile</Link>
    //             </Dropdown.Item>
    //             <Dropdown.Divider />
    //             <Dropdown.Item eventKey="4" variant="danger">
    //               <Link to="/login" onClick={() => handleSignOut()}>
    //                 Logout
    //               </Link>
    //             </Dropdown.Item>
    //           </DropdownButton> */}
    //       </>
    //       {/* ) : ( */}
    //       <>
    //         <Link to="/login">
    //           <button className="btn button-login " type="button">
    //             {" "}
    //             Login
    //           </button>
    //         </Link>
    //         <Link to="/register">
    //           <button
    //             type="button"
    //             className="btn btn-outline-secondary button-signup 3 mb-2"
    //           >
    //             {" "}
    //             Sign Up
    //           </button>
    //         </Link>
    //       </>
    //       {/* )} */}
    //     </div>
    //   </div>
    // </nav>

    // redux
    <nav className="navbar navbar-expand-md navbar-light fixed-top mb-4">
      <div className="container">
        <Link to="/home">
          <img src={logo} alt="" className="" />
        </Link>

        <div className="collapse navbar-collapse ms-auto " id="navbarCollapse">
          <ul className="navbar-nav mb-2 mb-md-0 w-50 me-auto">
            <div className="input-group rounded nav-search">
              <input type="search" className="form-control search-input" placeholder="Search" aria-label="Search"
                aria-describedby="search-addon" name="search" onChange={(e) => setSearch(e.target.value)} />
              <span className="input-group-text search bg-light" id="search-addon">
                <i className="bi bi-search" onClick={handleSearch}></i>
              </span>
            </div>
          </ul>

          {user?.id ? (
            <>
              <form className="ms-4">
                <Link to="/Checkout">
                  <button className="btn btn-link position-relative"
                    style={{ width: 60, height: 40, }}>
                    <img src={cart} alt="" className="icon-cart mb-2" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {/* {data.cart.length} */}
                    </span>
                  </button>
                </Link>
                <button className="btn btn-link position-relative"
                  style={{ width: 65, height: 40, }}>
                  <img src={bell} alt="" className="icon-cart ms-3 mb-2" />
                </button>

                <button className="btn btn-link position-relative"
                  style={{ width: 68, height: 40, }}>
                  <img src={mail} alt="" className="icon-cart ms-3 mb-2" />
                </button>
              </form>

              <DropdownButton align="end"
                title={<img src={Profil} alt="" width={35} height={35} className="rounded-circle" />}
                variant="link" id="dropdown-menu-align-end">
                <Dropdown.Item variant="link">
                  {" "}
                  <p className="text-center text-primary">{user.fullname}</p>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item variant="secondary" eventKey="4">
                  {" "}
                  <Link to="/profil"> Profile</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4" variant="danger">
                  <Link to="/login" onClick={() => handleSignOut()}>
                    Logout
                  </Link>
                </Dropdown.Item>
              </DropdownButton>
            </>
          ) : (
            <>
              <Link to="/Checkout">
                <button className="btn btn-link position-relative"
                  style={{ width: 60, height: 40, }}>
                  <img src={cart} alt="" className="icon-cart mb-2" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {/* {data.cart.length} */}
                  </span>
                </button>
              </Link>
              <Link to="/login">
                <button className="btn button-login ms-4" type="button">
                  {" "}
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="btn btn-outline-secondary button-signup ms-4 mb-2">
                  {" "}
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarBase;
