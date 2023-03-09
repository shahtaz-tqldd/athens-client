import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.png'

const Logo = () => {
  return (
    <Link to='/' className="text-xl font-bold text-neutral hover:opacity-60 transition duration-300 flex items-center gap-1">
    <img src={logo} alt="" className='h-8'/>
        Athens
    </Link>
  )
}

export default Logo