import React from "react"
import "./TopHeading.scss"

const TopHeading = ({ heading }) => {
  return (
    <div className="top-heading">
      <h1 className="top-heading__title">{heading}</h1>
    </div>
  )
}

export default TopHeading
