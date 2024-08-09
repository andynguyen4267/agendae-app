import { useState } from 'react'
// import TodoForm from '../TodoForm/TodoForm.jsx';
// import TodoForm from "../TodoForm/TodoForm.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from '../Homepage/Homepage.jsx'
import Signup from '../Signup/Signup.jsx'
import Login from '../Login/Login.jsx'
import TodoPage from '../TodoPage/TodoPage.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/todos' element={<TodoPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
