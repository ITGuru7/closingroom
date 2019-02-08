import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../firebase'

import * as actions from "../../actions";

import RoomHeader from '../../Layout/Header/RoomHeader';

import UserListPanel from './UserListPanel';
import MessagesPanel from './MessagesPanel';
import TasksPanel from './TasksPanel';

const INITIAL_STATE = {
  users: null,
  receiver_uid: null,
}

class RoomPage extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    const { rid } = this.props.match.params
    const { fetchRoom } = this.props
    fetchRoom(rid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const {room} = props
    let users = props.users;
    if (!room || !users) {
      return
    }

    Object.keys(users).map(key => {
      users[key].registered = false
    })
    Object.keys(room.users).map(key => {
      users[key].registered = true
      users[key] = {...users[key], ...room.users[key]}
    })

    this.setState({users})
  }

  handleSelectReceiver = (receiver_uid) => {
    if (this.state.receiver_uid === receiver_uid) {
      receiver_uid = null;
    }
    // this.setState({
    //   receiver_uid,
    // })
    // console.log(receiver_uid)
  }

  handleInviteUser = (uid) => {
    const { rid } = this.props.match.params
    db.doInviteUserToRoom(rid, uid)
  }

  render() {
    const { authUser, room } = this.props
    const { users, receiver_uid } = this.state

    if (!room || !users) {
      return <div></div>
    }

    return (
      <div className="room-page d-flex flex-column h-100">
        <RoomHeader/>
        <div className="page-content flex-grow-1 d-flex flex-row">
          <UserListPanel users={users} receiver_uid={receiver_uid} handleSelectReceiver={this.handleSelectReceiver} handleInviteUser={this.handleInviteUser}/>
          <MessagesPanel users={users} receiver_uid={receiver_uid}/>
          <TasksPanel uid={users[authUser.uid].id}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, users, room }) => {
  return {
    authUser,
    users,
    room,
  };
};

export default withRouter(connect(mapStateToProps, actions)(RoomPage));
