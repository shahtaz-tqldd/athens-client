import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../../context/AuthProvider'

const PostPreviewCard = ({ post, index, postRefetch }) => {
    const { refetch } = useContext(AuthContext)
    const { title, content, time, date, _id } = post
    const colors = ["#E1EEDD", "#E3DFFD", "#FDFDBD", "#FFDDD2"]
    const handleDeletePost = () => {
        fetch(`http://localhost:5000/posts/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.error('Your post is deleted!')
                postRefetch()
                refetch()
            })
    }
    return (
        <div className='p-5 hover:shadow-lg' style={{ backgroundColor: colors[index % colors.length] }}>
            <div className='flex text-xs gap-3'>
                <span className='text-primary'>{date}</span>
                <span className='text-error'>{time}</span>
            </div>
            <h1 className='font-bold text-lg mb-1'>{title}</h1>
            <p>{content.length > 140 ? content?.slice(0, 140) + ' . . .' : content}</p>
            <div className='flex items-center gap-[10px] justify-end mt-2'>
                <button className='btn rounded-sm text-xs normal-case btn-sm btn-outline'>Update</button>
                <button onClick={handleDeletePost} className='btn rounded-sm text-xs normal-case text-white btn-sm btn-error'>Delete</button>
            </div>
        </div>
    )
}

export default PostPreviewCard