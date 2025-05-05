import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { FallingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import emptyCart from "../../images/cart-empty.png"

export default function Cart() {
  const { updateCartCount, removeCartItem, totalCartPrice, cartItems,cartID } = useContext(CartContext)
  console.log(cartID);
  async function handleUpdateCartCount(id, newCount) {
    await updateCartCount(id, newCount)
  }

  if (!cartItems) {

    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading" />
    </div>
  }
  return <>
    {cartItems.length ? <div className="container bg-main-light my-2 p-3 rounded overflow-hidden">

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            
            <Link to="/" className='link-unstyle'><i className='fa fa-solid fa-home'></i>  Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products" className='link-unstyle'>Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Cart
          </li>
        </ol>
      </nav>

      <h1 className="h3 mb-4">Shopping Cart</h1>


      <div className="row">
        
        <div className="col-md-8">
          {cartItems?.map((item, index) => (
            <div key={index} className="card mb-4">
              <div className="row gx-3 align-items-center p-3">
                
                <div className="col-3 col-md-2">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="img-fluid rounded"
                  />
                </div>

                
                <div className="col-4 col-md-5">
                  <h6 className="mb-1">{item.product.title}</h6>
                  <p className="text-muted mb-1">Price: {item.price} EGP</p>
                  <button
                    onClick={() => removeCartItem(item.product._id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    <i className="fa-solid fa-trash me-1"></i> Remove
                  </button>
                </div>

                
                <div className="col-3 col-md-3 d-flex justify-content-center align-items-center">
                  <button
                    disabled={item.count === 1}
                    onClick={() => handleUpdateCartCount(item.product._id, item.count - 1)}
                    className="btn btn-sm btn-outline-success"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.count}</span>
                  <button
                    onClick={() => handleUpdateCartCount(item.product._id, item.count + 1)}
                    className="btn btn-sm btn-outline-success"
                  >
                    +
                  </button>
                </div>

                
                <div className="col-2 col-md-2">
                  <h6 className="text-muted ">EGP {item.price * item.count}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="col-md-4">
          <div className="card p-3">
            <h4 className="border-bottom pb-3 mb-3">Order Summary:</h4>
            <div className="d-flex justify-content-between mb-3">
              <h5 className="text-muted">Total:</h5>
              <h5>{totalCartPrice} EGP</h5>
            </div>
            <Link to="/payment" className="btn bg-main text-white w-100 mb-2">
              Proceed to Checkout
            </Link>
            <p className="text-center text-muted">
              or <Link to="/products" className="text-decoration-none">Continue Shopping →</Link>
            </p>
          </div>
        </div>
      </div>


    </div> : <>
      <div className='container d-flex flex-column justify-content-start align-items-center my-5'>
        <img className='w-50' src={emptyCart} alt="empty cart" />
        <h1 className='text-center'>Your Cart is Empty !</h1>
        <p>Looks like you have not added anything to your cart.Go ahead and explore top categories</p>
        <Link to="/products"><button className='btn bg-main text-white'>Explore Products</button></Link>
      </div>
    </>}


  </>
}




