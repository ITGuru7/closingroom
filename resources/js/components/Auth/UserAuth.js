import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as routes from '../../constants/routes';
import * as actions from '../../actions';

export default function(ComposedComponent) {
  class UserAuth extends Component {
    componentWillMount() {
      const {authUser, user, history} = this.props
      const { fetchUser } = this.props
      if (!authUser) {
        history.push(routes.SIGN_IN);
        return
      }
      if (authUser.uid && !user) {
        fetchUser(authUser.uid);
        return
      }
    }

    componentWillUpdate(nextProps) {
      const { history, fetchUser } = this.props
      const { authUser, user } = nextProps

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
