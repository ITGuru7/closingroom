import React from 'react';
import { Link } from 'react-router-dom';

import assets from '../../assets';

const SignupHeader = () => (
    <div className="signup-header">
        <div className="d-flex justify-content-center">
            <div className="logo-image mr-2">
                <img src={assets.logo_transparent}/>
            </div>
            <div className="logo-text align-self-end text-center text-white">
                <div className="title">
                    MNM
                </div>
                <div className="subtitle">
                    Closing Room
                </div>
            </div>
        </div>
    </div>
);

export default SignupHeader;
