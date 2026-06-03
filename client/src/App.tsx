import React, { Children } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Basis from './component/Basis/Basis.tsx';
import Home from './component/Home/Home.tsx';
import About from './component/About/About.tsx';
import Login from './component/Login/Login.tsx';
import LoginGoogle from "./component/LoginGooge/LoginGoogle.tsx";


import Root from './root';
import DataBase from './component/DataBase/DataBase.tsx';

const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  children: [

    { index: true, element: <Login /> },  // / → Basis

    {
      path: "google-login",
      element: <LoginGoogle />
    },
 
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "basis",
      element: <Basis />,
    },
    {
      path: "about",
      element: <About />
    },
    {
      path: "dataBase",
      element: <DataBase />
    }

  ]
}



]);
export default function App() {
  return <RouterProvider router={router} />
  // return(
  //   <>
  //   <Login />
  //   </>

  // )


}