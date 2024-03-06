import React from 'react'
import { Link } from 'react-router-dom'



const Trending = ({ blogs }) => {


  console.log('blogs from trending: ', blogs)
  return (
       <section >
         <h1 className='mb-3 border-b-2'>Trending Blogs</h1>
         <div className='flex gap-4'>
         {blogs.map((trend) => (
            <article className=''>
                {
                trend.trending === 'yes' && (
                <Link to={`/blog/${trend.id}`} className='relative'>
                    <img src={trend.image} alt="thumbnail" className='min-w-[300px] h-[250px]'/>
                     <div className='absolute bg-black/50 bottom-0 text-center left-0 w-full h-full  text-white'>
                        <h1 className='capitalize font-bold text-sm'>{trend.title}</h1>
                        <div className='flex gap-2 items-center text-center text-sm my-2'>
                          <p className='font-semibold text-sm'>{trend.author}</p>
                            {" - "}
                          <p className='text-sm'>{trend.timestamps.toDate().toDateString()}</p>
                        </div>
                      </div>
                </Link>
            )}
            </article>
        ))}
         </div>
    </section>
  )
}

export default Trending