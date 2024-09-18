import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NewBlog from './components/blogs/NewBlog';
import RouteGuard from './components/RouteGuard';
import BlogsList from './components/blogs/BlogsList';
import BlogEdit from './components/blogs/BlogEdit';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogList" element={<BlogsList />} />
          <Route
            path="/newBlog"
            element={
              <RouteGuard>
                <NewBlog />
              </RouteGuard>
            }
          />
       
        <Route path="/edit/:id" element={<BlogEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
