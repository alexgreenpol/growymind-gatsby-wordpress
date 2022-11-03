import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import Seo from "../../components/Seo/Seo"
import MainLayout from "../../layouts/MainLayout/MainLayout"
import "./BlogPost.scss"
import BasicAccordion from "../../components/BasicAccordion/BasicAccordion"
import ArticleHighlights from "../../components/ArticleHighlights/ArticleHighlights"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const postDescription = parse(post.excerpt)[0].props.children
  const tags = post.tags.nodes
  const categories = post.categories.nodes
  const faqItems = post.faq.faqItem
  const pageContext = post.pageContext.pageContextItem

  return (
    <MainLayout>
      <Seo
        title={`${post.title} | ${post.date}`}
        description={postDescription}
      />

      <article
        className="blog-post"
        itemScope="itemscope"
        itemProp="blogPost"
        itemType="http://schema.org/BlogPosting"
      >
        <header className="blog-post__header">
          <h1 className="blog-post__title" itemProp="headline">
            {parse(post.title)}
          </h1>

          {categories && (
            <nav className="blog-post__categories">
              {categories.map(item => (
                <Link to={item.uri} key={item.id}>{`${item.name}`}</Link>
              ))}
            </nav>
          )}
        </header>

        {pageContext && (
          <section className="blog-post__highlights">
            <h2>Article highlights</h2>
            <ArticleHighlights content={pageContext} />
          </section>
        )}

        {post.content && (
          <section className="blog-post__text" itemProp="articleBody">
            {parse(post.content)}
          </section>
        )}

        {faqItems && (
          <section className="blog-post__faq">
            <h2>FAQ</h2>
            <BasicAccordion items={faqItems} />
          </section>
        )}

        {tags && (
          <footer>
            <nav className="blog-post__tags">
              {tags.map(item => (
                <Link
                  to={item.uri}
                  key={item.id}
                  itemProp="keywords"
                >{`#${item.name}`}</Link>
              ))}
            </nav>
          </footer>
        )}
      </article>

      {(previous || next) && (
        <nav className="controls">
          <ul className="controls__list">
            {previous && (
              <li className="controls__list-item">
                <Link to={previous.uri} rel="prev">
                  ← {parse(previous.title)}
                </Link>
              </li>
            )}

            {next && (
              <li className="controls__list-item">
                <Link to={next.uri} rel="next">
                  {parse(next.title)} →
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </MainLayout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
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
      faq {
        faqItem {
          question
          answer
        }
      }
      pageContext {
        pageContextItem
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
