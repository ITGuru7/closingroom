import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import HomePage from './components/Home';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp';
import AccountPage from './components/Account';
import KYCPage from './components/Account/KYC';
import RoomsPage from './components/Rooms';
import CreateRoomPage from './components/Rooms/CreateRoomPage';
import RoomPage from './components/Rooms/Room';
import UploadDocumentModal from './components/Modal/UploadDocumentModal';
import withAuthentication from './components/Session/withAuthentication';
import * as routes from './constants/routes';

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

const Layout = () =>
  <Router>
    <div>

      <SignLayout exact path={routes.SIGN_IN} component={SignInPage} />
      <SignLayout exact path={routes.SIGN_UP} component={SignUpPage} />

      <DefaultLayout exact path={routes.HOME} component={HomePage} />
      <DefaultLayout exact path={routes.ACCOUNT} component={AccountPage} />
      <DefaultLayout exact path={routes.KYC} component={KYCPage} />
      <DefaultLayout exact path={routes.ROOMS} component={RoomsPage} />
      <DefaultLayout exact path={routes.ROOM} component={RoomPage} />
      <DefaultLayout exact path={routes.CREATE_ROOM} component={CreateRoomPage} />

    </div>
  </Router>

export default withAuthentication(Layout);