import React from "react"
import { graphql } from "gatsby"
import Seo from "../../components/Seo/Seo"
import InfiniteScrollPostList from "../../components/InfiniteScrollPostList/InfiniteScrollPostList"
import FullwidthLayout from "../../layouts/FullwidthLayout/FullwidthLayout"
import Hero from "../../components/Hero/Hero"

const BlogIndex = ({ data, pageContext }) => {
  const posts = data.allWpPost.nodes
  const { title, excerpt, uri } = posts[0]
  const siteTitle = data.wp.generalSettings.title
  const siteDescription = data.wp.generalSettings.description

  return (
    <FullwidthLayout>
      <Seo title={siteTitle} description={siteDescription} isHomepage={true} />
      <Hero title={title} subtitle={excerpt} buttonUrl={uri} />
      <InfiniteScrollPostList posts={posts} pageContext={pageContext} />
    </FullwidthLayout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive {
    wp {
      generalSettings {
        title
        description
      }
    }
    allWpPost(sort: { fields: [date], order: DESC }) {
      nodes {
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 50
                  placeholder: TRACED_SVG
                  layout: FULL_WIDTH
                )
              }
            }
          }
        }
        categories {
          nodes {
            id
            uri
            name
          }
        }
        tags {
          nodes {
            id
            uri
            name
          }
        }
        author {
          node {
            avatar {
              url
            }
            firstName
            lastName
          }
        }
      }
    }
  }
`
