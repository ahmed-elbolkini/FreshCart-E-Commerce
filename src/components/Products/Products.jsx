// import React, { useContext } from 'react'
// import axios from 'axios'
// import { FallingLines } from 'react-loader-spinner'
// import { useQuery } from '@tanstack/react-query'
// import SimpleSlider from '../HomeSlider/HomeSlider'
// import CategorySlider from '../CategorySlider/CategorySlider'
// import staticSlider from "../../images/static2.webp"
// import staticSlider1 from "../../images/static3.jpg"
// import { Link } from 'react-router-dom'
// import { CartContext } from '../../Context/CartContext'
// import toast from 'react-hot-toast'

// export default function Products() {

//   const { addToCart, numberOfCartItems } = useContext(CartContext)

//   async function handleAddToCart(product) {
//     try {
//       const res = await addToCart(product);
//       console.log("API Response:", res); // Debugging

//       if (!res || !res.data) {
//         console.log("Invalid response received:", res);
//         return;
//       }

//       if (res.data.status?.toLowerCase() === "success") {
//         toast.success("added successfully to your cart", { duration: 2000, position: "top-center" });
//         console.log("Product added successfully to your cart from products page");
//       } else {
//         console.log("Condition did not match:", res.data.status);
//       }
//     } catch (error) {
//       toast.error("Error adding product to cart", { duration: 2000, position: "top-center" });
//       console.error("Error adding product to cart", error);
//     }
//   }

//   async function products() {

//     return axios.get('https://ecommerce.routemisr.com/api/v1/products')

//   }


//   const { data, isLoading, error } = useQuery({ queryKey: ['products'], queryFn: products })
//   const allProducts = data?.data.data
//   // console.log(data);

//   if (isLoading) {
//     return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>

//       <FallingLines
//         color="#4fa94d"
//         width="100"
//         visible={true}
//         ariaLabel="falling-circles-loading" />

//     </div>
//   }
//   return <>
//     <div className="container ">
//       <div className="row mb-4 gx-0 mt-1">
//         <div className="col-md-10">
//           <SimpleSlider />
//         </div>
//         <div className="col-md-2 d-none d-md-block">
//           <img style={{ height: '100px' }} className='w-100' src={staticSlider} alt="cosmo-image" />
//           <img style={{ height: '100px' }} className='w-100' src={staticSlider1} alt="appliances-image" />
//         </div>
//       </div>

//       <CategorySlider />

//       <div className="row mt-3 gy-3 gx-4 products">
//         {allProducts?.length > 0 ? (
//           allProducts.map((product, idx) => (
//             <div key={idx} className="col-md-6 col-sm-12 col-lg-3"> {/* Column */}
//               <div className="card link-unstyle overflow-hidden h-100"> {/* Card */}
//                 <Link className="link-unstyle" to={`/productdetails/${product.id}`}>
//                 <div className='d-flex justify-content-center'>
//                   <img
//                     className="card-img-top w-50 "
//                     src={product.imageCover}
//                     alt={product.name}
//                   />
//                 </div>
                  
//                   <div className="card-body bg-light">
//                     <h3 className="text-main h6">{product.category?.name}</h3>
//                     <h5 className="card-title">
//                       {product.title?.split(' ').slice(0, 2).join(' ')}
//                     </h5>
//                     <div className="d-flex justify-content-between align-items-baseline">
//                       {product.priceAfterDiscount ? (
//                         <>
//                           <p className="text-decoration-line-through">
//                             {product.price + ' EGP'}
//                           </p>
//                           <span className="text-danger fw-bold">
//                             {product.priceAfterDiscount + ' EGP'}
//                           </span>
//                         </>
//                       ) : (
//                         <p>{product.price + ' EGP'}</p>
//                       )}
//                       <div className="d-flex align-items-baseline">
//                         <i className="fa-solid fa-star rating-color"></i>
//                         <p>{product.ratingsAverage}</p>
//                       </div>
//                     </div>
//                   </div>

//                 </Link>
//                 {/* Button moved outside the Link */}
//                 <div className='d-flex justify-content-center bg-light'>
//                   <button
//                     onClick={() => handleAddToCart(product.id)}
//                     className="btn bg-main text-white w-75 my-2"
//                     style={{ backgroundColor: '#007bff' }} // Fallback for `bg-main`
//                   >
//                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to Cart +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : null}
//       </div>
//     </div >
//   </>
// }


// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { FallingLines } from 'react-loader-spinner';
// import { useQuery } from '@tanstack/react-query';
// import SimpleSlider from '../HomeSlider/HomeSlider';
// import CategorySlider from '../CategorySlider/CategorySlider';
// import staticSlider from "../../images/static2.webp";
// import staticSlider1 from "../../images/static3.jpg";
// import { Link } from 'react-router-dom';
// import { CartContext } from '../../Context/CartContext';
// import toast from 'react-hot-toast';

// export default function Products() {
//   const { addToCart, numberOfCartItems } = useContext(CartContext);

//   // State for managing the current page
//   const [currentPage, setCurrentPage] = useState(1);

//   async function handleAddToCart(product) {
//     try {
//       const res = await addToCart(product);
//       console.log("API Response:", res); // Debugging

//       if (!res || !res.data) {
//         console.log("Invalid response received:", res);
//         return;
//       }

//       if (res.data.status?.toLowerCase() === "success") {
//         toast.success("Added successfully to your cart", { duration: 2000, position: "top-center" });
//         console.log("Product added successfully to your cart from products page");
//       } else {
//         console.log("Condition did not match:", res.data.status);
//       }
//     } catch (error) {
//       toast.error("Error adding product to cart", { duration: 2000, position: "top-center" });
//       console.error("Error adding product to cart", error);
//     }
//   }

//   // Fetch products for the current page
//   async function fetchProducts(page) {
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
//   }

//   // UseQuery to fetch data for the current page
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['products', currentPage], // Include currentPage in the query key
//     queryFn: () => fetchProducts(currentPage),
//   });

//   const allProducts = data?.data.data; // Products for the current page
//   const metadata = data?.data.metadata; // Pagination metadata

//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <FallingLines
//           color="#4fa94d"
//           width="100"
//           visible={true}
//           ariaLabel="falling-circles-loading"
//         />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-danger text-center">Error loading products. Please try again.</div>;
//   }

//   return (
//     <>
//       <div className="container">
//         {/* Sliders */}
//         <div className="row mb-4 gx-0 mt-1">
//           <div className="col-md-10">
//             <SimpleSlider />
//           </div>
//           <div className="col-md-2 d-none d-md-block">
//             <img style={{ height: '100px' }} className="w-100" src={staticSlider} alt="cosmo-image" />
//             <img style={{ height: '100px' }} className="w-100" src={staticSlider1} alt="appliances-image" />
//           </div>
//         </div>

//         <CategorySlider />

//         {/* Products Grid */}
//         <div className="row mt-3 gy-3 gx-4 products">
//           {allProducts?.length > 0 ? (
//             allProducts.map((product, idx) => (
//               <div key={idx} className="col-md-6 col-sm-12 col-lg-3">
//                 <div className="card link-unstyle overflow-hidden h-100">
//                   <Link className="link-unstyle" to={`/productdetails/${product.id}`}>
//                     <div className="d-flex justify-content-center">
//                       <img
//                         className="card-img-top w-50"
//                         src={product.imageCover}
//                         alt={product.name}
//                       />
//                     </div>
//                     <div className="card-body bg-light">
//                       <h3 className="text-main h6">{product.category?.name}</h3>
//                       <h5 className="card-title">
//                         {product.title?.split(' ').slice(0, 2).join(' ')}
//                       </h5>
//                       <div className="d-flex justify-content-between align-items-baseline">
//                         {product.priceAfterDiscount ? (
//                           <>
//                             <p className="text-decoration-line-through">
//                               {product.price + ' EGP'}
//                             </p>
//                             <span className="text-danger fw-bold">
//                               {product.priceAfterDiscount + ' EGP'}
//                             </span>
//                           </>
//                         ) : (
//                           <p>{product.price + ' EGP'}</p>
//                         )}
//                         <div className="d-flex align-items-baseline">
//                           <i className="fa-solid fa-star rating-color"></i>
//                           <p>{product.ratingsAverage}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                   <div className="d-flex justify-content-center bg-light">
//                     <button
//                       onClick={() => handleAddToCart(product.id)}
//                       className="btn bg-main text-white w-75 my-2"
//                       style={{ backgroundColor: '#007bff' }}
//                     >
//                       <i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to Cart +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products available.</p>
//           )}
//         </div>

//         {/* Pagination Controls */}
//         <div className="d-flex justify-content-center mt-4">
//           <button
//             className="btn bg-main text-white me-2"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span className="mx-3">Page {currentPage}</span>
//           <button
//             className="btn bg-main text-white"
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             disabled={currentPage === metadata?.numberOfPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from '@tanstack/react-query';
import SimpleSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import staticSlider from "../../images/static2.webp";
import staticSlider1 from "../../images/static3.jpg";
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]); // Tracks the user's wishlist
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch logged user's wishlist on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers: { token },
        });
        setWishlist(response.data.data.map((item) => item._id)); // Extract product IDs
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

  // Toggle wishlist (add/remove product)
  const toggleWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const isInWishlist = wishlist.includes(productId);

      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
          headers: { token },
        });
        setWishlist(wishlist.filter((id) => id !== productId));
        toast.success("Product removed from wishlist", { duration: 2000, position: "top-center" });
      } else {
        // Add to wishlist
        await axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { productId },
          { headers: { token } }
        );
        setWishlist([...wishlist, productId]);
        toast.success("Product added to wishlist", { duration: 2000, position: "top-center" });
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      toast.error("Error updating wishlist", { duration: 2000, position: "top-center" });
    }
  };

  // Fetch products for the current page
  async function fetchProducts(page) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => fetchProducts(currentPage),
  });

    async function handleAddToCart(product) {
    try {
      const res = await addToCart(product);
      console.log("API Response:", res); // Debugging

      if (!res || !res.data) {
        console.log("Invalid response received:", res);
        return;
      }

      if (res.data.status?.toLowerCase() === "success") {
        toast.success("added successfully to your cart", { duration: 2000, position: "top-center" });
        console.log("Product added successfully to your cart from products page");
      } else {
        console.log("Condition did not match:", res.data.status);
      }
    } catch (error) {
      toast.error("Error adding product to cart", { duration: 2000, position: "top-center" });
      console.error("Error adding product to cart", error);
    }
  }

  const allProducts = data?.data.data; // Products for the current page
  const metadata = data?.data.metadata; // Pagination metadata

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="falling-circles-loading" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center">Error loading products. Please try again.</div>;
  }

  return (
    <>
      <div className="container">
        
        <div className="row mb-4 gx-0 mt-1">
          <div className="col-md-10">
            <SimpleSlider />
          </div>
          <div className="col-md-2 d-none d-md-block">
            <img style={{ height: '100px' }} className="w-100" src={staticSlider} alt="cosmo-image" />
            <img style={{ height: '100px' }} className="w-100" src={staticSlider1} alt="appliances-image" />
          </div>
        </div>

        <CategorySlider />

        {/* Products Grid */}
        <div className="row mt-3 gy-3 gx-4 products">
          {allProducts?.length > 0 ? (
            allProducts.map((product, idx) => (
              <div key={idx} className="col-md-6 col-sm-12 col-lg-3">
                <div className="card link-unstyle overflow-hidden h-100 position-relative">
                  
                  <i
                    className={`fa-heart ${
                      wishlist.includes(product.id) ? "fa-solid text-danger" : "fa-regular"
                    } position-absolute top-0 end-0 m-2`}
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product.id);
                    }}
                  ></i>

                  <Link className="link-unstyle" to={`/productdetails/${product.id}`}>
                    <div className="d-flex justify-content-center">
                      <img
                        className="card-img-top w-50"
                        src={product.imageCover}
                        alt={product.name}
                      />
                    </div>
                    <div className="card-body bg-light">
                      <h3 className="text-main h6">{product.category?.name}</h3>
                      <h5 className="card-title">
                        {product.title?.split(' ').slice(0, 2).join(' ')}
                      </h5>
                      <div className="d-flex justify-content-between align-items-baseline">
                        {product.priceAfterDiscount ? (
                          <>
                            <p className="text-decoration-line-through">
                              {product.price + ' EGP'}
                            </p>
                            <span className="text-danger fw-bold">
                              {product.priceAfterDiscount + ' EGP'}
                            </span>
                          </>
                        ) : (
                          <p>{product.price + ' EGP'}</p>
                        )}
                        <div className="d-flex align-items-baseline">
                          <i className="fa-solid fa-star rating-color"></i>
                          <p>{product.ratingsAverage}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-center bg-light">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="btn bg-main text-white w-75 my-2"
                      style={{ backgroundColor: '#007bff' }}
                    >
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to Cart +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn bg-main text-white me-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-3">Page {currentPage}</span>
          <button
            className="btn bg-main text-white"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === metadata?.numberOfPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}