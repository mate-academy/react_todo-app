import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  data:Todo[];
  setData:(data: Todo[]) => void;
  // setFilterTodos: (data: Todo[]) => void;
};

export const Footer: React.FC<Props>
= ({
  data, setData,
}) => {
  const hasNotCompletedTodos = data.filter(todo => todo.completed === false);
  const hasCompleted = data.filter(todo => todo.completed === true);

  const handleClearCompleted = () => {
    const updatedTodoList = data.filter(todo => todo.completed === false);

    setData(updatedTodoList);
  };

  const handleClickAll = () => {
    setData(data);
  };

  // const handleClickActive = () => {
  //   setFilterTodos(hasNotCompletedTodos);
  // };

  // const handleClickCompleted = () => {
  //   setFilterTodos(hasCompleted);
  // };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {hasNotCompletedTodos.length === 1 ? '1 item left' : `${hasNotCompletedTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected" onClick={handleClickAll}>All</a>
        </li>

        <li>
          {/* <a href="#/active" onClick={handleClickActive}>Active</a> */}
          <a href="#/active">Active</a>
        </li>

        <li>
          {/* <a href="#/completed" onClick={handleClickCompleted}>Completed</a> */}
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      {hasCompleted.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
