import { format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

const WritePostModal = ({ setModal }) => {
    const { user, refetch } = useContext(AuthContext)
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [btnDisable, setBtnDisable] = useState(true)

    const handleTitleInput = (event) => {
        setTitle(event.target.value)
    }
    const handleContentInput = (event) => {
        setContent(event.target.value)
    }

    useEffect(() => {
        if (title && content) {
            setBtnDisable(false)
        }
    }, [title, content])
    const date = format(new Date(), 'PP')
    const time = format(new Date(), 'p')
    const createdAt = new Date()

    const handleSubmit = (event) => {
        event.preventDefault()
        const post = { title, content, author: user?.displayName, authorEmail: user?.email, date, time, createdAt }
        fetch('https://athens-server.vercel.app/posts', {
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
                setTitle('')
                setContent('')
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
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="title"
                            className="input input-bordered w-full mb-2"
                            name="title"
                            onInput={handleTitleInput}
                        />
                        <textarea
                            className="textarea textarea-bordered w-full h-40"
                            placeholder="write your words"
                            name="content"
                            onInput={handleContentInput}
                        ></textarea>{' '}
                        <br />

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