import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FallingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Categories() {


  async function getCategories() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')

  }


  const { data, isLoading } = useQuery({ queryKey: ['products'], queryFn: getCategories })
  const categories = data?.data.data

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
    <div className="container bg-light">
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
      <div className="row mt-3 gy-3" >
        {categories ? categories.map((category, idx) =>
          <div key={idx} className=" col-md-6 col-sm-12 col-lg-3 " >
            <div className="card">
              <Link to={`/category/${category._id}`} className='link-unstyle'>
                <div >
                  <div><img src={category.image} style={{ height: "200px" }} className='w-100' alt={category.name} /></div>
                  <div className='bg-main p-2'><h3 className='text-white text-center mt-2  h6'>{category.name}</h3></div>
                </div>
              </Link>
            </div>

          </div>
        ) : null}
      </div >
    </div>
  </>
}
