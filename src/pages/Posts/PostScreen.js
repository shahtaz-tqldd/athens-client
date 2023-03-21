import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { HiUser } from 'react-icons/hi'
import '../../assets/styles/post-card.css'
import useTitle from '../../hooks/useTitle'
import { AuthContext } from '../../context/AuthProvider'
import { toast } from 'react-hot-toast'
import Opinion from './Opinion'

const PostScreen = () => {
    const post = useLoaderData()
    const { title, content, author, time, date, img, _id } = post
    const { user, savedPosts, refetchSavedPosts } = useContext(AuthContext);
    const [isSaved, setIsSaved] = useState(false);
    const [opinion, setOpinion] = useState(false)

    useEffect(() => {
        setIsSaved(savedPosts.some(savedPost => savedPost._id === _id));
    }, [savedPosts, _id]);
    // SAVE THE POST IN THE DATABASE
    const handleSavedPost = () => {
        const savedPost = { postId: _id, savedBy: user?.email, savedAt: new Date() }
        fetch(`https://athens-server.vercel.app/saved-posts/${_id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(savedPost)
        })
            .then(res => res.json())
            .then(() => {
                toast.success("This post is saved!")
                refetchSavedPosts()
            })
    }
    // DELETE SAVED POST
    const handleDeleteSavedPost = () => {
        fetch(`https://athens-server.vercel.app/saved-posts?postId=${_id}&email=${user?.email}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.error('Saved post removed!')
                refetchSavedPosts()
            })
    }
    useTitle(title)
    return (
        <section className='max-w-[800px] mx-auto px-3 mt-4'>

            <div className={`bg-white p-8 relative ${user?.email && 'pb-0'}`}>
                <div className='flex text-xs gap-3'>
                    <span className='text-primary'>{date}</span>
                    <span className='text-error'>{time}</span>
                </div>
                <h2 className='font-bold text-2xl mt-1'>{title}</h2>
                <span className='text-sm flex items-center gap-[6px]'><HiUser />{author}</span>
                <div className="mt-3" dangerouslySetInnerHTML={{ __html: content }}></div>

                {img && <img src={img} alt="" className='mt-4 w-full max-h-[800px] object-contain' />}

                {
                    user?.email &&
                    <>
                        <hr className='mt-4' />
                        <div className='grid grid-cols-3 text-xs'>
                            <button className='btn-ghost flex justify-center m-2 p-2 flex items-center gap-2'>
                                <lord-icon
                                    target="button"
                                    src="https://cdn.lordicon.com/egiwmiit.json"
                                    trigger="hover"
                                    style={{ width: "20px", height: "20px" }}>
                                </lord-icon>
                                Agree
                            </button>
                            <button onClick={()=>setOpinion(!opinion)} className='btn-ghost flex justify-center m-2 p-2 flex items-center gap-2'>
                                <lord-icon
                                    target="button"
                                    src="https://cdn.lordicon.com/hpivxauj.json"
                                    trigger="hover"
                                    style={{ width: "20px", height: "20px" }}>
                                </lord-icon>
                                Opinion
                            </button>
                            {!isSaved ?
                                <button onClick={handleSavedPost} className='btn-ghost flex justify-center m-2 p-2 flex items-center gap-2'>
                                    <lord-icon
                                        target="button"
                                        src="https://cdn.lordicon.com/gigfpovs.json"
                                        trigger="hover"
                                        style={{ width: "20px", height: "20px" }}>
                                    </lord-icon>
                                    Save
                                </button> :
                                <button onClick={handleDeleteSavedPost} className='btn-ghost flex justify-center m-2 p-2 flex items-center gap-2'>
                                    <lord-icon
                                        target="button"
                                        src="https://cdn.lordicon.com/eanmttmw.json"
                                        colors="primary:#222"
                                        trigger="hover"
                                        style={{ width: "20px", height: "20px" }}>
                                    </lord-icon>
                                    Saved
                                </button>
                            }
                        </div>
                    </>
                }
                {opinion &&
                    <Opinion postId={_id} />
                }
            </div>
        </section>
    )
}

export default PostScreen