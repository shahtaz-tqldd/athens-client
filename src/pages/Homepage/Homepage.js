import React from 'react'
import useTitle from '../../hooks/useTitle'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import Posts from './Posts/Posts'
import RightSideBar from './RightSideBar/RightSideBar'

const Homepage = () => {
  useTitle('Feeds')
  return (
    <section className='max-w-[1280px] mx-auto px-3 flex lg:gap-10 md:gap-10 pt-8'>
      {/* LEFT SIDEBAR */}
      <div className='lg:w-[25%]'>
        <LeftSideBar />
      </div>

      {/* MIDDLE POST SECTION */}
      <div className='lg:w-[50%] md:w-[60%]'>
        <Posts />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className='lg:w-[25%] md:w-[40%]'>
        <RightSideBar />
      </div>
    </section>
  )
}

export default Homepage