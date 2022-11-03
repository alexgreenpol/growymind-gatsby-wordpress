import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import DarkModeToggler from "../DarkModeToggler/DarkModeToggler"
import "./Header.scss"

const Header = () => {
  const { menu } = useStaticQuery(graphql`
    query HeaderQuery {
      menu: wpMenu(slug: { eq: "primary" }) {
        id
        menuItems {
          nodes {
            id
            label
            url
          }
        }
      }
    }
  `)

  const menuItems = menu.menuItems.nodes

  return (
    <header className="header">
      <div className="logo">
        <Link className="logo__link" to="/">
          Nftiblog
        </Link>
      </div>

      <nav
        className="menu"
        itemScope="itemscope"
        itemType="http://schema.org/SiteNavigationElement"
      >
        {menuItems.map(item => {
          return (
            <Link
              activeClassName="menu__link--active"
              className="menu__link"
              to={item.url}
              key={item.id}
              itemProp="url"
            >
              {item.label}
              <meta itemProp="name" content={item.label} />
            </Link>
          )
        })}
      </nav>

      <DarkModeToggler />
    </header>
  )
}

export default Header
