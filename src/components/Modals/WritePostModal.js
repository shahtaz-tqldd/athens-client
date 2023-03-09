import React from 'react'

const WritePostModal = () => {
    return (
        <div>
            <input type="checkbox" id="write-post-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="write-post-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='font-bold mb-3'>Write Your Thoughts</h1>
                    <form>
                        <input type="text" placeholder="title" className="input input-bordered w-full mb-2" />
                        <textarea className="textarea textarea-bordered w-full h-40" placeholder="write your words"></textarea> <br/>
                        <button type='submit' className='btn btn-wide mt-4 normal-case text-white'>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WritePostModal