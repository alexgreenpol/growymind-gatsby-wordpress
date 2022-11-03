import React from "react"
import { Link } from "gatsby"
import "./ButtonLink.scss"

const ButtonLink = ({ uri, children }) => {
  return (
    <Link className="btn" to={uri}>
      {children}
    </Link>
  )
}

export default ButtonLink
