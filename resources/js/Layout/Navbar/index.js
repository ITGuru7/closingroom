import React, {Component} from 'react';
import { connect } from 'react-redux';
import assets from '../../assets';
import * as routes from '../../constants/routes';

import NavItem from './NavItem';

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="logo-block d-flex justify-content-start align-items-center">
        <div className="logo-image mr-2">
          <img src={assets.logo_transparent} className="size-30"/>
        </div>
        <div className="logo-text">
          <div className="title font-weight-bold text-white">MNM</div>
          <div className="subtitle text-white">ClosingRoom</div>
        </div>
      </div>
      <div className="navitems-block d-flex">
        <NavItem to={routes.DASHBOARD} asset={assets.home_white} size={25} text="Home"/>
        <NavItem to={routes.ACCOUNT_SETTINGS} asset={assets.setting_white} size={25} text="Account Settings"/>
        <NavItem to={routes.MY_ROOMS} asset={assets.hands_blue} size={30} text="My ClosingRooms"/>
        <NavItem to={routes.ROOMS} asset={assets.listview_white} size={25} text="Global Room Manager"/>
        <NavItem to={routes.MANAGE_ACCOUNTS} asset={assets.accounts_white} size={25} text="Accounts Manager"/>
        <NavItem to={routes.KYC_APPROVALS} asset={assets.search_transparent} size={25} text="KYC Approvals"/>
        <NavItem to={routes.DASHBOARD} asset={assets.search_transparent} size={25} text="FAQ’s"/>
      </div>
      <div className="help-block">
        <NavItem to="" asset={assets.help_white} text=""/>
      </div>
    </div>
  )
}

export default Navbar;
