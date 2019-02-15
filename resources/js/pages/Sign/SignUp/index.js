import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import SignupHeader from '../../../Layout/Header/SignupHeader';

import { auth, db } from '../../../firebase';
import * as routes from '../../../constants/routes';

import * as actions from '../../../actions';

import * as functions from '../../../functions';

import moment from 'moment-timezone';


const SignUpPage = ({ history }) => (
  <div className="signup-page">
    <div className="signup-container text-center">
      <SignupHeader/>
      <div className="signup-block py-3">
        <SignUpForm history={history} />
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  type: 0,
  firstname: '',
  lastname: '',
  displayname: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  timezones: null,
  timezone: '',
  error: null,
};

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    event.preventDefault()

    const { type, firstname, lastname, displayname, email, passwordOne, passwordTwo, timezone } = this.state;

    if (passwordOne !== passwordTwo) {
      alert('Password not match')
      $('#passwordTwo').focus()
      return
    }

    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, type, firstname, lastname, displayname, email, timezone)
          .then(() => {
            // this.setState({ ...INITIAL_STATE });

            setTimeout(function(){
              functions.doSendVerifyEmail(authUser, displayname)
              functions.doEnterInvitedRooms(authUser.user.uid, email)
              alert("We sent verification email.\nPlease check your mail")
              history.push(routes.DASHBOARD);
            }, 1000);
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
  onClickType = (event, type) => {

    if (type == 1) {
      event.preventDefault()
      alert('Corporate/Institutional users coming soon')
    }
  }

  componentWillMount() {
    const defaultTimeZone = moment.tz.guess();
    this.setState({timezone: defaultTimeZone})

    let timezones = []
    moment.tz.names().map(function(name, index){
      let timezone = {}
      timezone.location = name
      timezone.offset = moment(Date.now()).tz(name).format('Z')
      timezones.push(timezone)
    })
    this.setState({timezones})
  }

  render() {
    const { type, firstname, lastname, displayname, email, passwordOne, passwordTwo, timezones, timezone, error } = this.state;

    // const isInvalid =
    //   passwordOne !== passwordTwo ||
    //   passwordOne === '' ||
    //   firstname === '' ||
    //   lastname === '' ||
    //   displayname === '' ||
    //   email === '';

    return (
      <form onSubmit={this.onSubmit} className="signup-form">
        <div className="row mb-4 d-flex justify-content-between">
          <label className="radio-group text-left text-white">
            Individual
            <input
              name="type"
              value='0'
              type="radio"
              defaultChecked
              onClick={(event) => this.onClickType(event, 0)}
            />
          </label>
          <label className="radio-group text-left text-white">
            Corporate/Institution
            <span className="text-white font-italic">(Comming soon)</span>
            <input
              name="type"
              value='1'
              onClick={(event) => this.onClickType(event, 1)}
              type="radio"
            />
          </label>
        </div>
        <div className="row">
          <div className="col-6 form-group text-left text-white">
            <label htmlFor="firstname">First Name</label>
            <input
              name="firstname"
              id="firstname"
              value={firstname}
              onChange={this.onChange}
              type="text"
              placeholder=""
              className="form-control"
              required
            />
          </div>
          <div className="col-6 form-group text-left text-white">
            <label htmlFor="lastname">Last Name</label>
            <input
              name="lastname"
              id="lastname"
              value={lastname}
              onChange={this.onChange}
              type="text"
              placeholder=""
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-group text-left text-white">
          <label htmlFor="displayname">Display Name</label>
          <input
            name="displayname"
            id="displayname"
            value={displayname}
            onChange={this.onChange}
            type="text"
            placeholder=""
            className="form-control"
            required
          />
        </div>
        <div className="form-group text-left text-white">
          <label htmlFor="">Email</label>
          <input
            name="email"
            id="email"
            value={email}
            onChange={this.onChange}
            type="email"
            placeholder=""
            className="form-control"
            required
          />
        </div>
        <div className="form-group text-left text-white">
          <label htmlFor="passwordOne">Password</label>
          <input
            name="passwordOne"
            id="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder=""
            className="form-control"
            required
          />
        </div>
        <div className="form-group text-left text-white">
          <label htmlFor="passwordTwo">Confirm</label>
          <input
            name="passwordTwo"
            id="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder=""
            className="form-control"
            required
          />
        </div>
        <div className="form-group text-left text-white">
          <label htmlFor="timezone">Country/TimeZone</label>
          { timezones &&
            <select
              name="timezone"
              id="timezone"
              value={timezone}
              onChange={this.onChange}
              className="form-control"
            >
              {timezones.map(function(tz, index){
                return <option key={ index } value={tz.location}>{tz.location} {tz.offset}</option>
              })}
            </select>
          }
        </div>
        <div className="mt-3">
          <button type="submit" className="button-md button-red">
            Register
          </button>
        </div>

        {error && <p className="alert alert-light">{error.message}</p>}
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

export { SignUpForm, SignUpLink };

export default withRouter(connect(null, actions)(SignUpPage));
