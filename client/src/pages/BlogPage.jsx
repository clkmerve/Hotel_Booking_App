import React from 'react'
import Header from '../components/Header'
// import Blogs from '../components/Blogs/Blogs'
import BlogNew from '../components/Blogs/BlogNew'
import Blog from '../components/Blogs/Blog'
import Footer from '../components/Footer/Footer';

const BlogPage = () => {
  return (
    <div>
      <Header/>
      <BlogNew/>
      <Blog/>
      
      <Footer/>
    </div>
  )
}

export default BlogPage
