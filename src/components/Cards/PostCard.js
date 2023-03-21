import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { HiUser } from 'react-icons/hi'
import '../../assets/styles/post-card.css'
import { AuthContext } from '../../context/AuthProvider'
import Opinion from '../../pages/Posts/Opinion'

const PostCard = ({ post }) => {
    const { title, content, date, time, author, _id, img } = post
    const [opinion, setOpinion] = useState(false)

    const { user, savedPosts, refetchSavedPosts } = useContext(AuthContext);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(savedPosts.some(savedPost => savedPost._id === _id));
    }, [savedPosts, _id]);

    // EXPAND THE CARD TO READ MORE
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

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
    return (
        <div className={`bg-white p-6 relative ${user?.email && 'pb-0'}`}>

            <div className='flex text-xs gap-3'>
                <span className='text-primary'>{date}</span>
                <span className='text-error'>{time}</span>
            </div>
            <h2 className='font-bold text-xl my-1'>{title}</h2>
            <span className='text-sm flex items-center gap-[6px]'><HiUser />{author}</span>
            <div className={`mt-3 ${expanded ? 'max-h-full' : 'max-h-[120px] overflow-hidden'}`} dangerouslySetInnerHTML={{ __html: content }}></div>
            {content.length > 120 && (
                !expanded ? <button onClick={toggleExpanded} className='text-primary'>Read more</button>
                    : <button onClick={toggleExpanded} className='text-primary opacity-40'>Show Less</button>
            )}
            {img && <img src={img} alt='' className='mt-4 w-full max-h-[800px] object-cover' />}

            {
                user?.email &&
                <>
                    <hr className='mt-4' />
                    <div className=''>
                        <div className='grid grid-cols-3 text-xs'>
                            <button className='btn-ghost flex justify-center my-2 p-2 flex items-center gap-2'>
                                <lord-icon
                                    target="button"
                                    src="https://cdn.lordicon.com/egiwmiit.json"
                                    trigger="hover"
                                    style={{ width: "20px", height: "20px" }}>
                                </lord-icon>
                                Agree
                            </button>
                            <button onClick={() => setOpinion(!opinion)} className='btn-ghost flex justify-center m-2 p-2 flex items-center gap-2'>
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
                        {opinion &&
                            <Opinion postId={_id} />
                        }
                    </div>
                </>
            }

        </div >
    )
}

export default PostCard
