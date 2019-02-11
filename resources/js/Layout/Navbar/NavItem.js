import React, {Component} from 'react';

import { Link } from 'react-router-dom';

const NavItem = (props) => (
  <Link to={props.to} className="navitem d-flex align-items-center mx-3">
    { props.asset &&
      <div className="navitem-image">
        <img src={props.asset} className={`size-${props.size}`}/>
      </div>
    }
    { props.text &&
      <span className="text-white pt-1 ml-3">
        {props.text}
      </span>
    }
  </Link>
);

export default NavItem;
