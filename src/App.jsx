import {Home, EditBlog, CreateBlog, About, Auth, BlogDetail} from './pages/index'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from './firebase'
import {useNavigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'

export default function App() {
  const [header, setHeader] = useState('home')
  const [user, setUser] = useState(null)
 // const navigate = useNavigate()

useEffect(() =>{
   auth.onAuthStateChanged(authUser => {
    if(authUser){
      setUser(authUser)
      console.log(`authUser: ${authUser}`)
    }
    else{
      setUser(null)
    } }
   )
}, [])


console.log(`user: ${user}`)

const handleLogout = () => {
 signOut(auth).then(() => {
  setUser(null)
  //navigate('/')
 })
}
 


  return (
    <BrowserRouter>
      <div className='mb-[90px]'>
        <Navbar user={user} setUser={setUser} handleLogout={handleLogout}/>
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