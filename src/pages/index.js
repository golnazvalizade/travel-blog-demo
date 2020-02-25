import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import Featured from "../components/featured"
import Home from "../components/home"
import { Link } from "gatsby"
import "./index.css"
import Footer from "../components/footer"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Nav />
    <Featured />
    <Home />
    <Link to="/blog" className="viewmore">
      View More
    </Link>
    <Footer />
  </Layout>
)

export default IndexPage
