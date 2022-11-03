import React from "react"
import parse from "html-react-parser"
import "./ArticleHighlights.scss"

const ArticleHighlights = ({ content }) => {
  return <div className="article-highlights">{parse(content)}</div>
}

export default ArticleHighlights
