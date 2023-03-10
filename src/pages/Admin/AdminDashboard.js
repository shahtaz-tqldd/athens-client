import React from 'react'
import AllPosts from './AllPosts/AllPosts'

const AdminDashboard = () => {
    return (
        <section className='max-w-[1280px] mx-auto px-3'>
            <div className='mt-4 flex flex-col items-center justify-center'>
                <h1 className='uppercase text-2xl mb-3'>Admin Pannel</h1>
            </div>
            <div>
                <AllPosts />
            </div>
        </section>
    )
}

export default AdminDashboard