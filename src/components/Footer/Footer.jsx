import React from 'react'
import appleStore from "../../images/app-store.svg"
import googlePlay from "../../images/google-play.svg"
import Visa from "../../images/card-visa.svg"
import masterCArd from "../../images/card-mastercard.svg"
import amexCard from "../../images/card-amex.svg"
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <div className="bg-light w-100 pt-4 mt-3 px-3">
        <div className="container-fluid mt-3">
          <h4 className='fw-bold'>Get The FreshCart App</h4>
          <p>Subscribe Our Newspaper To Get The Latest Offers & Hot Deals</p>
          <div className="d-flex justify-content-center align-items-center mb-4">
            <input className='form-control mx-4' type="text" placeholder='Enter your email' />
            <button className='btn bg-main text-white me-4'>Subscribe</button>
          </div>
          <div className="d-flex justify-content-between align-items-center border-top border-bottom pt-3">
            <div className='d-flex d-flex flex-md-row flex-column justify-content-center '>
              <p className='fw-bold '>Payment Partners</p>
              <Link><img className='mx-2' src={Visa} alt="Visa" /></Link>
              <Link><img className='mx-2' src={masterCArd} alt="masterCArd" /></Link>
              <Link><img className='mx-2' src={amexCard} alt="amexCard" /></Link>
            </div>
            <div className='d-flex flex-md-row flex-column justify-content-center '>
              <p className='fw-bold'>Download FreshCart App</p>
              <Link><img className='mx-2' src={appleStore} alt="app-store" /></Link>
              <Link><img className='mx-2' src={googlePlay} alt="google-play" /></Link>
            </div>
          </div>
          <div className="d-flex  justify-content-between align-items-center mt-4 mb-3">
            <div>
                <ul className="list-unstyled d-flex justify-content-md-start justify-content-center align-items-center">
                  <li>
                    <i className="me-4 cursor-pointer fa-brands fa-instagram"></i>
                  </li>
                  <li>
                    <i className="me-4 cursor-pointer fa-brands fa-facebook"></i>
                  </li>
                  <li>
                    <i className="me-4 cursor-pointer fa-brands fa-tiktok"></i>
                  </li>
                  <li>
                    <i className="me-4 cursor-pointer fa-brands fa-twitter"></i>
                  </li>
                  <li>
                    <i className="me-4 cursor-pointer fa-brands fa-linkedin"></i>
                  </li>
                  <li>
                    <i className="me-4 cursor-pointer fa-brands fa-youtube"></i>
                  </li>
                </ul>
            </div>
            <div className="d-flex justify-content-md-end justify-content-center align-items-center">
              <p className='mx-2 cursor-pointer'>Privacy Policy</p>
              <p className='mx-2 cursor-pointer'>Terms of Use</p>
              <p className='mx-2 cursor-pointer'>Contact Us</p>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p className='mx-2 fw-bold'>© 2024 FreshCart. All rights reserved.</p>
          </div>
        </div>


      </div>
    </>
  )
}
