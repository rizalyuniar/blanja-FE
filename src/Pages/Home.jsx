import React, { useEffect } from "react";
import Navbar from "../components/module/home/navbar/Navbar";
import Category from "../components/module/home/Category/CategoryOwl";
import Carousel from "../components/module/home/Carousel/Carousel";
// import Populer from "../components/module/home/Populer/Populer";
import axios from "axios";
import Card from "../components/base/Card";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
// import "swiper/css/bundle";

const Home = () => {
  const [data, setData] = useState([]);
  // const navigate = useNavigate();
  // const [search, setSearch] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}/products`)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mx-2">
      <Navbar />
      <Carousel />
      <Category />
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">New</h3>
            <p>What are you currently looking for</p>
          </div>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3">
            {data.map((item) => (
              <div className="col" key={item.id}>
                <Card
                  src={item.photo}
                  to={`/detail/${item.id}`}
                  titleName={item.name}
                  price={<FormatRupiah value={item.price} />}
                  merk={item.merk}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
