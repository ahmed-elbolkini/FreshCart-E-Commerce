import React from 'react'
import errorImage from '../../images/error.svg'

export default function NotFound() {
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <img src={errorImage} alt="Error 404" />
    </div>

    </>
  )
}
