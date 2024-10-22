import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import { LayoutLoader } from './components/layout/Loaders.jsx';
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Group = lazy(() => import("./pages/Group.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"))

const AdminLogin=lazy(()=>import('./pages/admin/AdminLogin.jsx'))
let user = true;
function App() {
  return (
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App