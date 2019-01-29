import React from 'react';
import assets from '../../assets';

const PanelHeader = (props) => (
  <div className="panel-header px-3">
    <div className="row">
      <div className="col-4">
        {props.back &&
          <div className="back d-flex align-items-center"
            onClick={(event) => {props.history.goBack()}}
          >
            <img src={assets.arrow_left_white_circle} className="mr-2"/>
            <span>Back</span>
          </div>
        }
      </div>
      <div className="col-4">
        <div className="title text-center">
          {props.title}
        </div>
      </div>
    </div>
  </div>
);

export default PanelHeader;
