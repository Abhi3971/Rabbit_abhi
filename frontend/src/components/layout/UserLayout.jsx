import React from 'react'
import Header from '../common/Header'
import FooterEnd from '../common/FooterEnd'
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20 px-0.10 md:px-8 lg:px-12">
        <Outlet />
      </main>

      {/* Footer */}
      <FooterEnd />
    </>
  )
}

export default UserLayout;
