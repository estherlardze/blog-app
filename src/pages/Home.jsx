import { collection, onSnapshot } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { db } from '../firebase'
import Blogs from '../components/Blogs'


const Home = () => {
 const [blogs, setBlogs] = useState([])
 const [loading, setLoading] = useState(false)


useEffect(() => {
  setLoading(true)
  const unSub = onSnapshot(collection(db, 'blogs'), 
  (snapshot) => {
     let list = [];

     snapshot.docs.forEach((doc) => {
       list.push({id:doc.id, ...doc.data()});
     })
     Object.entries(list)
     setBlogs(list)
     setLoading(false)
  }, (error) => console.log(error))

  return () => {
    unSub();
  }
}, [])

//console.log(blogs)
  return (
    <section className='flex flex-col w-[90%] mx-[5%]  items-center'>
      <div>
        <h1>trending</h1>
      </div>

      <div className='grid grid-cols-3 mt-4'>
        <article className='col-span-2'>
          <Blogs blogs={blogs}/>
        </article>

        <article className='col-span-1'>
          <h1>Tags</h1>
          <h1>Most popular</h1>
        </article>
      </div>
     
    </section>
  )
}

export default Home
