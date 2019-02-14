import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import assets from '../../../../assets';

import _ from 'lodash';


const INITIAL_STATE = {
  expanded: true,
}

class Folder extends Component {
  state = { ...INITIAL_STATE };

  renderDocuments = () => {
    return <div></div>
  }

  render() {
    const { folder } = this.props
    const { expanded } = this.state
    return (
      <tr key="group" className="level-1">
        <th className="text-left" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded: !expanded})}}
          >
            <img className="size-20" src={expanded?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
          {folder.title}
        </th>
      </tr>
    )
  }
}

export default connect(null)(Folder);
