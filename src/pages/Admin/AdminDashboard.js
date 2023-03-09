import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const AdminDashboard = () => {
    const location = useLocation()
    const page = location?.pathname.split('/').slice(-1)[0]
    console.log(page)
    return (
        <section className='max-w-[1280px] mx-auto px-3'>
            <div className='mt-4 flex flex-col items-center justify-center'>
                <h1 className='uppercase text-2xl mb-3'>Admin Pannel</h1>
                <div className="tabs">
                    <Link to='/admin' className={`tab tab-md tab-bordered ${page === 'admin' && 'tab-active textBlue font-bold'}`}>Posts</Link>
                    <Link to='/admin/users' className={`tab tab-md tab-bordered ${page === 'users' && 'tab-active textBlue font-bold'}`}>Users</Link>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </section>
    )
}

export default AdminDashboard