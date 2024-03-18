import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types/Todo';

type Selected = 'all' | 'active' | 'completed';

export const Footer: React.FC = () => {
  const { todos, setVisibleTodos, setTodos } = useContext(TodosContext);

  const [selected, setSelected] = useState<Selected>('all');

  const activeTodosFilter = () => {
    return todos.filter((todo: Todo) => todo.completed === false);
  };

  const viewAllTodos = () => {
    setVisibleTodos(todos);
  };

  const viewActiveTodos = () => {
    setVisibleTodos(activeTodosFilter());
  };

  const viewCompletedTodo = () => {
    const completedTodos = todos.filter(todo => todo.completed === true);

    setVisibleTodos(completedTodos);
  };

  const removeCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed === false);

    setTodos(completedTodos);
    setVisibleTodos(completedTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {activeTodosFilter().length} items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames('', {
              selected: selected === 'all',
            })}
            onClick={() => {
              setSelected('all');
              viewAllTodos();
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames('', {
              selected: selected === 'active',
            })}
            onClick={() => {
              setSelected('active');
              viewActiveTodos();
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames('', {
              selected: selected === 'completed',
            })}
            onClick={() => {
              setSelected('completed');
              viewCompletedTodo();
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => {
          removeCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
