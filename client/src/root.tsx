import React from 'react';
import { Outlet, Link } from 'react-router-dom';
function Root() {
  return (
    <div >
      <p>Hotel</p>
      <hr />
      <Outlet />
    </div>
  )
    
}


export default Root;