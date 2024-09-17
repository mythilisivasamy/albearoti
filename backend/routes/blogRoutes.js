import express from 'express';
import Blog from '../models/blogModel.js';
import isAuth from '../middleware/protectedRoutes.js';

const blogRouter = express.Router();

blogRouter.post('/', isAuth, async (req, res) => {
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

  try {
    const newBlog = await blog.save();
    res.status(200).json({
      blog: newBlog,
      message: 'blog Posted',
      statusCode: '201',
    });
  } catch (error) {
    console.log(error);
  }
});

blogRouter.get('/', isAuth, async (req, res) => {
  console.log('get');
  try {
    const blogs = await Blog.find({ author: req.user._id });
    if (blogs) {
      res.json({ message: 'succeeded', blogs, statusCode: '201' });
    }
  } catch (err) {
    res.status(404).send({ message: 'No Blog Found' });
  }
});

blogRouter.delete('/:id', isAuth, async (req, res) => {
  const blog = await Blog.findById({ _id: req.params.id });

  if (blog) {
    const deletedBlog = await blog.deleteOne();

    res.json({
      message: 'blog Deleted',
      statusCode: '201',
      id: req.params.id,
      blog: deletedBlog,
    });
  } else {
    res.status(404).send({ message: 'blog Not Found' });
  }
});

blogRouter.put(
  '/:id',
  isAuth,

  async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById({ _id: blogId });
    if (blog) {
      blog.title = req.body.title;
      blog.description = req.body.description;
      blog.date = req.body.date;
      blog.author = req.user;

      const updatedBlog = await blog.save();
      res.status(201).json({
        message: 'blog Updated',
        statusCode: '201',
        blog: updatedBlog,
      });
    } else {
      res.status(404).send({ message: 'blog Not Found' });
    }
  }
);

export default blogRouter;
