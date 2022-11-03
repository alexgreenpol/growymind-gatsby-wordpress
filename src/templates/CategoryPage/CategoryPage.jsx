import * as React from "react"
import { graphql } from "gatsby"
import Seo from "../../components/Seo/Seo"
import InfiniteScrollPostList from "../../components/InfiniteScrollPostList/InfiniteScrollPostList"
import TopHeading from "../../components/TopHeading/TopHeading"
import FullwidthLayout from "../../layouts/FullwidthLayout/FullwidthLayout"

const CategoryPageTemplate = ({ data, location, pageContext }) => {
  const posts = data.allWpPost.nodes
  const categoryData = data.wpCategory

  return (
    <FullwidthLayout>
      <Seo
        location={location}
        title={`${categoryData.name} - ${categoryData.description || ""}`}
      />
      <TopHeading heading={categoryData.name} />
      <InfiniteScrollPostList posts={posts} pageContext={pageContext} />
    </FullwidthLayout>
  )
}

export default CategoryPageTemplate

export const pageQuery = graphql`
  query CategoryPageByType($category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { slug: { eq: $category } } } }
      }
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
    wpCategory(slug: { eq: $category }) {
      id
      name
      description
    }
  }
`
