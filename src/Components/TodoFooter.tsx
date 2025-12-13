import React from 'react';
import classNames from 'classnames';
import { FilterTodo } from '../types/FilterTodo';
import { filterTodo } from '../Services/Todo';
import { useTodoData } from '../hooks/useTodoData';
import { useTodoUI } from '../hooks/useTodoUI';

type Filter = {
  label: string;
  href: string;
  dataCy: string;
  filter: FilterTodo;
};

export const TodoFooter: React.FC = () => {
  const { todos, deleteTodo } = useTodoData();
  const { filter, setFilter } = useTodoUI();

  const filters: Filter[] = [
    {
      label: 'All',
      href: '#/',
      dataCy: 'FilterLinkAll',
      filter: FilterTodo.all,
    },
    {
      label: 'Active',
      href: '#/active',
      dataCy: 'FilterLinkActive',
      filter: FilterTodo.active,
    },
    {
      label: 'Completed',
      href: '#/completed',
      dataCy: 'FilterLinkCompleted',
      filter: FilterTodo.completed,
    },
  ];

  const completedTodos = React.useMemo(
    () => filterTodo(todos, FilterTodo.completed),
    [todos],
  );
  const deleteCompletedTodos = async () => {
    if (completedTodos.length === 0) {
      return;
    }

    completedTodos.map(todo => deleteTodo(todo.id));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length - completedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(({ label, href, dataCy, filter: filterItem }) => (
          <a
            key={filterItem}
            href={href}
            data-cy={dataCy}
            onClick={() => setFilter(filterItem)}
            className={classNames('filter__link', {
              selected: filter === filterItem,
            })}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        onClick={deleteCompletedTodos}
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
