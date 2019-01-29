import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../../firebase';

import * as routes from '../../../constants/routes';
import assets from '../../../assets';

import * as functions from '../../../functions';

import RoomHeader from '../../Header/RoomHeader';

import FileManager from './FileManager';
import TaskManager from './TaskManager';

import * as actions from "../../../actions";

import _ from 'lodash';

class RoomFilesPage extends Component {

  componentWillMount() {
    const { room_id } = this.props.match.params
    const { fetchRoom } = this.props
    fetchRoom(room_id);
  }

  render() {
    const { room, documents } = this.props

    if (!room || !documents) {
      return <div></div>
    }

    return (
      <div className="roomfiles-page h-100">
        <RoomHeader room={room}/>
        <div className="page-content">
          <FileManager {...this.props}/>
          <TaskManager {...this.props}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, room, documents, users }) => {
  return {
    authUser,
    room,
    documents,
    users,
  };
};

export default withRouter(connect(mapStateToProps, actions)(RoomFilesPage));
