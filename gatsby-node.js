const path = require(`path`)

exports.createPages = async gatsbyUtilities => {
  const posts = await getPosts(gatsbyUtilities)
  const categories = await getCategories(gatsbyUtilities)
  const tags = await getTags(gatsbyUtilities)

  if (!posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })

  // If there are categories, create pages for them
  await createIndividualCategoryPages({ categories, gatsbyUtilities })

  // If there are tags, create pages for them
  await createIndividualTagPages({ tags, gatsbyUtilities })

  // And a paginated archive
  await createBlogPostArchive({ gatsbyUtilities })
}

const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) => {
  return Promise.all(
    posts.map(({ previous, post, next }) =>
      gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve(`./src/templates/BlogPost/BlogPost.jsx`),
        context: {
          id: post.id,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )
}

const createIndividualCategoryPages = async ({
  categories,
  gatsbyUtilities,
}) => {
  const graphqlResult = await gatsbyUtilities.graphql(`
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  return Promise.all(
    categories.map(({ category }) => {
      return gatsbyUtilities.actions.createPage({
        path: category.uri,
        component: path.resolve(
          `./src/templates/CategoryPage/CategoryPage.jsx`
        ),
        context: {
          id: category.id,
          category: category.slug,
          postsPerPage: postsPerPage < 10 ? 10 : postsPerPage,
        },
      })
    })
  )
}

const createIndividualTagPages = async ({ tags, gatsbyUtilities }) => {
  const graphqlResult = await gatsbyUtilities.graphql(`
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  return Promise.all(
    tags.map(({ tag }) => {
      return gatsbyUtilities.actions.createPage({
        path: tag.uri,
        component: path.resolve(`./src/templates/TagPage/TagPage.jsx`),
        context: {
          id: tag.id,
          tag: tag.slug,
          postsPerPage: postsPerPage < 10 ? 10 : postsPerPage,
        },
      })
    })
  )
}

const createBlogPostArchive = async ({ gatsbyUtilities }) => {
  const graphqlResult = await gatsbyUtilities.graphql(`
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  return await gatsbyUtilities.actions.createPage({
    path: "/",
    component: path.resolve(
      `./src/templates/BlogPostArchive/BlogPostArchive.jsx`
    ),
    context: {
      postsPerPage: postsPerPage < 10 ? 10 : postsPerPage,
    },
  })
}

const getPosts = async ({ graphql, reporter }) => {
  const graphqlResult = await graphql(`
    query WpPosts {
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          post: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

const getCategories = async ({ graphql, reporter }) => {
  const graphqlResult = await graphql(`
    query WpCategories {
      # Query all WordPress blog categories sorted by date
      allWpCategory {
        edges {
          category: node {
            slug
            name
            id
            uri
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog categories`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpCategory.edges
}

const getTags = async ({ graphql, reporter }) => {
  const graphqlResult = await graphql(`
    query WpTags {
      # Query all WordPress blog tags sorted by date
      allWpTag {
        edges {
          tag: node {
            id
            name
            slug
            uri
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog tags`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpTag.edges
}
