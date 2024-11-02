import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Filter } from '../types/Filter';
import classNames from 'classnames';
import { TodosContext } from '../context/TodosContex';
import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[];
  setVisibleTodos: (vilteredTodos: Todo[]) => void;
  setFocused: (value: boolean) => void;
};

export const Footer: React.FC<Props> = ({
  visibleTodos,
  setVisibleTodos,
  setFocused,
}) => {
  const { todos, setTodos } = useContext(TodosContext);

  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.All);

  const findFilterKey = (value: string): string | undefined => {
    return Object.keys(Filter).find(
      key => Filter[key as keyof typeof Filter] === value,
    );
  };

  const todosCount = useCallback(
    (type: Filter.Active | Filter.Completed) => {
      const value = type === Filter.Active ? false : true;

      return todos.filter(todo => todo.completed === value).length;
    },
    [todos],
  );

  const filterFunction = (filter: Filter) => {
    switch (filter) {
      case Filter.All:
        setVisibleTodos(todos);
        break;

      case Filter.Active:
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;

      case Filter.Completed:
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setTodos(todos);
    }
  };

  const clearFunction = () => {
    const completedTodos = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    setTodos(todos.filter(todo => !completedTodos.includes(todo.id)));
    setFocused(true);
  };

  const setFilter = (filter: Filter) => {
    setSelectedFilter(filter);

    filterFunction(filter);
  };

  useEffect(() => {
    if (selectedFilter) {
      filterFunction(selectedFilter);
    }
  }, [visibleTodos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCount(Filter.Active)} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filter => (
          <a
            key={filter}
            href={`#/${filter}`}
            className={classNames('filter__link', {
              selected: selectedFilter === filter,
            })}
            onClick={() => setFilter(filter)}
            data-cy={`FilterLink${findFilterKey(filter)}`}
          >
            {findFilterKey(filter)}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todosCount(Filter.Completed) === 0}
        onClick={() => clearFunction()}
      >
        Clear completed
      </button>
    </footer>
  );
};
