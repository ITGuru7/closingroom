import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import assets from '../../../assets';
import _ from 'lodash';

import PaneHeader from '../../../Layout/Header/PaneHeader';

const INITIAL_STATE = {
  expanded1: true,
  expanded2: true,
  expanded3: true,
}

class TasksPane extends Component {
  state = { ...INITIAL_STATE };

  renderGeneralDocuments = () => {
    const { expanded1 } = this.state
    return (
      <div key="general" className="tasks-group  mt-2">
        <div className="group-header px-2 d-flex justify-content-between">
          <div className="title">General</div>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({ expanded1: !expanded1 })}}
          >
          { expanded1 ?
            <img className="size-15" src={assets.angle_down_black}/>
          :
            <img className="size-15" src={assets.angle_right_black}/>
          }
          </button>
        </div>
        { expanded1 &&
          <div className="group-contents px-3">
            <div className="content d-flex justify-content-between">
              <div className="title">General Deal Details</div>
              <div className="link">
                <Link to="" className="mr-2">Edit</Link>
                <a href="" target='_blank'>
                  View
                </a>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  renderLegalDocuments = () => {
    const { expanded2 } = this.state
    return (
      <div key="legal" className="tasks-group  mt-2">
        <div className="group-header px-2 d-flex justify-content-between">
          <div className="title">Legal Documents</div>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({ expanded2: !expanded2 })}}
          >
          { expanded2 ?
            <img className="size-15" src={assets.angle_down_black}/>
          :
            <img className="size-15" src={assets.angle_right_black}/>
          }
          </button>
        </div>
        { expanded2 &&
          <div className="group-contents px-3">
            <div className="content d-flex justify-content-between">
              <div className="title">NCNDA</div>
              <div className="link">
                <a href="" target='_blank'>
                  View
                </a>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  renderUploadedDocuments = () => {
    const { room } = this.props
    const { expanded3 } = this.state
    return (
      <div key="upload" className="tasks-group  mt-2">
        <div className="group-header px-2 d-flex justify-content-between">
          <div className="title">User Uploaded</div>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({ expanded3: !expanded3 })}}
          >
          { expanded3 ?
            <img className="size-15" src={assets.angle_down_black}/>
          :
            <img className="size-15" src={assets.angle_right_black}/>
          }
          </button>
        </div>
        { expanded3 &&
          <div className="group-contents px-3">
          { _.map(room.users, (user) => {
            return _.map(user.documents, (document, key) => (
              <div key={key} className="content d-flex justify-content-between">
                <div className="title">{document.title}</div>
                <div className="link">
                  <a href={document.url} target='_blank'>
                    View
                  </a>
                </div>
              </div>
            ))
          })}
          </div>
        }
      </div>
    )
  }

  renderTasks = () => {
    return [
      this.renderGeneralDocuments(),
      this.renderLegalDocuments(),
      this.renderUploadedDocuments(),
    ]
  }

  render() {
    const { room } = this.props
    return (
      <div className="tasks-pane">
        <PaneHeader title="My Tasks"/>
        <div className="tasks-block">
          {this.renderTasks()}
        </div>
        <div className="view-files d-flex justify-content-center mt-5">
          <Link to={`/room/${room.rid}/files`}>
            <button className="button-white d-flex align-items-center shadow px-2 py-1 rounded">
              <span className="mr-2">Files and Task Room</span>
              <img className="size-20" src={assets.angle_right_black}/>
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ room, documents }) => {
  return {
    room,
    documents,
  };
};

export default connect(mapStateToProps)(TasksPane);
