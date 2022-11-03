import React from "react"
import parse from "html-react-parser"
import { useStaticQuery, graphql } from "gatsby"
import "./Footer.scss"

const Footer = () => {
  const { footerData } = useStaticQuery(graphql`
    query FooterQuery {
      footerData: wp {
        getFooter {
          sidebarOne
        }
      }
    }
  `)

  return (
    <footer className="footer">{parse(footerData.getFooter.sidebarOne)}</footer>
  )
}

export default Footer
