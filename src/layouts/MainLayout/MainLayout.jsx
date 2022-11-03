import React from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./MainLayout.scss"

const MainLayout = ({ children }) => {
  return (
    <div className="site">
      <Header />

      <main className="page page--contained">
        <section className="page__content">{children}</section>
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
