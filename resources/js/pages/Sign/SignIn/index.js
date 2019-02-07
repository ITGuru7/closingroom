import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SigninHeader from '../../../Layout/Header/SigninHeader';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../../firebase';
import * as routes from '../../../constants/routes';

import * as actions from '../../../actions';

const SignInPage = (props) => (
  <div className="signin-page text-center">
    <SigninHeader/>
    <div className="signin-block pb-3">
      <div className="title d-flex justify-content-center p-4">
        ClosingRoom User Login
      </div>
      <SignInForm {...props} />
      {/* <PasswordForgetLink /> */}
    </div>
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault()

    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        // this.setState({ ...INITIAL_STATE });

        this.props.fetchAuthUser();

        setTimeout(function(){
          history.push(routes.DASHBOARD);
        }, 1000);

      })
      .catch(error => {
        alert(error)
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    // const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} className="signin-form">
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
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3 text-right">
            <label htmlFor="password">Password:</label>
          </div>
          <div className="col-6">
            <input
              name="password"
              id="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div className="my-2">
          <button type="submit" className="button-md button-grey">
            Login
          </button>
        </div>

        {error && <p className="alert alert-light">{error.message}</p>}
      </form>
    );
  }
}

export { SignInForm };

export default withRouter(connect(null, actions)(SignInPage));
