import React,{useContext,useEffect} from 'react'
import {Routes,Route,Navigate,useNavigate} from 'react-router'
import AuthContext from './store/auth-context'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UsersPage'
import Layout from './components/Layout/Layout'
import PageNotFound from './pages/PageNotFound'

export default function App() {
const isLoggedIn = useContext(AuthContext).isLoggedIn
const navigate=useNavigate()
useEffect(()=>{
if(!isLoggedIn){
navigate('/auth')
}
},[isLoggedIn,navigate])
  return (
    <Layout>
      <Routes>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/users' element={<UserPage/>}/>
        <Route path='/' element={<Navigate to={`${isLoggedIn ? '/users' :'/auth'}`} replace/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </Layout>
  )
}
