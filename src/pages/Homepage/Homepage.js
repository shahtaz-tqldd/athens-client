import React from 'react'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import Posts from './Posts/Posts'
import RightSideBar from './RightSideBar/RightSideBar'

const Homepage = () => {
  return (
    <section className='max-w-[1250px] mx-auto px-3 flex gap-10 pt-8'>
      {/* LEFT SIDEBAR */}
      <div className='lg:w-[25%]'>
        <LeftSideBar />
      </div>

      {/* MIDDLE POST SECTION */}
      <div className='lg:w-[50%]'>
        <Posts />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className='lg:w-[25%]'>
        <RightSideBar />
      </div>
    </section>
  )
}

export default Homepage