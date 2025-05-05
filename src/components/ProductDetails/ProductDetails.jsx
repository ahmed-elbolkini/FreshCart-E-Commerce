import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import ProductImages from '../ProductImages/ProductImages'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {

   const {addToCart} =  useContext(CartContext)
   const {id} = useParams()

async function handleAddToCart(product) {
    try {
        const res = await addToCart(product);
        // console.log("API Response:", res); // Debugging
        
        if (!res || !res.data) {
            // console.log("Invalid response received:", res);
            return;
        }

        if (res.data.status?.toLowerCase() === "success") {
            toast.success("added successfully to your cart", {duration: 2000 , position: "top-center"});
        }
    } catch (error) {
        toast.error("Error adding product to cart", {duration: 2000 , position: "top-center"});
    }
}


    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

   const {isLoading,data,isError} = useQuery({queryKey: [`productDetails`,id], queryFn: getProductDetails})

   const product = data?.data.data
   
   if (isLoading){
       return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
   
             <FallingLines
               color="#4fa94d"
               width="100"
               visible={true}
               ariaLabel="falling-circles-loading" />
   
           </div>
   }

   if (isError) {
    return <div className="text-danger text-center">Failed to load product details. Please try again.</div>;
  }
    return <>
        <div className="container vh-100">
            <div className="row my-4 gx-2 align-items-center">
                <div className="col-md-4 ">
                    <ProductImages/>
                </div>
                <div className="col-md-8 ">
                    <h2>{product.title}</h2>
                    <h5 className='text-main'>{product.category.name}</h5>
                    <h4>{product.price} EGP</h4>
                    <p>{product.description}</p>
                    <button onClick={() => handleAddToCart(product.id)} className='btn bg-main text-white w-100'>Add To Cart +</button>
                </div>
            </div>
        </div>
    </>
}
