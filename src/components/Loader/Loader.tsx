import React from 'react';
import classNames from 'classnames';

import './Loader.scss';

type Props = {
  visible: boolean;
};

const Loader: React.FC<Props> = React.memo(
  ({ visible }) => {
    return (
      <div
        className={classNames({
          Loader: true,
          Loader_hidden: !visible,
        })}
      >
        <div className="Loader-Content" />
      </div>
    );
  },
);

export default Loader;
