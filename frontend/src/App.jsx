
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import PropTypes from 'prop-types';
import { useState } from 'react'
import RefreahHandler from './components/RefreahHandler'
import SavedNotes from './components/SavedNotes'

function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);


const PrivateRoutes = ({element})=>{
  return isAuthenticated ? element : <Navigate to="/login"/>
}

PrivateRoutes.propTypes = {
  element: PropTypes.element.isRequired,
};
  return (
   <div>
    <RefreahHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/' element={<Navigate to="/login" />}></Route>
      <Route path='/home' element={<PrivateRoutes element={<Home/>}/>}></Route>
      <Route
          path='/saved-notes'
          element={
            <PrivateRoutes element={<SavedNotes />} /> 
          }
        />

      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
    </Routes>
    </div>
  )
}


export default App
