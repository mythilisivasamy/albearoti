import React from 'react';
import { selectUserInfo } from '../features/user/userSlice';
import { useSelector } from 'react-redux';

const Header = () => {
  const userInfo = useSelector(selectUserInfo);
  return (
    <header id="header" className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 d-block d-sm-none order-1">
            <p>
              <i className="bi bi-arrow-left-short"></i>
            </p>
          </div>
          <div className="col-4 col-lg-4 order-2 ">
            <div className="logo">
              <img src="./images/logo.png" alt="logo" />
            </div>
          </div>
          <div className="col-12 col-sm-3 col-lg-4 d-flex justify-content-center order-4 order-sm-3 gap-4">
            <div className="d-flex justify-content-between gap-3">
              <p>Afterglow</p>
              <i className="bi bi-arrow-down-short px-3"></i>
            </div>
            <div className="d-flex justify-content-between gap-2">
              <span>scenario</span>
              <span>Default</span>
              <i className="bi bi-arrow-down-short"></i>
            </div>
          </div>
          <div className="col-4 col-lg-4 d-flex justify-content-end order-3 order-sm-4">
            <i className="bi bi-search me-2"></i>
            <p className="me-4">Search</p>
            <p>{userInfo && userInfo.firstName}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
