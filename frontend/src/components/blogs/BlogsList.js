import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllblogs, deleteBlog } from '../../features/blogs/blogSlice';
import BlogExcerpt from './BlogExcerpt';
import { toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom';

const BlogsList = () => {
  const blogs = useSelector(selectAllblogs);

  const dispatch = useDispatch();
  const handleDelete = async (blogId) => {
    try {
      dispatch(deleteBlog(blogId)).unwrap();
      toast.success('deleted successfully');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="row container-fluid">
      {blogs.map((blog) => (
        <BlogExcerpt blog={blog} key={blog._id} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default BlogsList;
