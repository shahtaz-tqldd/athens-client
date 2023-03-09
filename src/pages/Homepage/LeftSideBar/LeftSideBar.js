import React from 'react'
import logo from '../../../assets/icons/logo.png'
import '../../../assets/styles/logo.css'

const LeftSideBar = () => {
  return (
    <div className='bg-[#E1EEDD] px-6 py-12 sticky top-24 lg:block hidden'>
      <img src={logo} alt="" className='w-[50%] mx-auto logo-rotate' />
      <h1 className='text-xl font-bold text-center my-2'>Welcome to Athens</h1>
      <p className='text-center'>Share Your Wisdom and Discover New Horizons with Athens</p>
    </div>
  )
}

export default LeftSideBar