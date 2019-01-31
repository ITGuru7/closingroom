import React, { Component } from 'react';
import { connect } from "react-redux";

import assets from '../../assets';

import {ROLES} from '../../constants/roles';

import * as actions from "../../actions";

const INITIAL_STATE = {
  email: '',
  role: 0,
  showInviteDialog: false,
}

class UserListPanel extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE };
  }

  renderUser = (key, user, owner) => {
    const {handleSelectReceiver} = this.props
    return (
      <div key={key} className="user-block px-2"
        onClick={(event) => {handleSelectReceiver(key)}}
      >
        <div className="profile d-flex justify-content-between">
          <div className="name d-flex align-items-center">
            <span className="mr-1">{user.firstname}</span>
            {owner === 'owner' &&
              <img src={assets.star} className="size-15"/>
            }
          </div>
          <div className="localtime">
            <img src={assets.clock} className="size-15 mr-1"/>
            <span>{user.location}</span>
            <span>[{user.time}]</span>
          </div>
        </div>
        <div className="role d-flex justify-content-between">
          <div className="KYC">
            <span className="mr-1">KYC</span>
            {user.kyc === 1 ?
              <img src={assets.accept} className="size-15"/>
            :
              <img src={assets.unaccept} className="size-15"/>
            }
          </div>
          <span className="role-name">
            Buyer Mandate
            {user.role}
          </span>
          <div className="attendance">
            {user.attendance == 1 ?
              <img src={assets.online} className="size-20"/>
            :
              <img src={assets.offline} className="size-20"/>
            }
          </div>
        </div>
      </div>
    )
  }

  renderOwner = () => {
    const { authUser, users } = this.props
    return Object.keys(users).map(key => {
      let user = users[key]
      if (user.registered === true && key === authUser.uid) {
        return this.renderUser(key, user, "owner")
      }
    });
  }

  renderParticipants = () => {
    const { authUser, users } = this.props
    return Object.keys(users).map(key => {
      let user = users[key]
      if (user.registered === true && key !== authUser.uid) {
        if (!(user.role && user.role.includes('Intermediary'))) {
          return this.renderUser(key, user, "")
        }
      }
    });
  }

  renderIntermediaries = () => {
    const { authUser, users } = this.props
    return Object.keys(users).map(key => {
      let user = users[key]
      if (user.registered === true && key !== authUser.uid) {
        if (user.role && user.role.includes('Intermediary')) {
          return this.renderUser(key, user, "")
        }
      }
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  openAddUserModal = () => {
    $('.modal-background').removeClass('d-none')
    $('.adduser-modal').removeClass('d-none')
  }

  render() {
    return (
      <div className="userlist-panel d-flex flex-column align-items-stretch">
        <div className="participants">
          <div className="heading d-flex justify-content-center align-items-center">
            Participants
          </div>
          {this.renderOwner()}
          {this.renderParticipants()}
        </div>
        <div className="intermediaries">
          <div className="heading d-flex justify-content-center align-items-center">
            Intermediaries
          </div>
          {this.renderIntermediaries()}
        </div>
        <div className="add-user-block align-self-center mt-auto mb-3">
          <img src={assets.add_user} className="size-30 mr-2"/>
          <button className="button button-md button-red"
            onClick={(event) => {this.openAddUserModal()}}
          >
            Add User
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, room }) => {
  return {
    authUser,
    room,
  };
};

export default connect(mapStateToProps, actions)(UserListPanel);
