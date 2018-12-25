
import React from 'react';
import { connect } from "react-redux";

import assets from '../../../assets';
import _ from 'lodash';


const Tasks = (props) => {

  const onOpenUploadModal = () => {
    const {room, user_id} = props

    $('.modal-background').removeClass('d-none')
    $('.upload-modal').removeClass('d-none')

    $('.upload-modal').find('#roomKey').val(room.room_id)
    $('.upload-modal').find('#roomID').val(room.id)
    $('.upload-modal').find('#userID').val(user_id)
  }

  const renderDocument = (key, document) => {
    return (
    <div key={key} className="document-block d-flex justify-content-between align-items-center pl-2">
      <div className="title">{document.title}</div>
      <div className="detail">5/5 Signatures</div>
      <div className="actions d-flex justify-content-between">
        <div className="download mr-2">
          <img src={assets.download}/>
        </div>
        <div className="status mr-2">
          <img src={assets.agree}/>
        </div>
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
            <div className="room-block d-flex justify-content-center align-items-center">
              Room Level {level} - Initial Setup
            </div>
            {renderLevelDocuments(level)}
          </div>
       )
      }
    })
  }

  const viewFiles = () => {
    const {handleViewFiles} = props
    handleViewFiles(true)
  }

  return (
    <div className="tasks-panel d-flex flex-column align-items-stretch">
      <div className="tasks-block">
        {renderDocuments()}
      </div>
      <div className="view-files align-self-center mt-5">
        <button className="button button-md button-grey d-flex flex-row py-0 pr-0"
          onClick={(event) => viewFiles()}
        >
          <span>View Files</span>
          <div className="arrow-right px-1 d-flex justify-content-center align-items-center">
            <img src={assets.arrow_right}/>
          </div>
        </button>
      </div>
      <div className="upload-file-block align-self-center mt-auto mb-3">
        <button className="button button-md button-red mr-2"
          onClick={(event) => {onOpenUploadModal()}}
        >
          Upload a File
          <img src={assets.upload_white}/>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ room, documents }) => {
  return {
    room,
    documents,
  };
};

export default connect(mapStateToProps)(Tasks);
