import React from 'react'
import loadingImage from '../assets/realinquirycat.gif'

const Loader = () => {
  return (
    <div>
        <img className='w-full' src={loadingImage} alt="" />
    </div>
  )
}

export default Loader 