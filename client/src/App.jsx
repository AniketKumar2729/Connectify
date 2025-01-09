import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import { LayoutLoader } from './components/layout/Loaders.jsx';
import { server } from './constants/config.js';
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userNotExist } from './redux/reducers/auth.reducer.js';
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Group = lazy(() => import("./pages/Group.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement.jsx'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement.jsx'))
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement.jsx'))
import { Toaster } from "react-hot-toast";
import { SocketProvider } from './Socket.jsx';
// let user = true;
function App() {
  const { user, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    // Check if user is present in localStorage on page load
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(userExist(storedUser));  // Dispatch user data into Redux store
    } else {
      dispatch(userNotExist());  // Dispatch userNotExist if no user is found in localStorage
    }
  }, [dispatch])
  // useEffect(()=>{
  //   const getMyProfile=async()=>{
  //     const response=await fetch(`${server}/api/v1/user/me`)
  //     const data=await response.json()
  //     if(!data.success)
  //       dispatch(userNotExist())

  //   }
  //   getMyProfile()
  // },[dispatch])
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route element={<SocketProvider>
              <ProtectedRoute user={user} />
            </SocketProvider>}>
              <Route path='/' element={<Home />} />
              <Route path='/chat/:id' element={<Chat />} />
              <Route path='/group' element={<Group />} />
            </Route>
            <Route path='/login' element={<ProtectedRoute user={!user} redirect='/'><Login /></ProtectedRoute>} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/chats-management' element={<ChatManagement />} />
            <Route path='/admin/user-management' element={<UserManagement />} />
            <Route path='/admin/messages-management' element={<MessageManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position='bottom-center' />
      </BrowserRouter>
    </>
  )
}

export default App