import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

function CategoryProductsPage() {
    const { categoryId } = useParams(); 
    const { addToCart } = useContext(CartContext)

    async function handleAddToCart(product) {
        try {
            const res = await addToCart(product);

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

  
    const { isLoading, data, error } = useQuery({
        queryKey: ['products', categoryId],
        queryFn: () =>
            axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
                params: { category: categoryId }, 
            }),
    });

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>

            <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading" />

        </div>
    }
    if (error) return <p>Error fetching products.</p>;

    const products = data?.data.data || [];

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">

                        <Link to="/products" className='link-unstyle'><i className='fa fa-solid fa-home'></i>  Home</Link>
                    </li>

                    <li className="breadcrumb-item active" aria-current="page">
                        Categories
                    </li>
                </ol>
            </nav>
            <h1 className="text-center mb-4">Products</h1>
            <div className="row mt-3 gy-3 gx-4 products">
                {products.length > 0 ? (
                    products.map((product, idx) => (
                        <div key={idx} className="col-md-6 col-sm-12 col-lg-3"> 
                            <div className="card link-unstyle overflow-hidden h-100"> 
                                <Link className="link-unstyle" to={`/productdetails/${product.id}`}>
                                    <div className='d-flex justify-content-center'>
                                        <img
                                            className="card-img-top w-50 "
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
                                
                                <div className='d-flex justify-content-center bg-light'>
                                    <button
                                        onClick={() => handleAddToCart(product.id)}
                                        className="btn bg-main text-white w-75 my-2"
                                    >
                                        <i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to Cart +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : <p className='text-center h3'>No products found in this category!</p>}
            </div>
        </div>
    );
}

export default CategoryProductsPage;