import React, { Component } from 'react';
import { connect } from "react-redux";

import axios from 'axios';

import assets from '../../assets';


import {SERVER_URL} from '../../constants/urls';
import { getFormattedID } from '../../functions';

const INITIAL_STATE = {
  email: '',
  role: 0,
  showDialog: false,
}

const ROLE = [
  {
    role_label: "Buyer Intermediary",
  },
  {
    role_label: "Seller Intermediary",
  },
  {
    role_label: "Buyer",
  },
  {
    role_label: "Seller",
  },
  {
    role_label: "Buyer Mandate",
  },
  {
    role_label: "Seller Mandate",
  },
  {
    role_label: "Buyer Lawyer",
  },
  {
    role_label: "Seller Lawyer",
  },
  {
    role_label: "Escrow Agent",
  },
  {
    role_label: "OTHER",
  },
]

class UserList extends Component {
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
              <img src={assets.star}/>
            }
          </div>
          <div className="localtime">
            <img className="mr-1" src={assets.clock}/>
            <span>{user.location}</span>
            <span>[{user.time}]</span>
          </div>
        </div>
        <div className="role d-flex justify-content-between">
          <div className="KYC">
            <span className="mr-1">KYC</span>
            {user.kyc === 1 ?
              <img src={assets.accept}/>
            :
              <img src={assets.unaccept}/>
            }
          </div>
          <span className="role-name">
            Buyer Mandate
            {user.role}
          </span>
          <div className="attendance">
            {user.attendance == 1 ?
              <img src={assets.online}/>
            :
              <img src={assets.offline}/>
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

  handleAddUserModal = () => {
    let showDialog = this.state.showDialog
    showDialog = !showDialog
    this.setState({
      showDialog: showDialog,
    })
    if (showDialog) {
      $('.modal-background').removeClass('d-none')
      $('.add-user-dialog').removeClass('d-none')

      $('.modal-background').on('click', this.handleAddUserModal)
    } else {
      $('.modal-background').addClass('d-none')
      $('.add-user-dialog').addClass('d-none')

      $('.modal-background').off()
    }
  }

  onSendInvite = () => {
    const { authUser, users, room } = this.props
    const {email, role} = this.state

    const sender_email = authUser.email
    const receiver_email = email

    const user = users[authUser.uid]
    const displayname = user.displayname

    const room_id = getFormattedID(room.id, 6)

    const participants = Object.keys(room.users).length
    const link = `${SERVER_URL}/rooms/${room.room_id}`;

    const url = `${SERVER_URL}/api/send_email?
      sender_email=${sender_email}&
      receiver_email=${receiver_email}&
      displayname=${displayname}&
      role=${ROLE[role].role_label}&
      room_id=${room_id}&
      participants=${participants}&
      link=${link}
    `;
    console.log(url)
    // return

    axios.post(url)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error.response.data.error)
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
                { ROLE.map((role, index) => (
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
          <img src={assets.add_user} className="mr-2"/>
          <button className="button button-md button-red"
            onClick={(event) => {this.handleAddUserModal()}}
          >
            Add User
          </button>
          {this.renderAddUserDialog()}
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

export default connect(mapStateToProps)(UserList);