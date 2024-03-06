import { doc, getDoc } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'

const BlogDetail = ({setActive}) => {

 const [blog, setBlog] = useState(null)
 const { id } = useParams()

 useEffect(() => {
   id && getBlogDetail()
 }, [id])


 const getBlogDetail = async() => {
   const docRef = doc(db, "blogs", id)
   const blogDetail = await getDoc(docRef)
   setBlog(blogDetail.data())
   setActive(null)
   console.log('detail', blog)
 }


  return (
    <section className='mx-[5%] w-[90%]'>
      <h1 className='text-4xl font-bold mb-4'>{blog?.title}</h1>
      <img src={blog?.image} alt={blog?.title} className='w-full h-[450px]'/>
      <div className='grid grid-cols-3'>
         <article className='col-span-3 lg:col-span-2'>
            <div className='flex gap-2 items-center my-5 border-b-2 border-gray-300'>
              <p className='font-semibold '>By: {blog?.author}</p>
               {" - "}
              <p> {blog?.timestamps.toDate().toDateString()}</p>
            </div>
            <p>{blog?.description}</p>
         </article>

         <article className='col-span-3 lg:col-span-1 flex flex-col sm:flex-row lg:flex-col'>
          <div>Tags</div>
          <div>Most popular</div>
        </article>
      </div>
    </section>
  )
}

export default BlogDetail