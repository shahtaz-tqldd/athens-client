import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import DeleteModal from '../Modals/DeleteModal'
import PostUpdateModal from '../Modals/PostUpdateModal'

const PostPreviewCard = ({ post, index, postRefetch }) => {
    const { refetch } = useContext(AuthContext)
    const [id, setId] = useState(null)
    const [postUpdate, setPostUpdate] = useState(null)
    const { title, content, time, date, _id } = post
    const colors = ["#E1EEDD", "#E3DFFD", "#FDFDBD", "#FFDDD2"]
    const handleDeletePost = (id) => {
        fetch(`http://localhost:5000/posts/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.error('Your post is deleted!')
                postRefetch()
                setId(null)
                refetch()
            })
    }
    return (
        <div className='p-5 flex flex-col justify-between hover:shadow-lg' style={{ backgroundColor: colors[index % colors.length] }}>
            <div>
                <div className='flex text-xs gap-3'>
                    <span className='text-primary'>{date}</span>
                    <span className='text-error'>{time}</span>
                </div>
                <h1 className='font-bold text-lg mb-1 leading-6'>{title}</h1>
                <p>{content.length > 140 ? content?.slice(0, 140) + ' . . .' : content}</p>
            </div>
            <div className='flex justify-between items-center'>
                <Link to={`/posts/${_id}`} className='text-sm text-primary pt-2 hover:underline'>Read Full Post</Link>
                <div className='flex items-center gap-[10px] justify-end mt-2'>
                    <label htmlFor="post-update-modal" onClick={() => setPostUpdate(post)} className='btn rounded-sm text-xs normal-case btn-sm btn-outline'>Update</label>
                    <label htmlFor='delete-modal' onClick={() => setId(_id)} className='btn rounded-sm text-xs normal-case text-white btn-sm btn-error'>Delete</label>
                </div>
            </div>

            {
                id &&
                <DeleteModal handleDelete={handleDeletePost} id={id} text="Are you sure want to remove this post?" />
            }
            {
                postUpdate?._id &&
                <PostUpdateModal post={postUpdate} setPostUpdate={setPostUpdate} postRefetch={postRefetch} />
            }
        </div>
    )
}

export default PostPreviewCard