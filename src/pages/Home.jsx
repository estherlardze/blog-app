import { collection, onSnapshot } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import Blogs from '../components/Blogs'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Trending from '../components/Trending'
import { toast } from 'react-toastify'


const Home = ({user}) => {
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
     setBlogs(list)
     setLoading(false)
  }, (error) => console.log(error))

  return () => {
    unSub();
  }
}, [])

//console.log(blogs)
  const handleDelete = async(id) => {
    if(window.confirm('Are you sure you want to delete')){
      try{
         setLoading(true)
         await deleteDoc(doc(db, 'blogs', id))
         setLoading(false)
         toast.info('Blog Deleted Successfully!')

      }catch(err){
       console.log(err)
    }
  }}


  return (
    <>
     {
      loading ? <h1>loading...</h1> : 

      (
        <section className='flex flex-col w-[90%] mx-[5%] items-center '>
      <div>
         {/* <Trending blogs={blogs}/> */}
         helloo
      </div>

      <div className='grid grid-cols-3 gap-x-8 mt-4'>
        <article className='col-span-3 lg:col-span-2'>
          <Blogs 
            blogs={blogs} 
            handleDelete={handleDelete}
            user={user}
          />
        </article>

        <article className='col-span-3 lg:col-span-1 flex flex-col sm:flex-row lg:flex-col'>
          <div>Tags</div>
          <div>Most popular</div>
        </article>
      </div>
     
    </section>
      )
     }
    </>
    
  )
}

export default Home
