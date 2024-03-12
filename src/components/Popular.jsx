import React from 'react'
import { Link } from 'react-router-dom'

const Popular = ({blogs}) => {
 
  return (
    <div>
        <h1 className='mb-3 border-b-2'>Popular Blogs</h1>

        {blogs.map((blog) => (
          <article key={blog.id} className=''>
             { 
             blog?.category === 'Technology' && (
                <div className='flex gap-2 my-3'>
                   <Link className='col-span-5 lg:col-span-2' to={`/blog/${blog.id}`}>
                     <img src={blog.image} alt="thumbnail" className='h-[80px] w-[100px]'/>
                   </Link>

                    <div className='col-span-5 lg:col-span-3'>
                      <Link className='capitalize font-bold text-md' to={`/blog/${blog.id}`}>
                        {blog.title}
                      </Link>
                       <p className='text-sm'>{blog.timestamps.toDate().toDateString()}</p>
                    </div>
                 </div>
)}
          </article>
        ))}
    </div>
  )
}

export default Popular