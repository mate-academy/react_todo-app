import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => (
  <>
    <h1 className="title">Home Page</h1>
    <div className="section">
      Which Todos List You would like to check?
    </div>
    <div className="linkButton">
      <Link
        to="/local"
      >
        Local Todos on my device
      </Link>
    </div>
    <div className="linkButton">
      <Link
        to="/cloud"
      >
        My Todos stored in a cloud
      </Link>
    </div>
  </>
);
