import React from 'react'

const SavedPostCard = ({ post, index }) => {
    const { title, body, time, date } = post
    return (
        <div className='p-5 bg-white hover:shadow-lg'>
            <div className='flex text-xs gap-3'>
                <span className='text-primary'>{date}</span>
                <span className='text-error'>{time}</span>
            </div>
            <h1 className='font-bold text-lg mb-1'>{title}</h1>
            <p>{body.slice(0, 140)+' . . .'}</p>
            <div className='flex items-center gap-[10px] justify-end mt-2'>
                <button className='btn rounded-sm text-xs normal-case text-white btn-sm btn-error'>Remove</button>
            </div>
        </div>
    )
}

export default SavedPostCard