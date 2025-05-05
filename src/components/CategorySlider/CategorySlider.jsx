import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  function getGategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

 const{data,isLoading} = useQuery({ queryKey: ["categories"], queryFn: getGategory });

 
 if (isLoading){
  return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
 
           <FallingLines
             color="#4fa94d"
             width="100"
             visible={true}
             ariaLabel="falling-circles-loading" />
 
         </div>
 }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data?.data.data.map((category, idx) => (
          <div key={idx}>
            <Link to={`/category/${category._id}`} className="link-unstyle">
            <img
              style={{ height: "150px" }}
              className="w-100"
              src={category.image}
              alt={category.name}
            />
            <p className="text-center">{category.name}</p>
            </Link>
            
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
