import React, {useState} from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Popup from './Popup';

const Blogs = ({ blogs, user }) => {
 const [deleteBlog, setDeleteBlog] = useState(false)

 const handleDelete = () => {
   setDeleteBlog(true)
 }
 
  return (
    <section>
       <h1 className='mb-3 border-b-2'>Daily Blogs</h1>
       <div className='flex flex-col gap-y-4'>
         {blogs?.map((blog) => (
            <article key={blog.id} className='grid grid-cols-5 gap-3'>
               <div className='col-span-2'>
                 <img src={blog.image} alt="thumbnail" className='h-[190px] w-[270px]'/>
               </div>

               <div className='col-span-3'>
                  <p className='text-sm bg-[#3232ad] text-white w-fit py-1 px-2 my-3 rounded-sm font-semibold'>
                    {blog.category}
                  </p>
                  <h1 className='capitalize font-bold text-lg'>{blog.title}</h1>
                  <div className='flex gap-2 items-center text-sm my-2'>
                    <p className='font-semibold '>{blog.author}</p>
                     {" - "}
                    <p>{blog.timestamps.toDate().toDateString()}</p>
                  </div>
                  <p className='text-sm'>{blog.description.substring(0,120)}...</p>

                  <div className='flex justify-between items-center mt-3'>
                     <Link to={`/blog/${blog.id}`} className='bg-gray-600 py-1 px-2 text-white text-sm'>
                       Read More
                      </Link>
                     <div className='flex gap-5'>
                      <FaTrash className='text-red-700 cursor-pointer' size={21} onClick={handleDelete}/>
                      <Link to={`/edit/${blog.id}`} >
                        <FaEdit className='text-[#3232ad]' size={22} />
                         
                      </Link>
                      <Popup deleteBlog={deleteBlog} setDeleteBlog={setDeleteBlog}/>
                     </div>
                  </div>
               </div>
            </article>
        ))}
     
       </div>
    </section>
  )
}

export default Blogs