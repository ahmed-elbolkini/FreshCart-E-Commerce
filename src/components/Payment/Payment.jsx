import React, { useContext, useState, useMemo } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { cartID, cartItems, totalCartPrice, numberOfCartItems } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [visaLoading, setVisaLoading] = useState(false);

  const initialValues = useMemo(
    () => ({
      phone: "",
      city: "",
      details: "",
    }),
    []
  );

  async function sendCashOrder(values) {
    setIsLoading(true);

    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Your Cash Order is successfully Done", {
        duration: 2000,
        position: "top-center",
      });
      console.log("Your order is done successfully");
      console.log(res.data);
    } catch (error) {
      toast.error("Error in Completing your Cash Order", {
        duration: 2000,
        position: "top-center",
      });
      console.error("Error in Completing your Cash Order", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVisaPayment(values) {
    setVisaLoading(true);

    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );


      window.location.href = res.data.session.url;
    } catch (error) {
      toast.error("Error initiating Visa payment", {
        duration: 2000,
        position: "top-center",
      });
      console.error("Error initiating Visa payment", error);
    } finally {
      setVisaLoading(false);
    }
  }

  async function handleSubmit(values) {
    if (myFormik.submitCount > 0) {
      
      await handleVisaPayment(values);
    } else {
      
      await sendCashOrder(values);
    }
  }

  const myFormik = useFormik({
    initialValues,
    onSubmit: handleSubmit, 
    validationSchema: Yup.object({
      city: Yup.string()
        .min(4, "Must be at least 4 characters")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      details: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
    }),
  });

  const handleVisaButtonClick = () => {
    myFormik.submitForm(); 
  };
  console.log(myFormik.submitCount);
  return (
    <div className="container mt-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">

            <Link to="/" className='link-unstyle'><i className='fa fa-solid fa-home'></i>  Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products" className='link-unstyle'>Products</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/cart" className='link-unstyle'>Cart</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Payment
          </li>
        </ol>
      </nav>
      <div className="row gx-5 gy-4">
        <div className="col-12 col-md-6 custom-border-responsive">
          <h2 className="h3 fw-bold">Shipping Information</h2>
          <hr />

          
          <form onSubmit={myFormik.handleSubmit}>
            <label htmlFor="phone">Phone:</label>
            <input
              onBlur={myFormik.handleBlur}
              onChange={myFormik.handleChange}
              value={myFormik.values.phone}
              id="phone"
              type="text"
              className="form-control mb-3"
            />
            {myFormik.errors.phone && myFormik.touched.phone ? (
              <div className="text-danger">{myFormik.errors.phone}</div>
            ) : null}

            <label htmlFor="city">City:</label>
            <input
              onBlur={myFormik.handleBlur}
              onChange={myFormik.handleChange}
              value={myFormik.values.city}
              id="city"
              type="text"
              className="form-control mb-3"
            />
            {myFormik.errors.city && myFormik.touched.city ? (
              <div className="text-danger">{myFormik.errors.city}</div>
            ) : null}

            <label htmlFor="details">Details:</label>
            <textarea
              onBlur={myFormik.handleBlur}
              onChange={myFormik.handleChange}
              value={myFormik.values.details}
              id="details"
              className="form-control mb-3"
            ></textarea>
            {myFormik.errors.details && myFormik.touched.details ? (
              <div className="text-danger">{myFormik.errors.details}</div>
            ) : null}

            <div className="d-flex justify-content-between">
              
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={handleVisaButtonClick} 
                disabled={isLoading}
              >
                {visaLoading ? (
                  <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                  />
                ) : (
                  <span>Pay with Visa</span>
                )}
              </button>
              <Link to="/products" className="btn btn-secondary ms-2 px-4">
                Return to Shopping
              </Link>

            </div>

            
            <button
              type="submit"
              className="btn btn-primary mt-2 px-3 "
              disabled={isLoading}
            >
              {isLoading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                />
              ) : (
                <span>Pay on Delivery</span>
              )}
            </button>
          </form>
        </div>

        <div className="col-12 col-md-6">
          
          <div>
            <h5 className="fw-bold h3">Order Summary</h5>
            <hr />
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="row gx-3 align-items-center pb-3 border-bottom">
                    
                    <div className="col-6 col-md-5 d-flex align-items-center justify-content-start">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="img-thumbnail rounded w-25 me-2"
                        style={{ maxWidth: "50px", height: "auto" }}
                      />
                      <p className="fw-bold">{item.product.title}</p>
                    </div>

                   
                    <div className="col-2 col-md-2 d-flex align-items-center justify-content-center">
                      <p className="text-muted">x{item.count}</p>
                    </div>
                    <div className="col-5 col-md-5 justify-content-end d-flex">
                      <p className="fw-bold">EGP {item.price * item.count}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center my-4">
                <p>No items in the cart.</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <p>
              <strong>Total</strong>{" "}
              <span className="float-end fw-bold">EGP {totalCartPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderSummary);