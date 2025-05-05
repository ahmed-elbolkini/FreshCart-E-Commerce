import React, { useContext } from 'react';
import logo from '../../images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import '../../index.css'

export default function Navbar() {
    const { numberOfCartItems } = useContext(CartContext);
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    function logout() {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className='container'>
                    <Link className="navbar-brand align-items-center justify-content-center d-flex" to="/products">
                        <img src={logo} alt="FreshCart" width={"100px"} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {token ? (
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link fw-bold" to="/products">
                                        Home <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fw-bold" to="/Categories">
                                        Categories
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fw-bold" to="/brands">
                                        Brands
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fw-bold" to="/AllOrders">
                                        All Orders
                                    </Link>
                                </li>
                            </ul>
                        ) : null}

                        <ul className="navbar-nav ms-auto align-items-center">
                            {/* <li className="nav-item">
                                <ul className="list-unstyled d-flex ">
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
                            </li> */}
                            {token ? (
                                <div className="d-flex align-items-center">
                                    <li className="nav-item position-relative d-lg-block d-md-none d-sm-none">
                                        <Link data-tooltip-id="my-tooltip" data-tooltip-content="Cart" className="nav-link" to="/Cart">
                                            <i className="fa fa-shopping-cart " aria-hidden="true"></i>
                                            <ReactTooltip id="my-tooltip" />
                                        </Link>
                                        {numberOfCartItems ? (
                                            <span className="position-absolute top-0 start-100 translate-middle badge-positioned badge badge-success bg-main">
                                                {numberOfCartItems ? numberOfCartItems : ''}
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </li>
                                    <li className="nav-item  py-0 ms-3 ">
                                        <Link data-tooltip-id="my-tooltip" data-tooltip-content="Wishlist" className="nav-link fw-bold" to="/Wishlist">
                                            <i className="fa-solid fa-heart  fa-lg" aria-hidden="true"></i>
                                            <ReactTooltip id="my-tooltip" />
                                        </Link> </li>
                                    <li className="nav-item btn btn-sm bg-main py-0 ms-3">
                                        <span onClick={logout} role="button" className="nav-link  text-white" to="/">
                                            Logout
                                        </span>
                                    </li>
                                </div>
                            ) : (
                                <>
                                    <li className="nav-item btn btn-sm bg-main py-0 ms-3">
                                        <Link className="nav-link text-white" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item btn btn-sm bg-main py-0 ms-3">
                                        <Link className="nav-link text-white" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Add the cart outside the navbar, can be fixed to the right */}
            <div className="cart-icon-fixed d-block d-lg-none d-md-none">
                <Link className="nav-link" to="/Cart">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Link>
                {numberOfCartItems ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge-positioned badge badge-success bg-main">
                        {numberOfCartItems ? numberOfCartItems : ''}
                    </span>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}