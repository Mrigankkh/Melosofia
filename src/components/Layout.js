import React from 'react';
import Navbar from './Navbar';
const Layout = ({ children }) => {
  return (
    <div>
      {/* Only render Navbar for non-login/signup pages */}
      <Navbar />
      <main>{children}</main>
      {/* Optionally, you can add a footer here */}
    </div>
  );
};

export default Layout;