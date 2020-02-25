import React from "react"
import { StaticQuery, graphql, navigate } from "gatsby"
import "./home.css"

export default () => (
  <StaticQuery
    query={graphql`
      query HomeQuery {
        allContentfulBlog(
          limit: 9
          sort: { fields: [createdAt], order: DESC }
          filter: { node_locale: { eq: "en-US" }, home: { eq: true } }
        ) {
          edges {
            node {
              id
              slug
              title
              category {
                title
                id
              }
              featuredImage {
                fluid(maxWidth: 1200, quality: 85) {
                  src
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div className="feed">
        {data.allContentfulBlog.edges.map(edge => (
          <div
            key={edge.node.id}
            className="card"
            style={{
              backgroundImage: `linear-gradient(
                    to bottom, 
                    rgba(10,10,10,0) 0%,
                    rgba(10,10,10,0) 50%,
                    rgba(10,10,10,0.7) 100%),
                    url(${edge.node.featuredImage.fluid.src})`,
            }}
            onClick={() => navigate(`/blog/${edge.node.slug}`)}
          >
            {edge.node.category.map(categories => (
              <p className="card__category" key={categories.id}>
                {categories.title}
              </p>
            ))}
            <p className="card__title">{edge.node.title}</p>
          </div>
        ))}
      </div>
    )}
  />
)
