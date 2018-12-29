
import React, { Component } from 'react';
import { connect } from "react-redux";

import { db, storage } from '../../firebase';

import assets from '../../assets';

import { getFormattedDate, getFormattedID } from '../../functions';

const DOCUMENT_TYPE = [
  "Letter of Intent",
  "Proof of Funds",
  "Letter of Attestation",
  "OTHER",
]

const INITIAL_STATE = {
  document: '',
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
  onChangeFile = (files) => {
    this.setState({
      document: files[0].name,
      document_file: files[0],
    });
  };


  onUpload = () => {
    const { authUser } = this.props
    const {document, document_file, type, other, issued, certified, comment} = this.state ;
    const room_key = $('.upload-modal').find('#roomKey').val()
    const room_id = $('.upload-modal').find('#roomID').val()
    const user_id = $('.upload-modal').find('#userID').val()

    db.doUploadDocument(room_key, authUser.uid, DOCUMENT_TYPE[type], other, issued, certified, comment)
    .then((snapshot) => {
      const doc_key = snapshot.key

      let document_name = getFormattedID(room_id, 4) + '_' + getFormattedID(user_id, 4) + '_' + String(DOCUMENT_TYPE[type]).replace(" ", "").toUpperCase() + '_' + getFormattedDate(new Date(), '.')

      storage.doUploadDocument(document_name, document_file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        db.doDownloadDocument(room_key, authUser.uid, doc_key, url)
        this.onReset()
        alert('Document has been uploaded successfully')
      })
    })
  };

  onDone = () => {
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
    const {document, document_file, type, other, issued, certified, comment} = this.state ;

    const isInvalid =
      type === '' ||
      (type == DOCUMENT_TYPE.length-1 && other === '') ||
      issued === '' ||
      certified === '' ||
      comment === '' ||
      document_file === null;

    return (
      <form className="form-group">
        <div className="upload-modal d-none">
          <div className="modal-container d-flex flex-column">
            <div className="header d-flex justify-content-between align-items-center px-3">
              <div className="logo">
                <img src={assets.logo_transparent}/>
              </div>
              <div className="title d-flex align-items-center">
                <span className="mr-3">Upload Document</span>
                <img src={assets.upload_white}/>
              </div>
              <div
                className="close"
                onClick={(event) => {this.closeDialog()}}
              >
                <img src={assets.close}/>
              </div>
            </div>
            <div className="content flex-grow-1 p-4 d-flex flex-column">
              <div className="description mb-5">
                The upload document function is intended for forms/documents NOT included in the automated
                ClosingRoom series, eg. Bank statements, LOA’s, LOI’s.
              </div>
              <div className="document-form-body flex-grow-1">
                <input name="roomKey" id="roomKey" type="hidden"/>
                <input name="roomID" id="roomID" type="hidden"/>
                <input name="userID" id="userID" type="hidden"/>
                <div className="upload-file row mb-4">
                  <div className="col-3">
                    <button className="button button-md button-blue"
                      onClick={(event)=>{
                        event.preventDefault();
                        $('input[type=file][name=document_file]').click()}
                      }
                    >Upload Document</button>
                    <input
                      name="document_file"
                      onChange={(e) => this.onChangeFile(e.target.files)}
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
                      value={document}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="setting">
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
                        { DOCUMENT_TYPE.map((type, index) => (
                          <option key={index} value={index}>{type}</option>
                        ))}
                      </select>
                    </div>
                    { type == '3' &&
                      <div className="other col-4">
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
                  <div className="row">
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
                </div>
              </div>
              <div className="button-block d-flex justify-content-center">
                <button type="button" className="button button-md button-green border-0 mx-3"
                  disabled={isInvalid}
                  onClick={(event)=>{this.onDone()}}
                >
                  Done
                </button>
                <button type="reset" className="button button-md button-orange border-0 mx-3"
                  onClick={(event)=>{this.onReset()}}
                >
                  Reset
                </button>
                <button type="button" className="button button-md button-red border-0 mx-3"
                  onClick={(event)=>{this.closeDialog()}}
                >
                  Cancel
                </button>
                <button type="button" className="button button-md button-green border-0 mx-3"
                  onClick={(event)=>{this.onUpload()}}
                  disabled={isInvalid}
                >
                  Save and Upload another
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps)(UploadDocumentModal);
