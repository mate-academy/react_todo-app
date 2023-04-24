import classNames from 'classnames';
import React from 'react';

type Props = {
  hasActive: boolean;
  toggleAll: () => void;
};

export const ToggleAll: React.FC<Props> = ({
  hasActive,
  toggleAll,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className={classNames(
          'toggle-all',
          { active: !hasActive },
        )}
        data-cy="toggleAll"
        onClick={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
