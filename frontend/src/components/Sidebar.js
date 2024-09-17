import React from 'react';
import { selectUserInfo, signout } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Sidebar = () => {
  const userInfo=useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleLogout = () => {
    dispatch(signout());
    navigate('/login')
  };
  return (
    <div
      className="d-flex  flex-column  align-items-start justify-content-between ms-3"
      style={{ height: '550px' }}
    >
      <div className="d-flex flex-row flex-sm-column gap-5 gap-sm-3 mt-5">
        <p className="d-flex gap-2">
          <i className="bi bi-house-door"></i>
          <span className="d-none d-sm-block">Dashboard</span>
        </p>
        <p className="d-flex gap-2">
          <i className="bi bi-file-text"></i>{' '}
          <span className="d-none d-sm-block">Blogs</span>
        </p>
        <p className="d-flex gap-2">
          <i className="bi bi-bar-chart-line"></i>
          <span className="d-none d-sm-block">Finances</span>
        </p>
        <p className="d-flex gap-2">
          <i className="bi bi-graph-up"></i>
          <span className="d-none d-sm-block">Pitches</span>
        </p>
      </div>
      <div className="d-none d-sm-block">
        <p className="d-flex gap-2">
          <i className="bi bi-gear"></i>
          <span>settings</span>
        </p>
        <p className="d-flex gap-2">
          <i className="bi bi-box-arrow-left"></i>{' '}
          <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
            {userInfo ? 'logout':'login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
