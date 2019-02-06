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

import _ from 'lodash';

const INITIAL_STATE = {
  expanded: true,
}

class UserDocumentation extends Component {
  state = { ...INITIAL_STATE };

  renderUserDocument = (type) => {
    const { user } = this.props
    let title, url
    if (type === 'kyc') {
      title = 'KYC Information'
      url = ''
    } else if (type === 'passport') {
      title = 'Passport'
      url = user.passport_url
    } else if (type === 'address') {
      title = 'Proof of address'
      url = user.address_url
    }
    return (
      <tr key={type} className="level-3">
        <td className="text-left"><img src={assets.file_pdf} className="size-20"/> {functions.getFormattedID(user.id, 4)}.{title}.pdf</td>
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
          <a href={url} download>
            <img src={assets.download_blue} className="size-20"/>
          </a>
        </td>
        <td>N/A</td>
        <td className="text-uppercase">System</td>
        <td>N/A</td>
        <td>
          <a href={url} target='_blank'>
            <img src={assets.search_black} className="size-20 mr-3"/>
            Preview
          </a>
        </td>
      </tr>
    )
  }

  renderDocuments = () => {
    return [
      this.renderUserDocument('kyc'),
      this.renderUserDocument('passport'),
      this.renderUserDocument('address'),
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
const mapStateToProps = ({  }) => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, actions)(UserDocumentation));
