import React from 'react'
import { Link } from 'react-router-dom'
import WritePostModal from '../../../components/Modals/WritePostModal'

const RightSideBar = () => {
  const menuItems = [
    {
      link: '/',
      item: 'My Write Up',
      icon: 'https://cdn.lordicon.com/xhcrhqyw.json'
    },
    {
      link: '/',
      item: 'Saved Post',
      icon: 'https://cdn.lordicon.com/eanmttmw.json'
    },
    {
      link: '/',
      item: 'Admin Pannel',
      icon: 'https://cdn.lordicon.com/mrdiiocb.json'
    },
  ]
  const user = "Shahtaz";
  if (!user) {
    return (
      <div className='bg-white p-6 sticky top-24'>
        <h1>Sign In to Write post on Athens</h1>
      </div>
    )
  }
  return (
    <div className='bg-white p-6 sticky top-24'>
      <h1 className='font-bold text-center'>Shahtaz</h1>
      <hr className='my-3' />
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
      <label htmlFor="write-post-modal" className='btn w-full text-white normal-case mt-8'>Write a Post +</label>
      <WritePostModal />
    </div>
  )
}

export default RightSideBar