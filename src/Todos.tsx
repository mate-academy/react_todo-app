import classNames from 'classnames';
import { FC, useState, useCallback } from 'react';
// import { todo } from './types/types';

type Props = {
  items: string[],
};

export const Todos: FC<Props> = ({ items }) => {
  const [complete, setComplete] = useState(false);
  const handleComplete = useCallback(() => {
    setComplete((prevValue) => !prevValue);
  },
  [complete]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map((todo) => (
        <li
          key={todo}
          className={classNames({ completed: complete })}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id="toggle-view"
              onClick={handleComplete}
            />
            <label htmlFor="toggle-view">{todo}</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input type="text" className="edit" />
        </li>
      ))}
    </ul>
  );
};
