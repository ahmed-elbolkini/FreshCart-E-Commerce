import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FallingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Brands() {

async function getBrands() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')

  }


  const { data, isLoading } = useQuery({ queryKey: ['products'], queryFn: getBrands })
  const brands = data?.data.data

  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>

      <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading" />

    </div>
  }

  return <>
    <div className="container bg-light py-4">
      <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
      
                  <Link to="/products" className='link-unstyle'><i className='fa fa-solid fa-home'></i>  Home</Link>
                </li>
      
                <li className="breadcrumb-item active" aria-current="page">
                  Brands
                </li>
              </ol>
            </nav>
      <div className="row mt-3 gy-3" >
        {brands ? brands.map((brand, idx) =>
          <div key={idx} className="col-md-3 col-sm-6 col-lg-2 " >
            <div className="card">
              <Link to='/categories' className='link-unstyle'>
              <div >
                <img src={brand.image} style={{ height: "150px" }} className='w-100' alt={brand.name} />
                <h3 className='text-main text-center mt-2 h6'>{brand.name}</h3>
              </div>
            </Link>
            </div>
            
          </div>
        ) : null}
      </div >
    </div>
  </>
}
