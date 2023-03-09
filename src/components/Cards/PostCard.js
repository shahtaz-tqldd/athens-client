import React, { useState } from 'react'
import { HiUser } from 'react-icons/hi'
import '../../assets/styles/post-card.css'

const PostCard = ({ post }) => {
    const { title, content, date, time, author } = post
    const [expanded, setExpanded] = useState(false)

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    return (
        <div className='bg-white p-6 relative'>
            <h2 className='font-bold text-xl mt-4'>{title}</h2>
            <span className='text-sm flex items-center gap-[6px]'><HiUser />{author}</span>
            <div className={`mt-3 ${expanded ? 'max-h-full' : 'max-h-[120px] overflow-hidden'}`} dangerouslySetInnerHTML={{ __html: content }}></div>
            {!expanded ? <button onClick={toggleExpanded} className='text-primary mt-3'>Read more</button>
                : <button onClick={toggleExpanded} className='text-primary opacity-40 mt-3'>Read Less</button>}
            <div className='flex text-xs gap-3 absolute top-4 right-5'>
                <span className='text-error'>{time}</span>
                <span className='text-primary'>{date}</span>
            </div>
        </div>
    )
}

export default PostCard
