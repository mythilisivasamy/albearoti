import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blogs/blogSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
  },
});
export default store;
