import React from 'react';
import './styles/Loader.scss';

export const Loader = React.memo(
  () => (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  ),
);
