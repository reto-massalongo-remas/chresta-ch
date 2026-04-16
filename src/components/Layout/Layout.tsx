import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import FloatSidebar from './FloatSidebar'
import ProtoNav from './ProtoNav'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <>
      <ProtoNav />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatSidebar />
    </>
  )
}
