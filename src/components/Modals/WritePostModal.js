import { format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import '../../assets/styles/write-post-modal.css'

const WritePostModal = ({ setModal }) => {
    const { user, refetch } = useContext(AuthContext)
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [btnDisable, setBtnDisable] = useState(true)

    const handleTitleInput = (event) => {
        setTitle(event.target.value)
    }
    const handleContentInput = (event) => {
        setContent(event.target.value)
    }
    const handleImageInput = (event) => {
        setImage(event.target.files[0])
    }
    console.log(image)
    useEffect(() => {
        if (title && content) {
            setBtnDisable(false)
        }
    }, [title, content])
    const date = format(new Date(), 'PP')
    const time = format(new Date(), 'p')
    const createdAt = new Date()
    const imgHostKey = process.env.REACT_APP_imgbb_key
    const handleSubmit = (event) => {
        event.preventDefault()
        const post = { title, content, author: user?.displayName, authorEmail: user?.email, date, time, createdAt }

        const formData = new FormData()
        formData.append('image', image)
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const img = imgData.data.url
                    const postBody = { ...post, img }
                    fetch('https://athens-server.vercel.app/posts', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(postBody)
                    })
                        .then(res => res.json())
                        .then(() => {
                            toast.success("You just made a post!")
                            navigate('/')
                            setModal(false)
                            setTitle('')
                            setContent('')
                            setImage(null)
                            refetch()
                        })
                }
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
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="Provide a Meaningful Short Title"
                            className="input input-bordered w-full mb-2"
                            name="title"
                            onInput={handleTitleInput}
                        />
                        <textarea
                            className="textarea textarea-bordered w-full h-40"
                            placeholder="Write your words here"
                            name="content"
                            onInput={handleContentInput}
                        ></textarea>{' '}
                        <br />
                        <div className='mb-3 w-full text-primary'>Upload Picture (optional)</div>
                        <input
                            className="w-full"
                            type="file"
                            name="image"
                            onChange={handleImageInput}
                        />
                        <button disabled={btnDisable} type="submit" className="btn btn-wide mt-4 normal-case text-white rounded-sm">
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WritePostModal