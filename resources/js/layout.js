import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { connect } from "react-redux";

import Sidebar from './components/Sidebar';
import HomePage from './components/Home';
import SignInPage from './components/Sign/SignIn';
import SignUpPage from './components/Sign/SignUp';
import AccountPage from './components/Account';
import KYCPage from './components/Account/KYC';
import RoomsPage from './components/Rooms';
import CreateRoomPage from './components/Rooms/CreateRoomPage';
import RoomPage from './components/Rooms/Room';
import UploadDocumentModal from './components/Modal/UploadDocumentModal';
import withAuthentication from './components/Session/withAuthentication';
import * as routes from './constants/routes';

import * as actions from "./actions";

import UserAuth from "./components/Auth/UserAuth";
import AdminAuth from "./components/Auth/AdminAuth";

const DefaultLayout = ({component: Component, ...rest}) => {
  window.scrollTo(0,0);
  return (
    <Route {...rest} render={matchProps => (
      <div className="layout d-flex flex-row">
        <Sidebar/>
        <div className="main-content flex-grow-1">
          <Component {...matchProps} />
        </div>
        <div className="modal-background d-none"/>
        <UploadDocumentModal/>
      </div>
    )} />
  )
};

const SignLayout = ({component: Component, ...rest}) => {
  window.scrollTo(0,0);
  return (
    <Route {...rest} render={matchProps => (
      <Component {...matchProps} />
    )} />
  )
};

class Layout extends Component {
  componentWillMount() {
    console.log('layout')
    this.props.fetchUsers();
    this.props.fetchAuthUser();
    this.props.fetchDocuments();
  }

  render() {
    return (
      <Router>
        <div>

          <SignLayout exact path={routes.SIGN_IN} component={SignInPage} />
          <SignLayout exact path={routes.SIGN_UP} component={SignUpPage} />

          <DefaultLayout exact path={routes.HOME} component={HomePage} />
          <DefaultLayout exact path={routes.ACCOUNT} component={UserAuth(AccountPage)} />
          <DefaultLayout exact path={routes.KYC} component={UserAuth(KYCPage)} />
          <DefaultLayout exact path={routes.ROOMS} component={UserAuth(RoomsPage)} />
          <DefaultLayout exact path={routes.ROOM} component={UserAuth(RoomPage)} />
          <DefaultLayout exact path={routes.CREATE_ROOM} component={UserAuth(CreateRoomPage)} />

        </div>
      </Router>
    )
  }
}

export default withAuthentication(connect(null, actions)(Layout));
