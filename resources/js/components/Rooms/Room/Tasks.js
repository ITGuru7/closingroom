
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth as firebaseAuth } from '../../../firebase/firebase';

import assets from '../../../assets';

const Tasks = (props) => {

  const onOpenUploadModal = () => {
    const {room, user_id} = props

    $('.modal-background').removeClass('d-none')
    $('.upload-modal').removeClass('d-none')

    $('.upload-modal').find('#roomKey').val(room.room_id)
    $('.upload-modal').find('#roomID').val(room.id)
    $('.upload-modal').find('#userID').val(user_id)
  }

  return (
    <div className="tasks-panel d-flex flex-column align-items-stretch">
      <div className="tasks-block flex-grow-1">
        Tasks
      </div>
      <div className="upload-file-block align-self-center mt-auto mb-3"
        onClick={(event) => {onOpenUploadModal()}}
      >
        <button className="button button-md button-red mr-2">
          Upload a File
          <img src={assets.upload_white}/>
        </button>
      </div>
    </div>
  )
}

export default Tasks;
