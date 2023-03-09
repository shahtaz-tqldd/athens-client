import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthProvider'

const AllPosts = () => {
  const { posts } = useContext(AuthContext)
  return (
    <div className='max-w-[900px] mx-auto'>
      <h1 className='font-bold mt-2 mb-4'>All Posts</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              posts?.map((post, index) => <tr key={index}>
                <th>{index + 1}</th>
                <td>{post?.title}</td>
                <td>{post?.author}</td>
                <td><button>Delete</button></td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllPosts