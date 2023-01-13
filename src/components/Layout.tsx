import React from 'react';

import Navbar from './Navbar';

type TLayoutProps = {
  children: React.ReactNode;
}

const Layout = ({ children } : TLayoutProps) => (
  <main className="h-screen bg-gradient-to-r from-[#536976] to-[#292E49] flex flex-col">
    <Navbar />
    {children}
  </main>
)


export default Layout