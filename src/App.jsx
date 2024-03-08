import React, { useEffect, useState } from 'react'
import {Home, EditBlog, CreateBlog, About, Auth, BlogDetail} from './pages/index'
import { Routes, Route, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from './firebase'
import Navbar from './components/Navbar'
import { signOut } from 'firebase/auth'

const App = () => {
  const [active, setActive] = useState("")
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

useEffect(() =>{
   auth.onAuthStateChanged(authUser => {
    if(authUser){
      setUser(authUser)
    }
    else{
      setUser(null)
    } }
   )
}, [])


//console.log(`user: ${user}`)

const handleLogout = () => {

 signOut(auth).then(() => {
  setUser(null)
  navigate('/auth') 
 })
}

  return (
    <div>
      <div className='mb-[90px]'>
        <Navbar user={user} handleLogout={handleLogout} active={active} setActive={setActive}/>
      </div>
      <ToastContainer position='top-center' draggable/>
       <Routes>
          <Route path='/' element={<Home user={user}/>} />
          <Route path='/edit/:id' element={<CreateBlog user={user}/>} />
          <Route path='/create' element={<CreateBlog user={user}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/auth' element={<Auth active={active} setActive={setActive}/>} />
          <Route path='/blog/:id' element={<BlogDetail setActive={setActive} />} />
       </Routes>
    </div>
  )
}

export default App;