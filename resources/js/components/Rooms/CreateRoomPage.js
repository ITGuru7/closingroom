import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from "react-redux";

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

import DefaultHeader from '../Header/DefaultHeader';

import * as actions from "../../actions";

const CreateRoomPage = (props) => (
  <div className="createroom-page d-flex flex-column">
    <DefaultHeader title="Create New Room" />
    <div className="page-content flex-grow-1 m-4">
      <CreateRoomForm {...props} />
    </div>
  </div>
);


const INITIAL_STATE = {
  roomname: '',
  timelimit: 0,
  email_1: '',
  email_2: '',
  email_3: '',
  email_4: '',

  general_details: {
    net_gross_discount: '',
    amount_of_coins: '',
    bank_country_of_fiat_buyer: '',
    bank_country_of_fiat_seller: '',
    country_btc: '',
    tranche_size: '',
    face_to_face: '',
    lawyer_to_laywer: '',
    is_buyer_platform: '',
    is_seller_platform: '',
    is_buyer_onboarded_to_platform: '',
    is_seller_onboarded_to_platform: '',
    comments: '',
    error: null,
  },
};

class CreateRoomForm extends Component {
  state = { ...INITIAL_STATE };

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
    let name = event.target.name
    let value = event.target.value
    if (typeof this.state[name] !== 'undefined') {
      this.setState({ [name]: value });
    } else {
      let general_details = this.state.general_details
      general_details[name] = value
      this.setState({ general_details });
    }
  };

  renderField = (label, type, value) => (
    <div className="row">
      <div className="col-6">
        <label htmlFor={value} className="label">{label}</label>
      </div>
      <div className="col-6">
        <input
          id={value}
          name={value}
          value={this.state.general_details[value]}
          onChange={this.onChange}
          type={type}
        />
      </div>
    </div>
  )

  render() {
    const {
      roomname,
      timelimit,
      error,
    } = this.state;

    const isInvalid =
      roomname === '' ||
      !(timelimit > 0);

    return (
      <form onSubmit={this.onSubmit} className="form-group">
        <div className="header mb-4">
          <span className="title mr-4">New ClosingRoom</span>
          <Link to="">Advanced Settings</Link>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <label htmlFor="firstname" className="label">
                  Room Nickname
                  <span> (only you will see this):</span>
                </label>
              </div>
              <div className="col-6">
                <input
                  name="roomname"
                  value={this.state['roomname']}
                  onChange={this.onChange}
                  type="text"
                  placeholder="eg. 4/2 JP Morgan.."
                  required
                />
              </div>
            </div>
            {this.renderField('Time Limit(days):', 'number', 'timelimit')}
          </div>
          <div className="col-6">
            {this.renderField('Invite users by email:', 'email', 'email_1')}
            {this.renderField('', 'email', 'email_1')}
            {this.renderField('', 'email', 'email_1')}
            {this.renderField('', 'email', 'email_1')}
          </div>
        </div>

        <div className="header mb-4">
          <span className="title mr-4">General Details</span>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            {this.renderField('Net / Gross Discount:', 'text', 'net_gross_discount')}
            {this.renderField('Bank/Country of Fiat (Buyer):', 'text', 'bank_country_of_fiat_buyer')}
            {this.renderField('Country (BTC):', 'text', 'country_btc')}
            {this.renderField('Face to Face:', 'text', 'face_to_face')}
            {this.renderField('Lawyer to Lawyer:', 'text', 'lawyer_to_laywer')}
            {this.renderField('Is Buyer a Platform?:', 'text', 'is_buyer_platform')}
            {this.renderField('Is Seller a Platform?:', 'text', 'is_seller_platform')}
            {this.renderField('Is Buyer onboarded to a Platform?:', 'text', 'is_buyer_onboarded_to_platform')}
            {this.renderField('Is Seller onboarded to a Platform?:', 'text', 'is_seller_onboarded_to_platform')}
          </div>
          <div className="col-6 d-flex flex-column">
            {this.renderField('Amount of Coins:', 'text', 'amount_of_coins')}
            {this.renderField('Bank/Country of Fiat (Seller):', 'text', 'bank_country_of_fiat_seller')}
            {this.renderField('Tranche Size (Daily):', 'text', 'tranche_size')}
            <div className="mt-auto">
              <label htmlFor='comments' className="label">Comments</label>
              <textarea
                id='comments'
                name='comments'
                rows='3'
                value={this.state['comments']}
                onChange={this.onChange}
                className="w-100"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button disabled={isInvalid} type="submit" className="button button-md button-red">
            Create
          </button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const mapStateToProps = ({ authUser, rooms }) => {
  return {
    authUser,
  };
};

export default withRouter(connect(mapStateToProps, actions)(CreateRoomPage));
