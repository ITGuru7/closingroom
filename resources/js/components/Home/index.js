import React from 'react';

import DefaultHeader from '../Header/DefaultHeader';
import assets from '../../assets';

const HomePage = () => (
  <div className="home-page d-flex flex-column">
    <DefaultHeader title="Home" />
    <div className="page-content flex-grow-1 m-4">
      <div className="title mb-4 text-center">
        Welcome to MNM ClosingRoom BETA
      </div>
      <div className="about">
        <div className="subtitle">
          About
        </div>
        <p>
          Ed que aut aut acculles quiam, tem quae sum et qui ressum quibus ab idus suntia aut omnimust, omnihil maionse aut milibus suntiore, et rernatio earcius excerecte dolorem voluptatur serum, cus cum enis aut officid isimusd aeribus andigni hiligenecus autatia ectamen ietur?
        </p>
      </div>
      <div className="howitworks">
        <div className="subtitle">
          How It Works
        </div>
        <div className="row">
          <div className="col-7 pr-4">
            <p>
              Ed que aut aut acculles quiam, tem quae sum et qui ressum quibus ab idus suntia aut omnimust, omnihil maionse aut milibus suntiore,
            </p>
            <p>
              Ed que aut aut acculles quiam, tem quae sum et qui ressum quibus ab idus suntia aut omnimust, omnihil maionse aut milibus suntiore,
            </p>
          </div>
          <div className="col-5 screenshot">
            <img src={assets.screenshot}/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
