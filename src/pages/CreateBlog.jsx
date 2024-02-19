import React, {useState, useEffect} from 'react'
import InputTag from '../components/InputTag'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase'

const CreateBlog = () => {
const initialState = {
  title : '',
  tags : [],
  trending : 'no',
  category : '',
  description : ''
}

 const [form, setForm] = useState(initialState)
 const [file, setFile] = useState('')
 const [progress, setProgress] = useState(null)

 const options = [
  "Fashion",
  "Technology",
  "Travel",
  "Music",
  "Sports"
 ]

 const {title, tags, trending, category, description} = form

 const handleChange = (e) =>  {
  setForm({...form}, [e.target.name] = e.target.value)
 }
 
 const handleTags = () => {

 }
  const handleFile = () => {
    
  }

  const handleTrending = () => {

  }

 const onCategoryChange = () => {

 }

useEffect(() => {
  const uploadFile = () => {
    const storageRef = ref(storage, file?.name )
    const uploadImage = uploadBytesResumable(storageRef, file);

    uploadImage.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    setProgress(progress)

    if(snapshot.state === 'paused'){
      console.log('Upload is paused')
    }
    else if(snapshot.state === 'running'){
      console.log('Upload is running')
    }
    else{
      console.log('An error occured')
    }
   }, (error) => {
       console.log('upload error', error)
     },
   () => { 
     getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
        setForm((prev) => ({...prev, image: downloadURL}))
     })
   }   
  )}

 file &&  uploadFile()

}, [file])


  return (
    <section className='max-w-md mx-auto'>
      <h1 className='font-bold text-2xl text-center'>Create Blog</h1>
      <form action="" className='space-y-4'>
        <input 
           type="text" 
           placeholder='Title' 
           value={title}
           onChange={handleChange}
           className='outline-none border py-1 px-3 my-3 rounded-sm w-full'
        />
        <div className='w-full border'>
         <InputTag/>
        </div>

        <article className='flex justify-between items-center text-gray-600'>
          <p>Trending Blog ? </p>
          <div className='flex gap-4'>
            <label htmlFor="yes">
              <input type="radio" id="yes" name='trending' checked={trending === 'yes'} onChange={handleTrending}/>
              Yes
            </label>
            <label htmlFor="no">
              <input type="radio" id="no" name='trending' checked={trending === 'no'} onChange={handleTrending}/>
              No
            </label>
          </div>
        </article>

        <select 
           value={category} 
           onChange={onCategoryChange}
           className='outline-none border py-1 px-3 my-3 rounded-sm w-full text-gray-600'
        >
          <option value="">Select Category</option>
          {options.map((option, index) => (
             <option key={index} value={option || ''}>
              {option}
             </option>
          ))}
        </select>

        <textarea 
           value={description}
           cols="30" 
           rows="5"
           onChange={handleChange}
           placeholder='Description'
           className='outline-none border py-1 px-3 my-3 rounded-sm w-full'
        >
        </textarea>

        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
          className='outline-none border my-3 rounded-sm w-full'
        />

        <div className='flex justify-center items-center'>
          <button 
            type='submit' 
            className='bg-[#3232ad] py-1 px-3 text-white '
          >
              Submit
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateBlog