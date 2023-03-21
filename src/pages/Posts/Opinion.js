import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import OpinionCard from '../../components/Cards/OpinionCard'
import { AuthContext } from '../../context/AuthProvider'

const Opinion = ({ postId }) => {
    const { user } = useContext(AuthContext)
    const { data: opinions = [], refetch: refetchOpinion } = useQuery({
        queryKey: ['opinions'],
        queryFn: async () => {
            const res = await fetch(`https://athens-server.vercel.app/opinion/${postId}`)
            const data = await res.json()
            return data
        }
    })
    const handleGiveOpinion = (event) => {
        event.preventDefault()
        const opinion = event.target.opinion.value
        const opinionInfo = { opinion, postId, opinionByEmail: user?.email, opinionByName: user?.displayName, opinionAt: new Date() }
        fetch(`https://athens-server.vercel.app/opinion/${postId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(opinionInfo)
        })
            .then(res => res.json())
            .then(() => {
                refetchOpinion()
                event.target.reset()
            })

    }
    return (
        <div className='pb-4'>
            <hr />
            {/* <p className='mt-3 mb-2 text-sm'>Write your opinion</p> */}
            <form onSubmit={handleGiveOpinion} className="mt-3">
                <input type="text" name="opinion" placeholder='Write your valuable opinion' className='input input-bordered w-full' required />
            </form>
            <div className='mt-3 flex flex-col gap-2'>
                {opinions?.map((opinion, index) => <OpinionCard key={index} content={opinion} refetchOpinion={refetchOpinion} />)}
            </div>
        </div>
    )
}

export default Opinion