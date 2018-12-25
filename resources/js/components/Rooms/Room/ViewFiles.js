import React from 'react';
import { connect } from "react-redux";

import assets from '../../../assets';


const ViewFiles = (props) => {
  const viewFiles = () => {
    const {handleViewFiles} = props
    handleViewFiles(false)
  }

  const renderDocument = (key, document) => {
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

  const renderLevelDocuments = (level) => {
    const {documents} = props

    return Object.keys(documents).map(key => {
      const document = documents[key]
      if (document.level == level) {
        return renderDocument(key, document)
      }
    });
  }

  const renderDocuments = () => {
    return _.times(3, level => {
      if (level > 0) {
        return (
          <div key={level}>
            <div className="room-block d-flex align-items-center px-3">
              Room Level {level} - General
            </div>
            {renderLevelDocuments(level)}
          </div>
       )
      }
    })
  }

  const onOpenUploadModal = () => {
    const {room, user_id} = props

    $('.modal-background').removeClass('d-none')
    $('.upload-modal').removeClass('d-none')

    $('.upload-modal').find('#roomKey').val(room.room_id)
    $('.upload-modal').find('#roomID').val(room.id)
    $('.upload-modal').find('#userID').val(user_id)
  }

  return (
    <div className="viewfiles-panel flex-grow-1 d-flex flex-column">
      <div className="header px-3 text-center">
        <div className="back d-flex align-items-center"
          onClick={(event) => viewFiles()}
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
          {renderDocuments()}
        </div>
      </div>
      <div className="footer d-flex justify-content-end mb-3">
        <button className="button button-md button-red mr-2"
          onClick={(event) => onOpenUploadModal()}
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

const mapStateToProps = ({ room, documents }) => {
  return {
    room,
    documents,
  };
};

export default connect(mapStateToProps)(ViewFiles);
