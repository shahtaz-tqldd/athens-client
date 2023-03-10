import React, { useContext } from 'react'
import PostCard from '../../../components/Cards/PostCard'
import Loader from '../../../components/Loader/Loader'
import { AuthContext } from '../../../context/AuthProvider'

const Posts = () => {
  const { posts, loading, postLoading } = useContext(AuthContext)
  if (loading || postLoading) {
    return <Loader />
  }
  return (
    <div className='flex flex-col gap-3'>
      {
        posts.map((post, index) => <PostCard key={index} post={post} />)
      }
    </div>
  )
}

export default Posts