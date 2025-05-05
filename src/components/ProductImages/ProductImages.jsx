import React from "react";
import Slider from "react-slick";
import { FallingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function ProductImages() {
    const { id } = useParams();

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    

    const { isLoading, data } = useQuery({
        queryKey: [`productDetails-${id}`, id], 
        queryFn: getProductDetails,
    });
    

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="falling-circles-loading" />
            </div>
        );
    }

    const product = data?.data.data;
    const images = product?.images || [];


    const CustomPrevArrow = (props) => (
        <button {...props} className="custom-arrow prev-arrow">
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    );

    const CustomNextArrow = (props) => (
        <button {...props} className="custom-arrow next-arrow">
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    );

    const settings = {
        customPaging: function (i) {
            return (
                <button className="custom-thumbnail">
                    <img src={images[i]} alt={`Thumbnail ${i + 1}`} />
                </button>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((image, idx) => (
                    <div key={idx}>
                        <img className="w-100 mb-2" src={image} alt={`Product ${idx + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ProductImages;
