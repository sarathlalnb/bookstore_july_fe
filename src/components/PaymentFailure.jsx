import React from 'react'
import Header from './Header'

const PaymentFailure = () => {
  return (
  <>
    <Header/>
    <>
    <h1 className="text-center text-3xl my-3 text-green-600">
      Payment Failed
    </h1>
   <div className="flex justify-center">
     <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="" />
   </div>
    </>
    </>
  )
}

export default PaymentFailure