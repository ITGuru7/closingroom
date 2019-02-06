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

import _ from 'lodash';


const INITIAL_STATE = {
  expanded: true,
}

class GeneralDocuments extends Component {
  state = { ...INITIAL_STATE };

  renderDealDetail = () => {
    const { room } = this.props
    return (
      <tr key="dealdetail" className="level-2">
        <td className="text-left"><img src={assets.file_pdf} className="size-20"/> Deal Details</td>
        <td><img src={assets.status_working} className="size-20"/> Working</td>
        <td className="text-uppercase">General Terms</td>
        <td><input type="checkbox" defaultChecked={true}/></td>
        <td>{functions.getFormattedDate(new Date(room.create_date))}</td>
        <td></td>
        <td>
          <a href="" download>
            <img src={assets.download_blue} className="size-20"/>
          </a>
        </td>
        <td>
          <button className="button button-md button-lightgreen">
            <img src={assets.sign} className="size-20 mr-3"/>
            Fill &amp; Sign
          </button>
        </td>
        <td>N/A</td>
        <td>N/A</td>
        <td>
          <a href="" target='_blank'>
            <img src={assets.search_black} className="size-20 mr-3"/>
            Preview
          </a>
        </td>
      </tr>
    )
  }

  renderDocuments = () => {
    return [
      this.renderDealDetail()
    ]
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
          General
        </th>
      </tr>
    ]
    if (expanded) {
      rows = _.union(rows, this.renderDocuments())
    }
    return rows
  }
}
const mapStateToProps = ({ room, }) => {
  return {
    room,
  };
};

export default withRouter(connect(mapStateToProps, actions)(GeneralDocuments));
