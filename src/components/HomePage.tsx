import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => (
  <>
    <div className="section homepage__legend">
      Which Todos List You would like to check?
    </div>
    <div className="homepage__container">
      <Link
        className="linkContainer"
        to="/local"
      >
        Local Todos on my device
        <img
          className="imageLink"
          // eslint-disable-next-line max-len
          src="https://s.yimg.com/uu/api/res/1.2/rDKWzh9uU9lHkGttW67_NA--~B/aD0xMjAwO3c9MjAwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2022-11/c3c99bb0-5c67-11ed-af6f-716a8651bf9d.cf.jpg"
          alt="laptop"
        />
      </Link>
      <Link
        className="linkContainer"
        to="/cloud"
      >
        My Todos stored in a cloud
        <img
          className="imageLink"
          // eslint-disable-next-line max-len
          src="https://cdn.aarp.net/content/dam/aarp/home-and-family/personal-technology/2022/02/1140-cloud-services.jpg"
          alt="cloud"
        />
      </Link>
    </div>
  </>
);
