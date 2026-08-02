import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function PublicLayout() {
  return (
    <div className="public-layout-container">
      <Navbar />
      <div className="public-main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
