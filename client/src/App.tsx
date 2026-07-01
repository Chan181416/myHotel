import React, { Children } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Basis from './component/Basis/Basis.tsx';
import Home from './component/Home/Home.tsx';
import About from './component/About/About.tsx';
import Login from './component/Login/Login.tsx';
import BookingPreview from './component/BookingPreview/BookingPreview.tsx';

import Root from './root';
import DataBase from './component/dataBase/dataBase.tsx';
import RoomLocationsTable from './component/FinalRegistration/FinalRegistration.tsx';

const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  children: [

    { index: true, element: <Login /> },



    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/basis",
      element: <Basis />,
    },
    {
      path: "/bookingPreview",
      element: <BookingPreview />,
    },
    {
      path: "/FinalRegistration",
      element: <RoomLocationsTable />,
    },
    {
      path: "/about",
      element: <About />
    }, {
      path: '/dataBase',
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