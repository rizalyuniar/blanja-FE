import React, { useEffect, useState } from "react";
import "./profile.css";
import profil from "../../../assets/image/profilBig.png";
import avatar from "../../../assets/image/edit-avatar.png";
import pekage from "../../../assets/image/seling-product/package 1.png";
import {Link} from "react-router-dom"
import axios from "axios";

const Profile = ({
  // titleOne,
  titleTwo,
  // titleThere,
  // imgOne,
  imgTwo,
  // imgTheree,
  // children,
}) => {
  // const { user } = useState((state) => state.auth);
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    datas();
  }, []);

  const datas = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data);
    setName(response.data.data.fullname);
    setEmail(response.data.data.email);
  };
  // console.log(user);
  
  return (
    <div className="col-lg-4 select-profil col-md-6 mt-5">
      <div className="profil-avatar">
        <table>
          <tbody>
            <td className="align-middle float-start image">
              <img
                className="rounded-circle"
                width={75}
                height={70}
                src={profil}
                alt="img"
              />
            </td>
            <td className="align-middle float-start ms-3 image-text">
              <p className="post mb-2">{fullname}</p>
              {/* <p className="post mb-2">{email}</p> */}
              <p className=" edit-profil mt-2">
                <a className="text-primary" href="/profil">
                  <img src={avatar} className="me-2" alt="" />
                  Edit Profile
                </a>
              </p>
            </td>
          </tbody>
        </table>
      </div>
      <div className="profil-select mt-5">
        <ul className="list-unstyled ps-0 mt-2">
          <li className="mb-1 mt-3">
            <button className="btn btn-location">
              <img src={imgTwo} alt="" />
            </button>
            <Link to="/productList">
              <button
                className="btn btn-toggle title-dashboard d-inline-flex align-items-center rounded border-0 collapsed text-secondary"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard-collapse"
                aria-expanded="true"
              >
                <span className="text-profil">{titleTwo}</span>
              </button>
            </Link>
            {/* <img src={vektor} className="img-down ms-4" alt="" /> */}
            {/* <div className="collapse show" id="dashboard-collapse">
              {children}
            </div> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  // titleOne: "Store",
  titleTwo: "My Products",
  // titleThere: "Orders",
  // imgOne: home,
  imgTwo: pekage,
  // imgTheree: shoping,
};
export default Profile;
