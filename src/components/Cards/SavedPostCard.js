import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import DeleteModal from '../Modals/DeleteModal'

const SavedPostCard = ({ post, index }) => {
    const { refetchSavedPosts, refetch, user } = useContext(AuthContext)
    const { title, content, time, date, _id } = post
    const [id, setId] = useState(null)
    const handleDeleteSavedPost = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/posts/${id}/save`, {
                userId: user?.email
            });
            if (res.data.message === 'Saved post removed') {
                toast.error(res.data.message)
            }
            else if (res.data.message === 'Post is Saved') {
                toast.success(res.data.message)
            }
            refetch()
            refetchSavedPosts()
            setId(null)
        } catch (err) {
            console.error(err);
        }
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
                <DeleteModal handleDelete={handleDeleteSavedPost} id={id} text="Are you sure want to remove this saved post?" />
            }
        </div>
    )
}

export default SavedPostCard