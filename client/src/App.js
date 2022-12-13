import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Landing,Error,ProtectedRoute,Home,CreatePin,PinDetails,UserPins,CategoryPins,CurrentUserPins} from  "./components/index.js"
import CircularProgress from '@mui/material/CircularProgress';

import Register from "./components/Register"

const Homes=React.lazy(()=>import("./components/Home"))

function App() {
  return (
    <div>
      <BrowserRouter>
      <React.Suspense fallback={<CircularProgress/>}>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/Home" element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/createPin" element={<CreatePin/>}/>

          <Route path="/pinsDetail/:id" element={<PinDetails/>}/>

          <Route path="/userPins/:userId" element={<UserPins/>}/>

          <Route path="/categoryPins/:category" element={<CategoryPins/>}/>


          <Route path="/currentUserPins" element={<CurrentUserPins/>}/>

          <Route path="*" element={<Error/>}/>
        </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
