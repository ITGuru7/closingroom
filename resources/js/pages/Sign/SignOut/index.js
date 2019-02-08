import React from 'react';

import { auth } from '../../../firebase';
import assets from '../../../assets';
import * as routes from '../../../constants/routes';

const SignOutButton = () => {
  const doLogout = () => {
    auth.doSignOut();
    window.location.href = routes.HOME;
  }
  return (
    <button
      type="button"
      className="button-transparent"
      onClick={doLogout}
    >
      <img src={assets.logout} className="size-30"/>
      <span className="text-white">Logout</span>
    </button>
  )
}

export default SignOutButton;
