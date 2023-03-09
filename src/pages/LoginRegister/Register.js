import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import { AuthContext } from '../../context/AuthProvider'
import useTitle from '../../hooks/useTitle'
import GoogleLogin from './GoogleLogin'

const Register = () => {
  useTitle('Sign Up')
  const { emailRegister, updateUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const userInfo = { displayName: formData.fullName }
    emailRegister(formData.email, formData.password)
      .then(() => {
        updateUser(userInfo)
          .then(() => {
            toast.success("Account created successfully")
            navigate('/')
          })
          .catch(err => console.error(err))

      })
      .catch(err => console.error(err))
  }

  return (
    <section className='flex lg:flex-row'>
      <div className='lg:w-[45%] h-[100vh] bg-[#BAD7E9] flex items-center justify-center'>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/attract-customers-5650437-4708034.png?f=webp" alt="" className='w-2/3' data-aos="fade-up"/>
      </div>
      <div className='lg:w-[55%] flex flex-col items-center justify-center'>
      <div className='scale-125 mb-8'>
            <Logo />
          </div>
        <div className='bg-white w-[400px] rounded-xl shadow-lg p-8' data-aos="flip-right">
          <h2 className='text-xl font-bold text-center mb-4'>Open a account</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Full Name" className="input input-bordered w-full mb-2" name="fullName" value={formData.fullName} onChange={handleInputChange} required/>
            <input type="email" placeholder="Email" className="input input-bordered w-full" name="email" value={formData.email} onChange={handleInputChange} required/>
            <input type="password" placeholder="Password" className="input input-bordered w-full my-2" name="password" value={formData.password} onChange={handleInputChange} required/>
            <button className='btn btn-primary w-full text-white normal-case mt-4'>Register</button>
          </form>
          <GoogleLogin />
          <p className='mt-10'>Already have an account? <Link to='/login' className='textBlue'>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Register