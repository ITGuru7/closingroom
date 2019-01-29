import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../firebase'

import * as actions from "../../actions";

import RoomHeader from '../Header/RoomHeader';

import UserListPanel from './UserListPanel';
import MessagesPanel from './MessagesPanel';
import TasksPanel from './TasksPanel';

const INITIAL_STATE = {
  users: null,
  receiver_id: null,
}

class RoomPage extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    const { room_id } = this.props.match.params
    const { fetchRoom } = this.props
    fetchRoom(room_id);
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
    })

    this.setState({users})
  }

  handleSelectReceiver = (receiver_id) => {
    if (this.state.receiver_id === receiver_id) {
      receiver_id = null;
    }
    // this.setState({
    //   receiver_id,
    // })
    // console.log(receiver_id)
  }

  handleInviteUser = (user_id) => {
    const { room_id } = this.props.match.params
    db.doInviteUserToRoom(room_id, user_id)
  }

  render() {
    const { authUser, room } = this.props
    const { users, receiver_id } = this.state

    if (!room || !users) {
      return <div></div>
    }

    return (
      <div className="room-page d-flex flex-column h-100">
        <RoomHeader room={room}/>
        <div className="page-content flex-grow-1 d-flex flex-row">
          <UserListPanel users={users} receiver_id={receiver_id} handleSelectReceiver={this.handleSelectReceiver} handleInviteUser={this.handleInviteUser}/>
          <MessagesPanel users={users} receiver_id={receiver_id}/>
          <TasksPanel user_id={users[authUser.uid].id}/>
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
