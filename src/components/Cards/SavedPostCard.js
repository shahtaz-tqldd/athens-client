import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import DeleteModal from '../Modals/DeleteModal'

const SavedPostCard = ({ post, index }) => {
    const { refetchSavedPosts, user } = useContext(AuthContext)
    const { title, content, time, date, _id } = post
    const [id, setId] = useState(null)

    const handleDeleteSavedPost = (id) => {
        fetch(`https://athens-server.vercel.app/saved-posts?postId=${id}&email=${user?.email}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.error('Your post is deleted!')
                refetchSavedPosts()
                setId(null)
            })
    }
    return (
        <div className='p-5 flex flex-col justify-between bg-white hover:shadow-lg'>
            <div>
                <div className='flex text-xs gap-3'>
                    <span className='text-primary'>{date}</span>
                    <span className='text-error'>{time}</span>
                </div>
                <h1 className='font-bold text-lg mb-1 leading-6'>{title}</h1>
                <p>{content.length > 140 ? content?.slice(0, 140) + ' . . .' : content}</p>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <Link to={`/posts/${_id}`} className='text-sm text-primary pt-2 hover:underline'>Read Full Post</Link>
                <label htmlFor='delete-modal' onClick={() => setId(_id)} className='btn rounded-sm text-xs normal-case text-white btn-sm btn-error'>Remove</label>
            </div>

            {
                id &&
                <DeleteModal handleDelete={handleDeleteSavedPost} id={id} />
            }
        </div>
    )
}

export default SavedPostCard