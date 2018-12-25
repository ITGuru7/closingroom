import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as routes from '../../constants/routes';

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
      const {history} = this.props
      const {authUser} = nextProps
      if (!authUser) {
        history.push(routes.SIGN_IN);
        return
      }
    }

    render() {
      const {authUser} = this.props
      return authUser && <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ authUser }) => {
    return {
      authUser,
    };
  }

  return withRouter(connect(mapStateToProps)(UserAuth));
}
