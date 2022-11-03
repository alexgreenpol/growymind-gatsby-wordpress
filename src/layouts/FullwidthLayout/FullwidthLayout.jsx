import React from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./FullwidthLayout.scss"

const FullwidthLayout = ({ children }) => {
  return (
    <div className="site">
      <Header />
      <main className="page page--fullwidth">{children}</main>
      <Footer />
    </div>
  )
}

export default FullwidthLayout
