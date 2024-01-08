import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import Login from './components/login/Login'
import Register from './components/register/Register'
import TodoComponent from './components/todo/Todo';

function App() {
  return (
    <>
    <BrowserRouter>
          <Routes>
              <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/todo" element={<TodoComponent/>} />
              </>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
