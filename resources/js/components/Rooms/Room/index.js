import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AuthUserContext from '../../Session/AuthUserContext';
import withAuthorization from '../../Session/withAuthorization'
import { db } from '../../../firebase'
import { db as firebaseDB } from '../../../firebase/firebase'

import * as routes from '../../../constants/routes'

import RoomHeader from '../../Header/RoomHeader';

import UserList from './UserList';
import Messages from './Messages';
import Tasks from './Tasks';

const INITIAL_STATE = {
  room: null,
  users: null,
  receiver_id: null,
}

class RoomPage extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE };

    this.init()
  }

  init = () => {
    const { room_id } = this.props.match.params

    db.onceGetUsers()
    .then(snapshot => {
      var users = snapshot.val();
      Object.keys(users).map(key => {
        users[key].uid = key
        users[key].registered = false
      })
      firebaseDB.ref(`rooms/${room_id}`).on('value', (snapshot) => {
        var room = snapshot.val()
        room.room_id = room_id

        Object.keys(room.users).map(key => {
          users[key].registered = true
          users[key].level = room.users[key].level
        })

        this.setState({
          room: room,
          users: users,
        })
      })
    })
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
    const { room, users, receiver_id } = this.state
    const { room_id } = this.props.match.params

    if (room == null) {
      return <div></div>
    }

    return (
      <AuthUserContext.Consumer>
      {authUser =>
        <div className="room-page d-flex flex-column h-100">
          <RoomHeader room={room}/>
          <div className="page-content flex-grow-1 d-flex flex-row">
            <UserList users={users} receiver_id={receiver_id} handleSelectReceiver={this.handleSelectReceiver} handleInviteUser={this.handleInviteUser}/>
            <div className="flex-grow-1 d-flex flex-row">
              <Messages users={users} room={room} receiver_id={receiver_id}/>
              <Tasks user_id={users[authUser.uid].id} room={room}/>
            </div>
          </div>
        </div>
      }
      </AuthUserContext.Consumer>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(RoomPage)