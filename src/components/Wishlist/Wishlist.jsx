import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export default function Wishlist() {
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers: { token },
        });
        setWishlist(response.data.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token },
      });
      setWishlist(wishlist.filter((item) => item._id !== productId));
      toast.success("Product removed from wishlist", { duration: 2000, position: "top-center" });
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Error removing product", { duration: 2000, position: "top-center" });
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="falling-circles-loading" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="row gy-3">
          {wishlist.map((item, idx) => {
            const product = item;
            return (
              <div key={idx} className="col-md-6 col-sm-12 col-lg-3">
                <div className="card h-100">
                  <div className="position-relative">
                    <img
                      className="card-img-top w-100"
                      src={product?.imageCover}
                      alt={product?.title}
                    />
                    <button
                      className="btn btn-danger position-absolute top-0 end-0 m-2"
                      onClick={() => removeFromWishlist(product?._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  <div className="card-body bg-light">
                    <h5 className="card-title">{product.title?.split(' ').slice(0, 3).join(' ')}</h5>
                    <p className="card-text">{product?.price} EGP</p>
                    <div className="d-flex justify-content-center bg-light">
                    <button
                      onClick={() => addToCart(product._id)}
                      className="btn bg-main text-white w-75 my-2"
                      style={{ backgroundColor: '#007bff' }}
                    >
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to Cart +
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}