import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../../firebase';

import * as routes from '../../../constants/routes';
import assets from '../../../assets';

import * as functions from '../../../functions';

import RoomHeader from '../../../Layout/Header/RoomHeader';
import PanelHeader from '../../../Layout/Header/PanelHeader';

import * as actions from "../../../actions";
import JURISDICTIONS from "../../../constants/jurisdictions";

import _ from 'lodash';


const INITIAL_STATE = {
  expanded: true,
}

class UserUploadFiles extends Component {
  state = { ...INITIAL_STATE };

  renderUploadDocument = (document) => {
    return (
      <tr key={document.did} className="level-2">
        <td className="text-left"><img src={assets.file_pdf} className="size-20"/> {document.title || 'Document'}</td>
        <td><img src={assets.upload_blue} className="size-20"/> Incomplete</td>
        <td className="text-uppercase">Legal Document</td>
        <td><input type="checkbox" defaultChecked={true}/></td>
        <td>{functions.getFormattedDate(new Date(document.create_date || "01/01/2019"))}</td>
        <td>N/A</td>
        <td>
          <a href={document.url} download>
            <img src={assets.download_blue} className="size-20"/>
          </a>
        </td>
        <td>N/A</td>
        <td>{document.username}</td>
        <td></td>
        <td>
          <a href={document.url} target='_blank'>
            <img src={assets.search_black} className="size-20 mr-3"/>
            Preview
          </a>
        </td>
      </tr>
    )
  }

  renderDocuments = () => {
    const { room, users } = this.props
    return _.map(room.users, (room_user, uid) => {
      return _.map(room_user.documents, (document, did) => {
        document.username = users[uid].displayname
        document.did = did
        return this.renderUploadDocument(document)
      })
    })
  }

  render() {
    const { expanded } = this.state
    let rows = [
      <tr key="group" className="level-1">
        <th className="text-left" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded: !expanded})}}
          >
            <img className="size-20" src={expanded?assets.angle_down_black:assets.angle_right_black}/>
          </button>
          Legal Documents
        </th>
      </tr>
    ]
    if (expanded) {
      rows = _.union(rows, this.renderDocuments())
    }
    return rows
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

export default withRouter(connect(mapStateToProps, actions)(UserUploadFiles));
