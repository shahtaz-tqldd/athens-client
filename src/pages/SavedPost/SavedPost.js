import React, { useContext} from 'react'
import SavedPostCard from '../../components/Cards/SavedPostCard'
import { AuthContext } from '../../context/AuthProvider'
import useTitle from '../../hooks/useTitle'

const SavedPost = () => {
    useTitle('Saved Post')
    const { savedPosts } = useContext(AuthContext)
   
    return (
        <section className='max-w-[1280px] mx-auto px-3 lg:gap-10 md:gap-10 pt-8'>
            <h1 className='text-4xl font-bold text-center'>Saved Post</h1>
            {
                savedPosts?.length ?
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 mt-6'>
                        {
                            savedPosts?.map((post, index) => <SavedPostCard key={index} index={index} post={post} />)
                        }
                    </div>
                    : <div className='flex flex-col items-center lg:py-32 md:py-16 py-8'>
                        <h1 className='text-3xl mt-8'>You have no saved post!</h1>
                    </div>
            }
        </section>
    )
}

export default SavedPost