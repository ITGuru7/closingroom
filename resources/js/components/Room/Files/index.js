import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../../firebase';

import * as routes from '../../../constants/routes';
import assets from '../../../assets';

import * as functions from '../../../functions';

import RoomHeader from '../../Header/RoomHeader';

import * as actions from "../../../actions";

import _ from 'lodash';

const INITIAL_STATE = {
};

class RoomFilesPage extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    const { room_id } = this.props.match.params
    const { fetchRoom } = this.props
    fetchRoom(room_id);
  }

  renderHeader = () => {
    const { room } = this.props
    return (
      <div className="header px-3">
        <div className="row">
          <div className="back col-4 d-flex align-items-center"
            onClick={(event) => {this.props.history.goBack()}}
          >
            <img src={assets.arrow_left_circle} className="mr-2"/>
            <span>Back</span>
          </div>
          <div className="col-4 title text-center">
            Room {functions.getFormattedID(room.id, 7)} - Files &amp; Tasks Room
          </div>
        </div>
      </div>
    )
  }

  renderDocument = (key, document) => {
    return (
      <div key={key} className="document-block d-flex justify-content-between align-items-center pl-5">
        <div className="title">{document.title}</div>
        <div className="actions d-flex justify-content-between align-items-center">
          <div className="download mr-3">
            <img src={assets.radio_on}/>
          </div>
          <div className="agree mr-3">
            <img src={assets.disagree}/>
          </div>
          <div className="download mr-3">
            <img src={assets.download_black}/>
          </div>
          <button className="open text-center text-white"
            onClick={(event)=>{}}
          >
            OPEN
          </button>
        </div>
      </div>
    )
  }

  renderLevelDocuments = (level) => {
    const {documents} = this.props

    return Object.keys(documents).map(key => {
      const document = documents[key]
      if (document.level == level) {
        return this.renderDocument(key, document)
      }
    });
  }

  renderDocuments = () => {
    return _.times(3, level => {
      if (level > 0) {
        return (
          <div key={level}>
            <div className="room-block d-flex align-items-center px-3">
              Room Level {level} - General
            </div>
            { this.renderLevelDocuments(level) }
          </div>
       )
      }
    })
  }

  onOpenUploadModal = () => {
    const {room, user_id} = this.props

    $('.modal-background').removeClass('d-none')
    $('.upload-modal').removeClass('d-none')

    $('.upload-modal').find('#roomKey').val(room.room_id)
    $('.upload-modal').find('#roomID').val(room.id)
    $('.upload-modal').find('#userID').val(user_id)
  }

  render() {
    const { room, documents } = this.props

    if (!room || !documents) {
      return <div></div>
    }

    return (
      <div className="roomfiles-page d-flex flex-column h-100">
        <RoomHeader room={room}/>
        {this.renderHeader()}
        <div className="page-content flex-grow-1 d-flex flex-column">
          <table className="table filestable text-center">
            <thead>
              <tr>
                <th></th>
                <th>Status</th>
                <th>Active</th>
                <th>Created</th>
                <th>Last Edit</th>
                <th>Download</th>
                <th>Fill and Sign</th>
                <th></th>
              </tr>
            </thead>
            { !!documents &&
              <tbody>
                {Object.keys(documents).map(key => (
                  <DocumentRow key={key} document={documents[key]}/>
                ))}
              </tbody>
            }
          </table>
          <div className="footer d-flex flex-column mt-auto mb-3 ml-4">
            <button className="button button-md mb-3"
              onClick={(event) => this.onOpenUploadModal()}
            >
              Upload a File
              <img src={assets.upload_blue} className="ml-2"/>
            </button>
            <button className="button button-md"
              onClick={(event) => {}}
            >
              Download All (.zip)
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class DocumentRow extends Component {

  state = {
    document: null,
  };

  render() {
    const { document } = this.props

    if (!(!!document)) {
      return <tr></tr>
    }

    return (
      <tr>
        <td className="title">{document.title}</td>
        <td>
          <img src={assets.disagree}/> Incomplete
        </td>
        <td>
          <input type="checkbox" defaultChecked={true}/>
        </td>
        <td>{functions.getFormattedDate(new Date("02/01/2019"))}</td>
        <td>{functions.getFormattedDate(new Date("09/01/2019"))}</td>
        <td>
          <img src={assets.download_white}/>
        </td>
        <td>
          <button className="button button-md button-lightgreen">
            <img src={assets.sign} className="mr-3"/>
            Fill &amp; Sign
          </button>
        </td>
        <td className="action">
          <img src={assets.search_black} className="mr-3"/>
          Preview
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({ authUser, room, documents }) => {
  return {
    authUser,
    room,
    documents,
  };
};

export default withRouter(connect(mapStateToProps, actions)(RoomFilesPage));
