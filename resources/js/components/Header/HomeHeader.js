import React from 'react';

import { Link } from 'react-router-dom';

import assets from '../../assets';
import * as routes from '../../constants/routes';

const HomeHeader = (props) => (
  <div className="header-home d-flex align-items-center">
    <div className="logo col-3 d-flex justify-content-start align-items-center">
      <div className="logo-image mr-2">
        <img src={assets.logo_header} className="size-20"/>
      </div>
      <div className="logo-text">
        <div className="title font-weight-bold text-white">MNM</div>
        <div className="subtitle text-white">ClosingRoom</div>
      </div>
    </div>
    <div className="col-6">
    </div>
    <div className="col-3 d-flex justify-content-end align-items-center">
      <div className="mr-5">
        <Link to={routes.SIGN_IN} className="mr-2">
          <button className="button-header">Login</button>
        </Link>
        <Link to={routes.SIGN_UP}>
          <button className="button-header">Register</button>
        </Link>
      </div>
      <div className="help">
        <img src={assets.help} className="size-20"/>
      </div>
    </div>
  </div>
);

export default HomeHeader;
