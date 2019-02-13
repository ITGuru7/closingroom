import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { db } from '../../../firebase';

import * as routes from '../../../constants/routes';
import assets from '../../../assets';

import * as functions from '../../../functions';

import * as actions from '../../../actions';
import JURISDICTIONS from '../../../constants/jurisdictions';

import _ from 'lodash';


const INITIAL_STATE = {
  expanded: true,
}

class LegalDocuments extends Component {
  state = { ...INITIAL_STATE };

  renderLegalDocument = (document) => (
    <tr key={document.title} className="level-2">
      <td className="text-left"><img src={assets.file_blue} className="size-20"/> {document.title}</td>
      <td><img src={assets.status_incomplete} className="size-20"/> Incomplete</td>
      <td className="text-uppercase">Legal Document</td>
      <td><input type="checkbox" defaultChecked={true}/></td>
      <td>{functions.getFormattedDate(new Date(document.create_date))}</td>
      <td></td>
      <td>
        <a href={document.url} download>
          <img src={assets.download_blue} className="size-20"/>
        </a>
      </td>
      <td><img src={assets.status_complete} className="size-20"/> Signed</td>
      <td>N/A</td>
      <td>
        <select
          name="juridiction"
          id="juridiction"
        >
          <option value="" hidden>Jurisdiction</option>
          {_.map(JURISDICTIONS, (jurisdiction, key) => (
            <option key={key} value={key}>{jurisdiction}</option>
          ))}
        </select>
      </td>
      <td>
        <a href={document.url} target='_blank'>
          <img src={assets.search_black} className="size-20 mr-3"/>
          Preview
        </a>
      </td>
    </tr>
  )

  renderDocuments = () => {
    const { documents } = this.props
    return _.map(documents, (document) => (
      this.renderLegalDocument(document)
    ))
  }

  render() {
    const { expanded } = this.state
    let rows = [
      <tr key="group" className="level-1">
        <th className="text-left" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded: !expanded})}}
          >
            <img className="size-20" src={expanded?assets.angle_down_grey:assets.angle_right_grey}/>
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
const mapStateToProps = ({ documents }) => {
  return {
    documents,
  };
};

export default withRouter(connect(mapStateToProps, actions)(LegalDocuments));
