
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { db, storage } from '../../firebase';

import assets from '../../assets';

import { getFormattedDate, getFormattedID } from '../../functions';

import DOCUMENT_TYPES from '../../constants/document_types';

const INITIAL_STATE = {
  document_title: '',
  document_file: null,
  type: 0,
  other: '',
  issued: '',
  certified: 0,
  comment: '',
}

class UploadDocumentModal extends Component {

  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onUpload = () => {
    const { authUser, room, user } = this.props
    const {document_title, document_file, type, other, issued, certified, comment} = this.state ;

    db.doUploadDocument(room.rid, authUser.uid, document_title, DOCUMENT_TYPES[type], other, issued, certified, comment)
    .then((snapshot) => {
      const doc_key = snapshot.key

      let document_name = getFormattedID(room.id, 4) + '_' + getFormattedID(user.id, 4) + '_' + String(DOCUMENT_TYPES[type]).replace(" ", "").toUpperCase() + '_' + getFormattedDate(new Date(), '.')

      storage.doUploadDocument(document_name, document_file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        db.doDownloadDocument(room.rid, authUser.uid, doc_key, url)
        this.onReset()
        alert('Document has been uploaded successfully')
      })
    })
  };

  onDone = event => {
    event.preventDefault()

    const {document_title, document_file, type, other, issued, certified, comment} = this.state ;
    if (document_file === null) {
      alert('Choose document to upload')
      return
    }

    this.onUpload()
    this.closeDialog()
  }

  onReset = () => {
    this.setState({ ...INITIAL_STATE });
  }

  closeDialog = () => {
    this.onReset()
    $('.modal-background').addClass('d-none')
    $('.upload-modal').addClass('d-none')
  }

  render() {
    const { authUser, room } = this.props
    const {document_title, document_file, type, other, issued, certified, comment} = this.state ;

    return (
      <div className="upload-modal mymodal d-none" onSubmit={this.onDone}>
        <form className="form-group">
          <div className="header d-flex justify-content-between align-items-center">
            <img src={assets.logo_transparent} className="size-40"/>
            <div className="d-flex align-items-center">
              <span className="title mr-3">Upload Document</span>
              <img src={assets.upload_white} className="size-30"/>
            </div>
            <div
              className="close"
              onClick={(event) => {this.closeDialog()}}
            >
              <img src={assets.close} className="size-30"/>
            </div>
          </div>
          <div className="content p-4">
            <div className="mb-5">
              The upload document function is intended for forms/documents NOT included in the automated
              ClosingRoom series, eg. Bank statements, LOA’s, LOI’s.
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <button className="button button-md button-blue"
                  onClick={(event)=>{
                    event.preventDefault();
                    $('input[type=file][name=document_file]').click()}
                  }
                >Upload Document</button>
                <input
                  name="document_file"
                  onChange={(e) => {
                    console.log(e.target.files[0])
                    this.setState({
                      document_title: e.target.files[0].name,
                      document_file: e.target.files[0],
                    });
                  }}
                  type="file"
                  className="d-none"
                />
              </div>
              <div className="col">
                <input
                  name="document"
                  id="document"
                  type="text"
                  readOnly
                  value={document_title}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="type">Document Type:</label>
              </div>
              <div className="col-3">
                <select
                  name="type"
                  id="type"
                  value={type}
                  onChange={this.onChange}
                >
                  { DOCUMENT_TYPES.map((type, index) => (
                    <option key={index} value={index}>{type}</option>
                  ))}
                </select>
              </div>
              { type == '3' &&
                <div className="col-4">
                  <label htmlFor="other">If other:</label>
                  <input
                    name="other"
                    id="other"
                    type="text"
                    value={other}
                    onChange={this.onChange}
                  />
                </div>
              }
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="issued">Data Issued:</label>
              </div>
              <div className="col-3">
                <input
                  name="issued"
                  id="issued"
                  type="text"
                  value={issued}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="certified">Certified:</label>
              </div>
              <div className="col-3">
                <select
                  name="certified"
                  id="certified"
                  value={certified}
                  onChange={this.onChange}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-3">
                <label htmlFor="comment">Comment:</label>
              </div>
              <div className="col-3">
                <textarea
                  name="comment"
                  id="comment"
                  value={comment}
                  onChange={this.onChange}
                  rows="3"
                  cols="30"
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="button button-md button-green border-0 mx-3">
                Upload
              </button>
              <button type="button" className="button button-md button-red border-0 mx-3"
                onClick={this.closeDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, room, user }) => {
  return {
    authUser,
    room,
    user,
  };
};

export default connect(mapStateToProps)(UploadDocumentModal);
