import Header from './Header';
import Main from './Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
      <ToastContainer autoClose={1000} />
      <Header />
      <Main />
    </>
  );
};

export default Layout;
