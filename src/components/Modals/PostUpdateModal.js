import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

const PostUpdateModal = ({ post, setPostUpdate, postRefetch }) => {
    const { refetch } = useContext(AuthContext)
    const { title, content, _id } = post
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: title,
        content: content,
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }
    const updatedAt = new Date()

    const handleSubmit = (event) => {
        event.preventDefault()
        const post = { ...formData, updatedAt }
        fetch(`http://localhost:5000/posts/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Your post is updated")
                navigate('/my-write-up')
                setPostUpdate(null)
                postRefetch()
                refetch()
            })
    }
    return (
        <div>
            <input type="checkbox" id="post-update-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative rounded-sm">
                    <label onClick={() => setPostUpdate(null)} htmlFor="post-update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='font-bold mb-3'>Update Your Post</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="title"
                            className="input input-bordered w-full mb-2"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <textarea
                            className="textarea textarea-bordered w-full h-40"
                            placeholder="write your words"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                        ></textarea>{' '}
                        <br />
                        <button type="submit" className="btn btn-wide mt-4 normal-case text-white rounded-sm">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostUpdateModal