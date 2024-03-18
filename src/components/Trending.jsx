import React from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Trending = ({ blogs }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3
  };

  console.log('blogs from trending: ', blogs)
  return (
       <section >
         <h1 className='mb-3 border-b-2'>Trending Blogs</h1>
         <div className='w-[90%] mx-[5%] overflow-scroll flex gap-4'>
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
    </section>
  )
}

export default Trending