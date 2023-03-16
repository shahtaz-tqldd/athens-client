import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import DeleteModal from '../../../components/Modals/DeleteModal'
import { AuthContext } from '../../../context/AuthProvider'

const AllPosts = () => {
  const { posts, refetch } = useContext(AuthContext)
  const [id, setId] = useState(null)
  const handleDeletePost = (id) => {
    fetch(`https://athens-server.vercel.app/posts/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        toast.error('Post is deleted!')
        setId(null)
        refetch()
      })
  }
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
                <td><Link className='hover:underline text-primary transition duration-300' to={`/posts/${post._id}`}>{post?.title}</Link></td>
                <td><span className='text-xs'>{post?.author}</span></td>
                <td><label htmlFor='delete-modal' className='btn btn-error btn-sm text-white normal-case rounded-sm' onClick={() => setId(post?._id)}>Delete</label></td>
              </tr>
              )
            }
          </tbody>
        </table>
        {
          id &&
          <DeleteModal handleDelete={handleDeletePost} id={id} />
        }
      </div>
    </div>
  )
}

export default AllPosts