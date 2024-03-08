import React, {useState, useEffect} from 'react'
import InputTag from '../components/InputTag'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateBlog = ({user}) => {
const initialState = {
  title : '',
  tags : [],
  trending : 'no',
  category : '',
  description : ''
}

 const [form, setForm] = useState(initialState)
 const [file, setFile] = useState(null)
 const [progress, setProgress] = useState(null)
 const navigate = useNavigate()
 const { id } = useParams()
 const options = [
  "Fashion",
  "Technology",
  "Travel",
  "Music",
  "Sports",
  "Social",
  "Science"
 ]

 const {title, tags, trending, category, description} = form

 const handleDelete = (tagToDelete) => {
  setForm(tags.filter(tag => tag !== tagToDelete)
  );
};

const handleAddition = (newTag) => {
  setForm(prevState => ({
    ...prevState,
    tags: prevState.tags ? [...prevState.tags, newTag] : [newTag]
  }));
};

 const handleChange = (e) =>  {
  setForm({...form, [e.target.name] : e.target.value})
 }
 
 const handleCategory = (e) => {
   setForm({...form, category: e.target.value})
 }
 

  const handleTrend = (e) => {
    setForm({...form, trending: e.target.value})
  } 

 

useEffect(() => {
  const uploadFile = () => {
    const storageRef = ref(storage, file?.name )
    const uploadImage = uploadBytesResumable(storageRef, file);

    uploadImage.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    console.log(`Upload is ${progress}% done.`)
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

useEffect(() => {
  id && getBlogDetail()
}, [id])

const getBlogDetail = async() => {
   const docRef = doc(db, 'blogs', id)
   const snapshot = await getDoc(docRef)
   if(snapshot.exists()){
     setForm({...snapshot.data()})
   }
   
}


const onSubmit = async(e) => {
  e.preventDefault()

  if(title && tags && description && trending && category) {
   if(!id) {
    try{
      await addDoc(collection(db, 'blogs'), {
        ...form, 
        timestamps: serverTimestamp(),
        author: user?.displayName,
        userId: user?.uid
      }
      )
      toast.success("Blog created successfully")

    }
    catch(err){
     console.log(err)
    }
   }else{
    try{
      if(user){
        await updateDoc(doc(db, 'blogs', id), {
          ...form, 
          timestamps: serverTimestamp(),
          author: user?.displayName,
          userId: user?.uid
        })
      }
      toast.success("Blog updated successfully")

    }
   
    catch(err){
     console.log(err)
    }
   }
  }else{
    toast.error("All fields are required")
  }

  navigate('/')
}

console.log('form', form)
console.log('ccc',user)
  return (
    <section className='max-w-md mx-auto'>
      <h1 className='font-bold text-2xl text-center'>{id ? "Update Blog" : "Create Blog"}</h1>
      <form action="" className='space-y-4' onSubmit={onSubmit}>
        <input 
           type="text" 
           placeholder='Title' 
           name='title'
           value={title}
           onChange={handleChange}
           className='outline-none border py-1 px-3 my-3 rounded-sm w-full'
        />
        <div className='w-full border'>
         <InputTag tags={tags} handleDelete={handleDelete} handleAddition={handleAddition}/>
        </div>

        <article className='flex justify-between items-center text-gray-600'>
          <p>Trending Blog ? </p>
          <div className='flex gap-4'>
            <label htmlFor="yes">
              <input type="radio" id="yes" name='trending' value='yes' checked={trending === 'yes'} onChange={handleTrend}/>
              Yes
            </label>
            <label htmlFor="no">
              <input type="radio" id="no" name='trending' value='no' checked={trending === 'no'} onChange={handleTrend}/>
              No
            </label>
          </div>
        </article>

        <select 
           value={category} 
           onChange={handleCategory}
           className='outline-none border py-1 px-3 my-3 rounded-sm w-full text-gray-600'
        >
          <option value="">Select Category</option>
          {options.map((option, index) => (
             <option key={index} value={option || ''} className='text-sm'>
              {option}
             </option>
          ))}
        </select>

        <textarea 
           value={description}
           cols="30" 
           rows="5"
           name='description'
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
            disabled={progress  !== null && progress < 100}
          >
             {id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateBlog