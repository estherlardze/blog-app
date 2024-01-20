import {Home, EditBlog, CreateBlog, About, Auth, BlogDetail} from './pages/index'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <div className='mb-[90px]'>
        <Navbar/>
      </div>
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit' element={<EditBlog />} />
          <Route path='/create' element={<CreateBlog />} />
          <Route path='/about' element={<About />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/blog/:id' element={<BlogDetail />} />
       </Routes>
    </BrowserRouter>
  )
}