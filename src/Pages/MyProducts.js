import React, { useEffect, useState } from 'react'
import Navbar from '../components/module/home/navbar/Navbar'
import Card from "../components/base/Card";
import { useSearchParams } from 'react-router-dom';
import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";
import './style.css';
import gambar from "../assets/image/Search1.png"

const MyProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  
  const getProducts = async () => {
    const search =
      searchParams
        .get("search") === null ? "" : searchParams.get("search");
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}/products?search=${search}&sort=${sort}`)
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSort = (e) => {
    setSort(e.currentTarget.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getProducts();
    setSearchParams({
      search,
      sort,
    });
  };
  
  useEffect(() => {
    getProducts();
    setSearch(searchParams.get("search"));
    searchParams.get("search");
    searchParams.get("sort");
  }, [searchParams]);

  return (
    <div className="h-100">
      <Navbar sort={sort} />
      <div className="container">
        <div className="row">
          <div className="products mt-5">
            <h3 className="title mt-5">Search Product</h3>

            <form onSubmit={handleSearch}>
              <div className="d-flex">
              <select className="form-select form-sort mt-3" aria-label="Default select example" onChange={handleSort}>
                <option value="">Sort By</option>
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
              </select>
              <button type="submit" className='btn mt-3'>Sort</button>
              </div>
            </form>
          </div>

          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3">
            {products.length > 0 ? (
              products.map(item => (
                < div className="col" key={item.id}>
                  <Card
                    src={item.photo}
                    to={`/detail/${item.id}`}
                    titleName={item.name}
                    merk={item.merk}
                    price={<FormatRupiah value={item.price} />}
                  />
                </div>
              ))
            ) : (
              <div className="text-center m-auto mb-5">
                <h2><span><img src={gambar} alt="" className="mx-3 mb-3" style={{ width: "40px" }} />Not Found Product</span></h2>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default MyProducts