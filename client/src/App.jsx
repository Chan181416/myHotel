import { useState } from 'react'

import './App.css'
import Basis from './component/Basis/Basis'
import React  from 'react'
import Login from './component/Login/Login'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './component/Home/Home'

function App() {

    const router = createBrowserRouter([
  {
    path: "/", element: <Login></Login>,
  },
  {
    path: "/Home", element: <Home></Home>,
  },
  {
    path: "/Basis", element: <Basis></Basis>,
  }
]);

  return (
    <>
  
      <Basis></Basis>

    </>
  )
}

export default App
