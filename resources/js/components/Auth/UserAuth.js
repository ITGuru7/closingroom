import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as routes from '../../constants/routes';
import * as actions from '../../actions';

export default function(ComposedComponent) {
  class UserAuth extends Component {
    componentWillMount() {
      const {authUser, history} = this.props
      if (!authUser) {
        history.push(routes.SIGN_IN);
        return
      }
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props
      const { authUser, user } = nextProps
      const { fetchUser } = this.props

      if (!authUser || !authUser.uid) {
        history.push(routes.SIGN_IN);
        return
      }
      if (!user) {
        fetchUser(authUser.uid);
        return
      }
    }

    render() {
      const {authUser} = this.props
      return authUser && <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ authUser, user }) => {
    return {
      authUser,
      user,
    };
  }

  return withRouter(connect(mapStateToProps, actions)(UserAuth));
}
