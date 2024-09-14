import express from 'express';
import Blog from '../models/blogModel.js';
import isAuth from '../middleware/protectedRoutes.js';
import asyncHandler from 'express-async-handler';

const blogRouter = express.Router();

blogRouter.post('/', isAuth, (req, res) => {
  const { title, description, date } = req.body;
  if (!description || !title || !date) {
    return res
      .status(400)
      .json({ error: 'One or more mandatory fields are empty' });
  }

  const blog = new Blog({
    title,
    description,
    date,
    author: req.user,
  });
  blog
    .save()
    .then((newblog) => {
      res.status(201).json({ blog: newblog });
    })
    .catch((error) => {
      console.log(error);
    });
});

blogRouter.get('/', isAuth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id });
    if (blogs) {
      res.json({ message: 'succeeded', blogs, statusCode: '201' });
    }
  } catch (err) {
    res.status(404).send({ message: 'No Blog Found' });
  }
});

export default blogRouter;
