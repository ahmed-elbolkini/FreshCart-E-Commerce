import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(AuthContext)
  const [numberOfCartItems, setNumberOfCartItems] = useState(0)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [cartItems, setCartItems] = useState(null)
  const [cartID, setCartID] = useState(null)

  async function addToCart(id) {

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
        "productId": id
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      toast.success("added successfully to your cart", { duration: 2000, position: "top-center" });
      await getUserCart();
      return response;
    } catch (error) {
      console.error("API call failed:", error);
      return null;
    }
  }

  async function getUserCart() {
    const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    console.log("User Cart Response:", res.data); // Debugging
    if (res.data.status === 'success') {
      setCartID(res.data.cartId)
      setNumberOfCartItems(res.data.numOfCartItems)
      setTotalCartPrice(res.data.data.totalCartPrice)
      setCartItems(res.data.data.products)
      console.log("Cart ID:", res.data.data.cartId);
      console.log("NumberOfCartItems:", res.data.numOfCartItems);
      console.log("Total Price:", res.data.data.totalCartPrice);
      console.log("Cart items:", res.data.data.products);
    }
  }

  async function updateCartCount(id, newCount) {
    await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      "count": newCount
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(res => {
        setNumberOfCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)
        setCartItems(res.data.data.products)
      })
      .catch(err => {
        console.log(err);
      })
  }

  function removeCartItem(id) {
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(res => {
        setNumberOfCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)
        setCartItems(res.data.data.products)
      })
      .catch(err => {
        console.log(err);
      })
  }
  function clearCart() {
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(res => {
        setNumberOfCartItems(0)
        setTotalCartPrice(0)
        setCartItems([])

        return true
      })
      .catch(err => {
        console.log(err);
        return false
      })
  }

  useEffect(() => {
    getUserCart()
  }, [token])
  return (
    <CartContext.Provider value={{ addToCart, numberOfCartItems, totalCartPrice, cartItems, clearCart, removeCartItem, updateCartCount, cartID }}>
      {children}
    </CartContext.Provider>
  )
}
