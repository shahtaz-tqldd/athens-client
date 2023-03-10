import React, { useContext, useEffect } from 'react'
import SavedPostCard from '../../components/Cards/SavedPostCard'
import { AuthContext } from '../../context/AuthProvider'

const SavedPost = () => {
    // const posts = [
    //     {
    //         "title": "The Benefits of Regular Exercise",
    //         "body": "Exercise is essential for maintaining good physical and mental health. Regular exercise can improve your cardiovascular health, help you lose weight, and reduce your risk of developing chronic diseases such as diabetes and heart disease. Exercise can also reduce stress, improve your mood, and boost your energy levels. So if you're not already exercising regularly, it's time to start!",
    //         "date": "Mar 3, 2023",
    //         "time": "1:37 PM",
    //         "author": "chatGPT"
    //     },
    //     {
    //         "title": "Tips for Building Strong Relationships",
    //         "body": "Building strong relationships is essential for living a happy and fulfilled life. Whether it's with family, friends, or romantic partners, strong relationships require effort and commitment. Here are some tips to help you build and maintain strong relationships:<ol><li>Communicate openly and honestly.</li><li>Listen actively and show empathy.</li><li>Practice forgiveness.</li><li>Spend quality time together.</li><li>Show appreciation and gratitude.</li></ol><br/>By following these tips, you can build and maintain strong relationships that will enrich your life.",
    //         "date": "Mar 3, 2023",
    //         "time": "1:37 PM",
    //         "author": "chatGPT"
    //     },
    //     {
    //         "title": "The Importance of Time Management",
    //         "body": "Time is one of the most valuable resources we have, and it's essential to manage it effectively if we want to achieve our goals and live a productive life. Effective time management can help you reduce stress, increase productivity, and improve your work-life balance. Here are some tips for effective time management:<ol><li>Set clear goals and prioritize your tasks.</li><li>Create a schedule and stick to it.</li><li>Avoid distractions and procrastination.</li><li>Take breaks and recharge your energy.</li><li>Learn to say 'no' when necessary.</li></ol><br/>By managing your time effectively, you can achieve more in less time and enjoy a more balanced and fulfilling life.",
    //         "date": "Mar 3, 2023",
    //         "time": "1:37 PM",
    //         "author": "chatGPT"
    //     },
    //     {
    //         "title": "The Importance of Time Management",
    //         "body": "Time is one of the most valuable resources we have, and it's essential to manage it effectively if we want to achieve our goals and live a productive life. Effective time management can help you reduce stress, increase productivity, and improve your work-life balance. Here are some tips for effective time management:<ol><li>Set clear goals and prioritize your tasks.</li><li>Create a schedule and stick to it.</li><li>Avoid distractions and procrastination.</li><li>Take breaks and recharge your energy.</li><li>Learn to say 'no' when necessary.</li></ol><br/>By managing your time effectively, you can achieve more in less time and enjoy a more balanced and fulfilling life.",
    //         "date": "Mar 3, 2023",
    //         "time": "1:37 PM",
    //         "author": "chatGPT"
    //     },
    // ]
    const posts = []
    const { user } = useContext(AuthContext)
    useEffect(() => {
        fetch(`https://athens-server.vercel.app/saved-post/${user?.email}`)
            .then(res => res.json())
            .then((data) => console.log(data))
    }, [user?.email])
    return (
        <section className='max-w-[1280px] mx-auto px-3 lg:gap-10 md:gap-10 pt-8'>
            <h1 className='text-4xl font-bold text-center'>Saved Post</h1>
            {
                posts?.length ?
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 mt-6'>
                        {
                            posts?.map((post, index) => <SavedPostCard key={index} index={index} post={post} />)
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