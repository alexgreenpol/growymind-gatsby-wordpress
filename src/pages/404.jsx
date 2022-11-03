import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/Seo/Seo"
import MainLayout from "../layouts/MainLayout/MainLayout"
import ButtonLink from "../components/ButtonLink/ButtonLink"

const NotFoundPage = () => {
  return (
    <MainLayout>
      <Seo title="404: Not Found" />
      <div className="non-found-page">
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <ButtonLink uri="/">Go to homepage</ButtonLink>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
