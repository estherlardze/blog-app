import React , {useState} from 'react'
import { IoClose } from "react-icons/io5";


const Popup = ({deleteBlog, setDeleteBlog}) => {
   const handleClose = () => {
      setDeleteBlog(false);

   }
  return (
    <>
    {
        deleteBlog && (
        <section className='flex h-screen w-full bg-black/65 items-center justify-center fixed left-0 top-0'>
           <div className='flex flex-col'>
             <IoClose onClick={handleClose} className='text-white fixed top-4 right-4 cursor-pointer' size={25}/>
             <div className='bg-white p-4 w-[300px] h-fit rounded-sm flex flex-col gap-y-4 '>
               <h1 className='font-semibold'>Are you sure you want to delete this blog?</h1>
               <div className='flex items-center gap-x-6'>
               <p className='bg-red-700 text-white font-semibold px-2 py-1 text-sm'>yes</p>
               <p className='bg-[#3232ad] text-white font-semibold text-sm px-2 py-1'>no</p>
            </div>
           </div>
         </div>
     </section>
  )}
  </>
  )
}

export default Popup
