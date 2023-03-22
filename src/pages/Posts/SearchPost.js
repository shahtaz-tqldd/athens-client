import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PostCard from '../../components/Cards/PostCard'
import { AuthContext } from '../../context/AuthProvider'
import useTitle from '../../hooks/useTitle'
import RightSideBar from '../Homepage/RightSideBar/RightSideBar'

const SearchPost = () => {
    const { searchResult, setSearch, searchRefetch, search } = useContext(AuthContext)
    useTitle(search)
    const navigate = useNavigate()
    const handleSearch = (e) => {
        e.preventDefault()
        const search = e.target.search.value
        setSearch(search)
        navigate('/search/posts')
        searchRefetch();
    }
    return (
        <section className='max-w-[1280px] mx-auto px-3 flex lg:flex-row md:flex-row flex-col lg:gap-10 md:gap-10 gap-4 pt-8'>
            {/* LEFT SIDEBAR */}
            <div className='lg:w-[25%]'>
                <form onSubmit={handleSearch} className="lg:hidden md:hidden block">
                    <input type="text" name="search" placeholder="Search Post" className="input input-bordered w-full mb-4 bg-[#ECF2FF]" />
                </form>
                <h1 className='lg:text-3xl md:text-xl text-md font-bold'>Search Result</h1>

            </div>

            {/* MIDDLE POST SECTION */}
            <div className='lg:w-[50%] md:w-[60%]'>
                <div className='flex flex-col gap-3'>
                    {searchResult?.length ?
                        searchResult.map((post, index) => <PostCard key={index} post={post} />)
                        : <h2 className='text-xl'>No Post Found!</h2>
                    }
                </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className='lg:w-[25%] md:w-[40%]'>
                <RightSideBar />
            </div>
        </section>
    )
}

export default SearchPost