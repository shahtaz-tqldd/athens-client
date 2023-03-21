import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { HiUser } from 'react-icons/hi'
import { AuthContext } from '../../context/AuthProvider'
import DeleteModal from '../Modals/DeleteModal'

const OpinionCard = ({ content, refetchOpinion }) => {
    const { user } = useContext(AuthContext)
    const [id, setId] = useState(null)
    const [update, setUpdate] = useState(false)
    const { opinion, opinionByEmail, opinionByName, _id } = content
    const handleDeleteOpinion = id => {
        fetch(`https://athens-server.vercel.app/opinion/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                refetchOpinion()
                setId(false)
            })
    }
    const handleUpdateOpinion = (e) => {
        e.preventDefault()
        const updatedOpinion = e.target.opinion.value
        const updated = {
            updatedOpinion,
            updatedAt: new Date()
        }
        fetch(`https://athens-server.vercel.app/opinion/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updated)
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Your opinion is updated!')
                refetchOpinion()
                setUpdate(false)
            })
    }


    return (
        <div className='bg-[#E1EEEE] p-4 rounded-md'>
            <span className='text-xs flex items-center text-[#6096B4] gap-[6px]'><HiUser />{opinionByName}</span>
            {
                update ?
                    <div>
                        <form onSubmit={handleUpdateOpinion} className="mt-1">
                            <input type="text" name="opinion" defaultValue={opinion} className='input input-bordered w-full' required />
                            <div className='flex items-center gap-1 mt-2 justify-end'>
                                <span onClick={() => setUpdate(false)} className='btn btn-xs btn-ghost normal-case rounded-sm text-xs'>Cancel</span>
                                <button type='submit' className='btn btn-xs normal-case rounded-sm text-xs text-white'>Update</button>
                            </div>
                        </form>
                    </div> :
                    <p className='text-sm pl-4'>{opinion}</p>
            }
            {
                ((user?.email === opinionByEmail) && !update) &&
                <div className='flex items-center gap-1 mt-2 justify-end'>
                    <button onClick={() => setUpdate(true)} className='btn btn-xs btn-ghost normal-case rounded-sm text-xs'>Update</button>
                    <label htmlFor='delete-modal' onClick={() => setId(_id)} className='btn btn-xs btn-error normal-case rounded-sm text-xs text-white'>Delete</label>
                </div>
            }
            {
                id &&
                <DeleteModal handleDelete={handleDeleteOpinion} id={id} text='Are you sure want to remove this opinion?' />
            }
        </div>
    )
}

export default OpinionCard