import React from 'react'

const Popular = ({blogs}) => {
  return (
    <div>
        <h1 className='mb-3 border-b-2'>Daily Blogs</h1>

        {blogs.map((blog) => (
          <article key={blog.id} className='flex flex-col sm:flex-row gap-5'>
            <div className='col-span-5 lg:col-span-2'>
              <img src={blog.image} alt="thumbnail" className='h-[100px] w-[100px]'/>
            </div>

            <div className='col-span-5 lg:col-span-3'>
              <h1 className='capitalize font-bold'>{blog.title}</h1>
             
                <p>{blog.timestamps.toDate().toDateString()}</p>
                </div>
       </article>
        ))}
    </div>
  )
}

export default Popular