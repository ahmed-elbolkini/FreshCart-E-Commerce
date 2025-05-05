import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import sliderImage1 from '../../images/slider1.jpg';
import sliderImage2 from '../../images/slider2.jpeg';
import sliderImage3 from '../../images/slider3.jpeg';
import sliderImage4 from '../../images/slidr4.jpg';

export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
            <div>
                <img style={{height:"200px"}} className="w-100" src={sliderImage1} alt="offers-slide" />
            </div>
            <div>
                <img style={{height:"200px"}} className="w-100" src={sliderImage2} alt="offers-slide" />
            </div>
            <div>
                <img style={{height:"200px"}} className="w-100" src={sliderImage3} alt="offers-slide" />
            </div>
            <div>
                <img style={{height:"200px"}} className="w-100" src={sliderImage4} alt="offers-slide" />
            </div>
        </Slider>
    );
}