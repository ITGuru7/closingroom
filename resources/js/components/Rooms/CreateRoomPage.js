import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import AuthUserContext from '../Session/AuthUserContext';
import withAuthorization from '../Session/withAuthorization';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

import DefaultHeader from '../Header/DefaultHeader';

const CreateRoomPage = (props) => (
  <AuthUserContext.Consumer>
  {authUser =>
    <div className="createroom-page d-flex flex-column">
      <DefaultHeader title="Create New Room" />
      <div className="page-content flex-grow-1 m-4">
        <div className="header mb-4">
          <span className="title mr-4">New ClosingRoom</span>
          <Link to="">Advanced Settings</Link>
        </div>
        <div className="form-body">
          <CreateRoomForm {...props} authUser={authUser} />
        </div>
      </div>
    </div>
  }
  </AuthUserContext.Consumer>
);


const INITIAL_STATE = {
  roomname: '',
  timelimit: 0,
  email_1: '',
  email_2: '',
  email_3: '',
  email_4: '',
  error: null,
};

class CreateRoomForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const {authUser} = this.props;
    const { roomname, timelimit, email_1, email_2, email_3, email_4 } = this.state;

    const { history } = this.props;

    db.doCreateRoom(authUser.uid, roomname, 1, timelimit)
    // this.setState({ ...INITIAL_STATE })

    history.push(routes.ROOMS);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      roomname,
      timelimit,
      email_1,
      email_2,
      email_3,
      email_4,
      error,
    } = this.state;

    const isInvalid =
      roomname === '' ||
      !(timelimit > 0);

    return (
      <form onSubmit={this.onSubmit} className="form-group">
        <div className="row mb-2">
          <div className="col-4">
            <label htmlFor="firstname" className="label">
              Room Nickname
              <span> (only you will see this):</span>
            </label>
          </div>
          <div className="col-4">
            <input
              name="roomname"
              value={roomname}
              onChange={this.onChange}
              type="text"
              placeholder="eg. 4/2 JP Morgan.."
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <label htmlFor="timelimit" className="label">Time Limit(days):</label>
          </div>
          <div className="col-4">
            <input
              name="timelimit"
              value={timelimit}
              onChange={this.onChange}
              type="number"
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-4">
            <label htmlFor="timelimit" className="label">Invite users by email:</label>
          </div>
          <div className="col-4">
            <input className="mb-2" type="email" name="email_1" value={email_1} onChange={this.onChange}/>
            <input className="mb-2" type="email" name="email_2" value={email_2} onChange={this.onChange}/>
            <input className="mb-2" type="email" name="email_3" value={email_3} onChange={this.onChange}/>
            <input className="mb-2" type="email" name="email_4" value={email_4} onChange={this.onChange}/>
          </div>
        </div>
        <div className="row">
          <div className="offset-4 col-4">
            <button disabled={isInvalid} type="submit" className="button button-md button-red">
              Create
            </button>
          </div>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(CreateRoomPage);