import React, { useState } from "react";
import Total from "../Total/Total";
import "../home/StyleHome.css";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Modal, Button, Form } from "react-bootstrap";
import image from "../../../assets/image/bag.png"

const Checkout = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className="container my-check">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Another Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>New Address</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <h3 className="title-bag">Checkout</h3>
      <p className="sub-chekout mt-3">Shipping Adress</p>
      <div className="row ">
        <div className="col-lg-8 pl-lg-0">
          <div className="card mb-3 ">
            <div className="card-body">
              <strong>Rizal Yuniar</strong>
              
              <p>
                Jl A.H Kartini, kec.Kartini, Kel.Kartini, Kota Sumenep
              </p>

              <button
                className=" btn btn-address"
                variant="primary"
                onClick={handleShow}
              >
                {/* <Modal/> */}
                Choose Another Address
              </button>
            </div>
          </div>
          {/* {cart.map((item) => ( */}
            <div className="card mb-3 ">
              <div className="table-responsive-sm">
                <table className="table">
                  <tbody>
                    <td className="align-middle text-center ">
                      <img
                        className="img-products"
                        src={image}
                        alt="checkout"
                      />
                    </td>
                    <td className="align-middle">
                      <p className="post mb-1">Jas Pria</p>
                      <span className="text-secondary sub-post">
                        Zalora
                      </span>
                    </td>
                    <td className="align-middle text-start">
                      quantity : 1
                    </td>
                    <td className="align-middle text-start text-white">
                      {/* { item.qty} */}
                      Lorem
                    </td>
                    <td className="align-middle price">
                      {" "}
                      <FormatRupiah value="200000" />
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
          {/* ))} */}
        </div>
        <Total
          totalPrice="Order"
          shopping="Shopping Payment"
          Sumprice={<FormatRupiah value="200000" />}
          priceBag={<FormatRupiah value="200000" />}
          deleveri="Delevery"
          price="Free Ongkir"
        >
          <select
           
            className="form-select w-100 mt-1 mb-4 mt-5"
          >
            <option>Select Payment</option>
            <option value="DEBIT CARDS">BlanjaPay</option>
          </select>
          <button
           
            backgroundColor="#DB3022"
            color="white"
            borderRadius="25px"
            className="mt-3 w-100 btn btn-checkout"
          >
            Buy
          </button>
        </Total>
      </div>
    </div>
  );
};

export default Checkout;
