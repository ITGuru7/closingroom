import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../Session/AuthUserContext';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';

import * as routes from '../../constants/routes';
import assets from '../../assets';

import * as functions from '../../functions';

import DefaultHeader from '../Header/DefaultHeader';

import { getFormattedID } from '../../functions';

const INITIAL_STATE = {
  rooms: {},
};

class RoomsPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.init()
  }

  init = () => {
    db.onceGetRooms().then(snapshot =>
      this.setState({ rooms: snapshot.val() })
    );
  }

  render() {
    const { rooms } = this.state;

    return (
      <AuthUserContext.Consumer>
      {authUser =>
        <div className="rooms-page d-flex flex-column">
          <DefaultHeader title="MyRooms" />
          <div className="page-content flex-grow-1">
            <div className="header d-flex justify-content-center align-items-center">
              ClosingRooms
            </div>
            <div className="rooms">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>Room ID</th>
                    <th>Nickname</th>
                    <th>Room Level</th>
                    <th>Participants</th>
                    <th>Creation Date</th>
                    <th>Expiration Date</th>
                    <th></th>
                  </tr>
                </thead>
                { !!rooms && <RoomList rooms={rooms} authUser={authUser} /> }
              </table>
            </div>
            <div className="footer d-flex justify-content-center">
              <Link to={routes.CREATE_ROOM}>
                <button className="button button-md button-red">Create a ClosingRoom</button>
              </Link>
            </div>
          </div>
        </div>
      }
      </AuthUserContext.Consumer>
    );
  }
}


class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {

      var rooms = {}

      {Object.keys(nextProps.rooms).map(key => {
        const room = nextProps.rooms[key]
        let user = null
        Object.keys(room.users).map(key => {
          if (key == nextProps.authUser.uid) {
            user = room.users[key]
            user.uid = key
          }
        })
        if (user != null) {
          room.user = user
          rooms[key] = room
        }
      })}

      this.setState({rooms: rooms})
    }
  }

  onEnterNickname = (key) => {
    let element = $(`td[room-id=${key}`)
    element.find('span').addClass('d-none')
    element.find('input').removeClass('d-none')
    element.find('input').focus()
  }

  handleKeyPress = (key, event) => {
    if (event.keyCode == 13 || event.charCode == 13) {
      let element = $(`td[room-id=${key}`);
      let nickname = element.find('input').val();
      let room = this.state.rooms[key]

      db.doChangeRoomname(key, room.user.uid, nickname)

      element.find('input').addClass('d-none');
      element.find('span').removeClass('d-none');
    }
  };
  render() {
    const {rooms} = this.state
    return (
      <tbody>
        {Object.keys(rooms).map(key => {
          const room = rooms[key]
          return (
            <tr key={key}>
              <td>{getFormattedID(room.id, 7)}</td>
              <td room-id={key} className="nickname">
                { room.user.roomname && room.user.roomname != '' ?
                  <span onClick={(event) => this.onEnterNickname(key)}>
                    {room.user.roomname}
                  </span>
                :
                  <span onClick={(event) => this.onEnterNickname(key)} className="color-disabled">
                    enter nickname
                  </span>
                }
                <input
                    type="text"
                    className="text-center d-none"
                    placeholder="enter nickname"
                    value={room.user.roomname}
                    onChange = { (event) => {
                      let rooms = this.state.rooms;
                      rooms[key].user.roomname = event.target.value;
                      this.setState(rooms);
                    }}
                    onKeyPress={(event) => this.handleKeyPress(key, event)}
                />
              </td>
              <td>{room.level}</td>
              <td>{Object.keys(room.users).length}</td>
              <td>{functions.getFormattedDate(new Date(room.create_date))}</td>
              <td>{functions.getFormattedDate(new Date(room.expire_date))}</td>
              <td className="action">
                <img src={assets.setting_black} className="mr-3"/>
                <Link to={`/rooms/${key}`}>
                  <button className="button button-md button-blue">
                    Enter
                  </button>
                </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(RoomsPage);
