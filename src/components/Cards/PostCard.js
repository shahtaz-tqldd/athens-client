import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { HiUser } from 'react-icons/hi'
import '../../assets/styles/post-card.css'
import { AuthContext } from '../../context/AuthProvider'

const PostCard = ({ post }) => {
    const { title, content, date, time, author, _id } = post
    const { user } = useContext(AuthContext)

    // EXPAND THE CARD TO READ MORE
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    // SAVE THE POST IN THE DATABASE
    const handleSavedPost = () => {
        const savedPost = { postId: _id, savedBy: user?.email }
        fetch('https://athens-server.vercel.app/saved-post/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(savedPost)
        })
            .then(res => res.json())
            .then(() => {
                toast.success("This post is saved!")
            })
    }

    return (
        <div className='bg-white p-6'>
            <div className='flex justify-between items-center'>
                <div className='flex text-xs gap-3'>
                    <span className='text-primary'>{date}</span>
                    <span className='text-error'>{time}</span>
                </div>
                <button onClick={handleSavedPost} className='tooltip ' data-tip="Save this post">
                    <lord-icon
                        target="button"
                        src="https://cdn.lordicon.com/eanmttmw.json"
                        trigger="hover"
                        colors="primary:#bbb"
                        style={{ height: "20px", width: "20px" }}>
                    </lord-icon>
                </button>
            </div>
            <h2 className='font-bold text-xl my-1'>{title}</h2>
            <span className='text-sm flex items-center gap-[6px]'><HiUser />{author}</span>
            <div className={`mt-3 ${expanded ? 'max-h-full' : 'max-h-[120px] overflow-hidden'}`} dangerouslySetInnerHTML={{ __html: content }}></div>
            {
                !expanded ? <button onClick={toggleExpanded} className='text-primary mt-3'>Read more</button>
                    : <button onClick={toggleExpanded} className='text-primary opacity-40 mt-3'>Show Less</button>
            }
        </div >
    )
}

export default PostCard
