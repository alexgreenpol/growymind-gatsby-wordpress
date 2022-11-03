import React, { useState, useEffect } from "react"
import parse from "html-react-parser"
import { Link } from "gatsby"
import InfiniteScroll from "react-infinite-scroll-component"
import { GatsbyImage } from "gatsby-plugin-image"
import "./InfiniteScrollPostList.scss"
import Author from "../Author/Author"

const InfiniteScrollPostList = ({ posts, pageContext }) => {
  const [list, setList] = useState([
    ...posts.slice(0, pageContext.postsPerPage),
  ])
  const [hasMore, setHasMore] = useState(true)

  const fetchData = () => {
    setList([
      ...list,
      ...posts.slice(list.length, list.length + pageContext.postsPerPage),
    ])
  }

  useEffect(() => {
    setHasMore(list.length !== posts.length)
  }, [list, posts.length])

  return (
    <InfiniteScroll dataLength={list.length} next={fetchData} hasMore={hasMore}>
      <ol className="post-list">
        {list.map(post => {
          const title = post.title
          const { firstName, lastName, avatar } = post.author.node
          const featuredImage = {
            data:
              post.featuredImage?.node?.localFile?.childImageSharp
                ?.gatsbyImageData,
            alt: post.featuredImage?.node?.alt || ``,
          }

          return (
            <li className="post-list__item" key={post.uri}>
              <article
                className="article"
                itemScope="itemscope"
                itemProp="blogPost"
                itemType="http://schema.org/BlogPosting"
              >
                <div className="article__content">
                  <header className="article__header">
                    <div className="article__author">
                      <Author
                        firstName={firstName}
                        lastName={lastName}
                        avatarUrl={avatar.url}
                      />
                      <span className="separator">·</span>
                      <span className="article__date" itemProp="dateCreated">
                        {post.date}
                      </span>
                    </div>
                    <h2 className="article__title" itemProp="headline">
                      <Link
                        className="article__link"
                        to={post.uri}
                        itemProp="url"
                      >
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                  </header>
                  <section
                    className="post-list__article-description"
                    itemProp="description"
                  >
                    {parse(post.excerpt)}
                  </section>
                  <footer></footer>
                </div>
                {featuredImage?.data && (
                  <div className="article__image" itemProp="associatedMedia">
                    <GatsbyImage
                      image={featuredImage.data}
                      alt={featuredImage.alt}
                    />
                  </div>
                )}
              </article>
            </li>
          )
        })}
      </ol>
    </InfiniteScroll>
  )
}

export default InfiniteScrollPostList
