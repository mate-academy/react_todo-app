import React from 'react';
import { Todo } from '../../types/Todo';
import { PageNavLink } from '../PageNavLink';

type Props = {
  todos: Todo[],
  clearCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  clearCompleted,
}) => {
  const todosLeft = todos.filter(todoLeft => !todoLeft.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const filtersArr = [
    { path: '/', text: 'All' },
    { path: '/active', text: 'Active' },
    { path: '/completed', text: 'Completed' },
  ];

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todosLeft === 1 ? '1 item left' : `${todosLeft} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        {filtersArr.map((filter) => (
          <li key={filter.text}>
            <PageNavLink to={filter.path} text={filter.text} />
          </li>
        ))}
      </ul>

      {completedTodosCount > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
