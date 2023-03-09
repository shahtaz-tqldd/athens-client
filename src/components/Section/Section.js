import React from 'react'

const Section = ({ children }) => {
    return (
        <section className='max-w-[1250px] mx-auto px-3'>
            {children}
        </section>
    )
}

export default Section