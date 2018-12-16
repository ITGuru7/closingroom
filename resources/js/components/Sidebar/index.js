import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import assets from '../../assets';

const Sidebar = () => (
  <div className="sidebar d-flex flex-column align-items-center p-4">
    <div className="header mb-5">
      <div className="d-flex justify-content-center">
        <div className="logo-image mr-2">
          <img src={assets.logo}/>
        </div>
        <div className="logo-text align-self-end">
          <div className="title">
              MNM
          </div>
          <div className="subtitle">
              DataRoom
          </div>
          <div className="version">
            Beta
          </div>
        </div>
      </div>
    </div>
    <div className="link-block align-self-start">
      <SidebarNavItem to={routes.HOME} asset={assets.home} text="Home"/>
      <SidebarNavItem to={routes.ACCOUNT} asset={assets.setting_blue} text="Account"/>
      <SidebarNavItem to={routes.ROOMS} asset={assets.find} text="My Rooms"/>
    </div>
    <div className="about-block">
      <SidebarNavItem to="" text="What is a DataRoom?"/>
    </div>
    <div className="signout-block mt-auto">
      <SignOutButton />
    </div>
  </div>
);

const SidebarNavItem = (props) => (
  <Link to={props.to} className="my-3 d-flex">
    { props.asset &&
      <div className="mr-3">
        <img src={props.asset}/>
      </div>
    }
    <span className="align-self-center">
      {props.text}
    </span>
  </Link>
);

export default Sidebar;
