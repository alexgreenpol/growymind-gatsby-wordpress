import React from "react"
import parse from "html-react-parser"
import ButtonLink from "../ButtonLink/ButtonLink"
import "./Hero.scss"

const Hero = ({ title, subtitle, buttonUrl }) => {
  const parsedSubtitle = parse(subtitle)

  const subtitleStr =
    parsedSubtitle[0].props.children.split(" ").slice(0, 20).join(" ") + " ..."

  return (
    <div className="hero">
      <div className="hero__content">
        <h2 className="hero__title">{title}</h2>
        <h3 className="hero__subtitle">{subtitleStr}</h3>
        <ButtonLink uri={buttonUrl}>Continue reading</ButtonLink>
      </div>
      <div className="hero__illustration"></div>
    </div>
  )
}

export default Hero
