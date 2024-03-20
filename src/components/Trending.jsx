import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const Trending = ({ blogs }) => {
 
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    const { current } =  scrollRef;

    if(direction === 'left') {
      current.scrollLeft =- 300
    }else if(direction === 'right'){
      current.scrollLeft =+ 300
    }
  }


  console.log('blogs from trending: ', blogs)
  return (
       <section className='w-[90%] mx-[5%]'>
         <h1 className='mb-3 border-b-2'>Trending Blogs</h1>
         <div className='overflow-x-scroll flex gap-4 container scroll-container' ref={scrollRef}>
         {blogs.map((blog) => (
            <article className=''>
                {
                blog.trending === 'yes' && (
                <Link to={`/blog/${blog.id}`} className='relative z-10'>
                    <img src={blog.image} alt="thumbnail" className='min-w-[220px] h-[250px]'/>
                     <div className='absolute bg-black/50 bottom-0 text-center left-0 w-full h-full  text-white'>
                        <h1 className='capitalize font-bold text-sm'>{blog.title}</h1>
                        <div className='flex gap-2 items-center text-center text-sm my-2'>
                          <p className='font-semibold text-sm'>{blog.author}</p>
                            {" - "}
                          <p className='text-sm'>{blog.timestamps.toDate().toDateString()}</p>
                        </div>
                      </div>
                </Link>
            )}
            </article>
        ))}
         </div>

         <div className='flex justify-center items-center gap-3 mt-6'>
            <IoIosArrowBack 
              size={27} className='hover:bg-black/10 rounded-full p-1 cursor-pointer transition-all'
              onClick={() => scroll('left')}/>
            <IoIosArrowForward 
              size={27} 
              className='hover:bg-black/10 rounded-full p-1 cursor-pointer transition-all'
              onClick={() => scroll('right')}/>
         </div>
    </section>
  )
}

export default Trending