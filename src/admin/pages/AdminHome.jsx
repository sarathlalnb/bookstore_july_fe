import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'


const AdminHome = () => {
  return (
   <>
   <AdminHeader/>

   <div className='grid grid-cols-[3fr_9fr]'>
    <AdminSidebar/>
    <div>Home Contents</div>
   </div>


   </>
  )
}

export default AdminHome