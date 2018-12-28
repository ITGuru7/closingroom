import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../../firebase';

import * as routes from '../../../constants/routes';
import assets from '../../../assets';

import * as functions from '../../../functions';

import DefaultHeader from '../../Header/DefaultHeader';

import * as actions from '../../../actions';

import _ from 'lodash';


const INITIAL_STATE = {
  reason: '',
}

class KYC_ApprovalViewPage extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const { users } = props
    if (!users) {
      return
    }
  }

  renderHeader = () => (
    <div className="header px-3">
      <Link to={routes.KYC_APPROVALS} className="back d-flex align-items-center">
        <img src={assets.arrow_left_circle} className="mr-2"/>
        <span>Back</span>
      </Link>
    </div>
  )

  renderUserInfo = () => {
    const { users } = this.props;
    const { user_id } = this.props.match.params
    let user = users[user_id]

    return (
      <div className="userinfo-block flex-grow-1 p-3">
        <div className="d-flex flex-row my-3">
          <div className="label w-25">User ID:</div>
          <div>{functions.getFormattedID(user.id, 7)}</div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="label w-25">First Name:</div>
          <div>{user.firstname}</div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="label w-25">Last Name:</div>
          <div>{user.lastname}</div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="label w-25">Occupation:</div>
          <div>{user.occupation}</div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="label w-25">Passport Number:</div>
          <div>
            <span className="mr-5">{user.passport}</span>
            <a href={user.passport_url}>View passport scan</a>
          </div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="label w-25">Address:</div>
          <div>
            <span className="mr-5">{user.address}</span>
            <a href={user.address_url}>View proof of address scan</a>
          </div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="label w-25">Country:</div>
          <div>{user.location}</div>
        </div>
      </div>
    )
  }

  onApproveKYC = () => {
    const { history } = this.props
    const { user_id } = this.props.match.params
    db.doApproveKYC(user_id)
    history.push(routes.KYC_APPROVALS)
  }

  onDenyKYC = () => {
    const { history } = this.props
    const { user_id } = this.props.match.params
    const { reason } = this.state
    db.doDenyKYC(user_id, reason)
    history.push(routes.KYC_APPROVALS)
  }

  renderActions = () => {
    const {reason} = this.state
    return (
      <div className="action-block mt-auto d-flex justify-content-center align-items-center">
        <div className="approve-block mr-5">
          <button className="button button-md button-green"
            onClick={(event) => this.onApproveKYC()}
          >
            Approve
            <img src={assets.agree_white} className="ml-2"/>
          </button>
        </div>
        <div className="deny-block">
          <div className="header px-2">
            Deny User
          </div>
          <div className="body p-2">
            <div className="label">Reason:</div>
            <textarea
              name="reason"
              id="reason"
              value={reason}
              onChange={(event) => {
                this.setState({reason: event.target.value})
              }}
              rows="3"
              className="w-100"
            />
            <div className="w-100 text-center">
              <button className="button button-md button-red mr-2"
                onClick={(event) => this.onDenyKYC()}
              >
                Deny
                <img src={assets.disagree_white} className="ml-2"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { users } = this.props;

    if (!users) {
      return <div></div>
    }

    return (
      <div className="kyc-approval-view-page d-flex flex-column h-100">
        <DefaultHeader title="KYC Approvals -> View" />
        <div className="page-content flex-grow-1 d-flex flex-column pb-4">
          {this.renderHeader()}
          {this.renderUserInfo()}
          {this.renderActions()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default withRouter(connect(mapStateToProps, actions)(KYC_ApprovalViewPage));
