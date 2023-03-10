import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { AuthContext } from '../context/AuthProvider'

const AdminRoute = ({ children }) => {
    const { loading, isAdmin } = useContext(AuthContext)
    const location = useLocation();
    if (loading) {
        return <Loader />
    }
    if (isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace />
}

export default AdminRoute