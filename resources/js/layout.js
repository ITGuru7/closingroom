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
import KYCPage from './components/Account/KYCPage';
import MyRoomsPage from './components/MyRooms';
import CreateRoomPage from './components/CreateRoom';
import RoomPage from './components/Room';
import RoomFilesPage from './components/Room/Files';

import RoomsPage from './components/Rooms';
import AccountsPage from './components/Accounts';
import KYC_ApprovalsPage from './components/Accounts/KYC_Approvals';
import KYC_ApprovalViewPage from './components/Accounts/KYC_Approvals/KYC_ApprovalViewPage';

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
    this.props.fetchUsers();
    this.props.fetchAuthUser();
    this.props.fetchDocuments();
    this.props.fetchRooms();
  }

  render() {
    return (
      <Router>
        <div>

          <SignLayout exact path={routes.SIGN_IN} component={SignInPage} />
          <SignLayout exact path={routes.SIGN_UP} component={SignUpPage} />

          <DefaultLayout exact path={routes.HOME} component={HomePage} />
          <DefaultLayout exact path={routes.ACCOUNT_SETTINGS} component={UserAuth(AccountPage)} />
          <DefaultLayout exact path={routes.KYC} component={UserAuth(KYCPage)} />
          <DefaultLayout exact path={routes.MY_ROOMS} component={UserAuth(MyRoomsPage)} />
          <DefaultLayout exact path={routes.ROOM} component={UserAuth(RoomPage)} />
          <DefaultLayout exact path={routes.CREATE_ROOM} component={UserAuth(CreateRoomPage)} />
          <DefaultLayout exact path={routes.ROOM_FILES} component={UserAuth(RoomFilesPage)} />

          <DefaultLayout exact path={routes.ROOMS} component={AdminAuth(RoomsPage)} />
          <DefaultLayout exact path={routes.MANAGE_ACCOUNTS} component={AdminAuth(AccountsPage)} />
          <DefaultLayout exact path={routes.KYC_APPROVALS} component={AdminAuth(KYC_ApprovalsPage)} />
          <DefaultLayout exact path={routes.KYC_APPROVAL} component={AdminAuth(KYC_ApprovalViewPage)} />

        </div>
      </Router>
    )
  }
}

export default withAuthentication(connect(null, actions)(Layout));
