import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import { LayoutLoader } from './components/layout/Loaders.jsx';
import { server } from './constants/config.js';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExist } from './redux/reducers/auth.reducer.js';
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Group = lazy(() => import("./pages/Group.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"))

const AdminLogin=lazy(()=>import('./pages/admin/AdminLogin.jsx'));
const Dashboard=lazy(()=>import('./pages/admin/Dashboard.jsx'));
const ChatManagement=lazy(()=>import('./pages/admin/ChatManagement.jsx'))
const UserManagement=lazy(()=>import('./pages/admin/UserManagement.jsx'))
const MessageManagement=lazy(()=>import('./pages/admin/MessageManagement.jsx'))
let user = true;
function App() {
  const {user,isLoading}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
    const getMyProfile=async()=>{
      const response=await fetch(`${server}/user/me`)
      const data=await response.json()
      if(!data.success)
        dispatch(userNotExist())
      
    }
    getMyProfile()
  },[dispatch])
  return isLoading?(<LayoutLoader/>):(
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader/>}>

          <Routes>
            <Route element={<ProtectedRoute user={user} />}>

              <Route path='/' element={<Home />} />
              <Route path='/chat/:id' element={<Chat />} />
              <Route path='/group' element={<Group />} />
            </Route>
            <Route path='/login' element={<ProtectedRoute user={!user} redirect='/'><Login /></ProtectedRoute>} />
            <Route path='/admin' element={<AdminLogin/>}/>
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/admin/chats-management' element={<ChatManagement/>}/>
            <Route path='/admin/user-management' element={<UserManagement/>}/>
            <Route path='/admin/messages-management' element={<MessageManagement/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App