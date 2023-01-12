import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  data:Todo[];
  setData:any;

};

export const Footer: React.FC<Props> = ({ data, setData}) => {
  const todosLeft = data.filter(todo => todo.completed === false);

  const handleClearCompleted = () => {
    const updatedTodoList = data.filter(todo => todo.completed === false);

    setData(updatedTodoList);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todosLeft.length === 1 ? '1 item left' : `${todosLeft.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">All</a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
