import React, { useState, useEffect } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";


const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Get user token
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/orders", {
          headers: { token },
        });
        setOrders(response.data.data); // Assuming the API returns an array of orders
      } catch (err) {
        setError("Error fetching orders. Please try again.");
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);


  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#0d6efd', '#0d6efd', '#0d6efd', '#0d6efd', '#0d6efd']}
        />
        <p className="mt-3">Loading your orders...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }


  if (orders.length === 0) {
    return (
      <div className="text-center mt-5">
        <p>You have no orders yet.</p>
        <button className="btn btn-primary">
          <a href="/products" className="text-white text-decoration-none">
            Start Shopping
          </a>
        </button>
      </div>
    );
  }


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Orders</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order ID</th>
            <th scope="col">Shipping Address</th>
            <th scope="col">Products</th>
            <th scope="col">Total Price</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <th scope="row">{index + 1}</th>
              <td>{order._id}</td>
              <td>
                <strong>City:</strong> {order?.shippingAddress?.city}, <br />
                <strong>Phone:</strong> {order?.shippingAddress?.phone}, <br />
                <strong>Details:</strong> {order?.shippingAddress?.details}
              </td>
              <td>
                <ul className="list-unstyled">
                  {order.cartItems.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item?.product?.title}</strong> ({item?.count} x EGP {item?.price})
                      <br />
                      <img
                        src={item?.product?.imageCover}
                        alt={item?.product?.title}
                        style={{ width: "50px", height: "auto" }}
                        className="img-thumbnail rounded"
                      />
                    </li>
                  ))}
                </ul>
              </td>
              <td>EGP {order?.totalOrderPrice}</td>
              <td>
                <span
                  className={`badge ${order?.isPaid ? "bg-success" : "bg-danger"}`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;