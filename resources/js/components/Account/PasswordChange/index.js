import React, { Component } from 'react';

import { auth } from '../../../firebase';

const INITIAL_STATE = {
  passwordOld: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { passwordOld, passwordOne } = this.state;

    // auth
    //   .doCheckPassword(passwordOld)
    //   .then(() => {
        auth
          .doPasswordUpdate(passwordOne)
          .then(() => {
            this.setState(INITIAL_STATE)
          })
          .catch(error => {
            this.setState({ error });
          });
      // })
      // .catch(error => {
      //   this.setState({ error });
      // });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOld, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOld === '' ||
      passwordOne === '' ||
      passwordOne !== passwordTwo;

    return (
      <form onSubmit={this.onSubmit} className="form-group">
        <div className="row">
          <div className="col-3">
            <label htmlFor="passwordOld">Current Password</label>
            <input
              name="passwordOld"
              id="passwordOld"
              value={passwordOld}
              onChange={this.onChange}
              type="password"
            />
          </div>
          <div className="col-3">
            <label htmlFor="passwordOne">New Password</label>
            <input
              name="passwordOne"
              id="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
            />
          </div>
          <div className="col-3">
            <label htmlFor="passwordTwo">Confirm Password</label>
            <input
              name="passwordTwo"
              id="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
            />
          </div>
          {error && <p>{error.message}</p>}
        </div>
        <div className="mt-2">
          <button disabled={isInvalid} type="submit" className="button-blue">
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default PasswordChangeForm;
