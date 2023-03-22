import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // LOAD ALL POSTS
    const { data: posts = [], refetch, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts')
            const data = await res.json()
            return data
        }
    })

    // LOAD SAVED POSTS
    const { data: savedPosts = [], refetch: refetchSavedPosts } = useQuery({
        queryKey: ['savedPosts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/posts/save/${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    // create new user
    const emailRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // update user profile
    const updateUser = (userInfo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo)
    }

    // login with email and password
    const emailLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    // forgot password
    const forgotPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    // google login
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    //SETTING ADMIN AS A HARD CODE
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        const admin = {
            displayName: 'Athens Admin',
            email: 'admin@athens.com'
        }
        if (user?.email === admin?.email) {
            setIsAdmin(true)
        } else { setIsAdmin(false) }
    }, [user])

    // SENDING THE AUTH INFO 
    const authInfo = {
        posts, refetch, isAdmin, postLoading: isLoading, savedPosts, refetchSavedPosts,
        emailRegister, emailLogin, updateUser, logout, forgotPassword, googleLogin, user, loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider