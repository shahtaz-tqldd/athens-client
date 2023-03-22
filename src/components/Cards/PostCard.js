import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { HiUser } from 'react-icons/hi'
import '../../assets/styles/post-card.css'
import { AuthContext } from '../../context/AuthProvider'
import Opinion from '../../pages/Posts/Opinion'

const PostCard = ({ post }) => {
    const { user, refetch, refetchSavedPosts } = useContext(AuthContext);
    const { title, content, date, time, author, _id, img, agrees, saves } = post

    const [agree, setAgree] = useState(agrees?.length)
    const agreed = agrees?.includes(user?.email) ? true : false
    const isSaved = saves?.includes(user?.email) ? true : false

    const [opinion, setOpinion] = useState(false)

    // EXPAND THE CARD TO READ MORE
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => {
        setExpanded(!expanded)
    }
    // AGREE TO THE POST
    const handleAgree = async () => {
        try {
            const res = await axios.post(`https://athens-server.vercel.app/posts/${_id}/agree`, {
                userId: user?.email
            });

            if (res.data.message === 'Agreed to the post') {
                setAgree(agree + 1);
            }
            else if (res.data.message === 'Agree removed') {
                setAgree(agree - 1);
            }
            refetch()
        } catch (err) {
            console.error(err);
        }
    }

    // SAVE THE POST IN THE DATABASE
    const handleSavePost = async () => {
        try {
            const res = await axios.post(`https://athens-server.vercel.app/posts/${_id}/save`, {
                userId: user?.email
            });
            if(res.data.message === 'Saved post removed'){
                toast.error(res.data.message)
            }
            else if(res.data.message === 'Post is Saved'){
                toast.success(res.data.message)
            }
            refetch()
            refetchSavedPosts()
        } catch (err) {
            console.error(err);
        }
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
                    {agrees?.length > 0 && <p className='text-xs mt-4'>{agrees?.length} {agrees?.length > 1 ? 'people' : 'person'} agreed</p>}
                    <hr className='mt-2' />
                    <div className=''>
                        <div className='grid grid-cols-3 text-xs'>
                            <button onClick={handleAgree} className='btn-ghost flex justify-center my-2 p-2 flex items-center gap-2'>
                                <lord-icon
                                    target="button"
                                    src={!agreed ? "https://cdn.lordicon.com/egiwmiit.json" : "https://cdn.lordicon.com/yqzmiobz.json"}
                                    trigger="hover"
                                    style={{ width: "20px", height: "20px" }}>
                                </lord-icon>
                                {!agree ? 'Agree' : 'Agreed'}
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

                            <button onClick={handleSavePost} className='btn-ghost flex justify-center m-2 p-2 flex items-center gap-2'>
                                <lord-icon
                                    target="button"
                                    src={!isSaved ? "https://cdn.lordicon.com/gigfpovs.json" : "https://cdn.lordicon.com/eanmttmw.json"}
                                    trigger="hover"
                                    style={{ width: "20px", height: "20px" }}>
                                </lord-icon>
                                {!isSaved ? 'Save' : 'Saved'}
                            </button>

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