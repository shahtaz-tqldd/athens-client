import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { HiUser } from 'react-icons/hi'
import '../../assets/styles/post-card.css'

const PostScreen = () => {
    const post = useLoaderData()
    const { title, content, author, time, date } = post
    return (
        <section className='max-w-[900px] mx-auto px-3 mt-4'>
            <div className='bg-white p-10'>
                <div className='flex text-xs gap-3'>
                    <span className='text-primary'>{date}</span>
                    <span className='text-error'>{time}</span>
                </div>
                <h2 className='font-bold text-2xl my-2'>{title}</h2>
                <span className='text-sm flex items-center gap-[6px]'><HiUser />{author}</span>
                <div className="mt-3" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </section>
    )
}

export default PostScreen