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
  search: '',
};

class RoomsPage extends Component {
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
  }

  render() {
    const { rooms } = this.props;
    const { search } = this.state

    if (!rooms) {
      return <div></div>
    }

    Object.keys(rooms).map(key => {
      const room = rooms[key]
      room.room_id = key
    })

    return (
      <div className="rooms-page d-flex flex-column">
        <DefaultHeader title="Rooms" />
        <div className="page-content flex-grow-1">
          <div className="header row mx-0 align-items-center">
            <div className="search-area col-4 d-flex align-items-center">
              <div className="col-2 text-white">Search</div>
              <div className="col-10">
                <input type="text" className="px-3"
                  value={search}
                  autoFocus
                  onChange = { (event) => { this.setState({search: event.target.value}) }}
                />
              </div>
            </div>
            <div className="title col-4 text-white text-center">
              ClosingRooms
            </div>
            <div className="col-4 text-white text-center">
              View Rooms that need attention
            </div>
          </div>
          <table className="table mytable rooms text-center">
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
                {Object.keys(rooms).map(key => {
                  let room = rooms[key]
                  if (room.room_id.toString().toLowerCase().includes(search.toLowerCase()) || room.roomname.toString().toLowerCase().includes(search.toLowerCase())) {
                    return <RoomRow key={key} room={room}/>
                  }
                })}
              </tbody>
            }
          </table>
        </div>
      </div>
    );
  }
}

class RoomRow extends Component {

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
    db.doChangeRoomname(room.room_id, null, room.roomname)

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
              value={room.roomname}
              autoFocus
              onChange = { (event) => {
                let room = this.state.room;
                room.roomname = event.target.value;
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
            <span onClick={(event) => this.onEditNickname()} className={`${room.roomname==''?'color-disabled':''}`}>
              { room.roomname || 'enter nickname'}
            </span>
          }
        </td>
        <td>{room.level}</td>
        <td>{_.size(room.users)}</td>
        <td>{functions.getFormattedDate(new Date(room.create_date))}</td>
        <td>{functions.getFormattedDate(new Date(room.expire_date))}</td>
        <td className="action">
          <img src={assets.bell} className="mr-3"/>
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
