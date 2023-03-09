import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import Logo from '../Logo/Logo'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
            .then(() => { toast.error("You are logged out") })
            .catch(err => console.error(err))
    }
    const navItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>Posts</Link></li>
        <li><Link to='/'>Search</Link></li>
    </>

    return (
        <header className=" fixed top-0 left-0 right-0 bg-white shadow-md z-10">
            <div className='navbar max-w-[1280px] mx-auto px-2'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <Logo />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <input type="text" placeholder="Search Post" className="input input-bordered w-[300px] bg-[#ECF2FF]" />
                </div>
                <div className="navbar-end">
                    {
                        user?.displayName ?
                            <button onClick={handleLogout} className="btn btn-sm btn-error normal-case px-4 rounded-sm text-white">Logout</button>
                            : <Link to='/login' className="btn btn-sm btn-neutral btn-outline normal-case px-4 rounded-sm">Sign In</Link>
                    }
                </div>
            </div>
        </header>

    )
}
export default Navbar