import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase';
import Popular from '../components/Popular';

const BlogDetail = ({setActive}) => {

 const [blog, setBlog] = useState(null)
 const [blogs, setBlogs] = useState([])

 const { id } = useParams()

 useEffect(() => {
   const getBlogsData = async () => {
      const blogRef = collection(db, 'blogs');
      const blogs = await getDocs(blogRef)
      setBlogs(blogs.docs.map((blog) => ({id: blog.id, ...blog.data()})))
   }

   getBlogsData()
 }, [])

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
      <div className='grid grid-cols-3 gap-8'>
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
          <div>
            <Popular blogs={blogs}/>
          </div>
        </article>
      </div>
    </section>
  )
}

export default BlogDetail