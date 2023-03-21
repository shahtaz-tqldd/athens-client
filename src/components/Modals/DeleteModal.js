import React from 'react'

const DeleteModal = ({handleDelete, id, text}) => {
    return (
        <div>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box rounded-sm">
                    <h3 className="font-bold text-lg text-error">Alert!</h3>
                    <p className="py-4">{text} You may not find it later.</p>
                    <div className="modal-action">
                        <label htmlFor="delete-modal" className="btn btn-ghost normal-case rounded-sm px-6">Cancel</label>
                        <button onClick={() => handleDelete(id)} className="ml-3 btn btn-error text-white normal-case rounded-sm px-6">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal