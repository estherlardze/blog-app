import {Home, EditBlog, CreateBlog, About, Auth, BlogDetail} from './pages/index'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import { useState } from 'react'

export default function App() {
  const [header, setHeader] = useState('home')

  return (
    <BrowserRouter>
      <div className='mb-[90px]'>
        <Navbar/>
      </div>
      <ToastContainer position='top-center' draggable/>
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:id' element={<EditBlog />} />
          <Route path='/create' element={<CreateBlog />} />
          <Route path='/about' element={<About />} />
          <Route path='/auth' element={<Auth header={header} setHeader={setHeader}/>} />
          <Route path='/blog/:id' element={<BlogDetail />} />
       </Routes>
    </BrowserRouter>
  )
}