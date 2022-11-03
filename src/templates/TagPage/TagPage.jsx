import React from "react"
import { graphql } from "gatsby"
import FullwidthLayout from "../../layouts/FullwidthLayout/FullwidthLayout"
import Seo from "../../components/Seo/Seo"
import InfiniteScrollPostList from "../../components/InfiniteScrollPostList/InfiniteScrollPostList"
import TopHeading from "../../components/TopHeading/TopHeading"

const TagPageTemplate = ({ data, location, pageContext }) => {
  const posts = data.allWpPost.nodes
  const tagData = data.wpTag

  return (
    <FullwidthLayout>
      <Seo
        location={location}
        description={tagData.description || ""}
        title={`All posts by tag: ${tagData.name}`}
      />
      <TopHeading heading={`All posts by tag: ${tagData.name}`} />
      <InfiniteScrollPostList posts={posts} pageContext={pageContext} />
    </FullwidthLayout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query TagPageByType($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWpPost(
      filter: { tags: { nodes: { elemMatch: { slug: { eq: $tag } } } } }
    ) {
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
                  quality: 100
                  placeholder: TRACED_SVG
                  layout: FULL_WIDTH
                )
              }
            }
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
    wpTag(slug: { eq: $tag }) {
      id
      name
      description
    }
  }
`
