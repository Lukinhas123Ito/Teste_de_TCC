import React from 'react';
import { Outlet } from 'react-router';

import NavBar from './Navbar/Navbar';

export default () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};