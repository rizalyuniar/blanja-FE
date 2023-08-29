import React from 'react'
import './page.css'
import {  Link } from "react-router-dom";
function Page404() {
  return (
    <div>
       <h1>Error 404</h1>
        <p className="zoom-area"><b>Halaman</b> Not found </p>  
        <section className="error-container">
          <span><span>4</span></span>  
          <span>0</span>
          <span><span>4</span></span>  
        </section>
        <div className="link-container">
          <Link to="/home" className="more-link">
            Visit
          </Link>   
        </div>
    </div>
  )
}

export default Page404