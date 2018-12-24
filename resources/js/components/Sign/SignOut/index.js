import React from 'react';

import { auth } from '../../../firebase';
import assets from '../../../assets';
import * as routes from '../../../constants/routes';

const SignOutButton = () => {
  const doLogout = () => {
    auth.doSignOut();
    window.location.href = routes.SIGN_IN;
  }
  return (
    <button
      type="button"
      className="button-transparent"
      onClick={doLogout}
    >
      <img src={assets.logout}/>
      Logout
    </button>
  )
}

export default SignOutButton;
