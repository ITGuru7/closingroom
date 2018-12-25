import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../Session/AuthUserContext';
import withAuthorization from '../Session/withAuthorization';

import SignOutButton from '../Sign/SignOut';
import * as routes from '../../constants/routes';
import assets from '../../assets';

import { db } from '../../firebase';
import { auth as firebaseAuth } from '../../firebase/firebase';

const Sidebar = () => {
  const renderHeader = () => (
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
              ClosingRoom
          </div>
          <div className="version">
            Beta
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <div className="sidebar d-flex flex-column align-items-center p-4">
      {renderHeader()}
      <UserSidebar/>
      {/* <AdminSidebar/> */}
      <div className="about-block">
        <SidebarNavItem to="" text="What is a ClosingRoom?"/>
      </div>
      <div className="signout-block mt-auto">
        <SignOutButton />
      </div>
    </div>
  )
}


const UserSidebar = () => (
  <div className="link-block align-self-start">
    <SidebarNavItem to={routes.HOME} asset={assets.home} text="Home"/>
    <SidebarNavItem to={routes.ACCOUNT} asset={assets.setting_blue} text="Account"/>
    <SidebarNavItem to={routes.ROOMS} asset={assets.find} text="My Rooms"/>
  </div>
);


class AdminSidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdmin: false,
    }
  }

  componentDidMount() {
    this.init()
  }

  componentWillUpdate() {
    // this.init()
  }

  init = () => {
    if (firebaseAuth.currentUser) {
      db.onceGetUsers()
      .then(snapshot => {
        let users = snapshot.val()
        const authUser = users[firebaseAuth.currentUser.uid]
        const authUserLevel = authUser.level

        this.setState({
          isAdmin: authUserLevel >= 3
        })
      });
    }
  }

  render() {
    const { isAdmin } = this.state
    if (!isAdmin) {
      return <div></div>
    }
    return (
      <div className="link-block align-self-start">
        <SidebarNavItem to={routes.HOME} asset={assets.manage_rooms} text="ManageRooms"/>
        <SidebarNavItem to={routes.ACCOUNT} asset={assets.manage_accounts} text="Manage Accounts"/>
        <SidebarNavItem to={routes.ROOMS} asset={assets.kyc_approvals} text="KYC Approvals"/>
      </div>
    )
  }
}


const SidebarNavItem = (props) => (
  <Link to={props.to} className="py-2 d-flex">
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
