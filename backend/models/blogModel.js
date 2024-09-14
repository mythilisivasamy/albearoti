import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: 'UserModel',
  },
});

const Blog=mongoose.model('blog', blogSchema);
export default Blog;
