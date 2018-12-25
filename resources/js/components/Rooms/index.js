import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../firebase';

import * as routes from '../../constants/routes';
import assets from '../../assets';

import * as functions from '../../functions';

import DefaultHeader from '../Header/DefaultHeader';

import * as actions from "../../actions";

import _ from 'lodash';

const INITIAL_STATE = {
  rooms: null,
};

class RoomsPage extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    const { fetchRooms } = this.props
    fetchRooms();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const { authUser, rooms } = props
    if (!rooms) {
      return
    }

    var user_rooms = {}

    Object.keys(rooms).map(key => {
      const room = rooms[key]
      room.room_id = key
      let user = null
      Object.keys(room.users).map(key => {
        if (key === authUser.uid) {
          user = room.users[key]
          user.uid = key
        }
      })
      if (user != null) {
        room.user = user
        user_rooms[key] = room
      }
    })

    this.setState({rooms: user_rooms})
  }

  render() {
    const { rooms } = this.state;

    if (!rooms) {
      return <div></div>
    }

    return (
      <div className="rooms-page d-flex flex-column">
        <DefaultHeader title="MyRooms" />
        <div className="page-content flex-grow-1">
          <div className="header row mx-0 align-items-center">
            <div className="search-area col-4 d-flex align-items-center">
              <div className="col-2 text-white">Search</div>
              <div className="col-10"><input type="text" className="px-3"/></div>
            </div>
            <div className="title col-4 text-white text-center">
              ClosingRooms
            </div>
          </div>
          <table className="rooms table text-center">
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
            { !!rooms &&
              <tbody>
                {Object.keys(rooms).map(key =>
                  <Room key={key} room={rooms[key]}/>
                )}
              </tbody>
            }
          </table>
          <div className="footer d-flex justify-content-center">
            <Link to={routes.CREATE_ROOM}>
              <button className="button button-md button-red">
                Create a ClosingRoom
                <img src={assets.plus} className="ml-2"/>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

class Room extends Component {

  constructor(props) {
    super(props);

    this.state = {
      room: null,
      isEditingNickname: false,
    };
  }

  componentDidMount() {
    this.init(this.props)
  }

  init = (props) => {
    const { room } = props
    this.setState({
      room: room,
      isEditingNickname: false,
    })
  }

  onEditNickname = () => {
    this.setState({
      isEditingNickname: true,
    })
  }

  onEnterNickname = () => {
    const { room } = this.state
    db.doChangeRoomname(room.room_id, room.user.uid, room.user.roomname)

    this.setState({
      isEditingNickname: false,
    })
  }

  render() {
    const { room, isEditingNickname } = this.state

    if (!(!!room)) {
      return <tr></tr>
    }

    return (
      <tr>
        <td>{functions.getFormattedID(room.id, 7)}</td>
        <td className="nickname">
          { isEditingNickname ?
            <input
              type="text"
              className="text-center"
              placeholder="enter nickname"
              value={room.user.roomname}
              autoFocus
              onChange = { (event) => {
                let room = this.state.room;
                room.user.roomname = event.target.value;
                this.setState({room: room});
              }}
              onKeyPress={(event) => {
                if (event.keyCode == 13 || event.charCode == 13) {
                  this.onEnterNickname()
                }
              }}
              onBlur={this.onEnterNickname}
            />
          :
            <span onClick={(event) => this.onEditNickname()} className={`${room.user.roomname==''?'color-disabled':''}`}>
              { room.user.roomname || 'enter nickname'}
            </span>
          }
        </td>
        <td>{room.level}</td>
        <td>{_.size(room.users)}</td>
        <td>{functions.getFormattedDate(new Date(room.create_date))}</td>
        <td>{functions.getFormattedDate(new Date(room.expire_date))}</td>
        <td className="action">
          <img src={assets.setting_black} className="mr-3"/>
          <Link to={`/rooms/${room.room_id}`}>
            <button className="button button-md button-blue">
              Enter
            </button>
          </Link>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({ authUser, rooms }) => {
  return {
    authUser,
    rooms,
  };
};

export default withRouter(connect(mapStateToProps, actions)(RoomsPage));
