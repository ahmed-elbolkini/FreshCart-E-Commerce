import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Context/AuthContext'

export default function Login() {

  const myData = {
    email: '',
    password: ''
  }
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errMessage, setErrMessage] = useState(undefined)
  const {setToken} = useContext(AuthContext)

  let navigate = useNavigate();
  async function sendUserData(values) {

    setIsLoading(true)

    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      setIsLoading(true)
      setIsSuccess(true)
      localStorage.setItem('token',res.data.token)
      setToken(res.data.token)
      
      setTimeout(() => {
        setIsSuccess(false)
        navigate('/Products')
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
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),     
    })
  })

  return <>
    <div className="p-5 w-75 m-auto">
      {isSuccess ? <div className="alert alert-success text-center">Welcome Back </div> : null}
      {errMessage ? <div className="alert alert-danger text-center">{errMessage} </div> : null}
      <h2>Login:</h2>

      <form onSubmit={myFormik.handleSubmit}>
        
        <label htmlFor="email">email:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' type="email" className="form-control mb-3" />
        {myFormik.errors.email && myFormik.touched.email ? <div className='text-danger'>{myFormik.errors.email}</div> : null}

        <label htmlFor="password">password:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' type="password" className="form-control mb-3" />
        {myFormik.errors.password && myFormik.touched.password ? <div className='text-danger'>{myFormik.errors.password}</div> : null}

       
        <button type="submit" className='btn bg-main text-white'>
          {isLoading ? <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          /> : 'Login'}


        </button>
      </form>

    </div>
  </>
}
