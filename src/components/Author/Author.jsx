import React from "react"
import "./Author.scss"

const Author = ({ firstName, lastName, avatarUrl }) => {
  return (
    <div className="author" itemProp="author">
      {avatarUrl && (
        <img
          alt={firstName + " " + lastName || ""}
          className="author__avatar"
          src={avatarUrl}
        />
      )}
      {firstName && lastName && (
        <p
          className="author__name"
          itemProp="givenName"
        >{`${firstName} ${lastName}`}</p>
      )}
    </div>
  )
}

export default Author
