import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as routes from '../../constants/routes';
import * as functions from '../../functions';

export default function(ComposedComponent) {
  class AdminAuth extends Component {
    componentWillMount() {
      const {authUser, users, history} = this.props
      if (!authUser) {
        history.push(routes.SIGN_IN);
        return
      }
      if (users && !functions.isAdmin(users[authUser.uid].level)) {
        history.push(routes.HOME);
        return
      }
    }

    componentWillUpdate(nextProps) {
      const {history} = this.props
      const {authUser, users} = nextProps
      if (!authUser) {
        history.push(routes.SIGN_IN);
        return
      }
      if (users && !functions.isAdmin(users[authUser.uid].level)) {
        history.push(routes.HOME);
        return
      }
    }

    render() {
      const {authUser} = this.props
      return authUser && <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ authUser, users }) => {
    return {
      authUser,
      users,
    };
  }

  return withRouter(connect(mapStateToProps)(AdminAuth));
}
