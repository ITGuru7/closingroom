import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) => (
  <div className="sign-page mt-5 text-center">
    <div className="sign-block py-3">
      <div className="title d-flex justify-content-center p-4">
        ClosingRoom User Register
      </div>
      <SignUpForm history={history} />
    </div>
  </div>
);

const INITIAL_STATE = {
  username: '',
  displayname: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, displayname, email, passwordOne } = this.state;

    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, displayname, email)
          .then(() => {
            // this.setState({ ...INITIAL_STATE });

            history.push(routes.HOME);
          } )
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      displayname,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      displayname === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit} className="sign-form">
        <div className="row">
          <div className="col-3 text-right">
            <label htmlFor="username">Username:</label>
          </div>
          <div className="col-6">
            <input
              name="username"
              id="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3 text-right">
            <label htmlFor="displayname">Displayname:</label>
          </div>
          <div className="col-6">
            <input
              name="displayname"
              id="displayname"
              value={displayname}
              onChange={this.onChange}
              type="text"
              placeholder="Display name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3 text-right">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="col-6">
            <input
              name="email"
              id="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3 text-right">
            <label htmlFor="passwordOne">Password:</label>
          </div>
          <div className="col-6">
            <input
              name="passwordOne"
              id="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3 text-right">
            <label htmlFor="passwordTwo">Confirm:</label>
          </div>
          <div className="col-6">
            <input
              name="passwordTwo"
              id="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="mt-3">
          <button disabled={isInvalid} type="submit" className="button-md button-grey">
            Register
          </button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <div className="mt-3">
    <span className="mr-3">Not a member?</span>
    <Link to={routes.SIGN_UP}>
      <button className="button-md button-blue">
        Register
      </button>
    </Link>
  </div>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
