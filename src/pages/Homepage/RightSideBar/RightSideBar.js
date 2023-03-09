import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import WritePostModal from '../../../components/Modals/WritePostModal'
import { AuthContext } from '../../../context/AuthProvider'

const RightSideBar = () => {
  const [modal, setModal] = useState(false)
  const menuItems = [
    {
      link: '/my-write-up',
      item: 'My Write Up',
      icon: 'https://cdn.lordicon.com/xhcrhqyw.json'
    },
    {
      link: '/saved-post',
      item: 'Saved Post',
      icon: 'https://cdn.lordicon.com/eanmttmw.json'
    },
    {
      link: '/admin',
      item: 'Admin Pannel',
      icon: 'https://cdn.lordicon.com/mrdiiocb.json'
    },
  ]
  const { user } = useContext(AuthContext)
  if (!user?.email) {
    return (
      <div className='bg-white p-6 sticky top-24 lg:block md:block hidden'>
        <p>To write post in Athens Please <Link to='/login' className='text-primary'>Sign In</Link></p>
      </div>
    )
  }
  return (
    <div className='bg-white p-6 sticky top-24 lg:block md:block hidden'>
      <h1 className='font-bold text-center'>{user?.displayName}</h1>
      <hr className='mt-3 mb-6' />
      {
        menuItems.map(({ link, item, icon }, index) => <Link key={index} to={link} className='flex items-center gap-2 mb-2'>
          <lord-icon
            target="a"
            src={icon}
            trigger="hover"
            colors="primary:#66a1ee"
            style={{ height: "20px", width: "20px" }}>
          </lord-icon>
          <span className='textBlue'>{item}</span>
        </Link>
        )
      }
      <label htmlFor="write-post-modal" onClick={()=>setModal(true)} className='btn w-full text-white normal-case mt-6'>Write a Post +</label>
      {
        modal && <WritePostModal setModal={setModal} />
      }
    </div>
  )
}

export default RightSideBar