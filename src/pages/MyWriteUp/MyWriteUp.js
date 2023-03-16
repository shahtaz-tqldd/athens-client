import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import PostPreviewCard from '../../components/Cards/PostPreviewCard'
import Loader from '../../components/Loader/Loader'
import WritePostModal from '../../components/Modals/WritePostModal'
import { AuthContext } from '../../context/AuthProvider'
import useTitle from '../../hooks/useTitle'

const MyWriteUp = () => {
    useTitle('My Write Up')
    const [modal, setModal] = useState(false)
    const { user } = useContext(AuthContext)
    const { data: myPosts = [], refetch, isLoading } = useQuery({
        queryKey: ['myPosts'],
        queryFn: async () => {
            const res = await fetch(`https://athens-server.vercel.app/my-posts?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <Loader />
    }
    return (
        <section className='max-w-[1280px] mx-auto px-3 lg:gap-10 md:gap-10 pt-8'>
            <h1 className='text-4xl font-bold text-center'>My Write Up</h1>

            {
                myPosts?.length > 0 ?
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 mt-6'>
                        {
                            myPosts.map((post, index) => <PostPreviewCard key={index} index={index} post={post} postRefetch={refetch} />)
                        }
                    </div> : <div className='flex flex-col items-center lg:py-32 md:py-16 py-8'>
                        <h1 className='text-3xl mt-8'>You have not write any post yet!</h1>
                        <label htmlFor="write-post-modal" onClick={() => setModal(true)} className='btn btn-wide text-white normal-case mt-6'>Write a Post +</label>
                        {
                            modal && <WritePostModal setModal={setModal} />
                        }
                    </div>
            }
        </section >
    )
}

export default MyWriteUp