import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BLOGS_URL = 'http://localhost:8000/api/blog';

const initialState = {
  blogs: [],
  status: 'idle',
  error: '',
};

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    const response = await axios.get(`${BLOGS_URL}/`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
});
export const newBlog = createAsyncThunk('blogs/newBlog', async (newBlog) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    const response = await axios.post(`${BLOGS_URL}/`, newBlog, {
      headers: { authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err) {
    return err.message;
  }
});
export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (blogExcerpt) => {
    console.log('blog', blogExcerpt);
    try {
      const { token } = JSON.parse(localStorage.getItem('userInfo'));
      const response = await axios.put(
        `${BLOGS_URL}/${blogExcerpt.id}`,
        blogExcerpt,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('userInfo'));
      const response = await axios.delete(`${BLOGS_URL}/${blogId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log('res', response.data);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload.blogs;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(newBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { _id } = action.payload.blog;
        const blogs = state.blogs.filter((t) => t._id !== _id);
        state.blogs = [...blogs, action.payload.blog];
      })
      .addCase(newBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { _id } = action.payload.blog;
        const blogs = state.blogs.filter((blog) => blog._id !== _id);
        state.blogs = [...blogs, action.payload.blog];
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload.id
        );
        console.log('blogs', blogs);
        state.blogs = blogs;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setStatus } = blogSlice.actions;
export const selectStatus = (state) => state.blogs.status;
export const selectError = (state) => state.blogs.error;
export const selectAllblogs = (state) => state.blogs.blogs;
export const selectReviews = (state) => state.blogs.reviews;
export default blogSlice.reducer;
