import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import assets from '../../assets';
import _ from 'lodash';

import PanelHeader from '../Header/PanelHeader';

const INITIAL_STATE = {
  expanded1: true,
  expanded2: true,
  expanded3: true,
}

class TasksPanel extends Component {
  state = { ...INITIAL_STATE };

  renderRoom1 = () => {
    const { expanded1 } = this.state
    return (
      <table className="explorer-view w-100 mt-2" cellPadding="10">
        <thead>
          <tr className="group mt-1">
            <th>Room Level 1</th>
            <th className="text-right">
              <button className="button button-transparent"
                onClick={(event)=>{this.setState({expanded1: !expanded1})}}
              >
              { expanded1 ?
                <img className="size-20" src={assets.angle_down_black}/>
              :
                <img className="size-20" src={assets.angle_right_black}/>
              }
              </button>
            </th>
          </tr>
        </thead>
        { expanded1 &&
          <tbody>
            <tr className="content">
              <td className="pl-4">
                <span className="mr-2">General Deal Details</span>
                <div className="d-inline-block">
                  <img className="size-20" src={assets.pencil}/>
                  <u>edit</u>
                </div>
              </td>
              <td className="text-right">
                <img src={assets.status_complete} className="size-20 mr-1"/>
                <u>View</u>
              </td>
            </tr>
          </tbody>
        }
      </table>
    )
  }

  renderRoom2 = () => {
    const { expanded2 } = this.state
    return (
      <table className="explorer-view w-100 mt-2" cellPadding="10">
        <thead>
          <tr className="group mt-1">
            <th>Room Level 2</th>
            <th className="text-right">
              <button className="button button-transparent"
                onClick={(event)=>{this.setState({expanded2: !expanded2})}}
              >
              { expanded2 ?
                <img className="size-20" src={assets.angle_down_black}/>
              :
                <img className="size-20" src={assets.angle_right_black}/>
              }
              </button>
            </th>
          </tr>
        </thead>
        { expanded2 &&
          <tbody>
            <tr className="content">
              <td className="pl-4">
                <span className="mr-2">NCNDA</span>
                <div className="d-inline-block">
                  <img className="size-20" src={assets.pencil}/>
                  <u>edit</u>
                </div>
              </td>
              <td className="text-right">
                <button className="button button-md button-lightgreen">
                  <img src={assets.sign} className="size-20 mr-3"/>
                  Fill &amp; Sign
                </button>
              </td>
            </tr>
          </tbody>
        }
      </table>
    )
  }

  renderRoom3 = () => {
    const { expanded3 } = this.state
    return (
      <table className="explorer-view w-100 mt-2" cellPadding="10">
        <thead>
          <tr className="group mt-1">
            <th>Room Level 3</th>
            <th className="text-right">
              <button className="button button-transparent"
                onClick={(event)=>{this.setState({expanded3: !expanded3})}}
              >
              { expanded3 ?
                <img className="size-20" src={assets.angle_down_black}/>
              :
                <img className="size-20" src={assets.angle_right_black}/>
              }
              </button>
            </th>
          </tr>
        </thead>
        { expanded3 &&
          <tbody>
            <tr className="content">
            </tr>
          </tbody>
        }
      </table>
    )
  }

  renderTasks = () => {
    return (
      <div className="w-100">
        {this.renderRoom1()}
        {this.renderRoom2()}
        {this.renderRoom3()}
      </div>
    )
  }

  render() {
    const { room } = this.props
    return (
      <div className="tasks-panel">
        <PanelHeader {...this.props}
          title="My Tasks"
        />
        {this.renderTasks()}
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

export default connect(mapStateToProps)(TasksPanel);
