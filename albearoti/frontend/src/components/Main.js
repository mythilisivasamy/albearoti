import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router';

const Main = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-sm-2 order-2 order-sm-1">
          <Sidebar />
        </div>
        <div className="col-12 col-sm-10 order-1 order-sm-2">
         <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Main;
