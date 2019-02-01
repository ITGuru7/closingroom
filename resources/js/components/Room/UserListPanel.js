import React, { Component } from 'react';
import { connect } from "react-redux";

import assets from '../../assets';

import {ROLES} from '../../constants/roles';

import * as actions from "../../actions";

import PanelHeader from '../Header/PanelHeader';

const INITIAL_STATE = {
  expanded1: true,
  expanded2: true,
  expanded3: true,
  expanded4: true,
}

class UserListPanel extends Component {
  state = { ...INITIAL_STATE };

  renderBuyerSellTeam = () => {
    const { users } = this.props
    const { expanded1 } = this.state

    return (
      <div className="group">
        <div className="group-header d-flex justify-content-between align-items-center p-1">
          <span className="group-title">Buy/Sell Team</span>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded1: !expanded1})}}
          >
            <img className="size-30" src={expanded1?assets.angle_down_black:assets.angle_right_black}/>
          </button>
        </div>
        <div className="group-content">
        {expanded1 &&
          Object.keys(users).map(key => {
            let user = users[key]
            if (user.registered === true) {
              if (1 <= user.rank && user.role <= 4 && user.level <= 1) {
                return <UserRow key={key} user={user}/>
              }
            }
          })
        }
        </div>
      </div>
    )
  }
  renderIntermediaries = () => {
    const { users } = this.props
    const { expanded2 } = this.state

    return (
      <div className="group">
        <div className="group-header d-flex justify-content-between align-items-center p-1">
          <span className="group-title">Intermediaries</span>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded2: !expanded2})}}
          >
            <img className="size-30" src={expanded2?assets.angle_down_black:assets.angle_right_black}/>
          </button>
        </div>
        <div className="group-content">
        {expanded2 &&
          Object.keys(users).map(key => {
            let user = users[key]
            if (user.registered === true) {
              if (5 <= user.role && user.role <= 6) {
                return <UserRow key={key} user={user}/>
              }
            }
          })
        }
        </div>
      </div>
    )
  }
  renderProfessionals = () => {
    const { users } = this.props
    const { expanded3 } = this.state

    return (
      <div className="group">
        <div className="group-header d-flex justify-content-between align-items-center p-1">
          <span className="group-title">Professionals</span>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded3: !expanded3})}}
          >
            <img className="size-30" src={expanded3?assets.angle_down_black:assets.angle_right_black}/>
          </button>
        </div>
        <div className="group-content">
        {expanded3 &&
          Object.keys(users).map(key => {
            let user = users[key]
            if (user.registered === true) {
              if (7 <= user.role && user.role <= 8) {
                return <UserRow key={key} user={user}/>
              }
            }
          })
        }
        </div>
      </div>
    )
  }
  renderModeratorsGlobalAdmins = () => {
    const { users } = this.props
    const { expanded4 } = this.state

    return (
      <div className="group">
        <div className="group-header d-flex justify-content-between align-items-center p-1">
          <span className="group-title">Moderators/Global Admins</span>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded4: !expanded4})}}
          >
            <img className="size-30" src={expanded4?assets.angle_down_black:assets.angle_right_black}/>
          </button>
        </div>
        <div className="group-content">
        {expanded4 &&
          Object.keys(users).map(key => {
            let user = users[key]
            if (user.registered === true) {
              if (user.level >= 2) {
                return <UserRow key={key} user={user}/>
              }
            }
          })
        }
        </div>
      </div>
    )
  }

  renderParticipants = () => (
    <div className="participants">
      {this.renderBuyerSellTeam()}
      {this.renderIntermediaries()}
      {this.renderProfessionals()}
      {this.renderModeratorsGlobalAdmins()}
    </div>
  )

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  openAddUserModal = () => {
    $('.modal-background').removeClass('d-none')
    $('.adduser-modal').removeClass('d-none')
  }

  render() {
    return (
      <div className="userlist-panel d-flex flex-column">
        <PanelHeader title="Participants"/>
        <div className="participants-block">
          {this.renderParticipants()}
        </div>
        <div className="text-center mt-auto mb-3">
          <img src={assets.add_user} className="size-30 mr-2"/>
          <button className="button-white button-md shadow rounded"
            onClick={(event) => {this.openAddUserModal()}}
          >
            <span>Add Users</span>
            <img src={assets.angle_right_blue} className="size-20"/>
          </button>
        </div>
      </div>
    )
  }
}

const UserRow = ({user}) => {
  let border = ''
  if (user.level >= 2) {
    border = 'user-global-admin-border'
  } else if (user.rank === 1) {
    border = 'user-room-admin-border'
  }
  return (
    <div className={`user-block mb-2 p-1 ${border}`}>
      <div className="profile d-flex justify-content-between">
        <div className="">
          <span className="mr-1">{user.displayname}</span>
          {user.rank === 1 &&
            <img src={assets.star} className="size-15 mr-1"/>
          }
          <span className="mr-1">KYC</span>
          {user.level >= 1 ?
            <img src={assets.kyc_approved} className="size-15"/>
          :
            <img src={assets.kyc_disapproved} className="size-15"/>
          }
        </div>
        <div className="">
          <span>{user.location}</span>
          <span>[{user.time}]</span>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="">
        {user.level >= 2 ?
          [
            <span key="label" className="mr-1">Moderator</span>,
            <img key="image" src={assets.moderator} className="size-15"/>
          ]
        :
          [
            <span key="label">{ROLES[user.role].role_label}</span>,
            (user.rank === 3 &&
              <img key="image" src={assets.secure_transparent} className="size-15"/>
            )
          ]
        }
        </div>
        <div className="">
          <img src={assets.setting_black} className="size-15 mr-2"/>
          {user.attendance == 1 ?
            <img src={assets.online} className="size-15"/>
          :
            <img src={assets.offline} className="size-15"/>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authUser, room }) => {
  return {
    authUser,
    room,
  };
};

export default connect(mapStateToProps, actions)(UserListPanel);
