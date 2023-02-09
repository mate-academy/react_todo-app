import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodosFilter: FC<Props> = ({ todos, setTodos }) => {
  const todosNotCompleted = todos.filter(todo => !todo.completed);
  const completedTodos = todos.length - todosNotCompleted.length;

  const conditions = [
    {
      link: '/',
      name: 'All',
    },
    {
      link: '/active',
      name: 'Active',
    },
    {
      link: '/completed',
      name: 'Completed',
    },
  ];

  const removeCompletedTodos = () => (
    setTodos(todos.filter(todo => !todo.completed))
  );

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosNotCompleted.length} items left`}
      </span>

      <ul className="filters">
        {conditions.map(condition => (
          <li key={condition.name}>
            <NavLink
              to={condition.link}
              className={({ isActive }) => classNames({ selected: isActive })}
            >
              {condition.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {completedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={removeCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
