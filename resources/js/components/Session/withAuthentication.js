import React from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

const INITIAL_STATE = {
  authUser: null,
}

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    state = {...INITIAL_STATE}

    componentDidMount() {
      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

export default withAuthentication;