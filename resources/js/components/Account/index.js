import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import PasswordChangeForm from './PasswordChangeForm';
import DefaultHeader from '../Header/DefaultHeader';

import * as actions from "../../actions";

import { auth, db } from '../../firebase';

import * as routes from '../../constants/routes';

import { getFormattedID } from '../../functions';

const AccountPage = () => (
  <div className="account-page d-flex flex-column">
    <DefaultHeader title="Account Settings" className="header-blue" />
    <div className="page-content flex-grow-1 m-3 p-3">
      <Connected_ProfileChangeForm/>
    </div>
  </div>
);


const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  displayname: '',
  email: '',
  error: null,
};

class ProfileChangeForm extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const { authUser, user, fetchUser } = props
    if (!authUser || !authUser.uid) {
      return
    }
    if (!user) {
      fetchUser(authUser.uid);
      return
    }
    this.setState(user)
  }

  onSubmit = event => {
    event.preventDefault();

    const { authUser } = this.props;
    const { firstname, lastname, displayname, email } = this.state;

    auth
      .doEmailUpdate(email)
      .then(() => {
        db.doUserProfileUpdate(authUser.uid, email, firstname, lastname, displayname)
      })
      .catch(error => {
        this.setState({ error });
      });

  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { id, firstname, lastname, displayname, email, error } = this.state;

    const isInvalid =
      firstname === '' ||
      lastname === '' ||
      displayname === '' ||
      email === '';

    return (
      <div className="">
        <div className="title mb-4">
          Account
          <span className="ml-2">[ID:{getFormattedID(id, 5)}]</span>
        </div>
        <div className="profile-block mb-3">
          <div className="subtitle">
            Profile
          </div>
          <div className="account-level container-fluid px-0">
            <div className="row">
              <div className="col-3">
                Account Type
              </div>
              <div className="col">
                Individual (change type)
              </div>
            </div>
            <div className="row">
              <div className="col-3 pr-0 d-flex justify-content-between">
                <span>Account Level</span>
                <div className="circle circle-red mt-1"></div>
              </div>
              <div className="col-4">
                Level1 (Unverified)
              </div>
              <div className="col">
                <Link to={routes.KYC} className="mr-2">
                  <button type="button" className="button-blue">Start KYC</button>
                </Link>
                <span>(more information)</span>
              </div>
            </div>
          </div>
          <div className="info-title">
            Basic Information
          </div>
          <div className="information-block row">
            <div className="col-3">
              <label htmlFor="firstname">FirstName</label>
              <input
                name="firstname"
                id="firstname"
                value={firstname}
                onChange={this.onChange}
                type="text"
              />
            </div>
            <div className="col-3">
              <label htmlFor="lastname">LastName</label>
              <input
                name="lastname"
                id="lastname"
                value={lastname}
                onChange={this.onChange}
                type="text"
              />
            </div>
            <div className="col-3">
              <label htmlFor="displayname">DisplayName</label>
              <input
                name="displayname"
                id="displayname"
                value={displayname}
                onChange={this.onChange}
                type="text"
              />
            </div>
            <div className="col-3">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                id="email"
                value={email}
                onChange={this.onChange}
                type="email"
              />
            </div>
          </div>
          {error && <p>{error.message}</p>}
        </div>
        <div className="password-block">
          <div className="subtitle">
            Password
          </div>
          <PasswordChangeForm />
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button disabled={isInvalid} className="button-md button-red"
            onClick={this.onSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, user }) => {
  return {
    authUser,
    user,
  };
};

const Connected_ProfileChangeForm = connect(mapStateToProps, actions)(ProfileChangeForm)

export default AccountPage;
