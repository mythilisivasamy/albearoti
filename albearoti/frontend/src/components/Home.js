import React from 'react'
import BlogsList from './blogs/BlogsList'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
   <div className="container-fluid">
    <div className='d-flex justify-content-between'>
        <p>Blogs</p>
        <p>
            <span className="btn-ms mx-4"><Link to="/newBlog">Add New</Link></span>
            <span className="btn-ms featured me-4">Preview</span>
        </p>
    </div>
    <BlogsList/>
   </div>
  )
}

export default Home