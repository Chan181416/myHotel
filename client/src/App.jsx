import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Basis from './component/Basis/Basis'
import React  from 'react'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './component/Home/Home'

function App() {

    const router = createBrowserRouter([
  {
    path: "/", element: <Basis></Basis>,
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
