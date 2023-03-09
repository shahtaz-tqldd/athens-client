import React, { useContext } from 'react'
import PostCard from '../../../components/Cards/PostCard'
import { AuthContext } from '../../../context/AuthProvider'

const Posts = () => {
  const {posts} = useContext(AuthContext)
  return (
    <div className='flex flex-col gap-3'>
      {
        posts.map((post, index) => <PostCard key={index} post={post} />)
      }
    </div>
  )
}

export default Posts