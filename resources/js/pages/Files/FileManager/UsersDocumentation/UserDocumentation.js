import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../../../firebase';

import * as routes from '../../../../constants/routes';
import assets from '../../../../assets';

import * as functions from '../../../../functions';

import RoomHeader from '../../../../Layout/Header/RoomHeader';
import PanelHeader from '../../../../Layout/Header/PanelHeader';

import * as actions from '../../../../actions';

import { SERVER_URL } from '../../../../constants/urls';

import _ from 'lodash';

const INITIAL_STATE = {
  expanded: true,
}

class UserDocumentation extends Component {
  state = { ...INITIAL_STATE };

  renderUserDocument = (type, title) => {
    const { user } = this.props
    return (
      <tr key={type} className="level-3">
        <td className="text-left"><img src={assets.file} className="size-20"/> {functions.getFormattedID(user.id, 4)}.{title}.pdf</td>
        { user.level > 0 ?
          <td><img src={assets.secure_transparent} className="size-20"/> Verified</td>
        :
          <td>Unverified</td>
        }
        <td className="text-uppercase">Personal Data</td>
        <td>N/A</td>
        <td>{functions.getFormattedDate(new Date(user.kyc_date || "2019/01/01"))}</td>
        <td>N/A</td>
        <td>
          {type == 'kyc' ?
            <KYCPDFForm {...this.props} download={true}/>
          :
            <a href={type === 'passport' ? user.passport_url : user.address_url} download>
              <img src={assets.download_blue} className="size-20"/>
            </a>
          }
        </td>
        <td>N/A</td>
        <td className="text-uppercase">System</td>
        <td>N/A</td>
        <td>
          {type == 'kyc' ?
            <KYCPDFForm {...this.props} download={false}/>
          :
            <a href={type === 'passport' ? user.passport_url : user.address_url} target='_blank'>
              <img src={assets.search_black} className="size-20 mr-3"/>
              Preview
            </a>
          }
        </td>
      </tr>
    )
  }

  renderDocuments = () => {
    return [
      this.renderUserDocument('kyc', 'KYC Information'),
      this.renderUserDocument('passport', 'Passport'),
      this.renderUserDocument('address', 'Proof of address'),
    ]
  }

  render() {
    const { user } = this.props
    const { expanded } = this.state
    let rows = [
      <tr key="group" className="level-2">
        <th className="text-left" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded: !expanded})}}
          >
            <img className="size-20" src={expanded?assets.angle_down_black:assets.angle_right_black}/>
          </button>
          [{functions.getFormattedID(user.id, 4)}] {user.displayname}
        </th>
      </tr>
    ]
    if (expanded) {
      rows = _.union(rows, this.renderDocuments())
    }
    return rows
  }
}

const KYCPDFForm = (props) => {
  const { room, user, download } = props
  return (
    <form action={`${SERVER_URL}/kyc`} method="get" target={download===false?'_blank':''}>
      <input type="hidden" name="rid" value={functions.getFormattedID(room.id, 6)}/>
      <input type="hidden" name="create_date" value={functions.getFormattedDate(new Date(room.create_date))}/>
      <input type="hidden" name="firstname" value={user.firstname}/>
      <input type="hidden" name="lastname" value={user.lastname}/>
      <input type="hidden" name="address" value={user.address}/>
      <input type="hidden" name="country" value={user.timezone}/>
      <input type="hidden" name="passport" value={user.passport}/>
      { download ?
        <button type="submit" className="button-transparent">
          <img src={assets.download_blue} className="size-20"/>
        </button>
      :
        <button type="submit" className="button-transparent">
          <img src={assets.search_black} className="size-20 mr-3"/>
          Preview
        </button>
      }
    </form>
  )
}

const mapStateToProps = ({ room }) => {
  return {
    room,
  };
};

export default withRouter(connect(mapStateToProps, actions)(UserDocumentation));
