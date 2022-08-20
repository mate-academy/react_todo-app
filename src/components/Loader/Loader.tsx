import React from 'react';

import './Loader.scss';

type Props = {
  visible: boolean;
};

export const Loader: React.FC<Props> = React.memo(
  ({ visible }) => {
    return (
      <div
        className="Loader"
        style={{ visibility: visible ? 'visible' : 'hidden' }}
      >
        <div className="Loader__content" />
      </div>
    );
  },
);
