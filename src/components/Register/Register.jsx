import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {

  const myData = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  }
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errMessage, setErrMessage] = useState(undefined)

  let navigate = useNavigate();

  async function sendUserData(values) {

    setIsLoading(true)

    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      setIsLoading(true)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        navigate('/login')
      }, 2000)
    }
    catch (error) {
      setErrMessage(error.response.data.message)
      setTimeout(() => {
        setErrMessage(undefined)
      }, 3000);
    }
    finally {
      setIsLoading(false)
    }
  }

  function onSubmit(values) {

    sendUserData(values)
    console.log(values)
  }

  const myFormik = useFormik({
    initialValues: myData,
    onSubmit: onSubmit,
    validationSchema: Yup.object({
      name: Yup.string().min(4, 'Must be at least 4 characters').max(15, 'Must be 15 characters or less').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required').min(8, 'Must be at least 8 characters'),
      rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
      phone: Yup.string().required('Required'),
    })
  })

  return <>
    <div className="p-5 w-75 m-auto">
      {isSuccess ? <div className="alert alert-success text-center">Congratulations Your Account Has been Created </div> : null}
      {errMessage ? <div className="alert alert-danger text-center">{errMessage} </div> : null}
      <h2>Register:</h2>

      <form onSubmit={myFormik.handleSubmit}>
        <label htmlFor="name">name:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} id='name' type="text" className="form-control mb-3" />
        {myFormik.errors.name && myFormik.touched.name ? <div className='text-danger'>{myFormik.errors.name}</div> : null}

        <label htmlFor="email">email:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' type="email" className="form-control mb-3" />
        {myFormik.errors.email && myFormik.touched.email ? <div className='text-danger'>{myFormik.errors.email}</div> : null}

        <label htmlFor="password">password:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' type="password" className="form-control mb-3" />
        {myFormik.errors.password && myFormik.touched.password ? <div className='text-danger'>{myFormik.errors.password}</div> : null}

        <label htmlFor="rePassword">rePassword:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} id='rePassword' type="password" className="form-control mb-3" />
        {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className='text-danger'>{myFormik.errors.rePassword}</div> : null}

        <label htmlFor="phone">phone:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} id='phone' type="text" className="form-control mb-3" />
        {myFormik.errors.phone && myFormik.touched.phone ? <div className='text-danger'>{myFormik.errors.phone}</div> : null}

        <button type="submit" className='btn bg-main text-white'>
          {isLoading ? <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          /> : 'Register'}


        </button>
      </form>

    </div>
  </>
}
