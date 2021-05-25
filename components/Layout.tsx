import React, { FC } from 'react';
import Navbar from './Navbar';

const Layout: FC = ({ children }) => {
  return (
    <div className="grid">
      {/* <Navbar /> */}
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
