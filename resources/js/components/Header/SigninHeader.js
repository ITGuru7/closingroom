import React from 'react';
import { Link } from 'react-router-dom';

import assets from '../../assets';

const SigninHeader = () => (
    <div className="signin-header">
        <div className="d-flex justify-content-center">
            <div className="logo-image mr-2">
                <img src={assets.logo}/>
            </div>
            <div className="logo-text align-self-end text-center">
                <div className="title">
                    MNM
                </div>
                <div className="subtitle">
                    Crypto Specialists
                </div>
            </div>
        </div>
    </div>
);

export default SigninHeader;
