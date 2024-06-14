import React from 'react'


const Footer = () => {
    const year = new Date().getFullYear();

  return (
    <div className='bg-black/90 text-white py-5 mt-10 font-semibold '>
       <div className='w-[90%] mx-auto flex flex-col sm:flex-row gap-3 justify-between items-center'>
       <h1 className='text-center'>Developed by Esther Lardze</h1>
       <p>Copyright &copy; {year}</p>
       </div>
    </div>
  )
}

export default Footer