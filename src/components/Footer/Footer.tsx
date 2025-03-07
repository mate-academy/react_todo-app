import React, { useContext, useMemo } from 'react';
import { DispatchContext, TodosDataContext } from '../../contexts';
import { FilterParams } from '../../types/FilterParams';
import classNames from 'classnames';

export const Footer = () => {
  const { todos, showTodosByStatus } = useContext(TodosDataContext);
  const dispatchData = useContext(DispatchContext);

  const { countNotCompleteTodo, completedTodosExist } = useMemo(() => {
    let complete = 0;
    let notComplete = 0;

    for (const t of todos) {
      if (t.completed) {
        complete += 1;
      } else {
        notComplete += 1;
      }
    }

    return {
      countNotCompleteTodo: notComplete,
      completedTodosExist: complete > 0,
    };
  }, [todos]);

  function clearCompletedTodos() {
    dispatchData({ type: 'deleteCompletedTodo' });
  }

  function changeFilterParam(p: FilterParams) {
    dispatchData({ type: 'changeFilterParam', payload: p });
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countNotCompleteTodo} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterParams).map(param => (
          <a
            key={param}
            href={
              param === FilterParams.all
                ? '#/'
                : `#${param.toLocaleLowerCase()}`
            }
            className={classNames('filter__link', {
              selected: showTodosByStatus === param,
            })}
            data-cy={'FilterLink' + param}
            onClick={() => changeFilterParam(param)}
          >
            {param}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => clearCompletedTodos()}
        disabled={!completedTodosExist}
      >
        Clear completed
      </button>
    </footer>
  );
};
