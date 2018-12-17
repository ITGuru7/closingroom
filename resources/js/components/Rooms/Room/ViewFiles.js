import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { db } from '../../../firebase';
import { auth as firebaseAuth } from '../../../firebase/firebase';

import * as routes from '../../../constants/routes';
import assets from '../../../assets';
import { runInThisContext } from 'vm';

const INITIAL_STATE = {
}

class ViewFiles extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  viewFiles = () => {
    const {handleViewFiles} = this.props
    handleViewFiles(false)
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
  )}

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
            {this.renderLevelDocuments(level)}
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
    return (
      <div className="viewfiles-panel flex-grow-1 d-flex flex-column">
        <div className="header px-3 text-center">
          <div className="back d-flex align-items-center"
            onClick={(event) => this.viewFiles()}
          >
            <img src={assets.arrow_left_circle} className="mr-2"/>
            <span>Back</span>
          </div>
          <div className="title">
            Room - Files
          </div>
        </div>
        <div className="documents-table flex-grow-1">
          <div className="head d-flex flex-row align-items-center px-3">
            <div className="col-4">Document Type</div>
            <div className="col-4 text-center">Signatures</div>
            <div className="col-4 text-center">Required</div>
          </div>
          <div className="body">
            {this.renderDocuments()}
          </div>
        </div>
        <div className="footer d-flex justify-content-end mb-3">
          <button className="button button-md button-red mr-2"
            onClick={(event) => this.onOpenUploadModal()}
          >
            Upload a File
            <img src={assets.upload_white}/>
          </button>
          <button className="button button-md button-red"
            onClick={(event) => {}}
          >
            Download All (.zip)
          </button>
        </div>
      </div>
    );
  }
}

export default ViewFiles;
