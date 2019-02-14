import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { db } from '../../../../firebase';

import assets from '../../../../assets';

import _ from 'lodash';


const INITIAL_STATE = {
  expanded: true,
  folder: null,
  isEditingFoldername: false,
}

class Folder extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.init(this.props)
  }

  init = (props) => {
    const { folder } = props
    this.setState({
      folder: folder,
      isEditingFoldername: false,
    })
  }

  onEditFoldername = () => {
    this.setState({
      isEditingFoldername: true,
    })
  }

  onEnterFoldername = () => {
    const { room } = this.props
    const { folder } = this.state
    db.doChangeFoldername(room.rid, folder.fid, folder.title)

    this.setState({
      isEditingFoldername: false,
    })
  }
  render() {
    const { expanded, folder, isEditingFoldername } = this.state

    if (!(!!folder)) {
      return <tr></tr>
    }

    return (
      <tr key="group" className="level-1">
        <th className="text-left" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded: !expanded})}}
          >
            <img className="size-20" src={expanded?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
          { isEditingFoldername ?
            <input
              type="text"
              className="text-left border-0 bg-transparent"
              placeholder="enter nickname"
              value={folder.title}
              autoFocus
              onChange = { (event) => {
                let folder = this.state.folder;
                folder.title = event.target.value;
                this.setState({folder: folder});
              }}
              onKeyPress={(event) => {
                if (event.keyCode == 13 || event.charCode == 13) {
                  this.onEnterFoldername()
                }
              }}
              onBlur={this.onEnterFoldername}
            />
          :
            <span onClick={(event) => this.onEditFoldername()}>
              { folder.title || 'New Folder'}
            </span>
          }
        </th>
      </tr>
    )
  }
}


const mapStateToProps = ({ room }) => {
  return {
    room,
  };
};

export default connect(mapStateToProps)(Folder);
