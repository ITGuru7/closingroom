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
    $('.add-user-dialog').removeClass('d-none')

    $('.modal-background').on('click', this.closeModals)
  }

  closeModals = () => {
    $('.modal-background').addClass('d-none')
    $('.add-user-dialog').addClass('d-none')
    $('.add-user-success-dialog').addClass('d-none')

    $('.modal-background').off()
  }

  openAddUserSuccessModal = () => {
    $('.add-user-dialog').addClass('d-none')
    $('.add-user-success-dialog').removeClass('d-none')
  }

  onSendInvite = () => {
    const { authUser, users, room } = this.props
    const {email, role} = this.state
    const user = users[authUser.uid]

    actions.doSendInviteEmail(room, user, email, ROLES[role].role_label, users)
    .then(response => {
      this.openAddUserSuccessModal()
    })
    .catch(error => {
      this.closeModals()
    });
  }

  renderAddUserDialog = () => {
    const {email, role} = this.state

    const isInvalid =
      email === '';

    return (
      <div className="add-user-dialog d-none">
        <div className="content p-4 w-100 text-white">
          <div className="title text-center mb-1">
            Add users to the ClosingRoom.
          </div>
          <div className="description mb-1">
            If the email is not registered, an invitation email will be issued.
          </div>
          <div className="row mb-1">
            <div className="col-2 text-right">
              <label htmlFor="email">Email:</label>
            </div>
            <div className="col-10">
              <input
                name="email"
                id="email"
                value={email}
                onChange={this.onChange}
                type="email"
                placeholder="example @ example.com"
              />
            </div>
          </div>
          <div className="row mb-1">
            <div className="col-2 text-right">
              <label htmlFor="role">Role:</label>
            </div>
            <div className="col-10 d-flex justify-content-between">
              <select
                name="role"
                id="role"
                value={role}
                onChange={this.onChange}
                className="mr-2 w-75"
              >
                { ROLES.map((role, index) => (
                  <option key={index} value={index}>{role.role_label}</option>
                ))}
              </select>
              <button type="button"
                onClick={(event) => {this.onSendInvite()}}
                disabled={isInvalid}
              >
                Invite
              </button>
            </div>
          </div>
        </div>
        <div className="pointer arrow-down float-right">
        </div>
      </div>
    )
  }

  renderSuccessDialog = () => {
    const {email, role} = this.state

    return (
      <div className="add-user-success-dialog d-none">
        <img src={assets.close_blue} className="size-20 dlg-close"
          onClick={(event) => {this.closeModals()}}
        />
        <div className="content p-4 w-100 text-white">
          <div className="title mb-1">
            Success!
          </div>
          <div className="description mb-1">
            An invitation has been sent to ({email})<br/>
            User Type: {ROLES[role].role_label}
          </div>
        </div>
      </div>
    )
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
          {this.renderAddUserDialog()}
          {this.renderSuccessDialog()}
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
