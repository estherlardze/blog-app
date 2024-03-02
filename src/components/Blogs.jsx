import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";

const Blogs = ({ blogs, user }) => {
    console.log('blogs', blogs)
    console.log(typeof blogs)
  return (
    <div>

        {/* {blogs?.map((blog) =(
            <article key={blog.id}>
               <div>
                 <img src={blog.image} alt="thumbnail" />
               </div>

               <div>
                  <p>{blog.category}</p>
                  <h1>{blog.title}</h1>
                  <div>
                    <p>{blog.author}</p>
                     {" - "}
                    <p>{blog.timestamps}</p>
                  </div>
                  <p>{blog.description.substring(0, 120)}</p>

                  <div className='flex justify-between items-center'>
                     <button className='bg-gray-800 py-1 px-2 text-white'>Read More</button>
                     <div>
                      <FaTrash/>
                      <FaEdit/>
                     </div>
                  </div>
               </div>
            </article>
        ))} */}
    </div>
  )
}

export default Blogs