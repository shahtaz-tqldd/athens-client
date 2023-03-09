import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import { BiError } from 'react-icons/bi'
import useTitle from '../../hooks/useTitle'
import GoogleLogin from './GoogleLogin'
import Logo from '../../components/Logo/Logo'

const Login = () => {
  useTitle('Login')
  const { emailLogin } = useContext(AuthContext)
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [formData, setFormData] = useState({
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
    emailLogin(formData.email, formData.password)
      .then(() => {
        toast.success('Login successful!')
        navigate(from, { replace: true })
      })
      .catch(err => {
        console.error(err)
        setError(true)
      })
  }
  return (
    <section className='flex lg:flex-row'>
      <div className='lg:w-[45%] h-[100vh] bg-[#BAD7E9] flex items-center justify-center'>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-login-4268415-3551762.png?f=webp" alt="" className='w-2/3' data-aos="fade-up" />
      </div>
      <div className='lg:w-[55%] flex flex-col items-center justify-center'>
      <div className='scale-125 mb-8'>
            <Logo />
          </div>
        <div className='bg-white w-[400px] rounded-xl shadow-lg p-8' data-aos="flip-right">
          <h2 className='text-xl font-bold text-center mb-4'>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" className="input input-bordered w-full" name="email" value={formData.email} onChange={handleInputChange} required />
            <input type="password" placeholder="Password" className="input input-bordered w-full my-2" name="password" value={formData.password} onChange={handleInputChange} required />
            {error && <span className='text-error text-sm flex items-center gap-1'><BiError />Your Email and Password is incorrect!</span>}
            <button className='btn btn-primary w-full text-white normal-case mt-4'>Login</button>
          </form>
          <GoogleLogin />
          <p className='mt-10'>Don't have an account? <Link to='/register' className='textBlue'>Register Here</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login