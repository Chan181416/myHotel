import React, { Children } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Basis from './component/Basis/Basis';
import Home from './component/Home/Home';
import About from './component/About/About';

import Root from './root';

const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  children: [

    { index: true, element: <Basis /> },  // / → Basis


    {
      path: "/home",
      element: <Home />,
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