// make API for blog page

const path = require(`path`)

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      })
    )
  })

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getBlog = makeRequest(
    graphql,
    ` {
     allContentfulBlog (
       sort: { fields: [createdAt], order: DESC }
       filter: {
         node_locale: {eq: "en-US"}},)
     {
       edges {
         node {
           id
           slug
         }
       }
     }
   }
  `
  ).then(result => {
    result.data.allContentfulBlog.edges.forEach(({ node }) => {
      createPage({
        path: `blog/${node.slug}`,
        component: path.resolve(`./src/templates/blog.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getArchive = makeRequest(
    graphql,
    `{
      allContentfulBlog(
        sort: { fields: [createdAt], order: DESC }
        filter: { node_locale: { eq: "en-US" }},)
        {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
  `
  ).then(result => {
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({
      length: numPages,
    }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: path.resolve("./src/templates/archive.js"),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // Create travel category page, including pagination
  const getTravel = makeRequest(
    graphql,
    `
{
  allContentfulBlog (
    sort: { fields: [createdAt], order: DESC }
    filter: {
      node_locale: {eq: "en-US"}
      category: { elemMatch: { title: { eq: "Travel" } } }
    },)
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`
  ).then(result => {
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/category/travel` : `/category/travel/${i + 1}`,
        component: path.resolve("./src/templates/travel.js"),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // Create tech category page, including pagination
  const getTech = makeRequest(
    graphql,
    `
{
  allContentfulBlog (
    sort: { fields: [createdAt], order: DESC }
    filter: {
      node_locale: {eq: "en-US"}
      category: { elemMatch: { title: { eq: "Tech" } } }
    },)
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`
  ).then(result => {
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/category/tech` : `/category/tech/${i + 1}`,
        component: path.resolve("./src/templates/tech.js"),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // Create opinion category page, including pagination
  const getOpinion = makeRequest(
    graphql,
    `
{
  allContentfulBlog (
    sort: { fields: [createdAt], order: DESC }
    filter: {
      node_locale: {eq: "en-US"}
      category: { elemMatch: { title: { eq: "Opinion" } } }
    },)
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`
  ).then(result => {
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/category/opinion` : `/category/opinion/${i + 1}`,
        component: path.resolve("./src/templates/opinion.js"),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  return Promise.all([getBlog, getArchive, getTravel, getTech, getOpinion])
}
