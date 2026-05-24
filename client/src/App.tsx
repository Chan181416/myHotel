import React, { Children } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Basis from './component/Basis/Basis.tsx';
import Home from './component/Home/Home.tsx';
import About from './component/About/About.tsx';
import Login from './component/Login/Login.tsx';

import Root from './root';

const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  children: [

    { index: true, element: <Login /> },  // / → Basis


 
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/basis",
      element: <Basis />,
    },
    {
      path: "/about",
      element: <About />
    }

  ]
}



]);
export default function App() {
  return <RouterProvider router={router} />
  // return(
  //   <>
  //   <Basis></Basis>
  //   </>

  // )


}