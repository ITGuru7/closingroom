import React from 'react';
import { Link } from 'react-router-dom';

const SidebarNavItem = (props) => (
  <Link to={props.to} className="link-block py-2 d-flex">
    { props.asset &&
      <div className="mr-3">
        <img src={props.asset}/>
      </div>
    }
    <span className="align-self-center">
      {props.text}
    </span>
  </Link>
);

export default SidebarNavItem;
