import {Home, EditBlog, CreateBlog, About, Auth, BlogDetail} from './pages/index'
import {BrowserRouter, Routes, Route} from 'react-router-dom'



export default function App() {
  return (
    <BrowserRouter>
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