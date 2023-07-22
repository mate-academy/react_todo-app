import React from 'react';
import classNames from 'classnames';

type Props = {
  isAllCompleted: boolean,
  allTodosCompleted: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  isAllCompleted,
  allTodosCompleted,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className={classNames('toggle-all')}
        data-cy="toggleAll"
        checked={isAllCompleted}
        onClick={allTodosCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
