import React from 'react';

export const Info = ({ name }) => (
  <div className="info App-info">
    <h3 className="info-title">
      by
      {' '}
      {name}
    </h3>
  </div>
);
