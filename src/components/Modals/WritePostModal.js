import { format } from 'date-fns'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

const WritePostModal = ({ setModal }) => {
    const { user, refetch } = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }
    const date = format(new Date(), 'PP')
    const time = format(new Date(), 'p')

    const handleSubmit = (event) => {
        event.preventDefault()
        const post = { ...formData, author: user?.displayName, date, time }
        fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(() => {
                toast.success("You just made a post!")
                navigate('/')
                setModal(false)
                setFormData({ title: '', content: '' })
                refetch()
            })
    }

    return (
        <div>
            <input type="checkbox" id="write-post-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="write-post-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>
                    <h1 className='font-bold mb-3'>Write Your Thoughts</h1>
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-wide mt-4 normal-case text-white">
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WritePostModal