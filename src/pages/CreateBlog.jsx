import React, {useState, useEffect} from 'react'

const CreateBlog = () => {
 const [title, setTitle] = useState('')
 const [tag, setTags] = useState('')

 const options = [
  "Fashion",
  "Food",
  "Travel",
  "Music",
  "Sports"
 ]

  return (
    <section className='max-w-md mx-auto'>
      <h1 className='font-bold text-2xl text-center'>Create Blog</h1>
      <form action="" className='space-y-4'>
        <input 
           type="text" 
           placeholder='Title' 
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           className='outline-none border py-1 px-3 my-3 rounded-sm w-full'
        />
      <input 
           type="text" 
           placeholder='Tags' 
           value={tag}
           onChange={(e) => setTags(e.target.value)}
           className='outline-none border py-1 px-3 my-3 rounded-sm w-full'
        />

        <article className='flex justify-between items-center text-gray-600'>
          <p>Trending Blog ? </p>
          <div className='flex gap-4'>
            <label htmlFor="yes">
              <input type="radio" id="yes" name='trending'/>
              Yes
            </label>
            <label htmlFor="no">
              <input type="radio" id="no" name='trending'/>
              No
            </label>
          </div>
        </article>

        <select 
           name="" 
           id="" 
           className='outline-none border py-1 px-3 my-3 rounded-sm w-full text-gray-600'
        >
          <option value="">Select Category</option>
          {options.map((item, index) => (
             <option key={index} value=''>
              {item}
             </option>
          ))}
        </select>

        <textarea 
           name="description" 
           id="" 
           cols="30" 
           rows="5"
           placeholder='Description'
           className='outline-none border py-1 px-3 my-3 rounded-sm w-full'
        >
        </textarea>

        <input 
          type="file" 
          name="file" 
          id="file" 
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