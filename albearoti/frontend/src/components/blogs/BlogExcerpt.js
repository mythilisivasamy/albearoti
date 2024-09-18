import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogExcerpt = ({ blog,handleDelete}) => {
  const navigate=useNavigate();
   return (
    <div className="col-12 col-sm-6 col-md-4 gap-1 mt-2">
      <div className="card" style={{ width: '14rem' }}>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between">
            <span>{blog.title}</span>
            <p>
              <span className="me-2">
                <i
                  className="bi bi-pencil fs-6 icon flex-shrink-0"
                  onClick={() => navigate(`edit/${blog._id}`)}
                ></i>
              </span>
              <span className="me-2">
                <i
                  className="bi bi-trash fs-6 icon flex-shrink-0"
                  onClick={() => handleDelete(blog._id)}
                ></i>
              </span>
            </p>
          </h5>
          <p className="card-text">{blog.description}</p>
          <p className="card-text">{blog.date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogExcerpt;
